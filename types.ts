/**
 * DATA DEFINITIONS (TYPES)
 * 
 * WHAT THIS FILE DOES:
 * - This is the "Dictionary" of the app.
 * - It defines exactly what a "Story," a "Brand," or a "Salesperson" looks like in the app's memory.
 * - Helps ensure that different parts of the app don't get confused about what data they are handling.
 */

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'gu';

export interface MultilingualText {
  en: string;
  hi: string;
  ta: string;
  te: string;
  gu: string;
  [key: string]: string;
}

export enum QuestionType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  RADIO = 'radio',
}

export interface Option {
  value: string;
  label: MultilingualText;
  description?: MultilingualText;
}

export interface Question {
  id: string;
  text: MultilingualText;
  type: QuestionType;
  placeholder?: MultilingualText;
  options?: Option[];
}

export interface AdPillar {
  // New format from webhook
  pillar_id?: string;
  pillar_name?: string;
  world_id?: string;
  maslow_level?: string;
  functional_problem_source?: string;
  lifestyle_problem?: string; // Keep for backward compatibility
  life_problem?: string; // New field from latest webhook response
  hook_world_snapshot?: string;

  // Old format
  name?: string;
  why_it_matters?: string;
  genres?: string[];
  settings?: string[];

  // UI state management
  stories?: Story[];
  isGeneratingStories?: boolean;
  isEditing?: boolean;
  originalPillar?: AdPillar;

  // Recommendation
  recommended?: boolean;
  recommendationReason?: string;
  isSelected?: boolean;
  error?: string;
}

export interface World {
  id: string;
  title: string;
  description: string;
  hook?: string;
  isEditing?: boolean;
  isCustom?: boolean;
  recommended?: boolean;
  recommendationReason?: string;
  ranking?: number;
}

export interface ProductOrProcessWindow {
  include?: boolean;
  window_type?: string;
  shots?: string[];
  claim_handle?: string;
}

export interface Frame {
  frame_no?: number;
  beat?: string;
  scene_heading?: string;
  scene?: string; // Added for flexibility
  visual_action?: string;
  action?: string; // Added for flexibility
  camera_notes?: string;
  dialogue?: string;
  vo?: string;
  sfx_music?: string;
  on_screen_text?: string;
  product_or_process_window?: ProductOrProcessWindow;
  rtb_supers?: string[];
}

export interface Story {
  // Old format (make optional)
  id?: string;
  title?: string;
  setting?: string;
  storyline?: string;
  signature_device?: string;

  // New storyboard format
  pillar_id?: string;
  genre?: string; // Common field
  overview?: string;
  logline?: string;
  frames?: Frame[];
  ending_moment?: string;
  tagline?: string;
  tagline_source_line?: string;
  brand_device?: string;
  compliance_notes?: string;

  // Additional field for narrative story text (no frames)
  story?: string;

  // UI state management
  isEditing?: boolean;
  originalStory?: Story;
  versions?: Story[];
  currentVersionIndex?: number; // -1 means current/latest, 0+ is index in versions array
  visuals?: Visuals;
  isGeneratingSketch?: boolean;
  videoUrl?: string;
  isGeneratingVideo?: boolean;
  videoReadyToFetch?: boolean;
  isFetchingVideo?: boolean;
  isUpdating?: boolean; // For new update feature
  isViewingOriginal?: boolean; // For toggling between original and latest
  isTranslating?: boolean; // For translation loading state
  error?: string; // Local error message
}


export interface Visuals {
  sketchImage: string;
}


// Updated based on the new questionnaire structure
export interface NewFormData {
  customerID?: string;
  salesperson: string;
  // Section 1
  brandName: string;
  adBrand: string;
  productName: string;
  productType: 'food' | 'non-food' | '';
  productPackForm: string;
  productPackFormOther: string;
  brandSpecial: string;

  // Origin & Heritage
  foundedYear: string;
  founder: string;
  brandRegions: string;
  notable: {
    Look: string;
    Feel: string;
    Smell: string;
    Taste: string;
  };
  uniqueProcesses: string;
  uniqueIngredients: string;
  uniqueOther: string;
  consumerProblem: string;

