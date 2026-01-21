/**
 * GENERAL TOOLS & HELPERS
 * 
 * WHAT THIS FILE DOES:
 * - A collection of "Calculators" and "Translators" used throughout the app.
 * - Cleans up messy data so the AI can understand it.
 * - Tells the app how to turn many small pieces of information into a single clean package.
 * - Figures out if a product is a food item or an industrial tool based on what was typed.
 */

import { NewFormData, Language, UploadedImage, IndustrialFormData, ApparelFormData } from './types.ts';
import { psychographicOptions } from './data/psychographics.ts';
import { apparelPsychographicOptions } from './data/apparelPsychographics.ts';
import { formTranslations, industrialFormTranslations, apparelFormTranslations } from './data/translations.ts';

/**
 * Returns the initial empty state for the form data.
 */
export const getInitialFormData = (): NewFormData => ({
    customerID: "",
    salesperson: "",
    brandName: "",
    adBrand: "",
    productName: "",
    productType: "",
    productPackForm: "",
    productPackFormOther: "",
    brandSpecial: "",
    foundedYear: "",
    founder: "",
    brandRegions: "",
    notable: { Look: "", Feel: "", Smell: "", Taste: "" },
    uniqueProcesses: "",
    uniqueIngredients: "",
    uniqueOther: "",
    consumerProblem: "",
    demographics: { age: [], gender: "", genderOther: "" },
    consumerDemographics: { age: [], gender: "", genderOther: "", income: [], geography: [] },
    psychographics: [],
    brandAsPerson: "",
    usage: "",
    functionalBenefits: "",
    competitorBenefitDifference: "",
    consumerExperienceAfter: "",
    competitors: "",
    desiredImageryTone: "",
    desiredImageryWorld: "",
    desiredImageryAttributes: [],
    desiredViewOther: "",
    consumerViewPersona: "",
    consumerViewPersonaOther: "",
    adObjectives: [],
    adObjectiveDetails: {},
    adFocus: [],
    adFocusDetails: {},
    fullTranscript: "",
});

export const getInitialIndustrialFormData = (): IndustrialFormData => ({
    customerID: "",
    salesperson: "",
    productPackForm: "",
    productPackFormOther: "",
    brandSpecial: "",
    brands: "",
    adBrand: "",
    productName: "",
    founder: "",
    foundedYear: "",
    brandRegions: "",
    aspect_look: "",
    aspect_feel: "",
    aspect_materials: "",
    aspect_tech: "",
    aspect_skill: "",
    certifications: "",
    consumerAge: [],
    consumerGender: "",
    consumerIncome: [],
    consumerGeography: [],
    psychographicOrientation: [],
    consumerProblem: "",
    customerInfluencer: "",
    showInfluencer: "",
    customerInfluencerType: "",
    usage: "",
    benefits: "",
    competitorBenefitDifference: "",
    consumerExperienceAfter: "",
    competitors: "",
    desiredImageryTone: "",
    desiredImageryWorld: "",
    desiredImageryAttributes: [],
    brandAsPerson: "",
    brandAsPersonOther: "",
    adObjectives: [],
    adObjectiveDetails: {},
    adFocus: [],
    adFocusDetails: {},
    packagingDetails: "",
    productAppearance: "",
    fullTranscript: "",
});

export const getInitialApparelFormData = (): ApparelFormData => ({
    customerID: "",
    salesperson: "",
    brandPhilosophy: "",
    brands: "",
    adBrand: "",
    productName: "",
    productPackForm: "",
    productPackFormOther: "",
    brandSpecial: "",
    founder: "",
    foundedYear: "",
    brandRegions: "",
    notable: {
        style: "",
        fabric: "",
        fit: "",
        craftsmanship: "",
    },
    certifications: "",
    consumerAge: [],
    consumerGender: "",
    consumerIncome: [],
    consumerGeography: [],
    consumerProblem: "",
    psychographics: [],
    fashionInfluencers: "",
    usage: "",
    benefits: "",
    benefitStandout: "",
    consumerExperienceAfter: [],
    competitors: "",
    desiredImageryTone: "",
    desiredImageryWorld: "",
    desiredImageryAttributes: [],
    brandPersona: "",
    brandPersonaOther: "",
    adObjectives: [],
    adObjectiveDetails: {},
    adFocus: [],
    adFocusDetails: {},
    fullTranscript: "",
});


/**
 * Transforms the raw form data into a more descriptive, human-readable format for the webhook payload.
 */
