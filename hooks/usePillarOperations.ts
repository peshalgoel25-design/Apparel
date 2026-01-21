/**
 * AD PILLAR OPERATIONS (HOOK)
 * 
 * WHAT THIS FILE DOES:
 * - Contains the logic for managing "Ad Pillars" and "Stories."
 * - Handles recommending the best ad ideas and generating full scripts.
 * - Manages version history so you can go back to previous versions of a story.
 */

import { useState, useCallback } from 'react';
import { AdPillar, Story, Frame, BrandDescriptionResponse } from '../types.ts';
import { callGemini3, callGeminiAudio, callGeminiFlashLite } from '../utils/api.ts';
import { GEMINI_API_KEY, WEBHOOK_ACTIONS } from '../constants.ts';
import { extractArrayFromWebhookResponse } from '../utils.ts';

interface UsePillarOperationsProps {
    getFullContext: () => any;
    sendToWebhook: (action: string, payload: any) => Promise<any>;
    getWebhookUrl: (env: 'prod' | 'test') => string;
    isTestMode: boolean;
    brandDescriptionResponse: BrandDescriptionResponse | null;
    setError: (error: string | null) => void;
    initialAdPillars?: AdPillar[];
}

export const usePillarOperations = ({
    getFullContext,
    sendToWebhook,
    getWebhookUrl,
    isTestMode,
    setError,
    brandDescriptionResponse,
    initialAdPillars = []
}: UsePillarOperationsProps) => {
    const [adPillars, setAdPillars] = useState<AdPillar[]>(initialAdPillars);
    const [isAnalyzingPillars, setIsAnalyzingPillars] = useState(false);
    const [isGeneratingPillars, setIsGeneratingPillars] = useState(false);

    const handleClearRecommendations = useCallback(() => {
        setAdPillars(prev => prev.map(p => ({ ...p, recommended: false, recommendationReason: undefined })));
    }, []);

    const handleRecommendPillars = useCallback(async (currentPillars?: AdPillar[]) => {
        const pillarsToAnalyze = currentPillars || adPillars;
        if (pillarsToAnalyze.length === 0) return;
        console.log('🔹 Analyze Pillars started');

        setIsAnalyzingPillars(true);
        setAdPillars(prev => prev.map(p => ({ ...p, recommended: false, recommendationReason: undefined })));

        try {
            const simplifiedPillars = pillarsToAnalyze.map(p => ({
                pillar_id: p.pillar_id || p.name,
                life_problem: p.life_problem || p.lifestyle_problem,
                hook_world_snapshot: p.hook_world_snapshot
            }));

            const context = getFullContext();
            const brandInfo = context || {};

            const prompt = `Analyze these ad pillars and recommend the top 2 that best fit the brand.

Brand: ${brandInfo["Brand Name"] || brandInfo["Ad Brand"] || 'Unknown'}
Target Audience: ${brandInfo["Consumer - Age"]}, ${brandInfo["Consumer - Gender"]}

Pillars: ${JSON.stringify(simplifiedPillars)}

Output JSON only (no markdown):
[
  {
    "pillar_id": "exact pillar_id",
    "reason": "One sentence why"
  }
]`;

            console.log('Sending optimized prompt to Gemini...');
            const response = await callGemini3(prompt, GEMINI_API_KEY);
            const cleanResponse = response.replace(/```json/g, '').replace(/```/g, '').trim();
            const recommendations = JSON.parse(cleanResponse);
            console.log('Recommendations received:', recommendations);

            setAdPillars(prev => prev.map(p => {
                const rec = recommendations.find((r: any) => r.pillar_id === (p.pillar_id || p.name));
                return rec ? { ...p, recommended: true, recommendationReason: rec.reason } : { ...p, recommended: false, recommendationReason: undefined };
            }));

        } catch (err) {
            console.error("Failed to recommend pillars:", err);
            alert('Failed to analyze pillars. Please try again.');
        } finally {
            setIsAnalyzingPillars(false);
            console.log('🔹 Analyze Pillars finished');
        }
    }, [adPillars, getFullContext]);

    const handleGenerateStories = useCallback(async (pillarIndex: number) => {
        setAdPillars(prev => prev.map((p, i) => i === pillarIndex ? { ...p, isGeneratingStories: true, error: undefined } : p));
        try {
            const context = getFullContext();
            if (!context) {
                setAdPillars(prev => prev.map((p, i) => i === pillarIndex ? { ...p, error: "Cannot generate stories as form context is not available. Please start over." } : p));
                return;
            }
            const payload = {
                ...context,
                brandDescriptionResponse: brandDescriptionResponse,
                pillar: adPillars[pillarIndex]
            };
            const responseData = await sendToWebhook(WEBHOOK_ACTIONS.GENERATE_STORY, payload);
            const stories = extractArrayFromWebhookResponse(responseData);
            if (stories) {
                const initializedStories = stories.map(s => ({
                    ...s,
                    originalStory: JSON.parse(JSON.stringify(s)) // Absolute original
                }));
                setAdPillars(prev => prev.map((p, i) => i === pillarIndex ? { ...p, stories: initializedStories, error: undefined } : p));
            } else {
                console.warn("Could not extract stories from response:", responseData);
                setAdPillars(prev => prev.map((p, i) => i === pillarIndex ? { ...p, error: "Failed to parse generated stories." } : p));
            }
        } catch (err) {
            setAdPillars(prev => prev.map((p, i) => i === pillarIndex ? { ...p, error: "Failed to generate stories. Please try again." } : p));
        } finally {
            setAdPillars(prev => prev.map((p, i) => i === pillarIndex ? { ...p, isGeneratingStories: false } : p));
        }
    }, [adPillars, sendToWebhook, getFullContext]);

    const handleFreestyleStory = useCallback(async (pillarIndex: number, userPrompt: string) => {
        setAdPillars(prev => prev.map((p, i) => i === pillarIndex ? { ...p, isGeneratingStories: true } : p));
        try {
            const context = getFullContext();
            const pillar = adPillars[pillarIndex];
            const prompt = `
        You are a scriptwriter. Write a TVC script (story) for the following brand and pillar, incorporating the user's specific request.
        
        Brand Info: ${JSON.stringify(context)}
        Pillar: ${JSON.stringify(pillar)}
        User Request: ${userPrompt}
        
        Output JSON format (Story interface):
        {
          "id": "freestyle_${Date.now()}",
          "title": "Title",
          "genre": "Genre",
          "setting": "Setting",
          "overview": "Overview",
          "frames": [
             { "frame_no": 1, "beat": "Beat", "visual_action": "Action", "audio_dialogue": "Dialogue" }
          ],
          "ending_moment": "Ending",
          "tagline": "Tagline"
        }
      `;

            const response = await callGemini3(prompt, GEMINI_API_KEY);
            const cleanResponse = response.replace(/```json/g, '').replace(/```/g, '').trim();
            const story = JSON.parse(cleanResponse);

            setAdPillars(prev => {
                const newPillars = [...prev];
                if (newPillars[pillarIndex]) {
                    const existingStories = newPillars[pillarIndex].stories || [];
                    const storyToSave = {
                        ...story,
                        originalStory: JSON.parse(JSON.stringify(story))
                    };
                    newPillars[pillarIndex].stories = [storyToSave, ...existingStories];
                }
                return newPillars;
            });

        } catch (err) {
            console.error("Failed to generate freestyle story:", err);
            alert("Failed to generate story. Please try again.");
        } finally {
            setAdPillars(prev => prev.map((p, i) => i === pillarIndex ? { ...p, isGeneratingStories: false } : p));
        }
    }, [adPillars, getFullContext]);

    const handleUpdatePillar = useCallback(async (pIdx: number, pillarData: AdPillar) => {
        try {
            // Optimistic update: exit edit mode
            setAdPillars(prev => prev.map((p, i) => i === pIdx ? { ...p, isEditing: false } : p));

            const context = getFullContext();
            // Use sendToWebhook instead of direct fetch to ensure session handling is consistent
            await sendToWebhook(WEBHOOK_ACTIONS.UPDATE_PILLAR, {
                brand_id: context?.["Brand Name"] || context?.["Ad Brand"] || 'unknown',
                pillar: pillarData,
                ...context // This already includes the Session IDs from getFullContext
            });

            console.log('Pillar saved successfully');

        } catch (error) {
            console.error("Failed to save pillar:", error);
            alert("Note: Failed to save to backend (CORS/Network error). Changes are saved locally in the browser.");
        }
    }, [getWebhookUrl, isTestMode, getFullContext]);

    const handleTranslateStory = useCallback(async (pIdx: number, sIdx: number, targetLang: string) => {
        const pillar = adPillars[pIdx];
        const story = pillar.stories?.[sIdx];
        if (!story) return;

        // Set loading state
        setAdPillars(prev => {
            const newPillars = [...prev];
            if (newPillars[pIdx] && newPillars[pIdx].stories) {
                newPillars[pIdx].stories![sIdx] = { ...newPillars[pIdx].stories![sIdx], isTranslating: true };
            }
            return newPillars;
        });

        try {
            const prompt = `Translate the following story into ${targetLang}. Maintain the tone, emotion, and cultural nuances.
      
      Story: ${JSON.stringify(story)}
      
      Output JSON only (Story interface structure). IMPORTANT: Translate the story field (main narrative text). Maintain the exact structure of "frames" field. Each frame must have "visual_action" and "audio_dialogue" translated.
      {
        "title": "Translated Title",
        "overview": "Translated Overview",
        "story": "Translated full narrative story text",
        "frames": [ 
           { "frame_no": 1, "beat": "...", "visual_action": "Translated Visuals", "audio_dialogue": "Translated Audio" }
        ],
        "ending_moment": "Translated Ending",
        "tagline": "Translated Tagline"
      }`;

            const response = await callGeminiFlashLite(prompt, GEMINI_API_KEY);
            const cleanResponse = response.replace(/```json/g, '').replace(/```/g, '').trim();
            const translatedStoryPart = JSON.parse(cleanResponse);

            setAdPillars(prev => {
                const newPillars = [...prev];
                if (newPillars[pIdx] && newPillars[pIdx].stories) {
                    const currentStory = newPillars[pIdx].stories![sIdx];

                    // Archive current state as a version before translating
                    const pastVersion = { ...currentStory };
                    delete pastVersion.versions;
                    delete pastVersion.isUpdating;
                    delete pastVersion.isTranslating;
                    delete pastVersion.error;
                    delete pastVersion.isEditing;
                    delete pastVersion.originalStory;

                    const newVersions = currentStory.versions ? [...currentStory.versions, pastVersion] : [pastVersion];

                    newPillars[pIdx].stories![sIdx] = {
                        ...currentStory,
                        ...translatedStoryPart,
                        originalStory: currentStory.originalStory || JSON.parse(JSON.stringify(currentStory)),
                        versions: newVersions,
                        currentVersionIndex: -1, // Viewing latest
                        isTranslating: false, // Turn off loading
                    };
                }
                return newPillars;
            });
        } catch (e) {
            console.error("Translation failed", e);
            // Turn off loading on error
            setAdPillars(prev => {
                const newPillars = [...prev];
                if (newPillars[pIdx] && newPillars[pIdx].stories) {
                    newPillars[pIdx].stories![sIdx] = {
                        ...newPillars[pIdx].stories![sIdx],
                        isTranslating: false,
                        error: "Translation failed. Please try again."
                    };
                }
                return newPillars;
            });
        }
    }, [adPillars]);

    const handleTranscribeAudio = useCallback(async (audioBlob: Blob): Promise<string> => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.readAsDataURL(audioBlob);
            reader.onloadend = async () => {
                const base64Audio = (reader.result as string).split(',')[1];
                try {
                    const prompt = "Transcribe the audio exactly.";
                    const text = await callGeminiAudio(prompt, base64Audio, GEMINI_API_KEY);
                    resolve(text);
                } catch (e) {
                    console.error("Transcription failed", e);
                    reject(e);
                }
            };
            reader.onerror = (error) => reject(error);
        });
    }, []);

    const handlePillarEditToggle = useCallback((pIdx: number, isEditing: boolean) => {
        setAdPillars(prev => prev.map((p, i) => i === pIdx ? { ...p, isEditing, originalPillar: isEditing ? structuredClone(p) : undefined } : p));
    }, []);

    const handlePillarFieldChange = useCallback((pIdx: number, field: keyof AdPillar, value: string) => {
        setAdPillars(prev => prev.map((p, i) => i === pIdx ? { ...p, [field]: value } : p));
    }, []);

    const handleStoryEditToggle = useCallback((pIdx: number, sIdx: number, isEditing: boolean) => {
        setAdPillars(prev => {
            const newPillars = [...prev];
            if (newPillars[pIdx]?.stories?.[sIdx]) {
                newPillars[pIdx].stories![sIdx].isEditing = isEditing;
                if (isEditing) {
                    newPillars[pIdx].stories![sIdx].originalStory = structuredClone(newPillars[pIdx].stories![sIdx]);
                }
            }
            return newPillars;
        });
    }, []);

    const handleStoryFieldChange = useCallback((pIdx: number, sIdx: number, field: keyof Story, value: string) => {
        setAdPillars(prev => {
            const newPillars = [...prev];
            if (newPillars[pIdx]?.stories?.[sIdx]) {
                // @ts-ignore
                newPillars[pIdx].stories![sIdx][field] = value;
            }
            return newPillars;
        });
    }, []);

    const handleSaveStory = useCallback((pIdx: number, sIdx: number) => {
        setAdPillars(prev => {
            const newPillars = [...prev];
            const story = newPillars[pIdx]?.stories?.[sIdx];
            if (story) {
                // When manually saving, also create a version
                const pastVersion = { ...story };
                delete pastVersion.versions;
                delete pastVersion.isUpdating;
                delete pastVersion.isTranslating;
                delete pastVersion.error;
                delete pastVersion.isEditing;
                delete pastVersion.originalStory;

                const newVersions = story.versions ? [...story.versions, pastVersion] : [pastVersion];

                newPillars[pIdx].stories![sIdx] = {
                    ...story,
                    versions: newVersions,
                    currentVersionIndex: -1,
                    isEditing: false
                };
            }
            return newPillars;
        });
    }, []);

    const handleUpdateStory = useCallback(async (pIdx: number, sIdx: number, changes: string) => {
        setAdPillars(prev => {
            const newPillars = [...prev];
            if (newPillars[pIdx]?.stories?.[sIdx]) {
                newPillars[pIdx].stories![sIdx].isUpdating = true;
            }
            return newPillars;
        });

        const context = getFullContext();
        const storyToUpdate = adPillars[pIdx]?.stories?.[sIdx];

        if (!storyToUpdate || !context) {
            setAdPillars(prev => {
                const newPillars = [...prev];
                if (newPillars[pIdx]?.stories?.[sIdx]) {
                    newPillars[pIdx].stories![sIdx].isUpdating = false;
                }
                return newPillars;
            });
            return;
        }

        try {
            const prompt = `
             You are a scriptwriter. Update the following story based on the user's request.
             
             Brand Info: ${JSON.stringify(context)}
             Current Story: ${JSON.stringify(storyToUpdate)}
             User Request: ${changes}
             
             Output JSON only (Story interface). IMPORTANT: 
             1. Include a 'story' field with the full narrative text of the story (this is the main story content that appears in the middle section)
             2. Ensure 'frames' is an array of objects with 'frame_no', 'beat', 'visual_action', 'audio_dialogue'
             3. Update ALL fields based on the user's request, including the narrative story text
             
             Structure:
             {
               "title": "Title",
               "overview": "Overview",
               "story": "Full narrative story text here - this should be updated based on the user's request",
               "frames": [
                  { "frame_no": 1, "beat": "Beat", "visual_action": "Action", "audio_dialogue": "Dialogue" }
               ],
               "ending_moment": "Ending",
               "tagline": "Tagline"
             }
             `;

            const response = await callGeminiFlashLite(prompt, GEMINI_API_KEY);
            const cleanResponse = response.replace(/```json/g, '').replace(/```/g, '').trim();
            const updatedStoryData = JSON.parse(cleanResponse);

            // Sanitize: ensure no versions array comes from the AI
            delete updatedStoryData.versions;
            delete updatedStoryData.currentVersionIndex;
            delete updatedStoryData.isUpdating;
            delete updatedStoryData.isTranslating;
            delete updatedStoryData.isEditing;

            setAdPillars(prev => {
                const newPillars = [...prev];
                const storyToArchive = newPillars[pIdx]?.stories?.[sIdx];
                if (storyToArchive) {
                    // Archive current version
                    const pastVersion = { ...storyToArchive };
                    delete pastVersion.versions;
                    delete pastVersion.isUpdating;
                    delete pastVersion.isTranslating;
                    delete pastVersion.error;
                    delete pastVersion.isEditing;
                    delete pastVersion.originalStory;

                    const newVersions = storyToArchive.versions ? [...storyToArchive.versions, pastVersion] : [pastVersion];

                    newPillars[pIdx].stories![sIdx] = {
                        ...storyToArchive,
                        ...updatedStoryData,
                        originalStory: storyToArchive.originalStory, // Keep the very first original
                        versions: newVersions,
                        currentVersionIndex: -1, // Viewing latest
                        isUpdating: false
                    };
                }
                return newPillars;
            });

        } catch (err) {
            console.error("Failed to update story:", err);
            alert("Failed to update story. Please try again.");
            setAdPillars(prev => {
                const newPillars = [...prev];
                if (newPillars[pIdx]?.stories?.[sIdx]) {
                    newPillars[pIdx].stories![sIdx].isUpdating = false;
                }
                return newPillars;
            });
        }
    }, [adPillars, getFullContext]);

    const handleNavigateVersion = useCallback((pIdx: number, sIdx: number, direction: 'prev' | 'next') => {
        setAdPillars(prev => prev.map((p, i) => {
            if (i !== pIdx || !p.stories) return p;
            const newStories = p.stories.map((s, j) => {
                if (j !== sIdx || !s.versions || s.versions.length === 0) return s;

                const total = s.versions.length;
                let current = s.currentVersionIndex === undefined ? -1 : s.currentVersionIndex;
                if (current === -1) current = total;

                let next = direction === 'prev' ? current - 1 : current + 1;

                // Clamp
                if (next < 0) next = 0;
                if (next > total) next = total;

                return { ...s, currentVersionIndex: (next === total) ? -1 : next };
            });
            return { ...p, stories: newStories };
        }));
    }, []);

    const handleToggleViewOriginal = useCallback((pIdx: number, sIdx: number) => {
        setAdPillars(prev => prev.map((p, i) => {
            if (i !== pIdx || !p.stories) return p;
            const newStories = p.stories.map((s, j) => {
                if (j !== sIdx) return s;
                const nextViewingOriginal = !s.isViewingOriginal;
                return {
                    ...s,
                    isViewingOriginal: nextViewingOriginal,
                    // When switching to original, turn off edit mode by default
                    isEditing: nextViewingOriginal ? false : s.isEditing
                };
            });
            return { ...p, stories: newStories };
        }));
    }, []);

    return {
        adPillars,
        setAdPillars,
        isAnalyzingPillars,
        isGeneratingPillars,
        setIsGeneratingPillars,
        handleRecommendPillars,
        handleClearRecommendations,
        handleGenerateStories,
        handleFreestyleStory,
        handleUpdatePillar,
        handleTranslateStory,
        handleTranscribeAudio,
        handlePillarEditToggle,
        handlePillarFieldChange,
        handleStoryEditToggle,
        handleStoryFieldChange,
        handleSaveStory,
        handleUpdateStory,
        handleNavigateVersion,
        handleToggleViewOriginal
    };
};
