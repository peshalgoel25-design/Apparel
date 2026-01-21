/**
 * BRAND WORLD OPERATIONS (HOOK)
 * 
 * WHAT THIS FILE DOES:
 * - This handles everything related to "Brand Worlds."
 * - It tells the AI to generate different creative settings for the brand.
 * - It also manages the ranking system (1st, 2nd, 3rd place) for chosen worlds.
 */

import { useState, useCallback, useEffect } from 'react';
import { World, BrandDescriptionResponse } from '../types.ts';
import { callGemini3, callGemini3Image, callGeminiFlashLite } from '../utils/api.ts';
import { GEMINI_API_KEY, WEBHOOK_ACTIONS } from '../constants.ts';
import { extractArrayFromWebhookResponse } from '../utils.ts';

interface UseWorldOperationsProps {
    getFullContext: () => any;
    brandDescriptionResponse: BrandDescriptionResponse | null;
    sendToWebhook: (action: string, payload: any) => Promise<any>;
    setError: (error: string | null) => void;
    initialWorlds?: World[];
    initialSelectedWorld?: string | null;
}

export const useWorldOperations = ({
    getFullContext,
    brandDescriptionResponse,
    sendToWebhook,
    setError,
    initialWorlds = [],
    initialSelectedWorld = null
}: UseWorldOperationsProps) => {
    const [worlds, setWorlds] = useState<World[]>(initialWorlds);
    const [isAnalyzingWorlds, setIsAnalyzingWorlds] = useState(false);
    const [isGeneratingWorlds, setIsGeneratingWorlds] = useState(false);
    const [selectedWorld, setSelectedWorld] = useState<string | null>(initialSelectedWorld);
    const [isGeneratingCustomWorld, setIsGeneratingCustomWorld] = useState(false);
    const [worldImages, setWorldImages] = useState<Record<string, string>>({});
    const [generatingImages, setGeneratingImages] = useState<Record<string, boolean>>({});

    const generateWorldImage = useCallback(async (world: World) => {
        setGeneratingImages(prev => ({ ...prev, [world.id]: true }));
        setError(null);
        try {
            const prompt = `Generate a photorealistic image. The scene should be inspired by the world: "${world.title} - ${world.description}". Set in an Indian context with Indian people. It should have the feel of a premium Indian ad.`;
            const imgData = await callGemini3Image(prompt, GEMINI_API_KEY);
            setWorldImages(prev => ({ ...prev, [world.id]: imgData }));
        } catch (e) {
            console.error('Failed to generate world image', e);
            setError(`Failed to generate preview image. ${(e as Error).message}`);
        } finally {
            setGeneratingImages(prev => ({ ...prev, [world.id]: false }));
        }
    }, [setError]);

    const handleClearWorldRecommendations = useCallback(() => {
        setWorlds(prev => prev.map(w => ({ ...w, recommended: false, recommendationReason: undefined })));
    }, []);

    // Internal recommendation function that accepts worlds as parameter
    const recommendWorldsInternal = useCallback(async (worldsToAnalyze: World[]) => {
        if (worldsToAnalyze.length === 0) return;
        setIsAnalyzingWorlds(true);
        setWorlds(prev => prev.map(w => ({ ...w, recommended: false, recommendationReason: undefined })));

        try {
            const context = getFullContext();
            const brandInfo = context || {};

            const simplifiedWorlds = worldsToAnalyze.map(w => ({
                id: w.id,
                title: w.title,
                description: w.description
            }));

            const prompt = `Analyze these brand worlds and recommend the top 2 that best fit the brand.
      
Brand: ${brandInfo["Brand Name"] || brandInfo["Ad Brand"] || 'Unknown'}
Target Audience: ${brandInfo["Consumer - Age"]}, ${brandInfo["Consumer - Gender"]}

Worlds: ${JSON.stringify(simplifiedWorlds)}

Output JSON only (no markdown):
[
  {
    "id": "exact world id",
    "reason": "One sentence why"
  }
]`;

            const response = await callGeminiFlashLite(prompt, GEMINI_API_KEY);
            const cleanResponse = response.replace(/```json/g, '').replace(/```/g, '').trim();
            const recommendations = JSON.parse(cleanResponse);

            const recommendedIds = new Set(recommendations.map((r: any) => r.id));

            setWorlds(prev => {
                const updated = prev.map(w => {
                    const rec = recommendations.find((r: any) => r.id === w.id);
                    return rec ? { ...w, recommended: true, recommendationReason: rec.reason } : { ...w, recommended: false, recommendationReason: undefined };
                });
                // Sort updated worlds so recommended ones are at the top
                return [...updated].sort((a, b) => (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0));
            });

            // Auto-generate images for recommended worlds
            for (const world of worldsToAnalyze) {
                if (recommendedIds.has(world.id)) {
                    generateWorldImage(world);
                }
            }

        } catch (err) {
            console.error("Failed to recommend worlds:", err);
            setError('Failed to analyze worlds. Please try again.');
        } finally {
            setIsAnalyzingWorlds(false);
        }
    }, [getFullContext, generateWorldImage, setError]);

    // Public handler that uses current worlds state
    const handleRecommendWorlds = useCallback(async () => {
        if (worlds.length === 0) return;
        await recommendWorldsInternal(worlds);
    }, [worlds, recommendWorldsInternal]);

    const handleGenerateWorlds = useCallback(async () => {
        if (!brandDescriptionResponse) return;
        setIsGeneratingWorlds(true);
        setError(null);
        setWorlds([]); // Clear previous worlds
        setWorldImages({}); // Clear previous images
        try {
            const context = getFullContext();

            // Use webhook instead of direct API call
            const payload = {
                ...context,
                brandDescriptionResponse: brandDescriptionResponse
            };

            console.log('Generating worlds via webhook...');
            const responseData = await sendToWebhook(WEBHOOK_ACTIONS.GENERATE_WORLDS, payload);
            console.log('Worlds webhook response:', JSON.stringify(responseData, null, 2));

            // Extract worlds from response
            const generatedWorlds = extractArrayFromWebhookResponse(responseData);

            if (generatedWorlds && generatedWorlds.length > 0) {
                // Ensure IDs are unique if re-generating, limit to 4 worlds
                const worldsWithIds = generatedWorlds
                    .slice(0, 4) // Limit to first 4 worlds
                    .map((w: any, i: number) => ({
                        ...w,
                        id: w.id || `w_${Date.now()}_${i}`,
                        title: w.title || w.label || 'Untitled World',
                        description: w.description || w.snapshot || '',
                        why_it_fits: w.why_it_fits || w.why || ''
                    }));
                setWorlds(worldsWithIds);

                // Auto-trigger world analysis after generation
                // Use setTimeout to ensure worlds state is set before analyzing
                setIsGeneratingWorlds(false); // Mark generation as complete before analysis starts
                setTimeout(() => {
                    recommendWorldsInternal(worldsWithIds);
                }, 100);
                return; // Early return since we handle setIsGeneratingWorlds above
            } else {
                console.warn("No worlds found in webhook response", responseData);
            }

        } catch (error) {
            console.error("Failed to generate worlds:", error);
            setError("Failed to generate worlds. Please try again.");
        } finally {
            setIsGeneratingWorlds(false);
        }
    }, [brandDescriptionResponse, getFullContext, sendToWebhook, setError, recommendWorldsInternal]);



    const handleCreateCustomWorld = useCallback(async (userPrompt: string) => {
        setIsGeneratingCustomWorld(true);
        setError(null);
        try {
            const prompt = `
        Create a single "World" definition based on this user request: "${userPrompt}". The world should be Indian. Use simple Indian colloquial language words to describe it.
        Output JSON format:
        {
          "title": "Title",
          "description": "Description in less than 10 words",
          "why_it_fits": "Why it fits in less than 10 words"
        }
      `;
            const response = await callGemini3(prompt, GEMINI_API_KEY);
            const cleanResponse = response.replace(/```json/g, '').replace(/```/g, '').trim();
            const newWorldData = JSON.parse(cleanResponse);

            const newWorld: World = {
                id: `custom_${Date.now()}`,
                ...newWorldData
            };

            setWorlds(prev => [...prev, newWorld]);
            setSelectedWorld(newWorld.id);
        } catch (err) {
            console.error("Failed to create custom world:", err);
            setError("Failed to create custom world. Please try again.");
        } finally {
            setIsGeneratingCustomWorld(false);
        }
    }, [setError]);

    const handleWorldEditToggle = useCallback((worldId: string, isEditing: boolean) => {
        setWorlds(prev => prev.map(w => w.id === worldId ? { ...w, isEditing, originalWorld: isEditing ? structuredClone(w) : undefined } : w));
    }, []);

    const handleWorldFieldChange = useCallback((worldId: string, field: keyof World, value: string) => {
        setWorlds(prev => prev.map(w => w.id === worldId ? { ...w, [field]: value } : w));
    }, []);

    const handleRankWorld = useCallback((worldId: string, rank: number | undefined) => {
        setWorlds(prev => prev.map(w => {
            if (rank !== undefined && w.ranking === rank && w.id !== worldId) {
                // Remove existing rank from other world
                return { ...w, ranking: undefined };
            }
            if (w.id === worldId) {
                return { ...w, ranking: rank };
            }
            return w;
        }));
    }, []);

    return {
        worlds,
        setWorlds,
        isGeneratingWorlds,
        isAnalyzingWorlds,
        selectedWorld,
        setSelectedWorld,
        isGeneratingCustomWorld,
        worldImages,
        setWorldImages,
        generatingImages,
        handleGenerateWorlds,
        handleRecommendWorlds,
        handleClearWorldRecommendations,
        generateWorldImage,
        handleCreateCustomWorld,
        handleWorldEditToggle,
        handleWorldFieldChange,
        handleRankWorld
    };
}