export const transformDataForWebhook = (data: NewFormData, lang: Language, packImages: UploadedImage[], category: 'fmcg', isImageBased: boolean = false) => {
    const psychographicMap = new Map(psychographicOptions.map(p => [p.id, p.title]));

    const getTextFromKey = (options: Record<string, any>, key: string) => {
        if (!key) return '';
        return options[key]?.[lang] || options[key]?.en || key;
    };

    const getOtherValue = (key: string | string[], otherValue: string) => {
        const checkKey = Array.isArray(key) ? 'Other' : key;
        return (Array.isArray(key) ? key.includes('Other') : key === 'Other') && otherValue ? `: ${otherValue}` : '';
    }

    const adObjectives = parseArrayOrCsv(data.adObjectives).map(key => {
        const objectiveText = getTextFromKey(formTranslations.section7.q7_4.options, key);
        const detail = data.adObjectiveDetails[key];
        return detail ? `${objectiveText}: ${detail}` : objectiveText;
    });

    const adFocus = parseArrayOrCsv(data.adFocus).map(key => {
        const focusText = getTextFromKey(formTranslations.section7.q7_5.options, key);
        const detail = data.adFocusDetails[key];
        return detail ? `${focusText}: ${detail}` : focusText;
    });

    const desiredImageryAttributes = parseArrayOrCsv(data.desiredImageryAttributes).map(key => {
        const text = getTextFromKey(formTranslations.section7.q7_1.options_attributes, key);
        const otherDetail = getOtherValue(key, data.desiredViewOther || '');
        return `${text}${otherDetail}`;
    });

    // If Image Only Mode is ON, we only send essential fields and images
    if (isImageBased) {
        return {
            language: lang,
            category: category,
            "Salesperson": data.salesperson,
            "Customer ID": data.customerID,
            "Product Pack Form": `${getTextFromKey(formTranslations.section1.q1_4.packForm.options, data.productPackForm)}${getOtherValue(data.productPackForm, data.productPackFormOther)}`,
            "Pack Images": packImages.map(img => ({ fileName: img.fileName, mimeType: img.mimeType, data: img.data.split(',')[1] })),
        };
    }

    const transformedPayload = {
        "Salesperson": data.salesperson,
        "Customer ID": data.customerID,
        "Brand Name": data.brandName,
        "Ad Brand": data.adBrand,
        "Product to Showcase": data.productName,
        "Product Type": data.productType,
        "Product Pack Form": `${getTextFromKey(formTranslations.section1.q1_4.packForm.options, data.productPackForm)}${getOtherValue(data.productPackForm, data.productPackFormOther)}`,
        "Pack Images": packImages.map(img => ({ fileName: img.fileName, mimeType: img.mimeType, data: img.data.split(',')[1] })),
        "Brand's Special Qualities": data.brandSpecial,
        // Flattened "Origin & Heritage"
        "Founded": `${data.founder}, ${data.foundedYear}`,
        "Primary Regions": data.brandRegions,
        "Notable Look/Shape": data.notable.Look,
        "Notable Feel/Texture": data.notable.Feel,
        "Notable Smell/Aroma": data.notable.Smell,
        "Notable Taste": data.notable.Taste,
        "Unique Processes": data.uniqueProcesses,
        "Unique Ingredients": data.uniqueIngredients,
        "Certifications / Validations": data.uniqueOther,
        "Consumer Problem / Issue": data.consumerProblem,
        // Flattened "Target Audience"
        "Consumer - Age": parseArrayOrCsv(data.consumerDemographics.age).map(ageKey => getTextFromKey(formTranslations.section3.consumerAgeOptions, ageKey)).join(', '),
        "Consumer - Gender": `${getTextFromKey(formTranslations.section3.genderOptions, data.consumerDemographics.gender)}${getOtherValue(data.consumerDemographics.gender, data.consumerDemographics.genderOther)}`,
        "Consumer - Income": parseArrayOrCsv(data.consumerDemographics.income).map(key => getTextFromKey(formTranslations.section3.incomeOptions, key)).join(', '),
        "Consumer - Geography": parseArrayOrCsv(data.consumerDemographics.geography).map(key => getTextFromKey(formTranslations.section3.geoOptions, key)).join(', '),
        "Customer - Age": parseArrayOrCsv(data.demographics.age).map(ageKey => getTextFromKey(formTranslations.section3.customerAgeOptions, ageKey)).join(', '),
        "Customer - Gender": `${getTextFromKey(formTranslations.section3.genderOptions, data.demographics.gender)}${getOtherValue(data.demographics.gender, data.demographics.genderOther)}`,
        "Lifestyle & Beliefs": parseArrayOrCsv(data.psychographics).map(p => psychographicMap.get(p) || p),
        // Flattened "Brand Usage"
        "Consumer Usage (When & How)": data.usage,
        // Flattened "Benefit & Experience"
        "Benefits Offered": data.functionalBenefits,
        "Unique Benefits vs Competitors": data.competitorBenefitDifference,
        "Consumer Experience After Use": data.consumerExperienceAfter,
        // Flattened "Competition"
        "Primary Competitors": parseArrayOrCsv(data.competitors),
        // Flattened "Desired Perception & Ad Objectives"
        "Desired Brand Tone": getTextFromKey(formTranslations.section7.q7_1.options_tone, data.desiredImageryTone),
        "Desired Brand World": getTextFromKey(formTranslations.section7.q7_1.options_world, data.desiredImageryWorld),
        "Desired Brand Attributes": desiredImageryAttributes,
        "Consumer's View of Brand Persona": `${getTextFromKey(formTranslations.section7.q7_2.options, data.consumerViewPersona)}${getOtherValue(data.consumerViewPersona, data.consumerViewPersonaOther)}`,
        "Ad Objectives": adObjectives,
        "Ad Focus (in order of priority)": adFocus,
        "Session Transcript": data.fullTranscript,
    };

    return {
        language: lang,
        category: category,
        ...transformedPayload
    };
};

