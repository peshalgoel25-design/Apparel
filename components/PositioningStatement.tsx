import React, { useState, useEffect } from 'react';
import { diffWordsWithSpace } from 'diff';
import { BrandDescriptionResponse, Language, Suggestion } from '../types.ts';
import { translations, addTranslations } from '../data/translations.ts';
import { TextArea, TranslatedText } from './FormElements.tsx';
import { stripHtml } from '../utils.ts';

interface PositioningStatementProps {
    brandDescriptionResponse: BrandDescriptionResponse;
    isEditingPositioning: boolean;
    editablePositioning: string;
    setEditablePositioning: (value: string) => void;
    handleSavePositioning: () => void;
    handleEditPositioning: () => void;
    isGeneratingPillars: boolean;
    handleGeneratePillars: () => void;
    onCancel: () => void;
    onShare: () => void;
    lang: Language;
    previousPositioning: string | null;
    isViewingPreviousPositioning: boolean;
    setIsViewingPreviousPositioning: (viewing: boolean) => void;
    rewriteDescription: (original: string, suggestions: string[]) => Promise<string>;
    onPositioningUpdate: (newPositioning: string) => void;
    hideGeneratePillars?: boolean;
    handleGenerateWorlds?: () => void;
    isGeneratingWorlds?: boolean;
    hasWorlds?: boolean;
    worldError?: string | null;
}

const markdownToHtml = (text: string): string => {
    if (!text) return '';
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};

const HighlightedDiff: React.FC<{ oldStr: string; newStr: string }> = ({ oldStr, newStr }) => {
    const differences = diffWordsWithSpace(oldStr, newStr);
    return (
        <div className="whitespace-pre-wrap text-sm leading-relaxed prose prose-sm max-w-none">
            {differences.map((part, index) => {
                if (part.removed) return null;
                const style = part.added ? {
                    backgroundColor: 'rgba(187, 247, 208, 1)',
                    padding: '0.1em 0.2em',
                    borderRadius: '4px',
                    margin: '0 1px',
                } : {};
                return <span key={index} style={style} dangerouslySetInnerHTML={{ __html: markdownToHtml(part.value) }} />;
            })}
        </div>
    );
};