  // Target Customer
  demographics: { // Primary Customer (buyer)
    age: string[];
    gender: string;
    genderOther: string;
  };
  consumerDemographics: { // Primary Consumer (user)
    age: string[];
    gender: string;
    genderOther: string;
    income: string[];
    geography: string[];
  };
  psychographics: string[];

  // Brand Personality & Usage
  brandAsPerson: string;
  usage: string;

  // Benefit & Experience
  functionalBenefits: string;
  competitorBenefitDifference: string;
  consumerExperienceAfter: string;

  // Competition & Pricing
  competitors: string;

  // Desired Perception & Ad Objectives
  desiredImageryTone: string;
  desiredImageryWorld: string;
  desiredImageryAttributes: string[];
  desiredViewOther: string;
  consumerViewPersona: string;
  consumerViewPersonaOther: string;
  adObjectives: string[];
  adObjectiveDetails: { [key: string]: string };
  adFocus: string[];
  adFocusDetails: { [key: string]: string };

  // New field for transcript
  fullTranscript: string;
}

export interface IndustrialFormData {
  customerID?: string;
  salesperson: string;
  productPackForm: string;
  productPackFormOther: string;

  // Section 1
  brandSpecial: string;
  brands: string;
  adBrand: string;
  productName: string;

  // Section 2
  founder: string;
  foundedYear: string;
  brandRegions: string;
  aspect_look: string;
  aspect_feel: string;
  aspect_materials: string;
  aspect_tech: string;
  aspect_skill: string;
  certifications: string;

  // Section 3
  consumerAge: string[];
  consumerGender: string;
  consumerIncome: string[];
  consumerGeography: string[];
  psychographicOrientation: string[];
  consumerProblem: string;
  customerInfluencer: string;
  showInfluencer: string;
  customerInfluencerType: 'freelancer' | 'enterprise' | '';

  // Section 4
  usage: string;

  // Section 5
  benefits: string;
  competitorBenefitDifference: string;
  consumerExperienceAfter: string;

  // Section 6
  competitors: string;

  // Section 7
  desiredImageryTone: string;
  desiredImageryWorld: string;
  desiredImageryAttributes: string[];
  brandAsPerson: string;
  brandAsPersonOther: string;
  adObjectives: string[];
  adObjectiveDetails: { [key: string]: string };
  adFocus: string[];
  adFocusDetails: { [key: string]: string };

  // Section 8
  packagingDetails: string;
  productAppearance: string;
  fullTranscript: string;
}

export interface ApparelFormData {
  customerID?: string;
  salesperson: string;

  // Section 1: Product Showcase
  brandPhilosophy: string;
  brands: string;
  adBrand: string;
  productName: string;
  productPackForm: string;
  productPackFormOther: string;
  brandSpecial: string;

  // Section 2: Origin and Heritage
  founder: string;
  foundedYear: string;
  brandRegions: string;
  notable: {
    style: string;
    fabric: string;
    fit: string;
    craftsmanship: string;
  };
  certifications: string;

  // Section 3: Target Audience
  consumerAge: string[];
  consumerGender: string;
  consumerIncome: string[];
  consumerGeography: string[];
  consumerProblem: string;
  psychographics: string[];
  fashionInfluencers: string;

  // Section 4: Brand Usage
  usage: string;

  // Section 5: Benefit and Experience
  benefits: string;
  benefitStandout: string;
  consumerExperienceAfter: string[];

  // Section 6: Competition
  competitors: string;

  // Section 7: Desired Perception and Ad Objectives
  desiredImageryTone: string;
  desiredImageryWorld: string;
  desiredImageryAttributes: string[];
  brandPersona: string;
  brandPersonaOther: string;
  adObjectives: string[];
  adObjectiveDetails: { [key: string]: string };
  adFocus: string[];
  adFocusDetails: { [key: string]: string };

  fullTranscript: string;
}