export const transformIndustrialDataForWebhook = (data: IndustrialFormData, lang: Language, packImages: UploadedImage[], category: 'industrial', isImageBased: boolean = false) => {
    const getTextFromKey = (options: Record<string, any>, key: string) => {
        if (!key) return '';
        return options[key]?.[lang] || options[key]?.en || key;
    };

    const getOtherValue = (key: string, otherValue: string) => {
        return key === 'other' && otherValue ? `: ${otherValue}` : '';
    }

    const adObjectives = parseArrayOrCsv(data.adObjectives).map(key => {
        const objectiveText = getTextFromKey(industrialFormTranslations.section7.q7_3.options, key);
        const detail = data.adObjectiveDetails[key];
        return detail ? `${objectiveText}: ${detail}` : objectiveText;
    });

    const adFocus = parseArrayOrCsv(data.adFocus).map(key => {
        const focusText = getTextFromKey(industrialFormTranslations.section7.q7_4.options, key);
        const detail = data.adFocusDetails[key];
        return detail ? `${focusText}: ${detail}` : focusText;
    });

    const desiredImageryAttributes = parseArrayOrCsv(data.desiredImageryAttributes).map(key => {
        return getTextFromKey(formTranslations.section7.q7_1.options_attributes, key);
    });

    // If Image Only Mode is ON, we only send essential fields and images
    if (isImageBased) {
        return {
            language: lang,
            category: category,
            "Salesperson": data.salesperson,
            "Customer ID": data.customerID,
            "Product Pack Form": `${getTextFromKey(formTranslations.section1.q1_4.packForm.options, data.productPackForm)}${getOtherValue(data.productPackForm, data.productPackFormOther)}`,
            "Pack Images": packImages.map(img => ({ fileName: img.fileName, mimeType: img.mimeType, data: img.data.split(',')[1] })),
        };
    }

    const transformedPayload = {
        "Salesperson": data.salesperson,
        "Customer ID": data.customerID,
        "Brand Name": data.adBrand,
        "Ad Brand": data.adBrand,
        "Products/Brands Offered": data.brands,
        "Product to Showcase": data.productName,
        "Product Pack Form": `${getTextFromKey(formTranslations.section1.q1_4.packForm.options, data.productPackForm)}${getOtherValue(data.productPackForm, data.productPackFormOther)}`,
        "Pack Images": packImages.map(img => ({ fileName: img.fileName, mimeType: img.mimeType, data: img.data.split(',')[1] })),
        "Desired Brand Attributes": desiredImageryAttributes,
        "Brand's Special Qualities": data.brandSpecial,
        // Flattened "Origin & Heritage"
        "Founded": `${data.founder}, ${data.foundedYear}`,
        "Primary Regions": data.brandRegions,
        "Look / Design / Finish": data.aspect_look,
        "Feel / Texture": data.aspect_feel,
        "Unique Raw Materials": data.aspect_materials,
        "Technology / Machinery / Manufacturing Process / Techniques": data.aspect_tech,
        "Team Skill Expertise": data.aspect_skill,
        "Certifications / Validations": data.certifications,
        // Flattened "Target Audience"
        "Consumer - Age": parseArrayOrCsv(data.consumerAge).map(key => getTextFromKey(industrialFormTranslations.section3.ageOptions, key)).join(', '),
        "Consumer - Gender": getTextFromKey(industrialFormTranslations.section3.genderOptions, data.consumerGender),
        "Consumer - Income": parseArrayOrCsv(data.consumerIncome).map(key => getTextFromKey(industrialFormTranslations.section3.incomeOptions, key)).join(', '),
        "Consumer - Geography": parseArrayOrCsv(data.consumerGeography).map(key => getTextFromKey(industrialFormTranslations.section3.geoOptions, key)).join(', '),
        "Typical Household Type": parseArrayOrCsv(data.psychographicOrientation).map(key => getTextFromKey(industrialFormTranslations.section3.psychographicOptions, key)).join(', '),
        "Consumer Problem": data.consumerProblem,
        "Primary Customer / Influencer": data.customerInfluencer,
        "Show Influencer in Ad?": data.showInfluencer,
        "Influencer Type": data.showInfluencer === 'yes' ? getTextFromKey(industrialFormTranslations.section3.influencerTypeOptions, data.customerInfluencerType) : "",
        // Flattened "Brand Usage"
        "Consumer Usage (When & How)": data.usage,
        // Flattened "Benefit & Experience"
        "Benefits Offered": data.benefits,
        "Unique Benefits vs Competitors": data.competitorBenefitDifference,
        "Consumer Experience After Use": data.consumerExperienceAfter,
        // Flattened "Competition"
        "Primary Competitors": parseArrayOrCsv(data.competitors),
        // Flattened "Desired Perception & Ad Objectives"
        "Desired Brand Tone": getTextFromKey(industrialFormTranslations.section7.q7_1.options_tone, data.desiredImageryTone),
        "Desired Brand World": getTextFromKey(industrialFormTranslations.section7.q7_1.options_world, data.desiredImageryWorld),
        "Consumer's View of Brand Persona": `${getTextFromKey(industrialFormTranslations.section7.q7_2.options, data.brandAsPerson)}${getOtherValue(data.brandAsPerson, data.brandAsPersonOther)}`,
        "Ad Objectives": adObjectives,
        "Ad Focus (in order of priority)": adFocus,
        // Flattened "Product Representation & Packaging"
        "Product Appearance Preference": data.productAppearance,
        "Session Transcript": data.fullTranscript,
    };

    return {
        language: lang,
        category: category,
        ...transformedPayload
    };
};

export const transformApparelDataForWebhook = (data: ApparelFormData, lang: Language, packImages: UploadedImage[], category: 'apparels', isImageBased: boolean = false) => {
    const getTextFromKey = (options: Record<string, any>, key: string) => {
        if (!key) return '';
        return options[key]?.[lang] || options[key]?.en || key;
    };

    const getOtherValue = (key: string, otherValue: string) => {
        return (key === 'other' || key === 'Other') && otherValue ? `: ${otherValue}` : '';
    }

    const adObjectives = parseArrayOrCsv(data.adObjectives).map(key => {
        const objectiveText = getTextFromKey(apparelFormTranslations.section7.q7_3.options, key);
        const detail = data.adObjectiveDetails[key];
        return detail ? `${objectiveText}: ${detail}` : objectiveText;
    });

    const adFocus = parseArrayOrCsv(data.adFocus).map(key => {
        const focusText = getTextFromKey(apparelFormTranslations.section7.q7_4.options, key);
        const detail = data.adFocusDetails[key];
        return detail ? `${focusText}: ${detail}` : focusText;
    });

    const desiredImageryAttributes = parseArrayOrCsv(data.desiredImageryAttributes).map(key => {
        return getTextFromKey(formTranslations.section7.q7_1.options_attributes, key);
    });

    // If Image Only Mode is ON, we only send essential fields and images
    if (isImageBased) {
        return {
            language: lang,
            category: category,
            "Salesperson": data.salesperson,
            "Customer ID": data.customerID,
            "Product Pack Form": `${getTextFromKey(formTranslations.section1.q1_4.packForm.options, data.productPackForm)}${getOtherValue(data.productPackForm, data.productPackFormOther)}`,
            "Pack Images": packImages.map(img => ({ fileName: img.fileName, mimeType: img.mimeType, data: img.data.split(',')[1] })),
        };
    }

    const transformedPayload = {
        "Salesperson": data.salesperson,
        "Customer ID": data.customerID,
        "Brand Name": data.adBrand,
        "Ad Brand": data.adBrand,
        "Product to Showcase": data.productName,
        "Fashion Philosophy": data.brandPhilosophy,
        "Product Pack Form": `${getTextFromKey(formTranslations.section1.q1_4.packForm.options, data.productPackForm)}${getOtherValue(data.productPackForm, data.productPackFormOther)}`,
        "Pack Images": packImages.map(img => ({ fileName: img.fileName, mimeType: img.mimeType, data: img.data.split(',')[1] })),
        "Brand's Special Qualities": data.brandSpecial,
        // Flattened "Origin & Heritage"
        "Founded": `${data.founder}, ${data.foundedYear}`,
        "Primary Regions": data.brandRegions,
        "Look / Style / Silhouette": data.notable.style,
        "Fabric / Material Quality": data.notable.fabric,
        "Fit / Comfort": data.notable.fit,
        "Craftsmanship / Detailing": data.notable.craftsmanship,
        "Certifications / Ethical Standards": data.certifications,
        // Flattened "Target Audience"
        "Consumer - Age": parseArrayOrCsv(data.consumerAge).map(key => getTextFromKey(apparelFormTranslations.section3.ageOptions, key)).join(', '),
        "Consumer - Gender": getTextFromKey(apparelFormTranslations.section3.genderOptions, data.consumerGender),
        "Consumer - Income": parseArrayOrCsv(data.consumerIncome).map(key => getTextFromKey(apparelFormTranslations.section3.incomeOptions, key)).join(', '),
        "Consumer - Geography": parseArrayOrCsv(data.consumerGeography).map(key => getTextFromKey(apparelFormTranslations.section3.geoOptions, key)).join(', '),
        "Fashion Approach": parseArrayOrCsv(data.psychographics).map(key => getTextFromKey(apparelFormTranslations.section3.psychographicOptions, key)).join(', '),
        "Consumer Problem / Aspiration": data.consumerProblem,
        "Fashion Influencers": data.fashionInfluencers,
        // Flattened "Brand Usage"
        "Consumer Usage (When & Where)": data.usage,
        // Flattened "Benefit & Experience"
        "Benefits Offered": data.benefits,
        "Benefit Standout": data.benefitStandout,
        "Consumer Experience After Use": parseArrayOrCsv(data.consumerExperienceAfter).map(key => getTextFromKey(apparelFormTranslations.section5.q5_3.options, key)).join(', '),
        // Flattened "Competition"
        "Primary Competitors": parseArrayOrCsv(data.competitors),
        // Flattened "Desired Perception & Ad Objectives"
        "Desired Brand Tone": getTextFromKey(apparelFormTranslations.section7.q7_1.options_tone, data.desiredImageryTone),
        "Desired Brand World": getTextFromKey(apparelFormTranslations.section7.q7_1.options_world, data.desiredImageryWorld),
        "Desired Brand Attributes": desiredImageryAttributes,
        "Consumer's View of Brand Persona": `${getTextFromKey(apparelFormTranslations.section7.q7_2.options, data.brandPersona)}${getOtherValue(data.brandPersona, data.brandPersonaOther)}`,
        "Ad Objectives": adObjectives,
        "Ad Focus (in order of priority)": adFocus,
        "Session Transcript": data.fullTranscript,
    };

    return {
        language: lang,
        category: category,
        ...transformedPayload
    };
};

