/**
 * APPAREL INFORMATION FORM
 * 
 * WHAT THIS FILE DOES:
 * - This is the main questionnaire for Apparel and Fashion brands.
 * - It collects everything from brand philosophy to style details and target audience.
 * - It also includes the voice recording feature for easy data entry.
 */

import React, { useMemo } from 'react';
import { ApparelFormData, UploadedImage, ApparelFormSuggestions, Language, TranscribedClip } from '../types.ts';
import { apparelFormTranslations, formTranslations, translations } from '../data/translations.ts';
import { apparelPsychographicOptions } from '../data/apparelPsychographics.ts';
import ImageUploader from './ImageUploader.tsx';
import AudioTranscriptionManager from './AudioTranscriptionManager.tsx';
import PsychographicGrid from './PsychographicGrid.tsx';
import { Section, Label, TextInput, TextArea, MultiChips, SingleChips, SuggestedInput, TranslatedText, Chip } from './FormElements.tsx';

interface ApparelFormProps {
    form: ApparelFormData;
    update: (path: string | string[], value: any) => void;
    lang: Language;
    isImageBased: boolean;
    packImages: UploadedImage[];
    setPackImages: (images: UploadedImage[]) => void;
    suggestions: ApparelFormSuggestions;
    isAnalyzing: boolean;
    handleAnalyzeTranscript: () => void;
    audioRecorderRef: React.RefObject<{ stopAll: () => void }>;
    clipDuration: number;
    transcribedClips: TranscribedClip[];
    setTranscribedClips: React.Dispatch<React.SetStateAction<TranscribedClip[]>>;
    isSubmitting: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    selectedSalesperson: string;
    onAcceptAllSuggestions?: () => void;
}

