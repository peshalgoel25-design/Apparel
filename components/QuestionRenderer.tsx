/**
 * INDUSTRIAL GOODS FORM
 * 
 * WHAT THIS FILE DOES:
 * - This is the main questionnaire for Industrial brands (like machinery or tools).
 * - It works similarly to the Brand Form but asks technical questions relevant to factories and businesses.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { IndustrialFormData, IndustrialFormSuggestions, Language, TranscribedClip, MultilingualText, UploadedImage } from '../types.ts';
import { industrialFormTranslations, translations } from '../data/translations.ts';
import AudioTranscriptionManager from './AudioTranscriptionManager.tsx';
import ImageUploader from './ImageUploader.tsx';
import { Section, Label, TextInput, TextArea, MultiChips, SingleChips, SuggestedInput, TranslatedText } from './FormElements.tsx';
import ImageSelectorGrid from './ImageSelectorGrid.tsx';
import { industrialPsychographicOptions } from '../data/industrialPsychographics.ts';

interface IndustrialGoodsFormProps {
    form: IndustrialFormData;
    update: (path: string | string[], value: any) => void;
    lang: Language;
    isImageBased: boolean;
    suggestions: IndustrialFormSuggestions;
    isAnalyzing: boolean;
    handleAnalyzeTranscript: () => void;
    audioRecorderRef: React.RefObject<{ stopAll: () => void }>;
    clipDuration: number;
    transcribedClips: TranscribedClip[];
    setTranscribedClips: React.Dispatch<React.SetStateAction<TranscribedClip[]>>;
    isSubmitting: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    packImages: UploadedImage[];
    setPackImages: (images: UploadedImage[]) => void;
    selectedSalesperson: string;
    onAcceptAllSuggestions?: () => void;
}

const IndustrialGoodsForm: React.FC<IndustrialGoodsFormProps> = ({
    form, update, lang, isImageBased, suggestions, isAnalyzing, handleAnalyzeTranscript, audioRecorderRef,
    clipDuration, transcribedClips, setTranscribedClips,
    isSubmitting, onSubmit, onCancel,
    packImages, setPackImages, selectedSalesperson, onAcceptAllSuggestions
}) => {

    const handleAcceptSuggestion = (fieldId: string, suggestion: string | string[]) => {
        if (fieldId === 'adObjectives') {
            handleAdObjectivesChange(Array.isArray(suggestion) ? suggestion : [suggestion]);
            if (suggestions.adObjectiveDetails) {
                update('adObjectiveDetails', suggestions.adObjectiveDetails);
            }
        } else if (fieldId === 'adFocus') {
            handleAdFocusChange(Array.isArray(suggestion) ? suggestion : [suggestion]);
            if (suggestions.adFocusDetails) {
                update('adFocusDetails', suggestions.adFocusDetails);
            }
        } else {
            update(fieldId, suggestion);
        }
    };

    const handleExperienceClick = (text: string) => {
        update('consumerExperienceAfter', (current: string) => current ? `${current}\n${text}` : text);
    };

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

    return (
        <form onSubmit={onSubmit}>
            <Section title={industrialFormTranslations.audio.title} context={industrialFormTranslations.audio.context} lang={lang} disabled={isImageBased}>
                <AudioTranscriptionManager
                    ref={audioRecorderRef}
                    fullTranscript={form.fullTranscript}
                    onTranscriptChange={(t) => update('fullTranscript', t)}
                    lang={lang}
                    clipDuration={clipDuration}
                    clips={transcribedClips}
                    setClips={setTranscribedClips}
                />
                {form.fullTranscript && (
                    <div className="mt-4 flex justify-center gap-4">
                        <button
                            type="button"
                            onClick={handleAnalyzeTranscript}
                            disabled={isAnalyzing}
                            className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 disabled:bg-slate-400"
                        >
                            {isAnalyzing ? (<div className="loader mr-2 -ml-1"></div>) : null}
                            <TranslatedText lang={lang} text={isAnalyzing ? industrialFormTranslations.audio.analysing : industrialFormTranslations.audio.analyse} />
                        </button>
                        {onAcceptAllSuggestions && Object.keys(suggestions).length > 0 && (
                            <button
                                type="button"
                                onClick={onAcceptAllSuggestions}
                                className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                            >
                                Accept All Suggestions
                            </button>
                        )}
                    </div>
                )}
            </Section>

            <Section kIndex={1} title={industrialFormTranslations.section1.title} lang={lang} disabled={isImageBased}>
                <div className="space-y-4">
                    <SuggestedInput suggestion={suggestions.brandSpecial} onAccept={(s) => handleAcceptSuggestion('brandSpecial', s)} lang={lang}>
                        <Label qIndex="1.1" text={industrialFormTranslations.section1.q1_1.text} hint={industrialFormTranslations.section1.q1_1.hint} lang={lang} />
                        <TextArea value={form.brandSpecial} onChange={(v) => update("brandSpecial", v)} placeholder={industrialFormTranslations.section1.q1_1.placeholder} lang={lang} />
                    </SuggestedInput>

                    <SuggestedInput suggestion={suggestions.adBrand} onAccept={(s) => handleAcceptSuggestion('adBrand', s)} lang={lang}>
                        <Label qIndex="1.2" text={industrialFormTranslations.section1.q1_3.text} lang={lang} required />
                        <TextInput id="q1_2_input" value={form.adBrand} onChange={(v) => update("adBrand", v)} placeholder={industrialFormTranslations.section1.q1_3.placeholder} lang={lang} required />
                    </SuggestedInput>
                    <SuggestedInput suggestion={suggestions.productName} onAccept={(s) => handleAcceptSuggestion('productName', s)} lang={lang}>
                        <Label qIndex="1.3" text={industrialFormTranslations.section1.q1_4.text} lang={lang} />
                        <TextInput value={form.productName} onChange={(v) => update("productName", v)} placeholder={industrialFormTranslations.section1.q1_4.placeholder} lang={lang} />
                    </SuggestedInput>

                    <SuggestedInput suggestion={suggestions.usage} onAccept={(s) => handleAcceptSuggestion('usage', s)} lang={lang}>
                        <Label qIndex="1.4" text={industrialFormTranslations.section4.q4_1.text} hint={industrialFormTranslations.section4.q4_1.hint} lang={lang} />
                        <TextArea value={form.usage} onChange={v => update('usage', v)} placeholder={industrialFormTranslations.section4.q4_1.placeholder} lang={lang} />
                    </SuggestedInput>
                </div>
            </Section>

            <Section kIndex={2} title={industrialFormTranslations.section2.title} lang={lang} disabled={isImageBased}>
                <div className="space-y-6">
                    <div>
                        <Label qIndex="2.1" text={industrialFormTranslations.section2.q2_1.text} lang={lang} />
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <SuggestedInput suggestion={suggestions.founder} onAccept={(s) => handleAcceptSuggestion('founder', s)} lang={lang}>
                                <TextInput value={form.founder} onChange={(v) => update("founder", v)} placeholder={industrialFormTranslations.section2.q2_1.placeholder_founder} lang={lang} />
                            </SuggestedInput>
                            <SuggestedInput suggestion={suggestions.foundedYear} onAccept={(s) => handleAcceptSuggestion('foundedYear', s)} lang={lang}>
                                <TextInput value={form.foundedYear} onChange={(v) => update("foundedYear", v)} placeholder={industrialFormTranslations.section2.q2_1.placeholder_year} lang={lang} />
                            </SuggestedInput>
                        </div>
                        <div className="mt-4">
                            <SuggestedInput suggestion={suggestions.brandRegions} onAccept={(s) => handleAcceptSuggestion('brandRegions', s)} lang={lang}>
                                <Label className="text-[15px]" text={industrialFormTranslations.section2.q2_1.regions_label} lang={lang} />
                                <TextInput value={form.brandRegions} onChange={(v) => update("brandRegions", v)} placeholder={industrialFormTranslations.section2.q2_1.placeholder_regions} lang={lang} />
                            </SuggestedInput>
                        </div>
                    </div>
                    <div>
                        <Label qIndex="2.2" text={industrialFormTranslations.section2.q2_2.text} lang={lang} />
                        <div className="mt-2 space-y-3">
                            <div>
                                <Label className="text-[15px]" text={industrialFormTranslations.section2.q2_2.options.look} lang={lang} />
                                <SuggestedInput suggestion={suggestions.aspect_look} onAccept={(s) => handleAcceptSuggestion('aspect_look', s)} lang={lang}>
                                    <TextArea value={form.aspect_look} onChange={v => update('aspect_look', v)} placeholder={industrialFormTranslations.section2.q2_2.placeholder} lang={lang} rows={2} />
                                </SuggestedInput>
                            </div>

                            <div>
                                <Label className="text-[15px]" text={industrialFormTranslations.section2.q2_2.options.materials} lang={lang} />
                                <SuggestedInput suggestion={suggestions.aspect_materials} onAccept={(s) => handleAcceptSuggestion('aspect_materials', s)} lang={lang}>
                                    <TextArea value={form.aspect_materials} onChange={v => update('aspect_materials', v)} placeholder={industrialFormTranslations.section2.q2_2.placeholder} lang={lang} rows={2} />
                                </SuggestedInput>
                            </div>
                            <div>
                                <Label className="text-[15px]" text={industrialFormTranslations.section2.q2_2.options.tech} lang={lang} />
                                <SuggestedInput suggestion={suggestions.aspect_tech} onAccept={(s) => handleAcceptSuggestion('aspect_tech', s)} lang={lang}>
                                    <TextArea value={form.aspect_tech} onChange={v => update('aspect_tech', v)} placeholder={industrialFormTranslations.section2.q2_2.placeholder} lang={lang} rows={2} />
                                </SuggestedInput>
                            </div>
                            <div>
                                <Label className="text-[15px]" text={industrialFormTranslations.section2.q2_2.options.skill} lang={lang} />
                                <SuggestedInput suggestion={suggestions.aspect_skill} onAccept={(s) => handleAcceptSuggestion('aspect_skill', s)} lang={lang}>
                                    <TextArea value={form.aspect_skill} onChange={v => update('aspect_skill', v)} placeholder={industrialFormTranslations.section2.q2_2.placeholder} lang={lang} rows={2} />
                                </SuggestedInput>
                            </div>
                        </div>
                    </div>
                    <div>
                        <SuggestedInput suggestion={suggestions.certifications} onAccept={(s) => handleAcceptSuggestion('certifications', s)} lang={lang}>
                            <Label qIndex="2.3" text={industrialFormTranslations.section2.q2_3.text} lang={lang} />
                            <TextArea value={form.certifications} onChange={v => update('certifications', v)} placeholder={industrialFormTranslations.section2.q2_3.placeholder} lang={lang} />
                        </SuggestedInput>
                    </div>
                </div>
            </Section>

            <Section kIndex={3} title={industrialFormTranslations.section3.title} lang={lang} disabled={isImageBased}>
                <div className="p-4 border rounded-lg mb-4">
                    <Label qIndex="3.1" text={industrialFormTranslations.section3.q3a1.text} lang={lang} />
                    <div className="mt-2 space-y-4">
                        <div>
                            <Label className="text-[15px]" text={industrialFormTranslations.section3.ageOptionsTitle} lang={lang} />
                            <SuggestedInput suggestion={suggestions.consumerAge} onAccept={(s) => handleAcceptSuggestion('consumerAge', s)} lang={lang}>
                                <MultiChips options={industrialFormTranslations.section3.ageOptions} value={form.consumerAge} onChange={v => update('consumerAge', v)} lang={lang} maxSelections={3} />
                            </SuggestedInput>
                        </div>
                        <div>
                            <Label className="text-[15px]" text={industrialFormTranslations.section3.genderOptionsTitle} lang={lang} />
                            <SuggestedInput suggestion={suggestions.consumerGender} onAccept={(s) => handleAcceptSuggestion('consumerGender', s)} lang={lang}>
                                <SingleChips options={industrialFormTranslations.section3.genderOptions} value={form.consumerGender} onChange={v => update('consumerGender', v)} lang={lang} />
                            </SuggestedInput>
                        </div>
                        <div>
                            <Label className="text-[15px]" text={industrialFormTranslations.section3.incomeOptionsTitle} lang={lang} />
                            <SuggestedInput suggestion={suggestions.consumerIncome} onAccept={(s) => handleAcceptSuggestion('consumerIncome', s)} lang={lang}>
                                <MultiChips options={industrialFormTranslations.section3.incomeOptions} value={form.consumerIncome} onChange={v => update('consumerIncome', v)} lang={lang} maxSelections={3} />
                            </SuggestedInput>
                        </div>
                        <div>
                            <Label className="text-[15px]" text={industrialFormTranslations.section3.geoOptionsTitle} lang={lang} />
                            <SuggestedInput suggestion={suggestions.consumerGeography} onAccept={(s) => handleAcceptSuggestion('consumerGeography', s)} lang={lang}>
                                <MultiChips options={industrialFormTranslations.section3.geoOptions} value={form.consumerGeography} onChange={v => update('consumerGeography', v)} lang={lang} />
                            </SuggestedInput>
                        </div>
                    </div>
                </div>
                <div className="p-4 border rounded-lg mb-4">
                    <SuggestedInput suggestion={suggestions.consumerProblem} onAccept={(s) => handleAcceptSuggestion('consumerProblem', s)} lang={lang}>
                        <Label qIndex="3.2" text={industrialFormTranslations.section3.q3a2.text} hint={industrialFormTranslations.section3.q3a2.hint} lang={lang} />
                        <TextArea value={form.consumerProblem} onChange={v => update('consumerProblem', v)} placeholder={industrialFormTranslations.section3.q3a2.placeholder} lang={lang} />
                    </SuggestedInput>
                </div>

                <div className="p-4 border rounded-lg mb-4">
                    <Label qIndex="3.3" text={industrialFormTranslations.section3.psychographicOptionsTitle} lang={lang} />
                    <SuggestedInput suggestion={suggestions.psychographicOrientation} onAccept={(s) => handleAcceptSuggestion('psychographicOrientation', s)} lang={lang}>
                        <ImageSelectorGrid
                            options={industrialPsychographicOptions}
                            value={form.psychographicOrientation}
                            onChange={v => update('psychographicOrientation', v)}
                            lang={lang}
                            maxSelections={2}
                        />
                    </SuggestedInput>
                </div>
                <div className="p-4 border rounded-lg">
                    <Label qIndex="3.4" text={industrialFormTranslations.section3.q3b1.text} lang={lang} />
                    <SuggestedInput suggestion={suggestions.customerInfluencer} onAccept={(s) => handleAcceptSuggestion('customerInfluencer', s)} lang={lang}>
                        <TextArea value={form.customerInfluencer} onChange={v => update('customerInfluencer', v)} placeholder={industrialFormTranslations.section3.q3b1.placeholder} lang={lang} />
                    </SuggestedInput>
                </div>
            </Section>



            <Section kIndex={4} title={industrialFormTranslations.section5.title} lang={lang} disabled={isImageBased}>
                <div className="space-y-4">
                    <SuggestedInput suggestion={suggestions.benefits} onAccept={(s) => handleAcceptSuggestion('benefits', s)} lang={lang}>
                        <Label qIndex="4.1" text={industrialFormTranslations.section5.q5_1.text} lang={lang} />
                        <TextArea value={form.benefits} onChange={v => update('benefits', v)} placeholder={industrialFormTranslations.section5.q5_1.placeholder} lang={lang} />
                    </SuggestedInput>
                    <SuggestedInput suggestion={suggestions.competitorBenefitDifference} onAccept={(s) => handleAcceptSuggestion('competitorBenefitDifference', s)} lang={lang}>
                        <Label qIndex="4.2" text={industrialFormTranslations.section5.q5_2.text} lang={lang} />
                        <TextArea value={form.competitorBenefitDifference} onChange={v => update('competitorBenefitDifference', v)} placeholder={industrialFormTranslations.section5.q5_2.placeholder} lang={lang} />
                    </SuggestedInput>
                    <SuggestedInput suggestion={suggestions.consumerExperienceAfter} onAccept={(s) => handleAcceptSuggestion('consumerExperienceAfter', s)} lang={lang}>
                        <div>
                            <Label qIndex="4.3" text={industrialFormTranslations.section5.q5_3.text} lang={lang} />
                            <div className="mt-2 flex flex-wrap gap-2">
                                {Object.entries(industrialFormTranslations.section5.q5_3.options).map(([key, text]) => (
                                    <button
                                        type="button"
                                        key={key}
                                        onClick={() => handleExperienceClick(text[lang] || text.en)}
                                        className="bg-sky-100 text-sky-800 hover:bg-sky-200 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm transition"
                                    >
                                        + <TranslatedText lang={lang} text={text} />
                                    </button>
                                ))}
                            </div>
                            <TextArea value={form.consumerExperienceAfter} onChange={v => update('consumerExperienceAfter', v)} placeholder={industrialFormTranslations.section5.q5_3.placeholder} lang={lang} />
                        </div>
                    </SuggestedInput>
                </div>
            </Section>

            <Section kIndex={5} title={industrialFormTranslations.section6.title} lang={lang} disabled={isImageBased}>
                <SuggestedInput suggestion={suggestions.competitors} onAccept={(s) => handleAcceptSuggestion('competitors', s)} lang={lang}>
                    <Label qIndex="5.1" text={industrialFormTranslations.section6.q6_1.text} lang={lang} />
                    <TextArea value={form.competitors} onChange={v => update('competitors', v)} placeholder={industrialFormTranslations.section6.q6_1.placeholder} lang={lang} />
                </SuggestedInput>
            </Section>

            <Section kIndex={6} title={industrialFormTranslations.section7.title} lang={lang} disabled={isImageBased}>
                <div className="space-y-4">
                    <div>
                        <Label qIndex="6.1" text={industrialFormTranslations.section7.q7_1.text} lang={lang} />
                        <div className="mt-2 space-y-3">
                            <div>
                                <Label className="text-[15px]" text={industrialFormTranslations.section7.q7_1.category_tone} lang={lang} />
                                <SuggestedInput suggestion={suggestions.desiredImageryTone} onAccept={(s) => handleAcceptSuggestion('desiredImageryTone', s)} lang={lang}>
                                    <SingleChips options={industrialFormTranslations.section7.q7_1.options_tone} value={form.desiredImageryTone} onChange={v => update('desiredImageryTone', v)} lang={lang} />
                                </SuggestedInput>
                            </div>
                            <div>
                                <Label className="text-[15px]" text={industrialFormTranslations.section7.q7_1.category_world} lang={lang} />
                                <SuggestedInput suggestion={suggestions.desiredImageryWorld} onAccept={(s) => handleAcceptSuggestion('desiredImageryWorld', s)} lang={lang}>
                                    <SingleChips options={industrialFormTranslations.section7.q7_1.options_world} value={form.desiredImageryWorld} onChange={v => update('desiredImageryWorld', v)} lang={lang} />
                                </SuggestedInput>
                            </div>

                        </div>
                    </div>
                    <div>
                        <Label qIndex="6.2" text={industrialFormTranslations.section7.q7_2.text} lang={lang} />
                        <SuggestedInput suggestion={suggestions.brandAsPerson} onAccept={(s) => handleAcceptSuggestion('brandAsPerson', s)} lang={lang}>
                            <SingleChips options={industrialFormTranslations.section7.q7_2.options} value={form.brandAsPerson} onChange={v => update('brandAsPerson', v)} lang={lang} />
                        </SuggestedInput>
                        {form.brandAsPerson === 'other' && (
                            <TextInput value={form.brandAsPersonOther} onChange={v => update('brandAsPersonOther', v)} placeholder={industrialFormTranslations.specifyOther} lang={lang} />
                        )}
                    </div>
                    <div>
                        <Label qIndex="6.3" text={industrialFormTranslations.section7.q7_3.text} lang={lang} />
                        <SuggestedInput suggestion={suggestions.adObjectives} onAccept={(s) => handleAcceptSuggestion('adObjectives', s)} lang={lang}>
                            <MultiChips options={industrialFormTranslations.section7.q7_3.options} value={form.adObjectives} onChange={handleAdObjectivesChange} lang={lang} maxSelections={2} />
                        </SuggestedInput>
                        {(form.adObjectives || []).length > 0 && (
                            <div className="mt-4 space-y-3">
                                {(form.adObjectives || []).map(key => (
                                    <div key={key}>
                                        <Label text={industrialFormTranslations.section7.q7_3.options[key]} lang={lang} />
                                        <TextInput
                                            value={form.adObjectiveDetails?.[key] || ''}
                                            onChange={text => update('adObjectiveDetails', (prev: any) => ({ ...prev, [key]: text }))}
                                            placeholder={industrialFormTranslations.section7.q7_3_details_placeholders[key as keyof typeof industrialFormTranslations.section7.q7_3_details_placeholders]}
                                            lang={lang}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <Label qIndex="6.4" text={industrialFormTranslations.section7.q7_4.text} lang={lang} />
                        <SuggestedInput suggestion={suggestions.adFocus} onAccept={(s) => handleAcceptSuggestion('adFocus', s)} lang={lang}>
                            <MultiChips options={industrialFormTranslations.section7.q7_4.options} value={form.adFocus} onChange={handleAdFocusChange} lang={lang} maxSelections={2} />
                        </SuggestedInput>
                        {(form.adFocus || []).length > 0 && (
                            <div className="mt-4 space-y-3">
                                {(form.adFocus || []).map(key => (
                                    <div key={key}>
                                        <Label text={industrialFormTranslations.section7.q7_4.options[key]} lang={lang} />
                                        <TextInput
                                            value={form.adFocusDetails?.[key] || ''}
                                            onChange={text => update('adFocusDetails', (prev: any) => ({ ...prev, [key]: text }))}
                                            placeholder={industrialFormTranslations.section7.q7_4_details_placeholders[key as keyof typeof industrialFormTranslations.section7.q7_4_details_placeholders]}
                                            lang={lang}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <SuggestedInput suggestion={suggestions.showInfluencer} onAccept={(s) => handleAcceptSuggestion('showInfluencer', s)} lang={lang}>
                            <Label qIndex="6.5A" text={industrialFormTranslations.section7.showInfluencerQuestion} lang={lang} />
                            <SingleChips
                                options={{ 'yes': industrialFormTranslations.section7.yes, 'no': industrialFormTranslations.section7.no }}
                                value={form.showInfluencer}
                                onChange={v => {
                                    update('showInfluencer', v);
                                    if (v === 'no') {
                                        update('customerInfluencerType', '');
                                    }
                                }}
                                lang={lang}
                            />
                        </SuggestedInput>
                        {form.showInfluencer === 'yes' && (
                            <div className="mt-4 ml-4">
                                <Label className="text-[15px]" qIndex="6.5B" text={industrialFormTranslations.section3.q3b1.follow_up} lang={lang} />
                                <SuggestedInput suggestion={suggestions.customerInfluencerType} onAccept={(s) => handleAcceptSuggestion('customerInfluencerType', s)} lang={lang}>
                                    <SingleChips options={industrialFormTranslations.section3.influencerTypeOptions} value={form.customerInfluencerType} onChange={v => update('customerInfluencerType', v)} lang={lang} />
                                </SuggestedInput>
                            </div>
                        )}
                    </div>
                </div>
            </Section>

            <Section kIndex={7} title={industrialFormTranslations.section8.title} lang={lang} disabled={isImageBased}>
                <div className="space-y-4">

                    <SuggestedInput suggestion={suggestions.productAppearance} onAccept={(s) => handleAcceptSuggestion('productAppearance', s)} lang={lang}>
                        <Label qIndex="7.1" text={industrialFormTranslations.section8.q8_2.text} lang={lang} />
                        <TextArea value={form.productAppearance} onChange={v => update('productAppearance', v)} placeholder={industrialFormTranslations.section8.q8_2.placeholder} lang={lang} />
                    </SuggestedInput>
                </div>
            </Section>

            <Section kIndex="" title={industrialFormTranslations.salespersonSection.title} context={industrialFormTranslations.salespersonSection.context} lang={lang}>
                <div className="space-y-4">
                    <div>
                        <Label qIndex="" text={industrialFormTranslations.salespersonSection.salesperson} lang={lang} required />
                        <div className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-3 text-[15px] bg-slate-50 text-slate-700">
                            {selectedSalesperson || <span className="text-slate-400">Selected from start screen</span>}
                        </div>
                    </div>
                    <div>
                        <Label qIndex="" text={industrialFormTranslations.salespersonSection.customerID} lang={lang} />
                        <TextInput value={form.customerID || ''} onChange={v => update('customerID', v)} placeholder={industrialFormTranslations.salespersonSection.customerIDPlaceholder} lang={lang} />
                    </div>
                    <ImageUploader
                        uploadedImages={packImages}
                        onImagesChange={setPackImages}
                        lang={lang}
                        title={industrialFormTranslations.section1.q1_4.packImages.title}
                    />
                </div>
            </Section>

            <div className="mt-6 flex gap-3">
                <button type="submit" disabled={isSubmitting} className="flex-1 h-12 inline-flex justify-center items-center px-4 border border-red-700 text-sm font-bold rounded-md shadow-sm text-red-700 bg-white hover:bg-red-700 hover:text-white disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-200 transition-colors uppercase tracking-wide">
                    {isSubmitting ? <TranslatedText lang={lang} text={translations.submitting} /> : <TranslatedText lang={lang} text={translations.submitToWebhook} />}
                </button>
                {isSubmitting && (
                    <button type="button" onClick={onCancel} className="flex-1 h-12 inline-flex justify-center items-center px-4 border border-slate-300 text-sm font-bold rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 uppercase tracking-wide">
                        <TranslatedText lang={lang} text={translations.cancel} />
                    </button>
                )}
            </div>
        </form>
    );
};

export default IndustrialGoodsForm;