/**
 * Maps the raw, flat data from a webhook response to the nested NewFormData structure.
 */
/**
 * Helper to parse array fields that might be JSON arrays or CSV strings.
 */
export const parseArrayOrCsv = (value: any): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value.map(String).filter(Boolean);
    if (typeof value === 'string') {
        const trimmed = value.trim();
        // Handle JSON array
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
            try {
                const parsed = JSON.parse(trimmed);
                if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
            } catch (e) {
                // Fallback to CSV/Newline if JSON parse fails
            }
        }
        // Split by either comma or newline
        return trimmed.split(/[,\n]/).map(s => s.trim()).filter(Boolean);
    }
    return [String(value)];
};

export const inferCategory = (data: any): 'fmcg' | 'industrial' | 'apparels' => {
    // Check for explicit category field first
    if (data.category === 'industrial' || data.Category === 'industrial') return 'industrial';
    if (data.category === 'fmcg' || data.Category === 'fmcg') return 'fmcg';
    if (data.category === 'apparels' || data.Category === 'apparels') return 'apparels';

    // Industrial unique indicators
    if (data['Typical Household Type'] || data['Show Influencer in Ad?'] || data['Primary Customer / Influencer'] || data['Products/Brands Offered']) return 'industrial';

    // Apparels unique indicators
    if (data['Fashion Approach'] || data['Fashion Influencers'] || data['Fabric / Material Quality'] || data['Fashion Philosophy']) return 'apparels';

    // FMCG unique indicators
    if (data['Notable Taste'] || data['Notable Smell/Aroma'] || data['Notable Look/Shape'] || data['Notable Feel/Texture']) return 'fmcg';

    // Default fallback
    return 'fmcg';
};