const PositioningStatement: React.FC<PositioningStatementProps> = ({
    brandDescriptionResponse,
    isEditingPositioning,
    editablePositioning,
    setEditablePositioning,
    handleSavePositioning,
    handleEditPositioning,
    isGeneratingPillars,
    handleGeneratePillars,
    onCancel,
    onShare,
    lang,
    previousPositioning,
    isViewingPreviousPositioning,
    setIsViewingPreviousPositioning,
    rewriteDescription,
    onPositioningUpdate,
    hideGeneratePillars,
    handleGenerateWorlds,
    isGeneratingWorlds,
    hasWorlds,
    worldError,
}) => {
    const [isCopied, setIsCopied] = useState(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isRewriting, setIsRewriting] = useState(false);
    const [isDiffModalOpen, setIsDiffModalOpen] = useState(false);
    const [revisedDescription, setRevisedDescription] = useState('');
    const [originalDescriptionForDiff, setOriginalDescriptionForDiff] = useState('');
    const [isEditingRevised, setIsEditingRevised] = useState(false);

    useEffect(() => {
        if (brandDescriptionResponse?.engine_assessment && typeof brandDescriptionResponse.engine_assessment === 'object' && Object.keys(brandDescriptionResponse.engine_assessment).length > 0) {
            const initialSuggestions = Object.values(brandDescriptionResponse.engine_assessment).map((text, index) => ({
                id: index,
                text,
                status: 'pending' as const,
            }));
            setSuggestions(initialSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [brandDescriptionResponse?.engine_assessment]);

    const handleSuggestionStatusChange = (id: number, newStatus: Suggestion['status']) => {
        setSuggestions(currentSuggestions => currentSuggestions.map(s => s.id === id ? { ...s, status: newStatus } : s));
    };

    const handleAcceptAll = () => setSuggestions(s => s.map(i => ({ ...i, status: 'accepted' })));
    const handleIgnoreAll = () => setSuggestions(s => s.map(i => ({ ...i, status: 'ignored' })));

    const handlePreviewUpdate = async () => {
        setIsRewriting(true);
        const originalText = typeof brandDescriptionResponse.positioning === 'string'
            ? brandDescriptionResponse.positioning
            : (brandDescriptionResponse.positioning?.[`${lang}_positioning`] || brandDescriptionResponse.positioning?.english_positioning || '');

        const acceptedSuggestions = suggestions.filter(s => s.status === 'accepted').map(s => s.text);

        try {
            const newDescription = await rewriteDescription(originalText, acceptedSuggestions);
            setOriginalDescriptionForDiff(originalText);
            setRevisedDescription(newDescription);
            setIsEditingRevised(false);
            setIsDiffModalOpen(true);
        } catch (error) {
            console.error("Failed to rewrite description", error);
        } finally {
            setIsRewriting(false);
        }
    };

    const handleCloseModal = () => {
        setIsDiffModalOpen(false);
        setIsEditingRevised(false);
    };

    const handleUseThisVersion = () => {
        onPositioningUpdate(revisedDescription);
        handleCloseModal();
    };

    const hasAcceptedSuggestions = suggestions.some(s => s.status === 'accepted');

    const handleCopy = () => {
        const positioningText = typeof brandDescriptionResponse.positioning === 'string'
            ? brandDescriptionResponse.positioning
            : (brandDescriptionResponse.positioning?.[`${lang}_positioning`] || brandDescriptionResponse.positioning?.english_positioning || '');

        const plainText = stripHtml(positioningText);

        navigator.clipboard.writeText(plainText).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    const positioningText = typeof brandDescriptionResponse.positioning === 'string'
        ? brandDescriptionResponse.positioning
        : (brandDescriptionResponse.positioning?.[`${lang}_positioning`] || brandDescriptionResponse.positioning?.english_positioning || '');


    return (
        <>
            <div className="mt-10 p-6 bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-slate-800 mb-4"><TranslatedText lang={lang} text={translations.positioningStatementTitle} /></h2>
                    {!isEditingPositioning && (
                        <div className="flex items-center gap-2">
                            {previousPositioning && (
                                <button onClick={() => setIsViewingPreviousPositioning(true)} className="px-3 py-1 text-slate-600 text-xs font-medium rounded-md hover:bg-slate-200 border border-slate-300">
                                    <TranslatedText lang={lang} text={translations.viewOriginal} />
                                </button>
                            )}
                            <button onClick={handleCopy} className="px-3 py-1 bg-slate-200 text-slate-800 text-xs font-medium rounded-md hover:bg-slate-300">
                                {isCopied ? 'Copied!' : 'Copy'}
                            </button>
                            <button onClick={onShare} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-md hover:bg-blue-200">Share</button>
                            <button onClick={handleEditPositioning} className="px-3 py-1 bg-slate-200 text-slate-800 text-xs font-medium rounded-md hover:bg-slate-300">
                                <TranslatedText lang={lang} text={translations.edit} />
                            </button>
                        </div>
                    )}
                </div>
                {isEditingPositioning ? (
                    <>
                        <TextArea value={editablePositioning} onChange={setEditablePositioning} lang={lang} placeholder={addTranslations('Edit positioning...', 'पोजिशनिंग संपादित करें...', 'நிலையைத் திருத்து...', 'స్థానాన్ని సవరించండి...', 'પોઝિશનિંગમાં ફેરફાર કરો...')} rows={6} />
                        <div className="mt-2 flex justify-end gap-2">
                            <button onClick={() => handleEditPositioning()} className="px-4 py-2 bg-slate-200 text-slate-800 text-sm font-medium rounded-md hover:bg-slate-300">
                                <TranslatedText lang={lang} text={translations.cancel} />
                            </button>
                            <button onClick={handleSavePositioning} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">
                                <TranslatedText lang={lang} text={translations.save} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="space-y-4 text-sm text-slate-700 whitespace-pre-wrap prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: markdownToHtml(positioningText) }} />
                )}

                {!isEditingPositioning && suggestions.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-slate-200">
                        <div className="p-4 bg-sky-50 border border-sky-200 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-base font-semibold text-sky-800 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM5.636 5.636a.75.75 0 011.06 0l1.061 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM2 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 012 10zm11.06 4.364a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM10 18a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5A.75.75 0 0110 18zm3.364-2.94a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.06 1.06l1.06 1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010 1.5h1.5A.75.75 0 0118 10zm-2.94-4.364a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0z" clipRule="evenodd" /><path d="M10 4.5c-2.73 0-5.462 2.13-6.163 4.813a.75.75 0 001.478.374c.466-1.848 2.55-3.187 4.685-3.187 2.136 0 4.22 1.34 4.685 3.187a.75.75 0 001.478-.374C15.462 6.63 12.73 4.5 10 4.5z" /></svg>
                                    <TranslatedText lang={lang} text={translations.brandDescriptionSuggestionsTitle} />
                                </h3>
                                <div className="flex items-center gap-2">
                                    <button onClick={handleAcceptAll} className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-md hover:bg-green-700"><TranslatedText lang={lang} text={translations.acceptAll} /></button>
                                    <button onClick={handleIgnoreAll} className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-md hover:bg-red-700"><TranslatedText lang={lang} text={translations.ignoreAll} /></button>
                                </div>
                            </div>
                            <ul className="space-y-3 list-none text-sm text-slate-700">
                                {suggestions.map(suggestion => {
                                    const parts = suggestion.text.split(/:(.*)/s);
                                    const title = parts[0];
                                    const body = parts[1] ? parts[1].trim() : '';
                                    return (
                                        <li key={suggestion.id} className="p-3 bg-white rounded-md border flex items-start gap-4">
                                            <p className="flex-grow"><strong className="font-semibold text-slate-800">{title}:</strong> {body}</p>
                                            <div className="flex-shrink-0 flex items-center gap-2">
                                                {suggestion.status === 'pending' && (
                                                    <>
                                                        <button onClick={() => handleSuggestionStatusChange(suggestion.id, 'accepted')} className="flex items-center gap-1 text-green-700 font-semibold text-xs px-2 py-1 rounded hover:bg-green-100"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg><TranslatedText lang={lang} text={translations.accept} /></button>
                                                        <button onClick={() => handleSuggestionStatusChange(suggestion.id, 'ignored')} className="flex items-center gap-1 text-red-700 font-semibold text-xs px-2 py-1 rounded hover:bg-red-100"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg><TranslatedText lang={lang} text={translations.ignore} /></button>
                                                    </>
                                                )}
                                                {suggestion.status === 'accepted' && (
                                                    <>
                                                        <span className="text-green-700 font-bold text-xs"><TranslatedText lang={lang} text={translations.accepted} /></span>
                                                        <button onClick={() => handleSuggestionStatusChange(suggestion.id, 'pending')} className="text-blue-600 text-xs font-semibold hover:underline"><TranslatedText lang={lang} text={translations.undo} /></button>
                                                    </>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="mt-4 flex justify-center">
                                <button
                                    onClick={handlePreviewUpdate}
                                    disabled={!hasAcceptedSuggestions || isRewriting}
                                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
                                >
                                    {isRewriting ? <TranslatedText lang={lang} text={translations.rewriting} /> : <TranslatedText lang={lang} text={translations.previewUpdate} />}
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {!hideGeneratePillars && (
                    <div className="mt-6 flex justify-center items-center gap-4">
                        <button
                            onClick={handleGeneratePillars}
                            disabled={isGeneratingPillars || isEditingPositioning}
                            className="w-full inline-flex justify-center items-center px-8 py-3 border border-teal-700 text-base font-medium rounded-md shadow-sm text-teal-700 bg-white hover:bg-teal-700 hover:text-white disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-200 transition-colors"
                        >
                            {isGeneratingPillars ? <TranslatedText lang={lang} text={translations.generating} /> : <TranslatedText lang={lang} text={translations.generateAdPillars} />}
                        </button>
                        {isGeneratingPillars && (
                            <button type="button" onClick={onCancel} className="w-full inline-flex justify-center items-center px-8 py-3 border border-slate-300 text-base font-medium rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50">
                                <TranslatedText lang={lang} text={translations.cancel} />
                            </button>
                        )}
                    </div>
                )}

                {handleGenerateWorlds && (
                    <div className="mt-6 flex justify-center items-center gap-4 border-t border-slate-200 pt-6">
                        <button
                            onClick={handleGenerateWorlds}
                            disabled={isGeneratingWorlds || isEditingPositioning}
                            className="w-full inline-flex justify-center items-center px-8 py-3 border border-teal-700 text-base font-medium rounded-md shadow-sm text-teal-700 bg-white hover:bg-teal-700 hover:text-white disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-200 transition-colors"
                        >
                            {isGeneratingWorlds ? (
                                <>
                                    <div className="loader mr-2 border-teal-700 border-t-transparent"></div>
                                    <TranslatedText lang={lang} text={translations.generating} />
                                </>
                            ) : (
                                hasWorlds ? "Regenerate Worlds" : "Generate Worlds"
                            )}
                        </button>
                        {isGeneratingWorlds && onCancel && (
                            <button type="button" onClick={onCancel} className="w-full inline-flex justify-center items-center px-8 py-3 border border-slate-300 text-base font-medium rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50">
                                <TranslatedText lang={lang} text={translations.cancel} />
                            </button>
                        )}
                    </div>
                )}
                {handleGenerateWorlds && worldError && (
                    <div className="mt-2 text-center text-red-600 text-sm font-medium">
                        {worldError}
                    </div>
                )}
            </div>

            {isDiffModalOpen && (
                <div className="modal-overlay">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pr-4 -mr-4 items-start">
                            <div>
                                <h4 className="text-lg font-semibold text-slate-800 mb-3 sticky top-0 bg-white pb-2 border-b"><TranslatedText lang={lang} text={translations.originalDescription} /></h4>
                                <div className="whitespace-pre-wrap text-sm text-slate-600 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: markdownToHtml(originalDescriptionForDiff) }} />
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <div className="flex justify-between items-center mb-3 sticky top-0 bg-slate-50 pb-2 border-b">
                                    <h4 className="text-lg font-semibold text-slate-800">
                                        <TranslatedText lang={lang} text={translations.revisedDescription} />
                                    </h4>
                                    <button
                                        onClick={() => setIsEditingRevised(!isEditingRevised)}
                                        className="px-3 py-1 bg-slate-200 text-slate-800 text-xs font-medium rounded-md hover:bg-slate-300"
                                    >
                                        <TranslatedText lang={lang} text={isEditingRevised ? translations.cancel : translations.edit} />
                                    </button>
                                </div>
                                {isEditingRevised ? (
                                    <TextArea
                                        value={revisedDescription}
                                        onChange={setRevisedDescription}
                                        lang={lang}
                                        placeholder={addTranslations("Edit revised description...", "संशोधित विवरण संपादित करें...", "திருத்தப்பட்ட விளக்கத்தைத் திருத்தவும்...", "సవరించిన వివరణను సవరించండి...", "સુધારેલા વર્ણનને સંપાદિત કરો...")}
                                        rows={10}
                                    />
                                ) : (
                                    <HighlightedDiff oldStr={originalDescriptionForDiff} newStr={revisedDescription} />
                                )}
                            </div>
                        </div>
                        <div className="mt-6 flex-shrink-0 flex justify-end gap-3">
                            <button onClick={handleCloseModal} className="px-6 py-2 bg-slate-200 rounded-md shadow hover:bg-slate-300 font-semibold text-slate-800"><TranslatedText lang={lang} text={translations.cancel} /></button>
                            <button onClick={handleUseThisVersion} className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 font-semibold"><TranslatedText lang={lang} text={translations.useThis} /></button>
                        </div>
                    </div>
                </div>
            )}

            {isViewingPreviousPositioning && previousPositioning && (
                <div className="modal-overlay" onClick={() => setIsViewingPreviousPositioning(false)}>
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-bold text-slate-800 mb-4"><TranslatedText lang={lang} text={translations.originalVersion} /></h3>
                        <div className="overflow-y-auto pr-2 space-y-4 text-sm text-slate-700 whitespace-pre-wrap prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: markdownToHtml(previousPositioning) }} />
                        <button onClick={() => setIsViewingPreviousPositioning(false)} className="mt-6 w-full px-6 py-2 bg-slate-200 rounded-md shadow hover:bg-slate-300">
                            <TranslatedText lang={lang} text={translations.close} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default PositioningStatement;