const ApparelForm: React.FC<ApparelFormProps> = ({
    form, update, lang, isImageBased, packImages, setPackImages,
    suggestions, isAnalyzing, handleAnalyzeTranscript, audioRecorderRef,
    clipDuration, transcribedClips, setTranscribedClips,
    isSubmitting, onSubmit, onCancel,
    selectedSalesperson, onAcceptAllSuggestions
}) => {

    const handleAdObjectivesChange = (newSelection: string[]) => {
        const oldSelection = form.adObjectives || [];
        const removedKeys = oldSelection.filter(key => !newSelection.includes(key));
        if (removedKeys.length > 0) {
            const newDetails = { ...form.adObjectiveDetails };
            removedKeys.forEach(key => delete newDetails[key]);
            update('adObjectiveDetails', newDetails);
        }
        update('adObjectives', newSelection);
    };

    const handleAdFocusChange = (newSelection: string[]) => {
        const oldSelection = form.adFocus || [];
        const removedKeys = oldSelection.filter(key => !newSelection.includes(key));
        if (removedKeys.length > 0) {
            const newDetails = { ...form.adFocusDetails };
            removedKeys.forEach(key => delete newDetails[key]);
            update('adFocusDetails', newDetails);
        }
        update('adFocus', newSelection);
    };

    const handleSuggestionClick = (path: string, suggestionText: string) => {
        const currentValue = (form as any)[path];
        const newValue = currentValue ? `${currentValue}\n${suggestionText}` : suggestionText;
        update(path, newValue);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-12 pb-24 max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-8 sticky top-0 bg-white/80 backdrop-blur-md z-30 pt-4 px-2 -mx-2">
                <div>
                    <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">
                        <TranslatedText tid="apparelCategory" translations={translations} lang={lang} />
                    </h1>
                    <p className="text-blue-600 font-medium mt-1 inline-flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 opacity-75"></span>
                        {selectedSalesperson || "Salesperson"}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <TranslatedText tid="cancel" translations={translations} lang={lang} />
                    </button>
                    {onAcceptAllSuggestions && (
                        <button
                            type="button"
                            onClick={onAcceptAllSuggestions}
                            className="px-5 py-2.5 bg-blue-50 text-blue-700 text-sm font-bold rounded-xl hover:bg-blue-100 transition-all border border-blue-100 hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Accept All
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-8 py-2.5 text-sm font-extrabold text-white rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center gap-2 ${isSubmitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
                            }`}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                            </>
                        ) : (
                            <TranslatedText tid="submit" translations={translations} lang={lang} />
                        )}
                    </button>
                </div>
            </div>

            <AudioTranscriptionManager
                form={form}
                update={update}
                lang={lang}
                category="apparels"
                isAnalyzing={isAnalyzing}
                onAnalyze={handleAnalyzeTranscript}
                recorderRef={audioRecorderRef}
                clipDuration={clipDuration}
                transcribedClips={transcribedClips}
                setTranscribedClips={setTranscribedClips}
            />

            {/* Section 1: Product Showcase */}
            <Section
                title={apparelFormTranslations.section1.title[lang]}
                indicatorColor="blue"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <SuggestedInput
                        label={apparelFormTranslations.section1.q1_1.text[lang]}
                        value={form.brandPhilosophy}
                        onChange={(val) => update('brandPhilosophy', val)}
                        placeholder={apparelFormTranslations.section1.q1_1.placeholder[lang]}
                        suggestion={suggestions.brandPhilosophy}
                        onAcceptSuggestion={() => update('brandPhilosophy', suggestions.brandPhilosophy)}
                    />
                    <SuggestedInput
                        label={apparelFormTranslations.section1.q1_2.text[lang]}
                        value={form.adBrand}
                        onChange={(val) => update('adBrand', val)}
                        placeholder={apparelFormTranslations.section1.q1_2.placeholder[lang]}
                        suggestion={suggestions.adBrand}
                        onAcceptSuggestion={() => update('adBrand', suggestions.adBrand)}
                    />
                    <SuggestedInput
                        label={apparelFormTranslations.section1.q1_3.text[lang]}
                        value={form.brands}
                        onChange={(val) => update('brands', val)}
                        placeholder={apparelFormTranslations.section1.q1_3.placeholder[lang]}
                        suggestion={suggestions.brands}
                        onAcceptSuggestion={() => update('brands', suggestions.brands)}
                    />
                    <SuggestedInput
                        label={apparelFormTranslations.section1.q1_4.text[lang]}
                        value={form.productName}
                        onChange={(val) => update('productName', val)}
                        placeholder={apparelFormTranslations.section1.q1_4.placeholder[lang]}
                        suggestion={suggestions.productName}
                        onAcceptSuggestion={() => update('productName', suggestions.productName)}
                    />
                </div>

                <div className="mt-8">
                    <Label>{apparelFormTranslations.section1.q1_5.text[lang]}</Label>
                    <SingleChips
                        options={formTranslations.section1.q1_4.packForm.options}
                        selected={form.productPackForm}
                        onSelect={(val) => update('productPackForm', val)}
                        lang={lang}
                        otherValue={form.productPackFormOther}
                        onOtherChange={(val) => update('productPackFormOther', val)}
                    />
                </div>

                <div className="mt-8">
                    <Label>{apparelFormTranslations.section1.packImages.text[lang]}</Label>
                    <p className="text-sm text-gray-500 mb-4">{apparelFormTranslations.section1.packImages.subtext[lang]}</p>
                    <ImageUploader images={packImages} setImages={setPackImages} lang={lang} />
                </div>

                <div className="mt-8">
                    <SuggestedInput
                        label={apparelFormTranslations.section1.q1_6.text[lang]}
                        value={form.brandSpecial}
                        onChange={(val) => update('brandSpecial', val)}
                        placeholder={apparelFormTranslations.section1.q1_6.placeholder[lang]}
                        suggestion={suggestions.brandSpecial}
                        onAcceptSuggestion={() => update('brandSpecial', suggestions.brandSpecial)}
                    />
                </div>
            </Section>

            {/* Section 2: Origin & Heritage */}
            {!isImageBased && (
                <Section title={apparelFormTranslations.section2.title[lang]} indicatorColor="blue">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <SuggestedInput
                            label={apparelFormTranslations.section2.q2_1.founder[lang]}
                            value={form.founder}
                            onChange={(val) => update('founder', val)}
                            suggestion={suggestions.founder}
                            onAcceptSuggestion={() => update('founder', suggestions.founder)}
                        />
                        <SuggestedInput
                            label={apparelFormTranslations.section2.q2_1.year[lang]}
                            value={form.foundedYear}
                            onChange={(val) => update('foundedYear', val)}
                            suggestion={suggestions.foundedYear}
                            onAcceptSuggestion={() => update('foundedYear', suggestions.foundedYear)}
                        />
                    </div>
                    <div className="mt-8">
                        <SuggestedInput
                            label={apparelFormTranslations.section2.q2_1.regions[lang]}
                            value={form.brandRegions}
                            onChange={(val) => update('brandRegions', val)}
                            suggestion={suggestions.brandRegions}
                            onAcceptSuggestion={() => update('brandRegions', suggestions.brandRegions)}
                        />
                    </div>

                    <div className="mt-12 space-y-8">
                        <Label className="text-lg font-bold text-blue-900">{apparelFormTranslations.section2.q2_2.text[lang]}</Label>
                        <TextInput
                            label={apparelFormTranslations.section2.q2_2.style[lang]}
                            value={form.notable.style}
                            onChange={(val) => update(['notable', 'style'], val)}
                            placeholder="e.g. Slim-fit silhouettes, oversized streetwear..."
                        />
                        <TextInput
                            label={apparelFormTranslations.section2.q2_2.fabric[lang]}
                            value={form.notable.fabric}
                            onChange={(val) => update(['notable', 'fabric'], val)}
                            placeholder="e.g. Organic cotton, premium mulberry silk..."
                        />
                        <TextInput
                            label={apparelFormTranslations.section2.q2_2.fit[lang]}
                            value={form.notable.fit}
                            onChange={(val) => update(['notable', 'fit'], val)}
                            placeholder="e.g. True to size, comfort focused..."
                        />
                        <TextInput
                            label={apparelFormTranslations.section2.q2_2.craftsmanship[lang]}
                            value={form.notable.craftsmanship}
                            onChange={(val) => update(['notable', 'craftsmanship'], val)}
                            placeholder="e.g. Hand-embroidered, reinforced stitching..."
                        />
                    </div>

                    <div className="mt-12">
                        <SuggestedInput
                            label={apparelFormTranslations.section2.q2_3.text[lang]}
                            value={form.certifications}
                            onChange={(val) => update('certifications', val)}
                            placeholder={apparelFormTranslations.section2.q2_3.placeholder[lang]}
                            suggestion={suggestions.certifications}
                            onAcceptSuggestion={() => update('certifications', suggestions.certifications)}
                        />
                    </div>
                </Section>
            )}

            {/* Section 3: Target Audience */}
            {!isImageBased && (
                <Section title={apparelFormTranslations.section3.title[lang]} indicatorColor="blue">
                    <div className="space-y-10">
                        <div>
                            <Label>{apparelFormTranslations.section3.q3_1.age[lang]}</Label>
                            <MultiChips
                                options={apparelFormTranslations.section3.ageOptions}
                                selected={form.consumerAge}
                                onToggle={(key) => {
                                    const next = form.consumerAge.includes(key)
                                        ? form.consumerAge.filter(k => k !== key)
                                        : [...form.consumerAge, key];
                                    update('consumerAge', next);
                                }}
                                lang={lang}
                            />
                        </div>

                        <div>
                            <Label>{apparelFormTranslations.section3.q3_1.gender[lang]}</Label>
                            <SingleChips
                                options={apparelFormTranslations.section3.genderOptions}
                                selected={form.consumerGender}
                                onSelect={(val) => update('consumerGender', val)}
                                lang={lang}
                            />
                        </div>

                        <div>
                            <Label>{apparelFormTranslations.section3.q3_1.income[lang]}</Label>
                            <MultiChips
                                options={apparelFormTranslations.section3.incomeOptions}
                                selected={form.consumerIncome}
                                onToggle={(key) => {
                                    const next = form.consumerIncome.includes(key)
                                        ? form.consumerIncome.filter(k => k !== key)
                                        : [...form.consumerIncome, key];
                                    update('consumerIncome', next);
                                }}
                                lang={lang}
                            />
                        </div>

                        <div>
                            <Label>{apparelFormTranslations.section3.q3_1.geo[lang]}</Label>
                            <MultiChips
                                options={apparelFormTranslations.section3.geoOptions}
                                selected={form.consumerGeography}
                                onToggle={(key) => {
                                    const next = form.consumerGeography.includes(key)
                                        ? form.consumerGeography.filter(k => k !== key)
                                        : [...form.consumerGeography, key];
                                    update('consumerGeography', next);
                                }}
                                lang={lang}
                            />
                        </div>

                        <SuggestedInput
                            label={apparelFormTranslations.section3.q3_2.text[lang]}
                            value={form.consumerProblem}
                            onChange={(val) => update('consumerProblem', val)}
                            placeholder={apparelFormTranslations.section3.q3_2.placeholder[lang]}
                            suggestion={suggestions.consumerProblem}
                            onAcceptSuggestion={() => update('consumerProblem', suggestions.consumerProblem)}
                        />

                        <div>
                            <Label>{apparelFormTranslations.section3.q3_3.text[lang]}</Label>
                            <PsychographicGrid
                                options={apparelPsychographicOptions}
                                selected={form.psychographics}
                                onToggle={(id) => {
                                    const next = form.psychographics.includes(id)
                                        ? form.psychographics.filter(k => k !== id)
                                        : [...form.psychographics, id];
                                    update('psychographics', next);
                                }}
                                lang={lang}
                            />
                        </div>

                        <SuggestedInput
                            label={apparelFormTranslations.section3.q3_4.text[lang]}
                            value={form.fashionInfluencers}
                            onChange={(val) => update('fashionInfluencers', val)}
                            placeholder={apparelFormTranslations.section3.q3_4.placeholder[lang]}
                            suggestion={suggestions.fashionInfluencers}
                            onAcceptSuggestion={() => update('fashionInfluencers', suggestions.fashionInfluencers)}
                        />
                    </div>
                </Section>
            )}

            {/* Section 4: Brand Usage */}
            {!isImageBased && (
                <Section title={apparelFormTranslations.section4.title[lang]} indicatorColor="blue">
                    <SuggestedInput
                        label={apparelFormTranslations.section4.q4_1.text[lang]}
                        value={form.usage}
                        onChange={(val) => update('usage', val)}
                        placeholder={apparelFormTranslations.section4.q4_1.placeholder[lang]}
                        suggestion={suggestions.usage}
                        onAcceptSuggestion={() => update('usage', suggestions.usage)}
                    />
                </Section>
            )}

            {/* Section 5: Benefit & Experience */}
            {!isImageBased && (
                <Section title={apparelFormTranslations.section5.title[lang]} indicatorColor="blue">
                    <div className="space-y-8">
                        <SuggestedInput
                            label={apparelFormTranslations.section5.q5_1.text[lang]}
                            value={form.benefits}
                            onChange={(val) => update('benefits', val)}
                            placeholder={apparelFormTranslations.section5.q5_1.placeholder[lang]}
                            suggestion={suggestions.benefits}
                            onAcceptSuggestion={() => update('benefits', suggestions.benefits)}
                        />
                        <SuggestedInput
                            label={apparelFormTranslations.section5.q5_2.text[lang]}
                            value={form.benefitStandout}
                            onChange={(val) => update('benefitStandout', val)}
                            placeholder={apparelFormTranslations.section5.q5_2.placeholder[lang]}
                            suggestion={suggestions.benefitStandout}
                            onAcceptSuggestion={() => update('benefitStandout', suggestions.benefitStandout)}
                        />

                        <div>
                            <Label>{apparelFormTranslations.section5.q5_3.text[lang]}</Label>
                            <MultiChips
                                options={apparelFormTranslations.section5.q5_3.options}
                                selected={form.consumerExperienceAfter}
                                onToggle={(key) => {
                                    const next = form.consumerExperienceAfter.includes(key)
                                        ? form.consumerExperienceAfter.filter(k => k !== key)
                                        : [...form.consumerExperienceAfter, key];
                                    update('consumerExperienceAfter', next);
                                }}
                                lang={lang}
                            />
                            {suggestions.consumerExperienceAfter && (
                                <div className="mt-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                                        AI Recommended Experiences
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {suggestions.consumerExperienceAfter.map((text, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => {
                                                    const key = Object.keys(apparelFormTranslations.section5.q5_3.options).find(
                                                        k => apparelFormTranslations.section5.q5_3.options[k][lang].includes(text) || text.includes(apparelFormTranslations.section5.q5_3.options[k][lang])
                                                    );
                                                    if (key && !form.consumerExperienceAfter.includes(key)) {
                                                        update('consumerExperienceAfter', [...form.consumerExperienceAfter, key]);
                                                    }
                                                }}
                                                className="px-3 py-1.5 bg-white text-blue-700 text-xs font-medium rounded-lg border border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center gap-1.5 shadow-sm"
                                            >
                                                <span className="text-blue-400">+</span>
                                                {text}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Section>
            )}

            {/* Section 6: Competition */}
            {!isImageBased && (
                <Section title={apparelFormTranslations.section6.title[lang]} indicatorColor="blue">
                    <SuggestedInput
                        label={apparelFormTranslations.section6.q6_1.text[lang]}
                        value={form.competitors}
                        onChange={(val) => update('competitors', val)}
                        placeholder={apparelFormTranslations.section6.q6_1.placeholder[lang]}
                        suggestion={suggestions.competitors}
                        onAcceptSuggestion={() => update('competitors', suggestions.competitors)}
                        isTextArea
                    />
                </Section>
            )}

            {/* Section 7: Desired Perception & Ad Objectives */}
            {!isImageBased && (
                <Section title={apparelFormTranslations.section7.title[lang]} indicatorColor="blue">
                    <div className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <Label>{apparelFormTranslations.section7.q7_1.tone[lang]}</Label>
                                <SingleChips
                                    options={apparelFormTranslations.section7.q7_1.options_tone}
                                    selected={form.desiredImageryTone}
                                    onSelect={(val) => update('desiredImageryTone', val)}
                                    lang={lang}
                                />
                            </div>
                            <div>
                                <Label>{apparelFormTranslations.section7.q7_1.world[lang]}</Label>
                                <SingleChips
                                    options={apparelFormTranslations.section7.q7_1.options_world}
                                    selected={form.desiredImageryWorld}
                                    onSelect={(val) => update('desiredImageryWorld', val)}
                                    lang={lang}
                                />
                            </div>
                        </div>

                        <div>
                            <Label>{apparelFormTranslations.section7.q7_1.attributes[lang]}</Label>
                            <MultiChips
                                options={formTranslations.section7.q7_1.options_attributes}
                                selected={form.desiredImageryAttributes}
                                onToggle={(key) => {
                                    const next = form.desiredImageryAttributes.includes(key)
                                        ? form.desiredImageryAttributes.filter(k => k !== key)
                                        : [...form.desiredImageryAttributes, key];
                                    update('desiredImageryAttributes', next);
                                }}
                                lang={lang}
                            />
                        </div>

                        <div>
                            <Label>{apparelFormTranslations.section7.q7_2.text[lang]}</Label>
                            <SingleChips
                                options={apparelFormTranslations.section7.q7_2.options}
                                selected={form.brandPersona}
                                onSelect={(val) => update('brandPersona', val)}
                                lang={lang}
                                otherValue={form.brandPersonaOther}
                                onOtherChange={(val) => update('brandPersonaOther', val)}
                            />
                        </div>

                        <div>
                            <Label>{apparelFormTranslations.section7.q7_3.text[lang]}</Label>
                            <MultiChips
                                options={apparelFormTranslations.section7.q7_3.options}
                                selected={form.adObjectives}
                                onToggle={handleAdObjectivesChange}
                                lang={lang}
                            />
                            {form.adObjectives.map(key => (
                                <div key={key} className="mt-4 animate-in fade-in slide-in-from-left-2 duration-300">
                                    <Label className="text-blue-700 text-sm font-bold flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                                        {apparelFormTranslations.section7.q7_3.options[key][lang]}
                                    </Label>
                                    <TextInput
                                        value={form.adObjectiveDetails[key] || ''}
                                        onChange={(val) => update(['adObjectiveDetails', key], val)}
                                        placeholder={apparelFormTranslations.section7.q7_3_details_placeholders[key]?.[lang] || "Provide more details..."}
                                    />
                                </div>
                            ))}
                        </div>

                        <div>
                            <Label>{apparelFormTranslations.section7.q7_4.text[lang]}</Label>
                            <MultiChips
                                options={apparelFormTranslations.section7.q7_4.options}
                                selected={form.adFocus}
                                onToggle={handleAdFocusChange}
                                lang={lang}
                            />
                            {form.adFocus.map(key => (
                                <div key={key} className="mt-4 animate-in fade-in slide-in-from-left-2 duration-300">
                                    <Label className="text-blue-700 text-sm font-bold flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                                        {apparelFormTranslations.section7.q7_4.options[key][lang]}
                                    </Label>
                                    <TextInput
                                        value={form.adFocusDetails[key] || ''}
                                        onChange={(val) => update(['adFocusDetails', key], val)}
                                        placeholder="Provide more details for the spotlight..."
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>
            )}

            <div className="flex items-center justify-end gap-4 pt-12 border-t border-gray-100">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors"
                >
                    <TranslatedText tid="cancel" translations={translations} lang={lang} />
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-12 py-4 text-base font-extrabold text-white rounded-2xl shadow-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center gap-3 ${isSubmitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
                        }`}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                        </>
                    ) : (
                        <>
                            <TranslatedText tid="submit" translations={translations} lang={lang} />
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default ApparelForm;