export const mapRawDataToIndustrialFormData = (raw: any): IndustrialFormData => {
    const formData = getInitialIndustrialFormData();
    // Handle both array response (first item) and direct object
    const data = Array.isArray(raw) ? raw[0] : raw;
    if (!data) return formData;

    const createReverseMap = (options: Record<string, any>) => {
        const map = new Map<string, string>();
        Object.entries(options).forEach(([key, labels]) => {
            if (typeof labels === 'object' && labels !== null) {
                Object.values(labels).forEach(label => {
                    if (typeof label === 'string') map.set(label.trim(), key);
                });
            } else if (typeof labels === 'string') {
                map.set(labels.trim(), key);
            }
        });
        return map;
    };

    const splitOther = (val: string, reverseMap: Map<string, string>) => {
        if (!val) return { key: '', other: '' };
        const parts = val.split(':');
        const label = parts[0].trim();
        const key = reverseMap.get(label);
        if (key === 'Other' || key === 'other') {
            return { key, other: parts.slice(1).join(':').trim() };
        }
        return { key: key || val, other: '' };
    };

    const genderReverseMap = createReverseMap(industrialFormTranslations.section3.genderOptions);
    const ageReverseMap = createReverseMap(industrialFormTranslations.section3.ageOptions);
    const incomeReverseMap = createReverseMap(industrialFormTranslations.section3.incomeOptions);
    const geoReverseMap = createReverseMap(industrialFormTranslations.section3.geoOptions);
    const influencerTypeReverseMap = createReverseMap(industrialFormTranslations.section3.influencerTypeOptions);
    const toneReverseMap = createReverseMap(industrialFormTranslations.section7.q7_1.options_tone);
    const worldReverseMap = createReverseMap(industrialFormTranslations.section7.q7_1.options_world);
    const brandAsPersonReverseMap = createReverseMap(industrialFormTranslations.section7.q7_2.options);
    const adObjectivesReverseMap = createReverseMap(industrialFormTranslations.section7.q7_3.options);
    const adFocusReverseMap = createReverseMap(industrialFormTranslations.section7.q7_4.options);
    const psychographicReverseMap = createReverseMap(industrialFormTranslations.section3.psychographicOptions);

    formData.fullTranscript = data["Transcript"] || data["Session Transcript"] || '';
    formData.salesperson = data["Salesperson"] || '';
    formData.customerID = data["Customer ID"] || '';
    formData.brandSpecial = data["Brand's Special Qualities"] || '';
    formData.brands = data["Brands/Products Offered"] || data["Products/Brands Offered"] || '';
    formData.adBrand = data["Ad Brand"] || data["Brand Name"] || '';
    formData.usage = data["Consumer Usage (When & How)"] || '';
    formData.productName = data["Product to Showcase"] || '';
    formData.productAppearance = data["Product Appearance Preference"] || data["Product Appearance In Ad"] || '';

    const [founder, year] = (data["Founded"] || ',').split(',').map((s: string) => s.trim());
    formData.founder = founder || '';
    formData.foundedYear = year || '';
    formData.brandRegions = parseArrayOrCsv(data["Primary Regions"]).join(', ') || '';

    formData.aspect_look = data["Notable Look/Shape"] || data["Look / Design / Finish"] || data["Look/Design/Finish"] || '';
    formData.aspect_materials = data["Unique Ingredients"] || data["Unique Raw Materials"] || '';
    formData.aspect_tech = data["Unique Processes"] || data["Technology / Machinery / Manufacturing Process / Techniques"] || data["Unique Techniques"] || '';
    formData.aspect_skill = data["Skill/Talent"] || data["Team Skill Expertise"] || '';

    formData.certifications = data["Certifications / Validations"] || data["Certifications / External Validation"] || '';

    formData.consumerAge = parseArrayOrCsv(data["Consumer - Age"] || data["Customer - Age"]).map(v => ageReverseMap.get(v.trim()) || v);
    formData.consumerGender = genderReverseMap.get(data["Consumer - Gender"] || data["Customer - Gender"]) || data["Consumer - Gender"] || '';
    formData.consumerIncome = parseArrayOrCsv(data["Consumer - Income"] || data["Customer - Income"]).map(v => incomeReverseMap.get(v.trim()) || v);
    formData.consumerGeography = parseArrayOrCsv(data["Consumer - Geography"] || data["Customer - Geography"]).map(v => geoReverseMap.get(v.trim()) || v);

    formData.psychographicOrientation = parseArrayOrCsv(data["Psychographics"] || data["Lifestyle & Beliefs"] || data["Typical Household Type"] || data["Household"]).map(v => psychographicReverseMap.get(v.trim()) || v);

    formData.consumerProblem = data["Problem"] || data["Consumer Problem / Issue"] || '';
    formData.customerInfluencer = data["Primary Customer / Influencer"] || '';

    if (data["Influencer Type"]) {
        formData.showInfluencer = 'yes';
        const { key, other } = splitOther(data["Influencer Type"], influencerTypeReverseMap);
        formData.customerInfluencerType = key as any;
    }

    formData.benefits = parseArrayOrCsv(data["Benefits Offered"] || data["Benefits"]).join(', ') || '';
    formData.competitorBenefitDifference = data["Unique Benefits vs Competitors"] || '';
    formData.consumerExperienceAfter = parseArrayOrCsv(data["Consumer Experience After Use"]).join(', ') || '';

    formData.competitors = parseArrayOrCsv(data["Primary Competitors"] || data["Competitors"]).join('\n');

    if (data["Desired Brand Tone"]) formData.desiredImageryTone = toneReverseMap.get(data["Desired Brand Tone"].trim()) || data["Desired Brand Tone"];
    if (data["Desired Brand World"]) formData.desiredImageryWorld = worldReverseMap.get(data["Desired Brand World"].trim()) || data["Desired Brand World"];

    // Fallback for old combined key
    if (!formData.desiredImageryTone || !formData.desiredImageryWorld) {
        const imageryRaw = parseArrayOrCsv(data["Desired Brand Imagery"]);
        if (!formData.desiredImageryTone) {
            const toneItem = imageryRaw.find(v => toneReverseMap.has(v.trim()));
            if (toneItem) formData.desiredImageryTone = toneReverseMap.get(toneItem.trim()) || '';
        }
        if (!formData.desiredImageryWorld) {
            const worldItem = imageryRaw.find(v => worldReverseMap.has(v.trim()));
            if (worldItem) formData.desiredImageryWorld = worldReverseMap.get(worldItem.trim()) || '';
        }
    }

    if (data["Consumer's View of Brand Persona"]) {
        const { key, other } = splitOther(data["Consumer's View of Brand Persona"], brandAsPersonReverseMap);
        formData.brandAsPerson = key;
        formData.brandAsPersonOther = other;
    }

    const adObjRaw = parseArrayOrCsv(data["Ad Objectives"]);
    const newAdObjectives: string[] = [];
    const newAdObjectiveDetails: { [key: string]: string } = {};
    adObjRaw.forEach(item => {
        const parts = item.split(':');
        const key = adObjectivesReverseMap.get(parts[0].trim());
        if (key) {
            newAdObjectives.push(key);
            if (parts.length > 1) newAdObjectiveDetails[key] = parts.slice(1).join(':').trim();
        }
    });
    formData.adObjectives = newAdObjectives;
    formData.adObjectiveDetails = newAdObjectiveDetails;

    const imageryAttributesReverseMap = createReverseMap(formTranslations.section7.q7_1.options_attributes);
    const attributesRaw = parseArrayOrCsv(data["Desired Brand Attributes"]);
    attributesRaw.forEach(val => {
        const { key } = splitOther(val, imageryAttributesReverseMap);
        if (key) {
            formData.desiredImageryAttributes.push(key);
        }
    });

    const adFocusRaw = parseArrayOrCsv(data["Ad Focus (in order of priority)"]);
    const newAdFocus: string[] = [];
    const newAdFocusDetails: { [key: string]: string } = {};
    adFocusRaw.forEach(item => {
        const parts = item.split(':');
        const key = adFocusReverseMap.get(parts[0].trim());
        if (key) {
            newAdFocus.push(key);
            if (parts.length > 1) newAdFocusDetails[key] = parts.slice(1).join(':').trim();
        }
    });
    formData.adFocus = newAdFocus;
    formData.adFocusDetails = newAdFocusDetails;

    // Only set showInfluencer if not already set by Influencer Type presence
    if (!formData.showInfluencer || formData.showInfluencer !== 'yes') {
        formData.showInfluencer = data["Show Influencer in Ad?"] || data["Show Influencer In Ad"] || data["showInfluencer"] || 'no';
    }

    const packFormRaw = data["Product Pack Form"] || '';
    const packFormReverseMap = createReverseMap(formTranslations.section1.q1_4.packForm.options);
    const { key: pfKey, other: pfOther } = splitOther(packFormRaw, packFormReverseMap);
    formData.productPackForm = pfKey;
    formData.productPackFormOther = pfOther;

    return formData;
};

/**
 * Maps the raw, flat data from a webhook response to the nested NewFormData structure.
 */