export interface TranscribedClip {
  id: string;
  name: string; // This will be the AI-generated summary
  url: string;
  blob: Blob;
  transcript: string;
  transcriptionStatus: 'pending' | 'transcribing' | 'done' | 'failed';
}

export type FormSuggestions = { [key in keyof Omit<NewFormData, 'demographics' | 'psychographics' | 'pricingVsComp' | 'adObjectives' | 'adFocus' | 'notable' | 'consumerDemographics' | 'desiredImageryAttributes'>]?: string } & {
  'notable.Look'?: string;
  'notable.Feel'?: string;
  'notable.Smell'?: string;
  'notable.Taste'?: string;
  'consumerDemographics.age'?: string | string[];
  'consumerDemographics.gender'?: string;
  'consumerDemographics.income'?: string | string[];
  'consumerDemographics.geography'?: string | string[];
  'demographics.age'?: string | string[];
  'demographics.gender'?: string;
  'psychographics'?: string | string[];
  'adObjectives'?: string | string[];
  'adFocus'?: string | string[];
  'desiredImageryTone'?: string;
  'desiredImageryWorld'?: string;
  'consumerViewPersona'?: string;
};

export type IndustrialFormSuggestions = {
  [key in keyof Omit<IndustrialFormData,
    'consumerAge' |
    'consumerGender' |
    'consumerIncome' |
    'consumerGeography' |
    'psychographicOrientation' |
    'customerInfluencerType' |
    'desiredImageryAttributes' |
    'adObjectives' |
    'adFocus' |
    'adObjectiveDetails' |
    'adFocusDetails'
  >]?: string
} & {
  'consumerAge'?: string | string[];
  'consumerGender'?: string;
  'consumerIncome'?: string | string[];
  'consumerGeography'?: string | string[];
  'psychographicOrientation'?: string | string[];
  'customerInfluencerType'?: string;
  'adObjectives'?: string | string[];
  'adFocus'?: string | string[];
  'desiredImageryTone'?: string;
  'desiredImageryWorld'?: string;
  'brandAsPerson'?: string;
  'desiredImageryAttributes'?: string | string[];
  'adObjectiveDetails'?: { [key: string]: string };
  'adFocusDetails'?: { [key: string]: string };
};

export type ApparelFormSuggestions = {
  [key in keyof Omit<ApparelFormData,
    'consumerAge' |
    'consumerIncome' |
    'consumerGeography' |
    'psychographics' |
    'adObjectives' |
    'adFocus' |
    'adObjectiveDetails' |
    'adFocusDetails' |
    'notable'
  >]?: string
} & {
  'consumerAge'?: string | string[];
  'consumerIncome'?: string | string[];
  'consumerGeography'?: string | string[];
  'psychographics'?: string | string[];
  'adObjectives'?: string | string[];
  'adFocus'?: string | string[];
  'adObjectiveDetails'?: { [key: string]: string };
  'adFocusDetails'?: { [key: string]: string };
  'notable.style'?: string;
  'notable.fabric'?: string;
  'notable.fit'?: string;
  'notable.craftsmanship'?: string;
};


export interface UploadedImage {
  fileName: string;
  mimeType: string;
  data: string; // base64 string
}

export interface AudioNote {
  fileName: string;
  mimeType: string;
  data: string; // base64 string
}

export enum AdFramework {
  CBBE = 'cbbe',
  JTBD = 'jtbd',
}

export interface Suggestion {
  id: number;
  text: string;
  status: 'pending' | 'accepted' | 'ignored';
}

export interface BrandDescriptionResponse {
  brand: string;
  positioning: string | {
    [key: string]: string;
    english_positioning: string;
  };
  engine_assessment: {
    [key: string]: string;
  } | string;
}

export interface PastSubmission {
  executionId: string;
  sessionId: string;
  brandName: string;
  snippet: string;
  timestamp: string;
  salesperson?: string;
  region?: string;
  category?: 'fmcg' | 'industrial' | 'apparels';
  formData?: NewFormData | IndustrialFormData | ApparelFormData;
  brandDescriptionResponse?: BrandDescriptionResponse | null;
}
