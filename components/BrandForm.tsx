/**
 * BRAND INFORMATION FORM (FMCG)
 * 
 * WHAT THIS FILE DOES:
 * - This is the main questionnaire for FMCG (Consumer Goods) brands.
 * - It collects everything from brand name to target audience details.
 * - It also includes the voice recording feature for easy data entry.
 */

import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { NewFormData, UploadedImage, FormSuggestions, Language, TranscribedClip } from '../types.ts';
import { formTranslations, translations } from '../data/translations.ts';
import { psychographicOptions } from '../data/psychographics.ts';
import ImageUploader from './ImageUploader.tsx';
import AudioTranscriptionManager from './AudioTranscriptionManager.tsx';
import PsychographicGrid from './PsychographicGrid.tsx';
import { Section, Label, TextInput, TextArea, MultiChips, SingleChips, SuggestedInput, TranslatedText, Chip } from './FormElements.tsx';

interface BrandFormProps {
    form: NewFormData;
    update: (path: string | string[], value: any) => void;
    lang: Language;
    isImageBased: boolean;
    packImages: UploadedImage[];
    setPackImages: (images: UploadedImage[]) => void;
    suggestions: FormSuggestions;
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

const BrandForm: React.FC<BrandFormProps> = ({
    form, update, lang, isImageBased, packImages, setPackImages,
    suggestions, isAnalyzing, handleAnalyzeTranscript, audioRecorderRef,
    clipDuration, transcribedClips, setTranscribedClips,
    isSubmitting, onSubmit, onCancel,
    selectedSalesperson, onAcceptAllSuggestions
}) => {

    const { consumerDemographics } = form;
    const filteredPsychographics = useMemo(() => {
        const age = consumerDemographics.age || [];
        const gender = consumerDemographics.gender || '';
        const showKids = age.some(a => ["Babies < 5", "Kids 6-14"].includes(a));
        const showYouth = age.includes("15-25");
        const showAdults = age.some(a => ["26-35", "36-50", "50+"].includes(a));
        const showMale = gender === 'Men' || gender === 'Men and Women';
        const showFemale = gender === 'Women' || gender === 'Men and Women';

        return psychographicOptions.filter(opt => {
            if (opt.category === 'kids') return showKids;
            if (opt.category === 'youth_boys') return showYouth && showMale;
            if (opt.category === 'youth_girls') return showYouth && showFemale;
            if (opt.category === 'men') return showAdults && showMale;
            if (opt.category === 'women') return showAdults && showFemale;
            return false;
        });
    }, [consumerDemographics.age, consumerDemographics.gender]);

    // Effect to prune psychographics if demographics change
    React.useEffect(() => {
        const visibleIds = new Set(filteredPsychographics.map(opt => opt.id));
        const currentPsychographics = form.psychographics || [];
        const newSelection = currentPsychographics.filter(id => visibleIds.has(id));
        if (newSelection.length < currentPsychographics.length) {
            update('psychographics', newSelection);
        }
    }, [filteredPsychographics, form.psychographics, update]);

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

    const handleExperienceSuggestionClick = (suggestionText: string) => {
        const currentValue = form.consumerExperienceAfter;
        const newValue = currentValue ? `${currentValue}\n${suggestionText}` : suggestionText;
        update('consumerExperienceAfter', newValue);
    };

    const experienceSuggestions = form.productType === 'food'
        ? formTranslations.section5.q5_3.suggestions_food
        : formTranslations.section5.q5_3.suggestions_nonfood;

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

    return (
        <form onSubmit={onSubmit}>
            <Section title={formTranslations.audio.title} context={formTranslations.audio.context} lang={lang} disabled={isImageBased}>
                <AudioTranscriptionManager
                    ref={audioRecorderRef}
                    fullTranscript={form.fullTranscript}
                    onTranscriptChange={(t) => update('fullTranscript', t)}
                    lang={lang}
                    disabled={isImageBased}
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
                            <TranslatedText lang={lang} text={isAnalyzing ? formTranslations.audio.analysing : formTranslations.audio.analyse} />
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

            <Section kIndex={1} title={formTranslations.section1.title} context={formTranslations.section1.context} lang={lang} disabled={isImageBased}>
                <div className="space-y-4">
                    <SuggestedInput suggestion={suggestions.brandSpecial} onAccept={(s) => handleAcceptSuggestion('brandSpecial', s)} lang={lang}>
                        <Label qIndex="1.1" text={formTranslations.section1.q1_1.text} lang={lang} />
                        <TextArea value={form.brandSpecial} onChange={(v) => update("brandSpecial", v)} placeholder={formTranslations.section1.q1_1.placeholder} lang={lang} />
                    </SuggestedInput>
                    <SuggestedInput suggestion={suggestions.brandName} onAccept={(s) => handleAcceptSuggestion('brandName', s)} lang={lang}>
                        <Label qIndex="1.2" text={formTranslations.section1.q1_2.text} required lang={lang} />
                        <TextInput id="q1_2_input" value={form.brandName} onChange={(v) => update("brandName", v)} placeholder={formTranslations.section1.q1_2.placeholder} lang={lang} required />
                    </SuggestedInput>
                    <SuggestedInput suggestion={suggestions.adBrand} onAccept={(s) => handleAcceptSuggestion('adBrand', s)} lang={lang}>
                        <Label qIndex="1.3" text={formTranslations.section1.q1_3.text} lang={lang} />
                        <TextInput value={form.adBrand} onChange={(v) => update("adBrand", v)} placeholder={formTranslations.section1.q1_3.placeholder} lang={lang} />
                    </SuggestedInput>
                    <SuggestedInput suggestion={suggestions.productName} onAccept={(s) => handleAcceptSuggestion('productName', s)} lang={lang}>
                        <Label qIndex="1.4" text={formTranslations.section1.q1_4.product.text} required lang={lang} />
                        <TextInput value={form.productName} onChange={(v) => update("productName", v)} placeholder={formTranslations.section1.q1_4.product.placeholder} lang={lang} />
                    </SuggestedInput>
                    <div>
                        <div className="mt-2 flex gap-2">
                            <Chip active={form.productType === 'food'} onClick={() => update('productType', 'food')}>Food</Chip>
                            <Chip active={form.productType === 'non-food'} onClick={() => update('productType', 'non-food')}>Non-food</Chip>
                        </div>
                    </div>
                </div>
            </Section>

            <Section kIndex={2} title={formTranslations.section2.title} context={undefined} lang={lang} disabled={isImageBased}>
                <div className="space-y-6">
                    <div>
                        <Label qIndex="2.1" text={formTranslations.section2.q2_1.text} lang={lang} />
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <SuggestedInput suggestion={suggestions.founder} onAccept={(s) => handleAcceptSuggestion('founder', s)} lang={lang}>
                                <TextInput value={form.founder} onChange={(v) => update("founder", v)} placeholder={formTranslations.section2.q2_1.placeholder_founder} lang={lang} />
                            </SuggestedInput>
                            <SuggestedInput suggestion={suggestions.foundedYear} onAccept={(s) => handleAcceptSuggestion('foundedYear', s)} lang={lang}>
                                <TextInput value={form.foundedYear} onChange={(v) => update("foundedYear", v)} placeholder={formTranslations.section2.q2_1.placeholder_year} lang={lang} />
                            </SuggestedInput>
                        </div>
                        <div className="mt-4">
                            <SuggestedInput suggestion={suggestions.brandRegions} onAccept={(s) => handleAcceptSuggestion('brandRegions', s)} lang={lang}>
                                <Label text={formTranslations.section2.q2_1b.text} lang={lang} />
                                <TextInput value={form.brandRegions} onChange={(v) => update("brandRegions", v)} placeholder={formTranslations.section2.q2_1b.placeholder} lang={lang} />
                            </SuggestedInput>
                        </div>
                    </div>

                    <div>
                        <Label qIndex="2.2" text={formTranslations.section2.q2_2.text} lang={lang} />
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(['Look', 'Feel', 'Smell', 'Taste'] as const).map((key) => (
                                <div key={key}>
                                    <Label className="text-sm font-medium text-neutral-700" text={formTranslations.section2.q2_2[key.toLowerCase() as keyof typeof formTranslations.section2.q2_2]} lang={lang} />
                                    <SuggestedInput suggestion={suggestions[`notable.${key}`]} onAccept={(s) => handleAcceptSuggestion(`notable.${key}`, s)} lang={lang}>
                                        <TextInput value={form.notable[key]} onChange={v => update(['notable', key], v)} placeholder={formTranslations.section2.q2_2.placeholder} lang={lang} />
                                    </SuggestedInput>
                                </div>
                            ))}
                            <div>
                                <Label className="text-sm font-medium text-neutral-700" text={formTranslations.section2.q2_2.processes} lang={lang} />
                                <SuggestedInput suggestion={suggestions.uniqueProcesses} onAccept={(s) => handleAcceptSuggestion('uniqueProcesses', s)} lang={lang}>
                                    <TextInput value={form.uniqueProcesses} onChange={v => update('uniqueProcesses', v)} placeholder={formTranslations.section2.q2_2.placeholder} lang={lang} />
                                </SuggestedInput>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-neutral-700" text={formTranslations.section2.q2_2.ingredients} lang={lang} />
                                <SuggestedInput suggestion={suggestions.uniqueIngredients} onAccept={(s) => handleAcceptSuggestion('uniqueIngredients', s)} lang={lang}>
                                    <TextInput value={form.uniqueIngredients} onChange={v => update('uniqueIngredients', v)} placeholder={formTranslations.section2.q2_2.placeholder} lang={lang} />
                                </SuggestedInput>
                            </div>
                        </div>
                        <div className="mt-6">
                            <SuggestedInput suggestion={suggestions.uniqueOther} onAccept={(s) => handleAcceptSuggestion('uniqueOther', s)} lang={lang}>
                                <Label qIndex="2.3" text={formTranslations.section2.q2_3.text} lang={lang} />
                                <TextArea value={form.uniqueOther} onChange={v => update('uniqueOther', v)} placeholder={formTranslations.section2.q2_3.placeholder} lang={lang} />
                            </SuggestedInput>
                        </div>
                    </div>
                </div>
            </Section>

            <Section kIndex={3} title={formTranslations.section3.title} context={formTranslations.section3.context} lang={lang} disabled={isImageBased}>
                <div className="p-4 border rounded-lg">
                    <Label qIndex="3A1" text={formTranslations.section3.q3_1A.text} lang={lang} />
                    <div className="mt-2 space-y-4">
                        <div>
                            <Label className="text-[15px]" text={formTranslations.section3.q3_1A.age} lang={lang} />
                            <SuggestedInput
                                suggestion={suggestions['consumerDemographics.age']}
                                onAccept={(s) => handleAcceptSuggestion('consumerDemographics.age', s)}
                                lang={lang}
                                displayValue={Array.isArray(suggestions['consumerDemographics.age'])
                                    ? suggestions['consumerDemographics.age'].join(', ')
                                    : suggestions['consumerDemographics.age']}
                            >
                                <MultiChips
                                    options={formTranslations.section3.consumerAgeOptions}
                                    value={form.consumerDemographics.age}
                                    onChange={v => update(['consumerDemographics', 'age'], v)}
                                    lang={lang}
                                    maxSelections={3}
                                />
                            </SuggestedInput>
                        </div>
                        <div>
                            <Label className="text-[15px]" text={formTranslations.section3.q3_1A.gender} lang={lang} />
                            <SuggestedInput
                                suggestion={suggestions['consumerDemographics.gender']}
                                onAccept={(s) => handleAcceptSuggestion('consumerDemographics.gender', s)}
                                lang={lang}
                                displayValue={Array.isArray(suggestions['consumerDemographics.gender'])
                                    ? suggestions['consumerDemographics.gender'].join(', ')
                                    : suggestions['consumerDemographics.gender']}
                            >
                                <SingleChips options={formTranslations.section3.genderOptions} value={form.consumerDemographics.gender} onChange={v => update(['consumerDemographics', 'gender'], v)} lang={lang} />
                            </SuggestedInput>
                        </div>
                        <div>
                            <Label className="text-[15px]" text={formTranslations.section3.q3_1B.income} lang={lang} />
                            <SuggestedInput
                                suggestion={suggestions['consumerDemographics.income']}
                                onAccept={(s) => handleAcceptSuggestion('consumerDemographics.income', s)}
                                lang={lang}
                                displayValue={Array.isArray(suggestions['consumerDemographics.income'])
                                    ? suggestions['consumerDemographics.income'].join(', ')
                                    : suggestions['consumerDemographics.income']}
                            >
                                <MultiChips options={formTranslations.section3.incomeOptions} value={form.consumerDemographics.income} onChange={v => update(['consumerDemographics', 'income'], v)} lang={lang} maxSelections={3} />
                            </SuggestedInput>
                        </div>
                        <div>
                            <Label className="text-[15px]" text={formTranslations.section3.q3_1B.geography} lang={lang} />
                            <SuggestedInput
                                suggestion={suggestions['consumerDemographics.geography']}
                                onAccept={(s) => handleAcceptSuggestion('consumerDemographics.geography', s)}
                                lang={lang}
                                displayValue={Array.isArray(suggestions['consumerDemographics.geography'])
                                    ? suggestions['consumerDemographics.geography'].join(', ')
                                    : suggestions['consumerDemographics.geography']}
                            >
                                <MultiChips options={formTranslations.section3.geoOptions} value={form.consumerDemographics.geography} onChange={v => update(['consumerDemographics', 'geography'], v)} lang={lang} />
                            </SuggestedInput>
                        </div>
                    </div>
                </div>
                <div className="mt-4 p-4 border rounded-lg mb-4">
                    <SuggestedInput suggestion={suggestions.consumerProblem} onAccept={(s) => handleAcceptSuggestion('consumerProblem', s)} lang={lang}>
                        <Label qIndex="3A2" text={formTranslations.section2.q2_5.text} lang={lang} />
                        <TextArea value={form.consumerProblem} onChange={v => update('consumerProblem', v)} placeholder={formTranslations.section2.q2_5.placeholder} lang={lang} />
                    </SuggestedInput>
                </div>
                <div className="mt-4 p-4 border rounded-lg mb-4">
                    <Label qIndex="3B" text={formTranslations.section3.q3_1B.text} lang={lang} />
                    <div className="mt-2 space-y-4">
                        <div>
                            <Label className="text-[15px]" text={formTranslations.section3.q3_1B.age} lang={lang} />
                            <SuggestedInput
                                suggestion={suggestions['demographics.age']}
                                onAccept={(s) => handleAcceptSuggestion('demographics.age', s)}
                                lang={lang}
                                displayValue={Array.isArray(suggestions['demographics.age'])
                                    ? suggestions['demographics.age'].join(', ')
                                    : suggestions['demographics.age']}
                            >
                                <MultiChips options={formTranslations.section3.customerAgeOptions} value={form.demographics.age} onChange={v => update(['demographics', 'age'], v)} lang={lang} />
                            </SuggestedInput>
                        </div>
                        <div>
                            <Label className="text-[15px]" text={formTranslations.section3.q3_1B.gender} lang={lang} />
                            <SuggestedInput
                                suggestion={suggestions['demographics.gender']}
                                onAccept={(s) => handleAcceptSuggestion('demographics.gender', s)}
                                lang={lang}
                                displayValue={Array.isArray(suggestions['demographics.gender'])
                                    ? suggestions['demographics.gender'].join(', ')
                                    : suggestions['demographics.gender']}
                            >
                                <SingleChips options={formTranslations.section3.genderOptions} value={form.demographics.gender} onChange={v => update(['demographics', 'gender'], v)} lang={lang} />
                            </SuggestedInput>
                        </div>
                    </div>
                </div>
                <div className="mt-6 p-4 border rounded-lg relative">
                    <Label qIndex="3.3" text={formTranslations.section3.q3_2.text} lang={lang} />
                    <SuggestedInput
                        suggestion={suggestions.psychographics}
                        onAccept={(s) => handleAcceptSuggestion('psychographics', s)}
                        lang={lang}
                        displayValue={(() => {
                            const raw = suggestions.psychographics;
                            if (!raw) return undefined;
                            const ids = Array.isArray(raw) ? raw : [raw];
                            return ids.map(id => {
                                const opt = psychographicOptions.find(p => p.id === id);
                                return opt ? opt.title : id;
                            }).join(', ');
                        })()}
                    >
                        <PsychographicGrid options={filteredPsychographics} value={form.psychographics || []} onChange={(v) => update("psychographics", v)} lang={lang} />
                    </SuggestedInput>
                </div>
            </Section>

            <Section kIndex={4} title={formTranslations.section4.title} context={undefined} lang={lang} disabled={isImageBased}>
                <SuggestedInput suggestion={suggestions.usage} onAccept={(s) => handleAcceptSuggestion('usage', s)} lang={lang}>
                    <Label qIndex="4.1" text={formTranslations.section4.q4_1.text} lang={lang} />
                    <TextArea value={form.usage} onChange={v => update('usage', v)} placeholder={formTranslations.section4.q4_1.placeholder} lang={lang} />
                </SuggestedInput>
            </Section>

            <Section kIndex={5} title={formTranslations.section5.title} context={undefined} lang={lang} disabled={isImageBased}>
                <div className="space-y-4">
                    <SuggestedInput suggestion={suggestions.functionalBenefits} onAccept={(s) => handleAcceptSuggestion('functionalBenefits', s)} lang={lang}>
                        <Label qIndex="5.1" text={formTranslations.section5.q5_1.text} lang={lang} />
                        <TextArea
                            value={form.functionalBenefits}
                            onChange={v => update('functionalBenefits', v)}
                            placeholder={form.productType === 'food' ? formTranslations.section5.q5_1.placeholder_food : formTranslations.section5.q5_1.placeholder_nonfood}
                            lang={lang}
                        />
                    </SuggestedInput>
                    <SuggestedInput suggestion={suggestions.competitorBenefitDifference} onAccept={(s) => handleAcceptSuggestion('competitorBenefitDifference', s)} lang={lang}>
                        <Label qIndex="5.2" text={formTranslations.section5.q5_2.text} lang={lang} />
                        <TextArea value={form.competitorBenefitDifference} onChange={v => update('competitorBenefitDifference', v)} placeholder={formTranslations.section5.q5_2.placeholder} lang={lang} />
                    </SuggestedInput>
                    <SuggestedInput suggestion={suggestions.consumerExperienceAfter} onAccept={(s) => handleAcceptSuggestion('consumerExperienceAfter', s)} lang={lang}>
                        <Label qIndex="5.3" text={formTranslations.section5.q5_3.text} lang={lang} />
                        <div className="mt-2 flex flex-wrap gap-2">
                            {Object.values(experienceSuggestions).map((suggestion, index) => (
                                <button
                                    type="button"
                                    key={index}
                                    onClick={() => handleExperienceSuggestionClick(suggestion[lang] || suggestion.en)}
                                    className="bg-sky-100 text-sky-800 hover:bg-sky-200 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm transition"
                                >
                                    + <TranslatedText lang={lang} text={suggestion} />
                                </button>
                            ))}
                        </div>
                        <TextArea value={form.consumerExperienceAfter} onChange={v => update('consumerExperienceAfter', v)} placeholder={formTranslations.section5.q5_3.placeholder} lang={lang} />
                    </SuggestedInput>
                </div>
            </Section>

            <Section kIndex={6} title={formTranslations.section6.title} context={undefined} lang={lang} disabled={isImageBased}>
                <SuggestedInput suggestion={suggestions.competitors} onAccept={(s) => handleAcceptSuggestion('competitors', s)} lang={lang}>
                    <Label qIndex="6.1" text={formTranslations.section6.q6_1.text} lang={lang} />
                    <TextArea value={form.competitors} onChange={v => update('competitors', v)} placeholder={formTranslations.section6.q6_1.placeholder} lang={lang} />
                </SuggestedInput>
            </Section>

            <Section kIndex={7} title={formTranslations.section7.title} context={undefined} lang={lang} disabled={isImageBased}>
                <div className="space-y-4">
                    <div>
                        <Label qIndex="7.1" text={formTranslations.section7.q7_1.text} lang={lang} />
                        <div className="mt-2 space-y-3">
                            <div>
                                <Label text={formTranslations.section7.q7_1.category_tone} lang={lang} />
                                <SuggestedInput suggestion={suggestions.desiredImageryTone} onAccept={(s) => handleAcceptSuggestion('desiredImageryTone', s)} lang={lang}>
                                    <SingleChips options={formTranslations.section7.q7_1.options_tone} value={form.desiredImageryTone} onChange={v => update('desiredImageryTone', v)} lang={lang} />
                                </SuggestedInput>
                            </div>
                            <div>
                                <Label text={formTranslations.section7.q7_1.category_world} lang={lang} />
                                <SuggestedInput suggestion={suggestions.desiredImageryWorld} onAccept={(s) => handleAcceptSuggestion('desiredImageryWorld', s)} lang={lang}>
                                    <SingleChips options={formTranslations.section7.q7_1.options_world} value={form.desiredImageryWorld} onChange={v => update('desiredImageryWorld', v)} lang={lang} />
                                </SuggestedInput>
                            </div>
                            <div>
                                <Label text={formTranslations.section7.q7_1.category_attributes} lang={lang} />
                                <SuggestedInput suggestion={suggestions.desiredImageryAttributes} onAccept={(s) => handleAcceptSuggestion('desiredImageryAttributes', s)} lang={lang}>
                                    <MultiChips options={formTranslations.section7.q7_1.options_attributes} value={form.desiredImageryAttributes} onChange={v => update('desiredImageryAttributes', v)} lang={lang} maxSelections={2} />
                                </SuggestedInput>
                            </div>
                        </div>
                        {form.desiredImageryAttributes.includes('Other') && (
                            <TextInput value={form.desiredViewOther} onChange={v => update('desiredViewOther', v)} placeholder={formTranslations.specifyOther} lang={lang} />
                        )}
                    </div>
                    <div>
                        <Label qIndex="7.2" text={formTranslations.section7.q7_2.text} lang={lang} />
                        <SuggestedInput suggestion={suggestions.consumerViewPersona} onAccept={(s) => handleAcceptSuggestion('consumerViewPersona', s)} lang={lang}>
                            <SingleChips options={formTranslations.section7.q7_2.options} value={form.consumerViewPersona} onChange={v => update('consumerViewPersona', v)} lang={lang} />
                        </SuggestedInput>
                        {form.consumerViewPersona === 'Other' && (
                            <TextInput value={form.consumerViewPersonaOther} onChange={v => update('consumerViewPersonaOther', v)} placeholder={formTranslations.specifyOther} lang={lang} />
                        )}
                    </div>
                    <div>
                        <Label qIndex="7.3" text={formTranslations.section7.q7_4.text} lang={lang} />
                        <SuggestedInput suggestion={suggestions.adObjectives} onAccept={(s) => handleAcceptSuggestion('adObjectives', s)} lang={lang}>
                            <MultiChips options={formTranslations.section7.q7_4.options} value={form.adObjectives || []} onChange={handleAdObjectivesChange} lang={lang} maxSelections={2} />
                        </SuggestedInput>
                        {(form.adObjectives || []).length > 0 && (
                            <div className="mt-4 space-y-3">
                                {(form.adObjectives || []).map(key => (
                                    <div key={key}>
                                        <Label className="text-sm font-medium text-neutral-700" text={formTranslations.section7.q7_4.options[key]} lang={lang} />
                                        <TextInput
                                            value={form.adObjectiveDetails?.[key] || ''}
                                            onChange={text => update('adObjectiveDetails', (prev: any) => ({ ...prev, [key]: text }))}
                                            placeholder={formTranslations.section7.q7_4_details_placeholders[key as keyof typeof formTranslations.section7.q7_4_details_placeholders]}
                                            lang={lang}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <Label qIndex="7.4" text={formTranslations.section7.q7_5.text} hint={formTranslations.section7.q7_5.hint} lang={lang} />
                        <SuggestedInput suggestion={suggestions.adFocus} onAccept={(s) => handleAcceptSuggestion('adFocus', s)} lang={lang}>
                            <MultiChips options={formTranslations.section7.q7_5.options} value={form.adFocus || []} onChange={handleAdFocusChange} lang={lang} maxSelections={2} />
                        </SuggestedInput>

                        {(form.adFocus || []).length > 0 && (
                            <div className="mt-4 space-y-3">
                                {(form.adFocus || []).map(key => (
                                    <div key={key}>
                                        <Label className="text-sm font-medium text-neutral-700" text={formTranslations.section7.q7_5.options[key]} lang={lang} />
                                        <TextInput
                                            value={form.adFocusDetails?.[key] || ''}
                                            onChange={text => update('adFocusDetails', (prev: any) => ({ ...prev, [key]: text }))}
                                            placeholder={formTranslations.section7.q7_5_details_placeholders[key as keyof typeof formTranslations.section7.q7_5_details_placeholders]}
                                            lang={lang}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {(form.adFocus || []).length > 0 && (
                            <p className="mt-2 text-xs text-neutral-500">
                                <strong><TranslatedText lang={lang} text={formTranslations.section7.q7_5.priority} /></strong>
                                {(form.adFocus || [])
                                    .map((f, i) => {
                                        const optionData = formTranslations.section7.q7_5.options[f];
                                        return `${i + 1}. ${optionData?.[lang] || optionData?.en || f}`;
                                    }).join('; ')}
                            </p>
                        )}
                    </div>
                </div>
            </Section>

            <Section kIndex="" title={formTranslations.salespersonSection.title} context={formTranslations.salespersonSection.context} lang={lang}>
                <div className="space-y-4">
                    <div>
                        <Label qIndex="" text={formTranslations.salespersonSection.salesperson} lang={lang} required />
                        <div className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-3 text-[15px] bg-slate-50 text-slate-700">
                            {selectedSalesperson || <span className="text-slate-400">Selected from start screen</span>}
                        </div>
                    </div>
                    <div>
                        <Label qIndex="" text={formTranslations.salespersonSection.customerID} lang={lang} />
                        <TextInput value={form.customerID || ''} onChange={v => update('customerID', v)} placeholder={formTranslations.salespersonSection.customerIDPlaceholder} lang={lang} />
                    </div>
                    <div>
                        <Label qIndex="" text={formTranslations.section1.q1_4.packForm.text} lang={lang} />
                        <SingleChips options={formTranslations.section1.q1_4.packForm.options} value={form.productPackForm} onChange={v => update('productPackForm', v)} lang={lang} />
                        {form.productPackForm === 'Other' && (
                            <TextInput value={form.productPackFormOther} onChange={v => update('productPackFormOther', v)} placeholder={formTranslations.specifyOther} lang={lang} />
                        )}
                    </div>
                    <ImageUploader
                        uploadedImages={packImages}
                        onImagesChange={setPackImages}
                        lang={lang}
                        title={formTranslations.section1.q1_4.packImages.title}
                    />
                </div>
            </Section>

            <div className="mt-6 flex gap-3">
                <button type="submit" disabled={isSubmitting} className="flex-1 h-12 inline-flex justify-center items-center px-4 border border-teal-700 text-sm font-bold rounded-md shadow-sm text-teal-700 bg-white hover:bg-teal-700 hover:text-white disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-200 transition-colors uppercase tracking-wide">
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

export default BrandForm;