export const mapRawDataToFormData = (raw: any): NewFormData => {
    const formData = getInitialFormData();

    // Handle both array response (first item) and direct object
    const data = Array.isArray(raw) ? raw[0] : raw;
    if (!data) return formData;

    const createReverseMap = (options: Record<string, any>) => {
        const map = new Map<string, string>();
        Object.entries(options).forEach(([key, labels]) => {
            if (typeof labels === 'object' && labels !== null) {
                Object.values(labels).forEach(label => {
                    if (typeof label === 'string') map.set(label.trim(), key);
                });
            } else if (typeof labels === 'string') {
                map.set(labels.trim(), key);
            }
        });
        return map;
    };

    const splitOther = (val: string, reverseMap: Map<string, string>) => {
        if (!val) return { key: '', other: '' };
        const parts = val.split(':');
        const label = parts[0].trim();
        const key = reverseMap.get(label);
        if (key === 'Other' || key === 'other') {
            return { key, other: parts.slice(1).join(':').trim() };
        }
        return { key: key || val, other: '' };
    };

    const genderReverseMap = createReverseMap(formTranslations.section3.genderOptions);
    const consumerAgeReverseMap = createReverseMap(formTranslations.section3.consumerAgeOptions);
    const customerAgeReverseMap = createReverseMap(formTranslations.section3.customerAgeOptions);
    const incomeReverseMap = createReverseMap(formTranslations.section3.incomeOptions);
    const geoReverseMap = createReverseMap(formTranslations.section3.geoOptions);
    const consumerViewPersonaReverseMap = createReverseMap(formTranslations.section7.q7_2.options);
    const adObjectivesReverseMap = createReverseMap(formTranslations.section7.q7_4.options);
    const adFocusReverseMap = createReverseMap(formTranslations.section7.q7_5.options);
    const psychographicTitleToIdMap = new Map(psychographicOptions.map(p => [p.title.trim(), p.id]));

    formData.salesperson = data["Salesperson"] || '';
    formData.customerID = data["Customer ID"] || '';
    formData.brandName = data["Brand Name"] || '';
    formData.adBrand = data["Ad Brand"] || '';
    formData.productName = data["Product to Showcase"] || '';
    formData.productType = data["Product Type"] || '';
    formData.brandSpecial = data["Brand's Special Qualities"] || '';
    formData.brandRegions = data["Primary Regions"] || '';
    formData.notable.Look = data["Notable Look/Shape"] || '';
    formData.notable.Feel = data["Notable Feel/Texture"] || '';
    formData.notable.Smell = data["Notable Smell/Aroma"] || '';
    formData.notable.Taste = data["Notable Taste"] || '';
    formData.uniqueProcesses = data["Unique Processes"] || data["Unique Techniques"] || '';
    formData.uniqueIngredients = data["Unique Ingredients"] || '';
    formData.uniqueOther = data["Certifications / Validations"] || data["Certifications / External Validation"] || '';
    formData.consumerProblem = data["Consumer Problem / Issue"] || data["Problem"] || '';
    formData.usage = data["Consumer Usage (When & How)"] || '';
    formData.functionalBenefits = data["Benefits Offered"] || '';
    formData.competitorBenefitDifference = data["Unique Benefits vs Competitors"] || '';
    formData.consumerExperienceAfter = data["Consumer Experience After Use"] || '';
    formData.competitors = parseArrayOrCsv(data["Primary Competitors"] || data["Competitors"]).join('\n');
    formData.fullTranscript = data["Session Transcript"] || data["Transcript"] || '';

    const [founder, year] = (data["Founded"] || ',').split(',').map((s: string) => s.trim());
    formData.founder = founder || '';
    formData.foundedYear = year || '';

    formData.demographics.age = parseArrayOrCsv(data["Customer - Age"]).map(v => customerAgeReverseMap.get(v.trim()) || v);
    const { key: cgKey, other: cgOther } = splitOther(data["Customer - Gender"], genderReverseMap);
    formData.demographics.gender = cgKey;
    formData.demographics.genderOther = cgOther;

    formData.consumerDemographics.age = parseArrayOrCsv(data["Consumer - Age"]).map(v => consumerAgeReverseMap.get(v.trim()) || v);
    const { key: cogKey, other: cogOther } = splitOther(data["Consumer - Gender"], genderReverseMap);
    formData.consumerDemographics.gender = cogKey;
    formData.consumerDemographics.genderOther = cogOther;

    formData.consumerDemographics.income = parseArrayOrCsv(data["Consumer - Income"]).map(v => incomeReverseMap.get(v.trim()) || v);
    formData.consumerDemographics.geography = parseArrayOrCsv(data["Consumer - Geography"]).map(v => geoReverseMap.get(v.trim()) || v);

    formData.psychographics = parseArrayOrCsv(data["Psychographics"] || data["Lifestyle & Beliefs"]).map(title => psychographicTitleToIdMap.get(title.trim())).filter((id): id is string => !!id);

    // Reverse map for desired imagery
    const imageryToneReverseMap = createReverseMap(formTranslations.section7.q7_1.options_tone);
    const imageryWorldReverseMap = createReverseMap(formTranslations.section7.q7_1.options_world);
    const imageryAttributesReverseMap = createReverseMap(formTranslations.section7.q7_1.options_attributes);

    // Support new flat keys and old combined key
    if (data["Desired Brand Tone"]) formData.desiredImageryTone = imageryToneReverseMap.get(data["Desired Brand Tone"].trim()) || data["Desired Brand Tone"];
    if (data["Desired Brand World"]) formData.desiredImageryWorld = imageryWorldReverseMap.get(data["Desired Brand World"].trim()) || data["Desired Brand World"];

    const attributesRaw = parseArrayOrCsv(data["Desired Brand Attributes"]);
    attributesRaw.forEach(val => {
        const { key, other } = splitOther(val, imageryAttributesReverseMap);
        if (key) {
            formData.desiredImageryAttributes.push(key);
            if (key === 'Other') formData.desiredViewOther = other;
        }
    });

    // Fallback for old combined key
    if (!formData.desiredImageryTone || !formData.desiredImageryWorld || formData.desiredImageryAttributes.length === 0) {
        const desiredImageryRaw = parseArrayOrCsv(data["Desired Brand Imagery"]);

        desiredImageryRaw.forEach(itemStr => {
            const trimmedItem = itemStr.trim();
            const { key, other } = splitOther(trimmedItem, imageryToneReverseMap);
            if (key && !formData.desiredImageryTone && imageryToneReverseMap.has(trimmedItem)) {
                formData.desiredImageryTone = key;
                return;
            }

            const { key: wKey } = splitOther(trimmedItem, imageryWorldReverseMap);
            if (wKey && !formData.desiredImageryWorld && imageryWorldReverseMap.has(trimmedItem)) {
                formData.desiredImageryWorld = wKey;
                return;
            }

            const { key: aKey, other: aOther } = splitOther(trimmedItem, imageryAttributesReverseMap);
            if (aKey && imageryAttributesReverseMap.has(trimmedItem.split(':')[0].trim())) {
                formData.desiredImageryAttributes.push(aKey);
                if (aKey === 'Other') formData.desiredViewOther = aOther;
                return;
            }
        });
    }

    const { key: cvpKey, other: cvpOther } = splitOther(data["Consumer's View of Brand Persona"] || data["Consumer View Persona:"], consumerViewPersonaReverseMap);
    formData.consumerViewPersona = cvpKey;
    formData.consumerViewPersonaOther = cvpOther;

    const adObjectivesRaw = parseArrayOrCsv(data["Ad Objectives"]);
    const newAdObjectives: string[] = [];
    const newAdObjectiveDetails: { [key: string]: string } = {};
    adObjectivesRaw.forEach((item: string) => {
        const parts = item.split(':');
        const objectiveFullText = parts[0].trim();
        const detail = parts.length > 1 ? parts.slice(1).join(':').trim() : '';

        const objectiveKey = adObjectivesReverseMap.get(objectiveFullText);
        if (objectiveKey) {
            newAdObjectives.push(objectiveKey);
            if (detail) {
                newAdObjectiveDetails[objectiveKey] = detail;
            }
        }
    });
    formData.adObjectives = newAdObjectives;
    formData.adObjectiveDetails = newAdObjectiveDetails;

    const adFocusRaw = parseArrayOrCsv(data["Ad Focus (in order of priority)"]);
    const newAdFocus: string[] = [];
    const newAdFocusDetails: { [key: string]: string } = {};
    adFocusRaw.forEach((item: string) => {
        const parts = item.split(':');
        const objectiveFullText = parts[0].trim();
        const detail = parts.length > 1 ? parts.slice(1).join(':').trim() : '';
        const objectiveKey = adFocusReverseMap.get(objectiveFullText);
        if (objectiveKey) {
            newAdFocus.push(objectiveKey);
            if (detail) {
                newAdFocusDetails[objectiveKey] = detail;
            }
        }
    });
    formData.adFocus = newAdFocus;
    formData.adFocusDetails = newAdFocusDetails;

    const packFormRaw = data["Product Pack Form"] || '';
    const packFormReverseMap = createReverseMap(formTranslations.section1.q1_4.packForm.options);
    const { key: pfKey, other: pfOther } = splitOther(packFormRaw, packFormReverseMap);
    formData.productPackForm = pfKey;
    formData.productPackFormOther = pfOther;

    return formData;
};

