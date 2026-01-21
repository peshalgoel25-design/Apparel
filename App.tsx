/**
 * SPARQ APPLICATION - MAIN FILE
 * 
 * WHAT THIS FILE DOES:
 * - This is the "brain" of the app that coordinates everything.
 * - It manages the main screen flow (from choosing a category to seeing the final ad pillars).
 * - It handles saving and loading data so you don't lose your work.
 * - It talks to the AI "Back-end" to generate brand descriptions and ad ideas.
 * - It controls the global settings like language and which salesperson is logged in.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { PROD_WEBHOOK_URL, TEST_WEBHOOK_URL, WEBHOOK_ACTIONS, GEMINI_API_KEY, REGIONS, REGION_SALESPERSONS, Region, ACCESS_LEVELS, getUserAccessLevel, AccessLevel } from './constants';
import { translations, formTranslations, industrialFormTranslations } from './data/translations';
import { NEW_SAMPLE_PROFILES } from './data/sampleProfiles';
import { NewFormData, UploadedImage, BrandDescriptionResponse, FormSuggestions, IndustrialFormSuggestions, ApparelFormSuggestions, AdPillar, Story, Language, PastSubmission, Frame, TranscribedClip, MultilingualText, IndustrialFormData, ApparelFormData, World } from './types';
import {
  getInitialFormData,
  transformDataForWebhook,
  mapRawDataToFormData,
  extractArrayFromWebhookResponse,
  stripHtml,
  getInitialIndustrialFormData,
  transformIndustrialDataForWebhook,
  mapRawDataToIndustrialFormData,
  getInitialApparelFormData,
  transformApparelDataForWebhook,
  mapRawDataToApparelFormData,
  inferCategory
} from './utils';
import { urlToUploadedImage, callGemini3 } from './utils/api';
import { exportStructuredPDF } from './utils/pdfGenerator';
import { usePillarOperations } from './hooks/usePillarOperations';
import { useWorldOperations } from './hooks/useWorldOperations';
import sparqLogo from './assets/SPARQ Logo.png';

import LanguageSelector from './components/LanguageSelector';
import Settings from './components/Settings';
import SampleDataSelector from './components/SampleDataSelector';
import LoadResponsesModal from './components/LoadResponsesModal';
import BrandForm from './components/BrandForm.tsx';
import IndustrialGoodsForm from './components/QuestionRenderer';
import ApparelForm from './components/ApparelForm.tsx';
import PositioningStatement from './components/PositioningStatement';
import AdCreative from './components/AdCreative';
import { TranslatedText, Chip } from './components/FormElements';

// AI Instance removed (unused)

function App() {
  // Load initial state from localStorage or use defaults
  const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return defaultValue;
    }
  };

  const [lang, setLang] = useState<Language>(() => loadFromStorage('sparq_lang', 'en'));
  const [webhookEnv, setWebhookEnv] = useState<'prod' | 'test'>(() => loadFromStorage('sparq_webhookEnv', 'prod'));
  const [category, setCategory] = useState<'fmcg' | 'industrial' | 'apparels' | null>(() => loadFromStorage('sparq_category', null));

  // Region and Salesperson selection (mandatory before category selection)
  const [selectedRegion, setSelectedRegion] = useState<Region | ''>(() => loadFromStorage('sparq_selectedRegion', ''));
  const [selectedSalesperson, setSelectedSalesperson] = useState<string>(() => loadFromStorage('sparq_selectedSalesperson', ''));

  const [fmcgForm, setFmcgForm] = useState<NewFormData>(() => loadFromStorage('sparq_fmcgForm', getInitialFormData()));
  const [industrialForm, setIndustrialForm] = useState<IndustrialFormData>(() => loadFromStorage('sparq_industrialForm', getInitialIndustrialFormData()));
  const [apparelForm, setApparelForm] = useState<ApparelFormData>(() => loadFromStorage('sparq_apparelForm', getInitialApparelFormData()));

  const [fmcgPackImages, setFmcgPackImages] = useState<UploadedImage[]>(() => loadFromStorage('sparq_fmcgPackImages', []));
  const [industrialPackImages, setIndustrialPackImages] = useState<UploadedImage[]>(() => loadFromStorage('sparq_industrialPackImages', []));
  const [apparelPackImages, setApparelPackImages] = useState<UploadedImage[]>(() => loadFromStorage('sparq_apparelPackImages', []));

  const [initialWorlds] = useState<World[]>(() => loadFromStorage('sparq_worlds', []));
  const [initialSelectedWorld] = useState<string | null>(() => loadFromStorage('sparq_selectedWorld', null));
  const [initialAdPillars] = useState<AdPillar[]>(() => loadFromStorage('sparq_adPillars', []));


  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [worldError, setWorldError] = useState<string | null>(null);
  const [pillarError, setPillarError] = useState<string | null>(null);
  const generateSessionId = () => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const [sessionId, setSessionId] = useState<string | null>(() => {
    const stored = loadFromStorage('sparq_sessionId', null);
    if (stored) return stored;
    const newId = generateSessionId();
    localStorage.setItem('sparq_sessionId', JSON.stringify(newId));
    return newId;
  });

  const [brandDescriptionResponse, setBrandDescriptionResponse] = useState<BrandDescriptionResponse | null>(() => loadFromStorage('sparq_brandDescriptionResponse', null));
  const [isEditingPositioning, setIsEditingPositioning] = useState(false);
  const [editablePositioning, setEditablePositioning] = useState(() => loadFromStorage('sparq_editablePositioning', ''));
  const [originalPositioning, setOriginalPositioning] = useState<string | null>(() => loadFromStorage('sparq_originalPositioning', null));
  const [previousPositioning, setPreviousPositioning] = useState<string | null>(null);

  const accessLevel = React.useMemo(() => getUserAccessLevel(selectedSalesperson), [selectedSalesperson]);

  const [isImageBased, setIsImageBased] = useState(() => loadFromStorage('sparq_isImageBased', false));
  const [isViewingPreviousPositioning, setIsViewingPreviousPositioning] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const getWebhookUrl = (env: 'prod' | 'test') => {
    return env === 'prod' ? PROD_WEBHOOK_URL : TEST_WEBHOOK_URL;
  };

  const sendToWebhook = useCallback(async (action: string, data: any) => {
    const webhookUrl = getWebhookUrl(webhookEnv);
    abortControllerRef.current = new AbortController();
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          form_data: data,
          session_id: sessionId,
          "App Session ID": sessionId,
          "app_session_id": sessionId
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Webhook failed with status ${response.status}: ${errorText}`);
      }

      const responseText = await response.text();
      if (!responseText) {
        return {};
      }

      const responseData = JSON.parse(responseText);

      if (!sessionId && responseData.session_id) {
        setSessionId(responseData.session_id);
      }
      return responseData;

    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        console.log('Webhook request was cancelled.');
        setError('Request cancelled.');
        return null;
      }
      if (err instanceof SyntaxError) {
        console.error('Webhook returned invalid JSON:', err);
        setError('The server returned an unexpected response. Please try again.');
        throw new Error('Webhook returned invalid JSON.');
      }
      console.error('Webhook error:', err);
      setError((err as Error).message);
      throw err;
    }
  }, [webhookEnv, sessionId]);

  const getFullContext = useCallback(() => {
    if (!category) return null;
    let data: any;
    if (category === 'fmcg') {
      data = transformDataForWebhook(fmcgForm, lang, fmcgPackImages, 'fmcg', isImageBased);
    } else if (category === 'industrial') {
      data = transformIndustrialDataForWebhook(industrialForm, lang, industrialPackImages, 'industrial', isImageBased);
    } else {
      data = transformApparelDataForWebhook(apparelForm, lang, apparelPackImages, 'apparels', isImageBased);
    }
    return {
      ...data,
      "Salesperson": selectedSalesperson,
      "Region": selectedRegion,
      "Session ID": sessionId,
      "App Session ID": sessionId,
      "app_session_id": sessionId,
      "image_only_mode": isImageBased ? "yes" : "no",
    };
  }, [category, lang, fmcgForm, industrialForm, fmcgPackImages, industrialPackImages, selectedSalesperson, selectedRegion, sessionId, isImageBased]);

  const {
    worlds,
    setWorlds,
    isGeneratingWorlds,
    selectedWorld,
    setSelectedWorld,
    isGeneratingCustomWorld,
    worldImages,
    setWorldImages,
    generatingImages,
    handleGenerateWorlds,
    generateWorldImage,
    handleCreateCustomWorld,
    handleWorldEditToggle,
    handleWorldFieldChange,
    handleRecommendWorlds,
    handleClearWorldRecommendations,
    handleRankWorld,
    isAnalyzingWorlds
  } = useWorldOperations({
    getFullContext,
    brandDescriptionResponse,
    sendToWebhook,
    setError: setWorldError,
    initialWorlds,
    initialSelectedWorld
  });

  const {
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
  } = usePillarOperations({
    getFullContext,
    sendToWebhook,
    getWebhookUrl,
    isTestMode: webhookEnv === 'test',
    brandDescriptionResponse,
    setError: setPillarError,
    initialAdPillars
  });

  const [viewingOriginalStory, setViewingOriginalStory] = useState<{ [key: string]: boolean }>({});


  const [userDismissedWorldsBlur, setUserDismissedWorldsBlur] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [imageToView, setImageToView] = useState<string | null>('');
  const [isSavingWorlds, setIsSavingWorlds] = useState(false);
  const [worldSaveSuccess, setWorldSaveSuccess] = useState(false);
  const [isSavingPillars, setIsSavingPillars] = useState(false);
  const [pillarSaveSuccess, setPillarSaveSuccess] = useState(false);

  const [clipDuration, setClipDuration] = useState(() => loadFromStorage('sparq_clipDuration', 30));
  const audioRecorderRef = useRef<{ stopAll: () => void }>(null);
  const [transcribedClips, setTranscribedClips] = useState<TranscribedClip[]>(() => loadFromStorage('sparq_transcribedClips', []));

  const [suggestions, setSuggestions] = useState<FormSuggestions | IndustrialFormSuggestions>(() => loadFromStorage('sparq_suggestions', {}));
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<PastSubmission[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [loadedNotification, setLoadedNotification] = useState<string | null>(null);
  const [isLoadingFullSubmission, setIsLoadingFullSubmission] = useState(false);



  const handleCancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsSubmitting(false);
    setIsGeneratingPillars(false);
    setAdPillars(prev => prev.map(p => ({ ...p, isGeneratingStories: false, stories: p.stories?.map(s => ({ ...s, isGeneratingSketch: false, isUpdating: false })) })));
  };

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sparq_lang', JSON.stringify(lang));
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('sparq_webhookEnv', JSON.stringify(webhookEnv));
  }, [webhookEnv]);

  useEffect(() => {
    localStorage.setItem('sparq_category', JSON.stringify(category));
  }, [category]);

  useEffect(() => {
    localStorage.setItem('sparq_selectedRegion', JSON.stringify(selectedRegion));
  }, [selectedRegion]);

  useEffect(() => {
    localStorage.setItem('sparq_selectedSalesperson', JSON.stringify(selectedSalesperson));
  }, [selectedSalesperson]);

  useEffect(() => {
    if (isGeneratingWorlds) {
      setUserDismissedWorldsBlur(false);
    }
  }, [isGeneratingWorlds]);

  useEffect(() => {
    localStorage.setItem('sparq_fmcgForm', JSON.stringify(fmcgForm));
  }, [fmcgForm]);

  useEffect(() => {
    localStorage.setItem('sparq_industrialForm', JSON.stringify(industrialForm));
  }, [industrialForm]);

  useEffect(() => {
    localStorage.setItem('sparq_fmcgPackImages', JSON.stringify(fmcgPackImages));
  }, [fmcgPackImages]);

  // Restore category if missing but we have a description (fixes UI state if category is lost)
  useEffect(() => {
    if (!category && brandDescriptionResponse) {
      if (fmcgForm.brandName || fmcgForm.productName) {
        setCategory('fmcg');
      } else if (industrialForm.brandName || industrialForm.companyName) {
        setCategory('industrial');
      } else {
        setCategory('fmcg'); // Default fallback
      }
    }
  }, [category, brandDescriptionResponse, fmcgForm, industrialForm]);

  useEffect(() => {
    localStorage.setItem('sparq_industrialPackImages', JSON.stringify(industrialPackImages));
  }, [industrialPackImages]);

  useEffect(() => {
    localStorage.setItem('sparq_sessionId', JSON.stringify(sessionId));
  }, [sessionId]);

  useEffect(() => {
    localStorage.setItem('sparq_brandDescriptionResponse', JSON.stringify(brandDescriptionResponse));
  }, [brandDescriptionResponse]);

  useEffect(() => {
    localStorage.setItem('sparq_editablePositioning', JSON.stringify(editablePositioning));
  }, [editablePositioning]);

  useEffect(() => {
    localStorage.setItem('sparq_originalPositioning', JSON.stringify(originalPositioning));
  }, [originalPositioning]);

  useEffect(() => {
    localStorage.setItem('sparq_previousPositioning', JSON.stringify(previousPositioning));
  }, [previousPositioning]);

  useEffect(() => {
    localStorage.setItem('sparq_adPillars', JSON.stringify(adPillars));
  }, [adPillars]);

  useEffect(() => {
    localStorage.setItem('sparq_isImageBased', JSON.stringify(isImageBased));
  }, [isImageBased]);

  useEffect(() => {
    localStorage.setItem('sparq_clipDuration', JSON.stringify(clipDuration));
  }, [clipDuration]);

  useEffect(() => {
    localStorage.setItem('sparq_transcribedClips', JSON.stringify(transcribedClips));
  }, [transcribedClips]);

  useEffect(() => {
    localStorage.setItem('sparq_suggestions', JSON.stringify(suggestions));
  }, [suggestions]);

  useEffect(() => {
    localStorage.setItem('sparq_worlds', JSON.stringify(worlds));
  }, [worlds]);

  useEffect(() => {
    localStorage.setItem('sparq_selectedWorld', JSON.stringify(selectedWorld));
  }, [selectedWorld]);

  const resetForm = useCallback(() => {
    handleCancelRequest();

    // Preserve configuration settings
    const langToKeep = localStorage.getItem('sparq_lang');
    const envToKeep = localStorage.getItem('sparq_webhookEnv');

    // Clear local storage completely to ensure no session persistence
    localStorage.clear();

    // Restore configuration settings
    if (langToKeep) localStorage.setItem('sparq_lang', langToKeep);
    if (envToKeep) localStorage.setItem('sparq_webhookEnv', envToKeep);

    setCategory(null);
    setSelectedRegion('');
    setSelectedSalesperson('');
    setFmcgForm(getInitialFormData());
    setIndustrialForm(getInitialIndustrialFormData());
    setApparelForm(getInitialApparelFormData());
    setFmcgPackImages([]);
    setIndustrialPackImages([]);
    setApparelPackImages([]);
    setBrandDescriptionResponse(null);
    setAdPillars([]);
    setIsEditingPositioning(false);
    setEditablePositioning('');
    setOriginalPositioning(null);
    setPreviousPositioning(null);
    setError(null);
    setSuggestions({});
    setSessionId(generateSessionId());
    setTranscribedClips([]);
    setIsImageBased(false);
    setClipDuration(30);
    setWorlds([]);
    setSelectedWorld(null);
    setWorldImages({});
    setSearchResults([]);
    setSearchError(null);
    setIsLoadModalOpen(false);
    setWorldSaveSuccess(false);
    setPillarSaveSuccess(false);
    setUserDismissedWorldsBlur(false);
  }, [setWorldImages, setSearchResults]);

  const updateFmcgForm = useCallback((path: string | string[], value: any) => {
    setFmcgForm(f => {
      const keys = Array.isArray(path) ? path : path.split(".");
      const oldVal = keys.reduce((acc, key) => acc?.[key], f as any);
      const finalValue = typeof value === 'function' ? value(oldVal) : value;
      const copy = structuredClone(f);
      let cur: any = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        if (cur[keys[i]] === undefined || cur[keys[i]] === null) {
          cur[keys[i]] = {}; // Create nested objects if they don't exist
        }
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = finalValue;
      return copy;
    });
  }, []);

  const updateIndustrialForm = useCallback((path: string | string[], value: any) => {
    setIndustrialForm(f => {
      const keys = Array.isArray(path) ? path : path.split(".");
      const oldVal = keys.reduce((acc, key) => acc?.[key], f as any);
      const finalValue = typeof value === 'function' ? value(oldVal) : value;
      const copy = structuredClone(f);
      let cur: any = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        if (cur[keys[i]] === undefined || cur[keys[i]] === null) {
          cur[keys[i]] = {};
        }
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = finalValue;
      return copy;
    });
  }, []);

  const updateApparelForm = useCallback((path: string | string[], value: any) => {
    setApparelForm(f => {
      const keys = Array.isArray(path) ? path : path.split(".");
      const oldVal = keys.reduce((acc, key) => acc?.[key], f as any);
      const finalValue = typeof value === 'function' ? value(oldVal) : value;
      const copy = structuredClone(f);
      let cur: any = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        if (cur[keys[i]] === undefined || cur[keys[i]] === null) {
          cur[keys[i]] = {};
        }
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = finalValue;
      return copy;
    });
  }, []);

  const loadSampleData = useCallback(async (data: any, name: MultilingualText, cat: 'fmcg' | 'industrial' | 'apparels') => {
    const translatableFields: { [key: string]: MultilingualText | { [key: string]: MultilingualText } } = {};
    for (const key in data) {
      if (typeof data[key] === 'object' && data[key] !== null && 'en' in data[key]) {
        translatableFields[key] = data[key];
      } else if (key === 'notable' && typeof data[key] === 'object' && data[key] !== null) {
        translatableFields[key] = {};
        for (const subKey in data[key]) {
          if (typeof data[key][subKey] === 'object' && data[key][subKey] !== null && 'en' in data[key][subKey]) {
            (translatableFields[key] as any)[subKey] = data[key][subKey];
          }
        }
      }
    }

    if (cat === 'fmcg') {
      const convertedData = { ...data };
      for (const key in translatableFields) {
        if (key === 'notable') {
          convertedData[key] = {};
          for (const subKey in translatableFields[key]) {
            convertedData[key][subKey] = (translatableFields[key] as any)[subKey][lang] || (translatableFields[key] as any)[subKey].en;
          }
        } else {
          convertedData[key] = (translatableFields[key] as MultilingualText)[lang] || (translatableFields[key] as MultilingualText).en;
        }
      }
      setFmcgForm(convertedData);
      setCategory('fmcg');

    } else if (cat === 'industrial') {
      const convertedData = { ...data };
      for (const key in translatableFields) {
        convertedData[key] = (translatableFields[key] as MultilingualText)[lang] || (translatableFields[key] as MultilingualText).en;
      }
      setIndustrialForm(convertedData);
      setCategory('industrial');
    }

    setFmcgPackImages([]);
    setIndustrialPackImages([]);
    setBrandDescriptionResponse(null);
    setAdPillars([]);
    setError(null);
    setSuggestions({});
    setTranscribedClips([]);
    setLoadedNotification(`${translations.loadResponsesModal.loadedNotification[lang]} "${name[lang]}"`);
    setTimeout(() => setLoadedNotification(null), 3000);
  }, [lang]);



  const searchDiscussions = useCallback(async (date: string, salesperson: string, category: string) => {
    setIsSearching(true);
    setSearchError(null);
    setSearchResults([]);
    try {
      const responseData = await sendToWebhook(WEBHOOK_ACTIONS.SEARCH_DISCUSSIONS, { date, salesperson, category });
      console.log('Search discussions response:', responseData);
      const results = extractArrayFromWebhookResponse(responseData) as any[] || [];
      console.log('Extracted results:', results);
      const mappedResults: PastSubmission[] = results.map((r, idx) => ({
        executionId: r.executionID || r.executionId || r.id || r.execution_id || `temp_${idx}_${Date.now()}`,
        sessionId: r.sessionID || r.sessionId || r.session_id || null,
        brandName: r.brandName || r.brand || r['Brand Name'] || r.BrandName || r.brand_name || r['Ad Brand'] || r.adBrand || r.productName || r.product_name || r['Product to Showcase'] || `Submission ${idx + 1}`,
        snippet: r.snippet || r.description || r.overview || '',
        timestamp: r.timestamp || r.Timestamp || r.Date || r.date || r.created_at || new Date().toISOString(),
        salesperson: r.salesperson || r.Salesperson || r.SalesPerson || r.sales_person || '',
        region: r.region || r.Region || r.state || r.State || '',
        category: category as 'fmcg' | 'industrial' | 'apparels',
      }));
      console.log('Mapped results:', mappedResults);
      setSearchResults(mappedResults);
    } catch (err) {
      setSearchError((err as Error).message);
    } finally {
      setIsSearching(false);
    }
  }, [sendToWebhook]);

  const loadFullSubmission = useCallback(async (submission: PastSubmission) => {
    setIsLoadingFullSubmission(true);
    setSearchError(null);
    try {
      const response = await sendToWebhook(WEBHOOK_ACTIONS.LOAD_DISCUSSION, {
        execution_id: submission.executionId,
        category: submission.category
      });
      // The discussion data might be nested in response.response.body or just response
      const fullData = response?.response?.body || response?.body || response;
      const data = Array.isArray(fullData) ? fullData[0] : fullData;

      if (data) {
        const detectedCategory = submission.category || inferCategory(data);
        if (data.language) setLang(data.language as Language);

        if (detectedCategory === 'industrial') {
          const formData = mapRawDataToIndustrialFormData(data);
          setIndustrialForm(formData);
          setCategory('industrial');
          setIndustrialPackImages([]);
          if (data.packImages) {
            const loadedImages = await Promise.all(data.packImages.map(urlToUploadedImage));
            setIndustrialPackImages(loadedImages.filter((img): img is UploadedImage => !!img));
          }
        } else if (detectedCategory === 'apparels') {
          const formData = mapRawDataToApparelFormData(data);
          setApparelForm(formData);
          setCategory('apparels');
          setApparelPackImages([]);
          if (data.packImages) {
            const loadedImages = await Promise.all(data.packImages.map(urlToUploadedImage));
            setApparelPackImages(loadedImages.filter((img): img is UploadedImage => !!img));
          }
        } else {
          const formData = mapRawDataToFormData(data);
          setFmcgForm(formData);
          setCategory('fmcg');
          setFmcgPackImages([]);
          if (data.packImages) {
            const loadedImages = await Promise.all(data.packImages.map(urlToUploadedImage));
            setFmcgPackImages(loadedImages.filter((img): img is UploadedImage => !!img));
          }
        }

        // Clear existing state before loading new data to handle partial responses robustly
        setWorlds([]);
        setAdPillars([]);
        setWorldImages({});
        setSearchResults([]);
        setSearchError(null);

        // 1. Restore Positioning / Brand Description
        const positioning = data["Positioning"] || data["positioning"] || data.brandDescriptionResponse?.positioning;
        if (positioning) {
          const originalText = typeof positioning === 'string'
            ? positioning
            : (positioning?.[`${lang}_positioning`] || positioning?.english_positioning || '');
          setBrandDescriptionResponse({ positioning });
          setEditablePositioning(originalText);
          setOriginalPositioning(originalText);
        }

        // 2. Restore Worlds from Preferences (ranked/recommended) or basic Worlds
        const worldPrefsRaw = data["World Preferences"];
        const basicWorldsRaw = data["Worlds"];

        if (worldPrefsRaw) {
          try {
            const worldPrefs = typeof worldPrefsRaw === 'string' ? JSON.parse(worldPrefsRaw) : worldPrefsRaw;
            const mappedWorlds = worldPrefs.map((wp: any) => ({
              id: wp.id,
              title: wp.title || wp.label || 'Untitled World',
              description: wp.description || wp.snapshot || '',
              isCustom: !!wp.is_custom,
              recommended: wp.is_recommended === 'yes' || !!wp.recommended,
              recommendationReason: wp.recommendation_reason || wp.reason || wp.recommendationReason,
              ranking: wp.user_rank || wp.ranking
            }));
            setWorlds(mappedWorlds);
          } catch (e) {
            console.error("Failed to parse World Preferences", e);
          }
        } else if (basicWorldsRaw) {
          try {
            const basicWorlds = typeof basicWorldsRaw === 'string' ? JSON.parse(basicWorldsRaw) : basicWorldsRaw;
            setWorlds(basicWorlds.map((w: any) => ({
              id: w.id,
              title: w.label || w.title || 'Untitled World',
              description: w.snapshot || w.description || '',
            })));
          } catch (e) {
            console.error("Failed to parse Worlds", e);
          }
        }

        const pillarPrefsRaw = data["Pillar Preferences"];
        const basicPillarsRaw = data["Ad Pillars"] || data.adPillars || data["Pillars"];

        if (pillarPrefsRaw) {
          try {
            const pillarPrefs = typeof pillarPrefsRaw === 'string' ? JSON.parse(pillarPrefsRaw) : pillarPrefsRaw;
            const mappedPillars = pillarPrefs.map((pp: any) => ({
              pillar_id: pp.id || pp.pillar_id,
              pillar_name: pp.name || pp.pillar_name,
              name: pp.name || pp.pillar_name,
              life_problem: pp.lifestyle_problem || pp.life_problem,
              lifestyle_problem: pp.lifestyle_problem || pp.life_problem,
              hook_world_snapshot: pp.hook_world_snapshot,
              recommended: pp.is_recommended === 'yes' || !!pp.recommended,
              recommendationReason: pp.recommendation_reason || pp.reason || pp.recommendationReason,
              isSelected: pp.is_selected === 'yes' || !!pp.isSelected
            }));
            setAdPillars(mappedPillars);
          } catch (e) {
            console.error("Failed to parse Pillar Preferences", e);
          }
        } else if (basicPillarsRaw) {
          try {
            const raw = typeof basicPillarsRaw === 'string' ? JSON.parse(basicPillarsRaw) : basicPillarsRaw;
            setAdPillars(Array.isArray(raw) ? raw : []);
          } catch (e) {
            console.error("Failed to parse Ad Pillars", e);
          }
        }

        // 4. Restore Metadata
        // 4. Metadata handling 
        // We purposefully DON'T overwrite selectedSalesperson or selectedRegion here.
        // This ensures the person who is currently browsing (the "Session User") 
        // keeps their own identity and associated access level (FULL, PILLAR, or WORLD).
        // If they save changes, the record will then be correctly attributed to them.

        setSessionId(data["app_session_id"] || data["App Session ID"] || data.session_id || data.sessionId);
        setLoadedNotification(`${translations.loadResponsesModal.loadedNotification[lang]} "${submission.brandName}"`);
        setTimeout(() => setLoadedNotification(null), 3000);
        setIsLoadModalOpen(false);
      } else {
        throw new Error("No data returned for this submission.");
      }
    } catch (err) {
      setSearchError((err as Error).message);
    } finally {
      setIsLoadingFullSubmission(false);
    }
  }, [sendToWebhook, lang, setWorlds, setAdPillars, setLang, setSessionId, setFmcgForm, setIndustrialForm, setCategory, setBrandDescriptionResponse, setEditablePositioning, setOriginalPositioning, setFmcgPackImages, setIndustrialPackImages]);

  const handleWebhookSubmit = useCallback(async (event?: React.FormEvent) => {
    event?.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setBrandDescriptionResponse(null);
    setAdPillars([]);

    // Download Recordings as ZIP
    if (transcribedClips.length > 0) {
      try {
        const zip = new JSZip();
        transcribedClips.forEach((clip) => {
          // Ensure unique names
          const fileName = `${clip.name.replace(/[^a-z0-9]/gi, '_')}.webm`;
          zip.file(fileName, clip.blob);
        });
        const content = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        const activeFormZip = category === 'fmcg' ? fmcgForm : industrialForm;
        const brandNameZip = (activeFormZip as any).brandName || (activeFormZip as any).adBrand || (activeFormZip as any).brands || 'Brand';
        const safeBrandName = brandNameZip.replace(/[^a-z0-9]/gi, '-');
        a.download = `SPARQ-Recordings-${safeBrandName}-${new Date().toISOString().split('T')[0]}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (zipErr) {
        console.error("Failed to zip recordings:", zipErr);
        // Continue with submission even if zip fails
      }
    }


    // Salesperson is now selected at the App level, not in the form
    if (!selectedSalesperson) {
      alert(translations.pleaseSelectSalesperson[lang]);
      setIsSubmitting(false);
      return;
    }

    // Question 1.2 is mandatory unless in image-only mode
    if (!isImageBased) {
      const isMissing1_2 = category === 'fmcg'
        ? !fmcgForm.brandName
        : !industrialForm.adBrand;

      if (isMissing1_2) {
        alert(translations.pleaseFillQuestion1_2[lang]);
        const element = document.getElementById('q1_2_input');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
        setIsSubmitting(false);
        return;
      }
    }

    const webhookData = getFullContext();
    if (!webhookData) {
      setIsSubmitting(false);
      return;
    }

    try {
      const responseData = await sendToWebhook(WEBHOOK_ACTIONS.GENERATE_DESCRIPTION, webhookData);
      if (responseData) {
        setBrandDescriptionResponse(responseData);
        const originalText = typeof responseData.positioning === 'string'
          ? responseData.positioning
          : (responseData.positioning?.[`${lang}_positioning`] || responseData.positioning?.english_positioning || '');
        setEditablePositioning(originalText);
        setOriginalPositioning(originalText);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [category, fmcgForm, industrialForm, fmcgPackImages, industrialPackImages, lang, sendToWebhook, transcribedClips, selectedSalesperson, selectedRegion, isImageBased, getFullContext]);









  const handleGeneratePillars = useCallback(async () => {
    setIsGeneratingPillars(true);
    // Clear previous recommendations to give visual feedback that a new analysis is starting
    setAdPillars(prev => prev.map(p => ({ ...p, recommended: false, recommendationReason: undefined })));
    setError(null);
    try {
      const context = getFullContext();
      if (!context) {
        setError("Cannot generate pillars as form context is not available. Please start over.");
        setIsGeneratingPillars(false);
        return;
      }
      const worldRankings = worlds.map(w => ({
        id: w.id,
        title: w.title,
        description: w.description,
        ranking: w.ranking || 0
      })).filter(w => w.ranking > 0);

      const payload = Object.assign({}, context, {
        brandDescriptionResponse: brandDescriptionResponse,
        selected_world: worlds.find(w => w.id === selectedWorld),
        world_rankings: worldRankings
      });
      const responseData = await sendToWebhook(WEBHOOK_ACTIONS.GENERATE_PILLARS, payload);
      const rawPillars = extractArrayFromWebhookResponse(responseData);
      if (rawPillars) {
        // RENAME AND FILTER PILLARS
        // 1. Rename: Physiological->Basic Needs, Safety->Trust, Belonging->Connection, Esteem->Pride
        // 2. Remove: Self-actualisation
        // 3. Limit to top 4

        const MAPPING: { [key: string]: string } = {
          'Physiological': 'Basic Needs',
          'Safety': 'Trust',
          'Belonging': 'Connection',
          'Esteem': 'Pride'
        };
        const EXCLUDE = ['Self-actualisation', 'Self-Actualization'];

        let filteredPillars = rawPillars
          .filter((p: any) => {
            const name = p.pillar_name || p.pillar_id || p.name || p.maslow_level;
            return !EXCLUDE.some(e => name && name.toLowerCase().includes(e.toLowerCase()));
          })
          // Map names
          .map((p: any) => {
            const name = p.pillar_name || p.pillar_id || p.name || p.maslow_level;
            let newName = name;
            // Check for mapping
            for (const key in MAPPING) {
              if (name && name.toLowerCase().includes(key.toLowerCase())) {
                newName = MAPPING[key];
                break;
              }
            }
            return { ...p, pillar_name: newName, name: newName }; // Normalize name
          })
          .slice(0, 4); // Limit to 4

        setAdPillars(filteredPillars);
        // Auto-trigger recommendation after pillars are loaded
        handleRecommendPillars(filteredPillars);
      } else {
        console.warn("Could not extract pillars from response:", responseData);
        setAdPillars([]);
      }
    } catch (err) {
      // Error is already set by sendToWebhook
    } finally {
      setIsGeneratingPillars(false);
    }
  }, [sendToWebhook, brandDescriptionResponse, getFullContext, worlds, selectedWorld]);



  const handleSavePositioning = useCallback(async () => {
    if (!originalPositioning) return;
    const isChanged = editablePositioning !== originalPositioning;
    setIsEditingPositioning(false);

    if (isChanged) {
      setBrandDescriptionResponse(prev => {
        if (!prev) return null;
        const isObject = typeof prev.positioning === 'object' && prev.positioning !== null;

        const newPositioning = isObject
          ? { ...prev.positioning, [`${lang}_positioning`]: editablePositioning, english_positioning: editablePositioning }
          : editablePositioning;

        return { ...prev, positioning: newPositioning };
      });
      setPreviousPositioning(originalPositioning);
      setOriginalPositioning(editablePositioning);

      const context = getFullContext();
      if (!context) {
        setError("Cannot save positioning as form context is not available. Please start over.");
        return;
      }
      const payload = {
        ...context,
        original: originalPositioning,
        edited: editablePositioning
      };
      await sendToWebhook(WEBHOOK_ACTIONS.SAVE_EDITS_POSITIONING, payload);
    }
  }, [editablePositioning, originalPositioning, lang, sendToWebhook, getFullContext]);

  const handleSaveSelectedPillars = useCallback(async (selectedIndices: number[]) => {
    if (selectedIndices.length === 0) return;
    setIsSavingPillars(true);
    setPillarSaveSuccess(false);
    const context = getFullContext();
    if (!context) {
      setIsSavingPillars(false);
      return;
    }

    const payload = {
      ...context,
      all_pillars: adPillars.map((p, idx) => ({
        id: p.pillar_id || p.name,
        name: p.pillar_name || p.name,
        lifestyle_problem: p.life_problem || p.lifestyle_problem,
        hook_world_snapshot: p.hook_world_snapshot,
        is_recommended: p.recommended ? "yes" : "no",
        recommendation_reason: p.recommendationReason || "",
        is_selected: selectedIndices.includes(idx) ? "yes" : "no"
      }))
    };

    try {
      await sendToWebhook(WEBHOOK_ACTIONS.SAVE_SELECTED_PILLARS, payload);
      setPillarSaveSuccess(true);
      setTimeout(() => setPillarSaveSuccess(false), 3000);
    } catch (e) {
      console.error("Failed to save selected pillars", e);
      alert("Failed to save pillars.");
    } finally {
      setIsSavingPillars(false);
    }
  }, [adPillars, getFullContext, sendToWebhook]);








  const handleAcceptAllSuggestions = useCallback(() => {
    Object.entries(suggestions).forEach(([key, value]) => {
      // Handle nested keys (e.g. consumerDemographics.age)
      if (key.includes('.')) {
        const [parentKey, childKey] = key.split('.');
        const updateFn = (prev: any) => ({
          ...prev,
          [childKey]: value
        });

        if (category === 'fmcg') {
          updateFmcgForm(parentKey as any, updateFn);
        } else if (category === 'industrial') {
          updateIndustrialForm(parentKey as any, updateFn);
        }
        return;
      }

      if (category === 'fmcg') {
        updateFmcgForm(key, value);
      } else if (category === 'industrial') {
        updateIndustrialForm(key, value);
      }
    });
    setSuggestions({});
  }, [category, suggestions, updateFmcgForm, updateIndustrialForm]);

  const handleExportPDFAction = async () => {
    setIsExportingPdf(true);
    await new Promise(r => setTimeout(r, 100)); // Allow UI to update

    try {
      const activeForm = category === 'fmcg' ? fmcgForm : industrialForm;
      const brandName = (activeForm as any).brandName || (activeForm as any).adBrand || (activeForm as any).brands || 'Brand';
      // Use editable positioning if available, otherwise from response
      const pos = editablePositioning || brandDescriptionResponse?.positioning;

      // Get recommended pillar IDs
      const recommendedPillarIds = adPillars
        .filter(p => p.recommended)
        .map(p => p.pillar_id || '')
        .filter(Boolean);

      await exportStructuredPDF(
        brandName,
        activeForm,
        adPillars,
        worlds,
        pos,
        selectedWorld,
        recommendedPillarIds,
        selectedSalesperson,
        selectedRegion,
        sparqLogo
      );

    } catch (e) {
      console.error("PDF Export failed", e);
      alert("Failed to export PDF. Please check console.");
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleAnalyzeTranscript = useCallback(async () => {
    setIsAnalyzing(true);
    setSuggestions({});
    setError(null);

    const transcript = category === 'fmcg' ? fmcgForm.fullTranscript : industrialForm.fullTranscript;
    if (!transcript || transcript.trim().length < 10) {
      setError("Transcript is too short to analyze.");
      setIsAnalyzing(false);
      return;
    }

    const formSchema = category === 'fmcg' ? getInitialFormData() : getInitialIndustrialFormData();
    // We exclude some keys, but for Industrial we want to include option-based keys now
    const alwaysExcluded = ['fullTranscript', 'customerID', 'salesperson', 'notable'];

    let relevantKeys = Object.keys(formSchema).filter(k => !alwaysExcluded.includes(k));

    if (category === 'fmcg') {
      // Don't exclude demographics anymore, but we need to handle them carefully
      relevantKeys = relevantKeys.filter(k => !['demographics', 'consumerDemographics', 'psychographics'].includes(k));

      // Add flattened keys for nested objects
      relevantKeys.push(
        'notable.Look', 'notable.Feel', 'notable.Smell', 'notable.Taste',
        'consumerDemographics.age', 'consumerDemographics.gender', 'consumerDemographics.income', 'consumerDemographics.geography',
        'demographics.age', 'demographics.gender',
        'psychographics',
        'desiredImageryAttributes',
        'adObjectives', 'adFocus',
        'adObjectiveDetails', 'adFocusDetails'
      );
    } else {
      // For Industrial, we keep consumerAge, consumerGender etc.
      relevantKeys.push(
        'psychographicOrientation',
        'adObjectiveDetails', 'adFocusDetails'
      );
    }

    let optionsContext = "";
    if (category === 'industrial') {
      const t = industrialFormTranslations;
      optionsContext = `
        For the following keys, you MUST choose from the provided IDs/Values based on the transcript. If multiple apply and the field accepts arrays, provide an array.
        - consumerAge: ${Object.keys(t.section3.ageOptions).join(', ')}
        - consumerGender: ${Object.keys(t.section3.genderOptions).join(', ')}
        - consumerIncome: ${Object.keys(t.section3.incomeOptions).join(', ')}
        - consumerGeography: ${Object.keys(t.section3.geoOptions).join(', ')}
        - psychographicOrientation: ${Object.keys(t.section3.psychographicOptions).join(', ')}
        - showInfluencer: yes, no
        - customerInfluencerType: ${Object.keys(t.section3.influencerTypeOptions).join(', ')}
        - desiredImageryTone: ${Object.keys(t.section7.q7_1.options_tone).join(', ')}
        - desiredImageryWorld: ${Object.keys(t.section7.q7_1.options_world).join(', ')}
        - brandAsPerson: ${Object.keys(t.section7.q7_2.options).join(', ')}
        - adObjectives: ${Object.keys(t.section7.q7_3.options).join(', ')}
        - adFocus: ${Object.keys(t.section7.q7_4.options).join(', ')}

        For 'adObjectiveDetails' and 'adFocusDetails', provide a JSON object where keys are the selected objectives/focus areas, and values are specific details mentioned in the transcript (if any).
        `;
    } else {
      const t = formTranslations;
      const psychographicOptionsStr = Object.entries(t.section3.q3_2)
        .filter(([k]) => k.startsWith('category_'))
        .map(([k, v]) => `${k} (${v.en})`)
        .join(', ');

      optionsContext = `
        For the following keys, you MUST choose from the provided IDs/Values based on the transcript. If multiple apply and the field accepts arrays, provide an array.
        - consumerDemographics.age: ${Object.keys(t.section3.consumerAgeOptions).join(', ')}
        - consumerDemographics.gender: ${Object.keys(t.section3.genderOptions).join(', ')}
        - consumerDemographics.income: ${Object.keys(t.section3.incomeOptions).join(', ')}
        - consumerDemographics.geography: ${Object.keys(t.section3.geoOptions).join(', ')}
        - demographics.age: ${Object.keys(t.section3.customerAgeOptions).join(', ')}
        - demographics.gender: ${Object.keys(t.section3.genderOptions).join(', ')}
        - psychographics: ${psychographicOptionsStr}
        - desiredImageryTone: ${Object.keys(t.section7.q7_1.options_tone).join(', ')}
        - desiredImageryWorld: ${Object.keys(t.section7.q7_1.options_world).join(', ')}
        - desiredImageryAttributes: ${Object.keys(t.section7.q7_1.options_attributes).join(', ')}
        - consumerViewPersona: ${Object.keys(t.section7.q7_2.options).join(', ')}
        - adObjectives: ${Object.keys(t.section7.q7_4.options).join(', ')}
        - adFocus: ${Object.keys(t.section7.q7_5.options).join(', ')}

        For 'adObjectiveDetails' and 'adFocusDetails', provide a JSON object where keys are the selected objectives/focus areas, and values are specific details mentioned in the transcript (if any).
       `;
    }

    const prompt = `Based on the following transcript of a conversation with a brand owner, please fill in the corresponding values for the following keys. The output MUST be a valid JSON object. Do not include any text before or after the JSON object.
    
${optionsContext}

Transcript:
---
${transcript}
---

JSON Keys to fill:
${relevantKeys.join(', ')}

Provide your response as a single JSON object. For example: {"brandName": "Brand X", "adObjectives": ["awareness", "sales"]}`;

    const properties: { [key: string]: { type: Type } } = {};
    for (const key of relevantKeys) {
      properties[key] = { type: Type.STRING }; // We use string but rely on JSON parsing for arrays
    }

    const responseSchema = {
      type: Type.OBJECT,
      properties,
    };

    try {
      const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
      const response = await client.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const jsonText = response.text;
      if (!jsonText) throw new Error("No response text from Gemini");

      let parsedSuggestions = JSON.parse(jsonText);

      // Post-process: ensure arrays are arrays and not strings
      const ensureArray = (val: any) => {
        if (Array.isArray(val)) return val;
        if (typeof val === 'string') {
          if (val.startsWith('[') && val.endsWith(']')) {
            try { return JSON.parse(val); } catch (e) { return [val]; }
          }
          return val.split(',').map(s => s.trim()).filter(Boolean);
        }
        return [];
      }

      const ensureString = (val: any) => {
        if (Array.isArray(val)) {
          return val.length > 0 ? String(val[0]) : '';
        }
        return String(val);
      };

      const ensureObject = (val: any) => {
        if (typeof val === 'object' && val !== null && !Array.isArray(val)) return val;
        if (typeof val === 'string') {
          try { return JSON.parse(val); } catch (e) { return {}; }
        }
        return {};
      }

      // Fields that are definitely arrays
      const arrayFields = [
        'consumerDemographics.age', 'consumerDemographics.income', 'consumerDemographics.geography',
        'demographics.age',
        'psychographics', 'adObjectives', 'adFocus',
        'consumerAge', 'consumerIncome', 'consumerGeography', 'psychographicOrientation',
        'desiredImageryAttributes'
      ];

      const singleFields = [
        'consumerDemographics.gender', 'demographics.gender',
        'desiredImageryTone', 'desiredImageryWorld', 'brandAsPerson', 'consumerViewPersona',
        'consumerGender', 'customerInfluencerType'
      ];

      const objectFields = ['adObjectiveDetails', 'adFocusDetails'];

      for (const key in parsedSuggestions) {
        if (arrayFields.includes(key)) {
          parsedSuggestions[key] = ensureArray(parsedSuggestions[key]);
        } else if (singleFields.includes(key)) {
          parsedSuggestions[key] = ensureString(parsedSuggestions[key]);
        } else if (objectFields.includes(key)) {
          parsedSuggestions[key] = ensureObject(parsedSuggestions[key]);
        }
      }

      setSuggestions(parsedSuggestions);

    } catch (err) {
      console.error("AI analysis failed:", err);
      setError("Failed to analyze the transcript. The AI might have returned an unexpected format.");
    } finally {
      setIsAnalyzing(false);
    }
  }, [category, fmcgForm.fullTranscript, industrialForm.fullTranscript, apparelForm.fullTranscript]);


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 font-sans">
      <header className="mb-8">
        <div className="flex justify-center mb-6">
          <img
            src={sparqLogo}
            alt="SPARQ Logo"
            className="h-16 sm:h-20 md:h-24 object-contain"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800"><TranslatedText lang={lang} text={translations.appTitle} /></h1>
            <p className="text-slate-500 mt-1"><TranslatedText lang={lang} text={translations.appSubtitle} /></p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleExportPDFAction}
              disabled={isExportingPdf}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm text-sm font-medium"
            >
              {isExportingPdf ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Export PDF</span>
                </>
              )}
            </button>
            <LanguageSelector lang={lang} setLang={setLang} />
          </div>
        </div>
        {loadedNotification && (
          <div className="mt-4 p-3 bg-green-100 border border-green-300 text-green-800 text-sm rounded-md shadow-sm animate-fade-in">
            {loadedNotification}
          </div>
        )}
      </header>

      <Settings
        webhookEnv={webhookEnv}
        onWebhookEnvChange={setWebhookEnv}
        isImageBased={isImageBased}
        onImageBasedChange={setIsImageBased}
        clipDuration={clipDuration}
        onClipDurationChange={setClipDuration}
        lang={lang}
        translations={translations}
      />

      {!category ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6 text-center"><TranslatedText lang={lang} text={translations.selectCategory} /></h2>

          {/* Region and Salesperson Selection */}
          <div className="max-w-md mx-auto mb-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                <TranslatedText lang={lang} text={translations.regionLabel} /> <span className="text-red-600">*</span>
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value as Region | '');
                  setSelectedSalesperson(''); // Reset salesperson when region changes
                }}
                className="w-full rounded-xl border border-neutral-300 px-3 py-3 text-[15px] outline-none ring-neutral-300 focus:ring-2 bg-white"
              >
                <option value="">{translations.selectRegionPlaceholder[lang]}</option>
                {REGIONS.map(region => <option key={region} value={region}>{region}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                <TranslatedText lang={lang} text={translations.salespersonLabel} /> <span className="text-red-600">*</span>
              </label>
              <select
                value={selectedSalesperson}
                onChange={(e) => setSelectedSalesperson(e.target.value)}
                disabled={!selectedRegion}
                className="w-full rounded-xl border border-neutral-300 px-3 py-3 text-[15px] outline-none ring-neutral-300 focus:ring-2 bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
              >
                <option value="">{translations.selectSalespersonPlaceholder[lang]}</option>
                {selectedRegion && REGION_SALESPERSONS[selectedRegion as Region].map(sp => (
                  <option key={sp} value={sp}>{sp}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Selection Buttons */}
          <div className="text-center">
            {(!selectedRegion || !selectedSalesperson) && (
              <p className="text-sm text-amber-600 mb-4">
                <TranslatedText lang={lang} text={translations.pleaseSelectRegionAndSalesperson} />
              </p>
            )}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setCategory('fmcg')}
                disabled={!selectedRegion || !selectedSalesperson}
                className="inline-flex justify-center items-center px-8 py-4 border border-red-700 text-base font-medium rounded-md shadow-sm text-red-700 bg-white hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-red-700"
              >
                FMCG
              </button>
              <button
                onClick={() => setCategory('industrial')}
                disabled={!selectedRegion || !selectedSalesperson}
                className="inline-flex justify-center items-center px-8 py-4 border border-red-700 text-base font-medium rounded-md shadow-sm text-red-700 bg-white hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-red-700"
              >
                Industrial Goods
              </button>
              <button
                onClick={() => setCategory('apparels')}
                disabled={!selectedRegion || !selectedSalesperson}
                className="inline-flex justify-center items-center px-8 py-4 border border-red-700 text-base font-medium rounded-md shadow-sm text-red-700 bg-white hover:bg-red-700 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-red-700"
              >
                Apparels
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button onClick={() => setIsLoadModalOpen(true)} className="text-indigo-600 hover:text-indigo-800 font-semibold">
              <TranslatedText lang={lang} text={translations.loadPastResponses} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <SampleDataSelector sampleProfiles={NEW_SAMPLE_PROFILES} onSelect={loadSampleData} lang={lang} translations={translations} disabled={isSubmitting} />
            <button onClick={() => setIsLoadModalOpen(true)} className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-300 text-slate-700 text-base font-medium rounded-md shadow-sm hover:bg-slate-50 disabled:bg-slate-200">
              <TranslatedText lang={lang} text={translations.loadPastResponses} />
            </button>
            <button onClick={resetForm} className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-300 text-slate-700 text-base font-medium rounded-md shadow-sm hover:bg-slate-50 disabled:bg-slate-200">
              <TranslatedText lang={lang} text={translations.resetForm} />
            </button>
          </div>

          {category === 'fmcg' && (
            <BrandForm
              form={fmcgForm}
              update={updateFmcgForm}
              lang={lang}
              isImageBased={isImageBased}
              packImages={fmcgPackImages}
              setPackImages={setFmcgPackImages}
              suggestions={suggestions as FormSuggestions}
              isAnalyzing={isAnalyzing}
              handleAnalyzeTranscript={handleAnalyzeTranscript}
              audioRecorderRef={audioRecorderRef}
              clipDuration={clipDuration}
              transcribedClips={transcribedClips}
              setTranscribedClips={setTranscribedClips}
              isSubmitting={isSubmitting}
              onSubmit={handleWebhookSubmit}
              onCancel={handleCancelRequest}
              selectedSalesperson={selectedSalesperson}
              onAcceptAllSuggestions={handleAcceptAllSuggestions}
            />
          )}
          {category === 'industrial' && (
            <IndustrialGoodsForm
              form={industrialForm}
              update={updateIndustrialForm}
              lang={lang}
              isImageBased={isImageBased}
              suggestions={suggestions as IndustrialFormSuggestions}
              isAnalyzing={isAnalyzing}
              handleAnalyzeTranscript={handleAnalyzeTranscript}
              audioRecorderRef={audioRecorderRef}
              clipDuration={clipDuration}
              transcribedClips={transcribedClips}
              setTranscribedClips={setTranscribedClips}
              isSubmitting={isSubmitting}
              onSubmit={handleWebhookSubmit}
              onCancel={handleCancelRequest}
              packImages={industrialPackImages}
              setPackImages={setIndustrialPackImages}
              selectedSalesperson={selectedSalesperson}
              onAcceptAllSuggestions={handleAcceptAllSuggestions}
            />
          )}
          {category === 'apparels' && (
            <ApparelForm
              form={apparelForm}
              update={updateApparelForm}
              lang={lang}
              isImageBased={isImageBased}
              suggestions={suggestions as ApparelFormSuggestions}
              isAnalyzing={isAnalyzing}
              handleAnalyzeTranscript={handleAnalyzeTranscript}
              audioRecorderRef={audioRecorderRef}
              clipDuration={clipDuration}
              transcribedClips={transcribedClips}
              setTranscribedClips={setTranscribedClips}
              isSubmitting={isSubmitting}
              onSubmit={handleWebhookSubmit}
              onCancel={handleCancelRequest}
              packImages={apparelPackImages}
              setPackImages={setApparelPackImages}
              selectedSalesperson={selectedSalesperson}
              onAcceptAllSuggestions={handleAcceptAllSuggestions}
            />
          )}
        </>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <strong className="font-bold"><TranslatedText lang={lang} text={translations.errorTitle} />: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {brandDescriptionResponse && (
        <>
          <PositioningStatement
            brandDescriptionResponse={brandDescriptionResponse}
            isEditingPositioning={isEditingPositioning}
            editablePositioning={editablePositioning}
            setEditablePositioning={setEditablePositioning}
            handleSavePositioning={handleSavePositioning}
            handleEditPositioning={() => setIsEditingPositioning(!isEditingPositioning)}
            isGeneratingPillars={isGeneratingPillars}
            handleGeneratePillars={handleGeneratePillars}
            hideGeneratePillars={true} // Hide the default button, we show it in Worlds section now
            onCancel={handleCancelRequest}
            onShare={() => { }}
            lang={lang}
            previousPositioning={previousPositioning}
            isViewingPreviousPositioning={isViewingPreviousPositioning}
            setIsViewingPreviousPositioning={setIsViewingPreviousPositioning}
            rewriteDescription={async (original, suggestions) => {
              if (suggestions.length === 0) return original;
              const prompt = `
                Rewrite the following brand description to incorporate the suggested improvements. 
                Maintain the same structure and tone, but make it better based on the suggestions.
                
                Original Description:
                ${original}
                
                Suggestions to incorporate:
                ${suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}
                
                Output ONLY the rewritten description text.Do not include any preamble, conversation, or markdown backticks.
              `;
              try {
                const response = await callGemini3(prompt, GEMINI_API_KEY);
                return response.trim();
              } catch (err) {
                console.error("Failed to rewrite description:", err);
                return original;
              }
            }}
            onPositioningUpdate={async (newPos) => {
              setEditablePositioning(newPos);
              let currentPos = '';
              if (brandDescriptionResponse) {
                currentPos = typeof brandDescriptionResponse.positioning === 'string'
                  ? brandDescriptionResponse.positioning
                  : (brandDescriptionResponse.positioning?.[`${lang} _positioning`] || brandDescriptionResponse.positioning?.english_positioning || '');

                setPreviousPositioning(currentPos);
              }
              setOriginalPositioning(newPos);
              setBrandDescriptionResponse(prev => {
                if (!prev) return null;
                const isObject = typeof prev.positioning === 'object' && prev.positioning !== null;
                const updatedPos = isObject
                  ? { ...prev.positioning, [`${lang} _positioning`]: newPos, english_positioning: newPos }
                  : newPos;
                return { ...prev, positioning: updatedPos };
              });

              // Send Webhook
              const context = getFullContext();
              if (context) {
                await sendToWebhook(WEBHOOK_ACTIONS.SAVE_ENHANCED_POSITIONING, {
                  ...context,
                  original: currentPos,
                  enhanced: newPos
                });
              }
            }}
            handleGenerateWorlds={handleGenerateWorlds}
            isGeneratingWorlds={isGeneratingWorlds}
            hasWorlds={worlds.length > 0}
          />

          {/* World Generation Section - Only show when worlds are generated */}
          {worlds.length > 0 && (
            <div className="mt-8 bg-white p-5 sm:p-6 rounded-lg shadow-md animate-fade-in border-t-4 border-emerald-600">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-slate-900">Brand Worlds</h2>
                  {isAnalyzingWorlds && (
                    <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 shadow-sm animate-pulse">
                      <div className="loader w-3 h-3 border-emerald-600 border-t-transparent"></div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-700">Analysing Top Worlds...</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleClearWorldRecommendations}
                    className="flex-1 sm:flex-none h-[52px] px-6 border-2 border-emerald-700 text-[13px] font-black rounded-xl shadow-sm text-emerald-700 bg-white hover:bg-emerald-50 transition-colors uppercase tracking-wider"
                  >
                    Clear Recommendations
                  </button>
                  <button
                    onClick={() => handleRecommendWorlds()}
                    disabled={isAnalyzingWorlds}
                    className="flex-1 sm:flex-none h-[52px] px-6 bg-emerald-700 text-white text-[13px] font-black rounded-xl shadow-md hover:bg-emerald-800 disabled:bg-slate-300 disabled:text-slate-500 transition-colors uppercase tracking-wider"
                  >
                    Analyse Worlds (Top 2)
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="space-y-6">
                  {/* Show analyzing indicator if blur is dismissed */}
                  {isAnalyzingWorlds && userDismissedWorldsBlur && (
                    <div className="flex items-center justify-center py-4 bg-emerald-50 rounded-lg border border-emerald-100 mb-4 animate-pulse">
                      <div className="loader mr-3 border-emerald-700 border-t-transparent w-6 h-6"></div>
                      <span className="font-bold text-emerald-800 tracking-tight">AI is analyzing worlds to find the best fit...</span>
                    </div>
                  )}

                  {/* 2x2 Grid for Worlds - Recommended worlds get more prominence */}
                  <div className="relative">
                    {/* Blur Overlay */}
                    {((isAnalyzingWorlds || Object.values(generatingImages).some(v => v)) && !userDismissedWorldsBlur) && (
                      <div className="absolute inset-x-0 inset-y-0 z-20 flex flex-col items-center justify-center bg-slate-100/40 backdrop-blur-md rounded-xl border border-white/50 shadow-inner overflow-hidden animate-fade-in px-4 text-center">
                        <button
                          onClick={() => setUserDismissedWorldsBlur(true)}
                          className="absolute top-4 right-4 bg-white hover:bg-slate-50 p-2 rounded-full shadow-lg text-slate-700 font-bold text-xs transition-all hover:scale-105 flex items-center gap-1 border border-slate-200 z-30"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Read World Text
                        </button>

                        <div className="flex flex-col items-center">
                          <div className="relative mb-6">
                            <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
                            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-2xl">✨</div>
                          </div>
                          <h3 className="text-xl font-bold text-slate-800">Visualizing Best Worlds...</h3>
                          <p className="text-slate-600 mt-2 max-w-sm">
                            Our AI is generating photorealistic previews for the worlds that best fit your brand.
                          </p>
                          <div className="mt-4 flex gap-1">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ${((isAnalyzingWorlds || Object.values(generatingImages).some(v => v)) && !userDismissedWorldsBlur) ? 'filter blur-sm pointer-events-none select-none' : ''}`}>
                      {worlds.map((world) => {
                        const hasRecommendations = worlds.some(w => w.recommended);
                        const isRecommended = world.recommended;

                        return (
                          <div
                            key={world.id}
                            className={`p-5 border-2 rounded-xl transition-all duration-300 flex flex-col min-h-[280px] ${selectedWorld === world.id
                              ? 'border-indigo-600 bg-gradient-to-br from-indigo-50 to-white ring-4 ring-indigo-200 shadow-2xl transform scale-[1.03] z-10'
                              : isRecommended
                                ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 ring-2 ring-emerald-400 shadow-lg transform scale-[1.02]'
                                : hasRecommendations
                                  ? 'border-slate-200 bg-slate-50 opacity-60 hover:opacity-80'
                                  : 'border-slate-200 hover:border-teal-300 bg-white hover:shadow-md'
                              } `}
                          >
                            {world.isEditing ? (
                              <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
                                <input
                                  type="text"
                                  value={world.title}
                                  onChange={(e) => handleWorldFieldChange(world.id, 'title', e.target.value)}
                                  className="w-full p-2 border border-slate-300 rounded-md font-bold"
                                  placeholder="World Title"
                                />
                                <textarea
                                  value={world.description}
                                  onChange={(e) => handleWorldFieldChange(world.id, 'description', e.target.value)}
                                  className="w-full p-2 border border-slate-300 rounded-md text-sm"
                                  placeholder="World Description"
                                  rows={3}
                                />
                                <input
                                  type="text"
                                  value={world.hook || ''}
                                  onChange={(e) => handleWorldFieldChange(world.id, 'hook', e.target.value)}
                                  className="w-full p-2 border border-slate-300 rounded-md text-xs italic"
                                  placeholder="Hook (optional)"
                                />
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => handleWorldEditToggle(world.id, false)}
                                    className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-md hover:bg-indigo-700"
                                  >
                                    Done
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="cursor-pointer flex flex-col h-full" onClick={() => setSelectedWorld(world.id)}>
                                <div className="flex flex-col mb-2 gap-2">
                                  <div className="flex flex-wrap gap-2 items-center">
                                    {world.recommended && (
                                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full border border-emerald-200 animate-pulse uppercase tracking-tighter">
                                        ⭐ Recommended
                                      </span>
                                    )}
                                    {selectedWorld === world.id && (
                                      <span className="text-xs font-black text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full border-2 border-indigo-300 shadow-sm flex items-center gap-1 uppercase tracking-tighter">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Active Selected
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex justify-between items-start">
                                    <h4 className={`font-bold text-slate-800 line-clamp-2 pr-4 ${isRecommended ? 'text-xl' : 'text-lg'} `}>{world.title}</h4>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleWorldEditToggle(world.id, true); }}
                                      className="text-slate-400 hover:text-indigo-600 p-1 flex-shrink-0"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                                <p className={`mt-2 text-slate-600 leading-relaxed overflow-hidden ${isRecommended ? 'text-sm' : 'text-xs'} line-clamp-3 min-h-[48px]`}>
                                  {world.description}
                                </p>
                                {world.hook && <p className="text-slate-500 mt-2 text-[10px] italic line-clamp-1">Hook: {world.hook}</p>}
                                {world.recommended && world.recommendationReason && (
                                  <p className="mt-3 text-[13px] text-emerald-700 font-medium bg-emerald-50 p-3 rounded-xl border border-emerald-200 line-clamp-3">
                                    <strong className="text-emerald-800">💡 Why:</strong> {world.recommendationReason}
                                  </p>
                                )}

                                <div className="mt-4 flex items-center gap-3">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); generateWorldImage(world); }}
                                    disabled={generatingImages[world.id]}
                                    className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-md border border-indigo-200 hover:bg-indigo-100 disabled:bg-slate-100 disabled:text-slate-400 flex items-center gap-1 font-medium transition-colors"
                                  >
                                    {generatingImages[world.id] && <div className="loader w-3 h-3 border-indigo-600 border-t-transparent"></div>}
                                    {generatingImages[world.id] ? "Generating..." : "Generate Preview"}
                                  </button>

                                  <div className="ml-auto flex items-center gap-1.5 bg-slate-100/80 rounded-xl p-1 border border-slate-200 shadow-inner">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2 pr-1">Rank:</span>
                                    <div className="flex gap-1">
                                      {[1, 2, 3, 4].map(num => (
                                        <button
                                          key={num}
                                          onClick={(e) => { e.stopPropagation(); handleRankWorld(world.id, world.ranking === num ? undefined : num); }}
                                          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-black transition-all ${world.ranking === num
                                            ? 'bg-emerald-600 text-white shadow-lg transform scale-105 z-10'
                                            : 'text-slate-400 hover:bg-slate-200 hover:text-slate-600'
                                            } `}
                                        >
                                          {num}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                {worldImages[world.id] && (
                                  <div className="mt-3 relative group">
                                    <img
                                      src={worldImages[world.id]}
                                      alt={world.title}
                                      className={`w-full h-auto rounded-lg shadow-md cursor-pointer hover:opacity-95 transition-opacity ${isRecommended ? 'max-h-80' : 'max-h-48'} object-cover`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setImageToView(worldImages[world.id]);
                                        setIsImageViewerOpen(true);
                                      }}
                                    />
                                    <a
                                      href={worldImages[world.id]}
                                      download={`world-${world.id}.png`}
                                      onClick={(e) => e.stopPropagation()}
                                      className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full shadow-sm hover:bg-white text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                      title="Download Image"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                      </svg>
                                    </a>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div> {/* end grid */}
                  </div> {/* end relative container for blur */}

                  {/* Custom World Generation */}
                  <div className="mt-4 p-4 bg-slate-50 rounded-md border border-slate-200" onClick={(e) => e.stopPropagation()}>
                    <h4 className="font-semibold text-slate-700 mb-2">Create Custom World</h4>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="custom-world-prompt"
                        placeholder="Describe the world you want to create..."
                        className="flex-1 h-12 px-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm shadow-inner"
                      />
                      <button
                        onClick={() => {
                          const input = document.getElementById('custom-world-prompt') as HTMLInputElement;
                          if (input.value) handleCreateCustomWorld(input.value);
                        }}
                        disabled={isGeneratingCustomWorld}
                        className="h-12 px-6 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 disabled:bg-teal-400 flex items-center justify-center shadow-md transition-all active:scale-95 uppercase tracking-wide text-xs"
                      >
                        {isGeneratingCustomWorld ? (
                          <>
                            <div className="loader w-4 h-4 mr-2 border-2"></div>
                            Creating...
                          </>
                        ) : (
                          "Create"
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-slate-200">
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <button
                        onClick={async () => {
                          setIsSavingWorlds(true);
                          setWorldSaveSuccess(false);
                          try {
                            const context = getFullContext();
                            const rankedWorlds = worlds.filter(w => (w.ranking || 0) > 0).sort((a, b) => (a.ranking || 0) - (b.ranking || 0));

                            const rankingsMap: Record<string, string> = {};
                            rankedWorlds.forEach(w => {
                              rankingsMap[`rank_${w.ranking} `] = w.title;
                            });

                            await sendToWebhook("save_worlds", {
                              ...context,
                              ...rankingsMap,
                              all_worlds: worlds.map(w => ({
                                id: w.id,
                                title: w.title,
                                description: w.description,
                                is_custom: !!w.isCustom,
                                is_recommended: w.recommended ? "yes" : "no",
                                recommendation_reason: w.recommendationReason || "",
                                user_rank: w.ranking || 0
                              }))
                            });
                            setWorldSaveSuccess(true);
                            setTimeout(() => setWorldSaveSuccess(false), 3000);
                          } catch (e) {
                            console.error("Failed to save worlds", e);
                          } finally {
                            setIsSavingWorlds(false);
                          }
                        }}
                        disabled={isSavingWorlds}
                        className="w-full sm:flex-1 h-[52px] bg-white border-2 border-emerald-600 text-emerald-700 font-black rounded-xl shadow-sm hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:bg-slate-50 uppercase tracking-wider text-[13px] relative group"
                      >
                        {isSavingWorlds ? (
                          <div className="loader border-[#10b981] border-t-transparent w-5 h-5 !border-2"></div>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                          </svg>
                        )}
                        <span>{isSavingWorlds ? 'Saving...' : 'Save Rankings'}</span>
                        {worldSaveSuccess && (
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-emerald-600 font-bold text-xs bg-white px-3 py-2 rounded-lg border border-emerald-100 shadow-lg animate-bounce z-20 whitespace-nowrap">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Saved!
                          </div>
                        )}
                      </button>

                      {accessLevel !== ACCESS_LEVELS.WORLD_ONLY && (
                        <button
                          onClick={handleGeneratePillars}
                          disabled={isGeneratingPillars || !selectedWorld}
                          className="w-full sm:flex-[1.5] h-[52px] bg-emerald-700 text-white text-[13px] font-black rounded-xl shadow-lg hover:bg-emerald-800 disabled:bg-slate-300 disabled:text-slate-500 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                        >
                          {isGeneratingPillars && <div className="loader border-white border-t-transparent w-5 h-5"></div>}
                          {isGeneratingPillars ? 'Generating...' : 'Generate Ad Pillars'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {adPillars.length > 0 && (
        <div className="mt-2 pt-8 border-t-2 border-slate-100">
          <AdCreative
            adPillars={adPillars}
            lang={lang}
            accessLevel={accessLevel}
            handleGenerateStories={handleGenerateStories}
            handlePillarEditToggle={handlePillarEditToggle}
            handlePillarFieldChange={handlePillarFieldChange}
            handleSavePillar={(pIdx) => handleUpdatePillar(pIdx, adPillars[pIdx])}
            handleStoryEditToggle={handleStoryEditToggle}
            handleStoryFieldChange={handleStoryFieldChange}
            handleSaveStory={handleSaveStory}
            handleUpdateStory={handleUpdateStory}
            handleNavigateVersion={handleNavigateVersion}
            handleToggleViewOriginal={handleToggleViewOriginal}
            onCancel={handleCancelRequest}
            onShare={() => { }}
            onExportToPdf={() => { }}
            openImageViewer={(url) => { setImageToView(url); setIsImageViewerOpen(true); }}
            viewingOriginalStory={viewingOriginalStory}
            setViewingOriginalStory={setViewingOriginalStory}
            onFreestyleStory={handleFreestyleStory}
            handleRecommendPillars={() => handleRecommendPillars()}
            isAnalyzingPillars={isAnalyzingPillars}
            handleClearRecommendations={handleClearRecommendations}
            handleTranslateStory={handleTranslateStory}
            handleTranscribeAudio={handleTranscribeAudio}
            handleSaveSelectedPillars={handleSaveSelectedPillars}
            isSavingPillars={isSavingPillars}
            pillarSaveSuccess={pillarSaveSuccess}
          />
        </div>
      )}

      <LoadResponsesModal
        isOpen={isLoadModalOpen}
        onClose={() => setIsLoadModalOpen(false)}
        onLoad={loadFullSubmission}
        lang={lang}
        regions={REGIONS}
        regionSalespersons={REGION_SALESPERSONS}
        selectedRegion={selectedRegion}
        selectedSalesperson={selectedSalesperson}
        searchResults={searchResults}
        isLoadingUsers={false}
        isSearching={isSearching}
        isLoadingFullSubmission={isLoadingFullSubmission}
        error={searchError}
        searchDiscussions={searchDiscussions}
        category={category}
      />

      {isImageViewerOpen && imageToView && (
        <div className="modal-overlay" onClick={() => setIsImageViewerOpen(false)}>
          <div className="bg-white p-4 rounded-lg shadow-xl max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={imageToView} alt="Full size preview" className="w-full h-auto object-contain max-h-[80vh]" />
            <button onClick={() => setIsImageViewerOpen(false)} className="mt-4 w-full px-6 py-2 bg-slate-200 rounded-md shadow hover:bg-slate-300">Close</button>
          </div>
        </div>
      )}

      <footer className="text-center mt-12 text-sm text-slate-500">
        <p><TranslatedText lang={lang} text={translations.footerText} /></p>
      </footer>
    </div>
  );
}

export default App;