/**
 * Robustly extracts the target array from a webhook response. It intelligently searches
 * the data structure for an array whose elements match the expected structure.
 * This handles multiple common wrapper formats.
 * @param data The raw data from the webhook.
 * @returns An array of items, or null if no matching array can be extracted.
 */
export const extractArrayFromWebhookResponse = (data: any): any[] | null => {
    if (!data) return null;

    // Unified helper to navigate nested response structures
    const getOutput = (d: any) => {
        if (!d) return null;
        if (Array.isArray(d) && d.length > 0) {
            let item = d[0];
            if (item && item.response && item.response.body) {
                const body = item.response.body;
                item = Array.isArray(body) && body.length > 0 ? body[0] : body;
            }
            return item?.output;
        }
        return d.output;
    }

    const output = getOutput(data);
    if (output) {
        if (output.stories && Array.isArray(output.stories)) return output.stories;
        if (output.pillars && Array.isArray(output.pillars)) return output.pillars;
        if (output.worlds && Array.isArray(output.worlds)) return output.worlds;
    }

    // Fallback search for other structures
    let finalArray: any[] | null = null;

    const isSubmission = (obj: any) => obj && typeof obj === 'object' && obj.hasOwnProperty('executionID');
    const isPillar = (obj: any) => obj && typeof obj === 'object' && (obj.hasOwnProperty('pillar_id') || obj.hasOwnProperty('name'));
    const isStory = (obj: any) => obj && typeof obj === 'object' && (obj.hasOwnProperty('storyline') || obj.hasOwnProperty('logline'));
    const isWorld = (obj: any) => obj && typeof obj === 'object' && (obj.hasOwnProperty('why_it_fits') || obj.hasOwnProperty('why')) && (obj.hasOwnProperty('title') || obj.hasOwnProperty('label'));

    const findDataArray = (value: any) => {
        if (finalArray) return;

        if (Array.isArray(value) && value.length > 0) {
            if (isSubmission(value[0]) || isPillar(value[0]) || isStory(value[0]) || isWorld(value[0])) {
                finalArray = value;
                return;
            }
        }

        if (typeof value === 'object' && value !== null) {
            if (value.stories && Array.isArray(value.stories)) {
                finalArray = value.stories;
                return;
            }
            if (value.pillars && Array.isArray(value.pillars)) {
                finalArray = value.pillars;
                return;
            }
            if (value.worlds && Array.isArray(value.worlds)) {
                finalArray = value.worlds;
                return;
            }
            for (const key in value) {
                findDataArray(value[key]);
            }
        }
    };

    findDataArray(data);
    return finalArray;
};


export const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            } else {
                reject(new Error("Failed to convert blob to base64."));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const stripHtml = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

export const mapRawDataToApparelFormData = (raw: any): ApparelFormData => {
    const formData = getInitialApparelFormData();
    // Handle both array response (first item) and direct object
    const data = Array.isArray(raw) ? raw[0] : raw;
    if (!data) return formData;

    const createReverseMap = (options: Record<string, any>) => {
        const map = new Map<string, string>();
        Object.entries(options).forEach(([key, labels]) => {
            if (typeof labels === 'object' && labels !== null) {
                Object.values(labels).forEach(label => {
                    if (typeof label === 'string') map.set(label.trim(), key);
                });
            } else if (typeof labels === 'string') {
                map.set(labels.trim(), key);
            }
        });
        return map;
    };

    const splitOther = (val: string, reverseMap: Map<string, string>) => {
        if (!val) return { key: '', other: '' };
        const parts = val.split(':');
        const label = parts[0].trim();
        const key = reverseMap.get(label);
        if (key === 'Other' || key === 'other') {
            return { key, other: parts.slice(1).join(':').trim() };
        }
        return { key: key || val, other: '' };
    };

    const genderReverseMap = createReverseMap(apparelFormTranslations.section3.genderOptions);
    const ageReverseMap = createReverseMap(apparelFormTranslations.section3.ageOptions);
    const incomeReverseMap = createReverseMap(apparelFormTranslations.section3.incomeOptions);
    const geoReverseMap = createReverseMap(apparelFormTranslations.section3.geoOptions);
    const fashionApproachReverseMap = createReverseMap(apparelFormTranslations.section3.psychographicOptions);
    const toneReverseMap = createReverseMap(apparelFormTranslations.section7.q7_1.options_tone);
    const worldReverseMap = createReverseMap(apparelFormTranslations.section7.q7_1.options_world);
    const brandAsPersonReverseMap = createReverseMap(apparelFormTranslations.section7.q7_2.options);
    const adObjectivesReverseMap = createReverseMap(apparelFormTranslations.section7.q7_3.options);
    const adFocusReverseMap = createReverseMap(apparelFormTranslations.section7.q7_4.options);
    const experienceReverseMap = createReverseMap(apparelFormTranslations.section5.q5_3.options);

    formData.fullTranscript = data["Transcript"] || data["Session Transcript"] || '';
    formData.salesperson = data["Salesperson"] || '';
    formData.customerID = data["Customer ID"] || '';
    formData.brandPhilosophy = data["Fashion Philosophy"] || '';
    formData.adBrand = data["Ad Brand"] || data["Brand Name"] || '';
    formData.productName = data["Product to Showcase"] || '';
    formData.brandSpecial = data["Brand's Special Qualities"] || '';
    formData.brandRegions = parseArrayOrCsv(data["Primary Regions"]).join(', ') || '';

    const [founder, year] = (data["Founded"] || ',').split(',').map((s: string) => s.trim());
    formData.founder = founder || '';
    formData.foundedYear = year || '';

    formData.notable.style = data["Look / Style / Silhouette"] || '';
    formData.notable.fabric = data["Fabric / Material Quality"] || '';
    formData.notable.fit = data["Fit / Comfort"] || '';
    formData.notable.craftsmanship = data["Craftsmanship / Detailing"] || '';
    formData.certifications = data["Certifications / Ethical Standards"] || '';

    formData.consumerAge = parseArrayOrCsv(data["Consumer - Age"]).map(v => ageReverseMap.get(v.trim()) || v);
    formData.consumerGender = genderReverseMap.get(data["Consumer - Gender"]) || data["Consumer - Gender"] || '';
    formData.consumerIncome = parseArrayOrCsv(data["Consumer - Income"]).map(v => incomeReverseMap.get(v.trim()) || v);
    formData.consumerGeography = parseArrayOrCsv(data["Consumer - Geography"]).map(v => geoReverseMap.get(v.trim()) || v);
    formData.psychographics = parseArrayOrCsv(data["Fashion Approach"]).map(v => fashionApproachReverseMap.get(v.trim()) || v);

    formData.consumerProblem = data["Problem"] || data["Consumer Problem / Aspiration"] || '';
    formData.fashionInfluencers = data["Fashion Influencers"] || '';
    formData.usage = data["Consumer Usage (When & Where)"] || '';
    formData.benefits = data["Benefits Offered"] || '';
    formData.benefitStandout = data["Benefit Standout"] || '';
    formData.consumerExperienceAfter = parseArrayOrCsv(data["Consumer Experience After Use"]).map(v => experienceReverseMap.get(v.trim()) || v);

    formData.competitors = parseArrayOrCsv(data["Primary Competitors"] || data["Competitors"]).join('\n');

    if (data["Desired Brand Tone"]) formData.desiredImageryTone = toneReverseMap.get(data["Desired Brand Tone"].trim()) || data["Desired Brand Tone"];
    if (data["Desired Brand World"]) formData.desiredImageryWorld = worldReverseMap.get(data["Desired Brand World"].trim()) || data["Desired Brand World"];

    if (data["Consumer's View of Brand Persona"]) {
        const { key, other } = splitOther(data["Consumer's View of Brand Persona"].trim(), brandAsPersonReverseMap);
        formData.brandPersona = key;
        formData.brandPersonaOther = other;
    }

    const adObjRaw = parseArrayOrCsv(data["Ad Objectives"]);
    const newAdObjectives: string[] = [];
    const newAdObjectiveDetails: { [key: string]: string } = {};
    adObjRaw.forEach(item => {
        const parts = item.split(':');
        const key = adObjectivesReverseMap.get(parts[0].trim());
        if (key) {
            newAdObjectives.push(key);
            if (parts.length > 1) newAdObjectiveDetails[key] = parts.slice(1).join(':').trim();
        }
    });
    formData.adObjectives = newAdObjectives;
    formData.adObjectiveDetails = newAdObjectiveDetails;

    const imageryAttributesReverseMap = createReverseMap(formTranslations.section7.q7_1.options_attributes);
    const attributesRaw = parseArrayOrCsv(data["Desired Brand Attributes"]);
    attributesRaw.forEach(val => {
        const { key } = splitOther(val, imageryAttributesReverseMap);
        if (key) {
            formData.desiredImageryAttributes.push(key);
        }
    });

    const adFocusRaw = parseArrayOrCsv(data["Ad Focus (in order of priority)"]);
    const newAdFocus: string[] = [];
    const newAdFocusDetails: { [key: string]: string } = {};
    adFocusRaw.forEach(item => {
        const parts = item.split(':');
        const key = adFocusReverseMap.get(parts[0].trim());
        if (key) {
            newAdFocus.push(key);
            if (parts.length > 1) newAdFocusDetails[key] = parts.slice(1).join(':').trim();
        }
    });
    formData.adFocus = newAdFocus;
    formData.adFocusDetails = newAdFocusDetails;

    const packFormRaw = data["Product Pack Form"] || '';
    const packFormReverseMap = createReverseMap(formTranslations.section1.q1_4.packForm.options);
    const { key: pfKey, other: pfOther } = splitOther(packFormRaw, packFormReverseMap);
    formData.productPackForm = pfKey;
    formData.productPackFormOther = pfOther;

    return formData;
};