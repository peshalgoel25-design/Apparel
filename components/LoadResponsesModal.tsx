
import React, { useState, useEffect } from 'react';
import { Language, PastSubmission } from '../types.ts';
import { translations } from '../data/translations.ts';
import { TranslatedText } from './FormElements.tsx';

interface LoadResponsesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoad: (submission: PastSubmission) => void;
    lang: Language;
    regions: readonly string[];
    regionSalespersons: Record<string, string[]>;
    selectedRegion: string;
    selectedSalesperson: string;
    searchResults: PastSubmission[];
    isLoadingUsers: boolean;
    isSearching: boolean;
    isLoadingFullSubmission: boolean;
    error: string | null;
    searchDiscussions: (date: string, salesperson: string, category: string) => void;
    category?: 'fmcg' | 'industrial' | null;
}

const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const LoadResponsesModal: React.FC<LoadResponsesModalProps> = ({
    isOpen, onClose, onLoad, lang, regions, regionSalespersons,
    selectedRegion, selectedSalesperson, searchResults,
    isLoadingUsers, isSearching, isLoadingFullSubmission, error, searchDiscussions, category
}) => {
    const [searchDate, setSearchDate] = useState(getTodayDateString());
    const [searchRegion, setSearchRegion] = useState(selectedRegion || '');
    const [searchSalesperson, setSearchSalesperson] = useState(selectedSalesperson || '');
    const [searchCategory, setSearchCategory] = useState<'fmcg' | 'industrial' | ''>('');
    const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setSelectedSubmissionId(null);
            // Default to current selections when opening
            setSearchCategory(category || ''); // Requirement: select first
            setSearchRegion(selectedRegion || '');
            setSearchSalesperson(selectedSalesperson || '');
        } else {
            setSearchDate(getTodayDateString());
        }
    }, [isOpen, selectedRegion, selectedSalesperson, category]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchCategory) return;
        searchDiscussions(searchDate, searchSalesperson, searchCategory);
    };

    const handleLoad = () => {
        const selectedSubmission = searchResults.find(r => r.executionId === selectedSubmissionId);
        if (selectedSubmission) {
            onLoad(selectedSubmission);
        }
    };

    if (!isOpen) return null;

    const modalTranslations = translations.loadResponsesModal;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-800"><TranslatedText lang={lang} text={modalTranslations.title} /></h3>
                    <button onClick={onClose} className="p-1 -m-1 text-3xl leading-none text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full">&times;</button>
                </div>

                <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 p-4 border rounded-lg bg-slate-50">
                    <div className="w-full sm:col-span-2">
                        <label htmlFor="search-category" className="block text-sm font-medium text-neutral-700"><TranslatedText lang={lang} text={modalTranslations.categoryLabel} /></label>
                        <select
                            id="search-category"
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value as any)}
                            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none ring-neutral-300 focus:ring-2 bg-white"
                            required
                        >
                            <option value="">Select Category...</option>
                            <option value="fmcg">{modalTranslations.fmcgOption[lang]}</option>
                            <option value="industrial">{modalTranslations.industrialOption[lang]}</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label htmlFor="search-date" className="block text-sm font-medium text-neutral-700"><TranslatedText lang={lang} text={modalTranslations.dateLabel} /></label>
                        <input
                            id="search-date"
                            type="date"
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
                            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none ring-neutral-300 focus:ring-2"
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="search-region" className="block text-sm font-medium text-neutral-700"><TranslatedText lang={lang} text={modalTranslations.regionLabel} /></label>
                        <select
                            id="search-region"
                            value={searchRegion}
                            onChange={(e) => {
                                setSearchRegion(e.target.value);
                                setSearchSalesperson('');
                            }}
                            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none ring-neutral-300 focus:ring-2 bg-white"
                        >
                            <option value="">{modalTranslations.regionPlaceholder[lang]}</option>
                            {regions.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                    <div className="w-full sm:col-span-2">
                        <label htmlFor="search-salesperson" className="block text-sm font-medium text-neutral-700"><TranslatedText lang={lang} text={modalTranslations.salespersonLabel} /></label>
                        <select
                            id="search-salesperson"
                            value={searchSalesperson}
                            onChange={(e) => setSearchSalesperson(e.target.value)}
                            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none ring-neutral-300 focus:ring-2 bg-white"
                            disabled={isLoadingUsers || !searchRegion}
                        >
                            <option value="">{modalTranslations.salespersonPlaceholder[lang]}</option>
                            {searchRegion && regionSalespersons[searchRegion]?.map(sp => (
                                <option key={sp} value={sp}>{sp}</option>
                            ))}
                        </select>
                    </div>
                    <div className="sm:col-span-2">
                        <button type="submit" disabled={isSearching || !searchCategory || (!searchDate && !searchSalesperson)} className="w-full px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 disabled:bg-slate-400">
                            <TranslatedText lang={lang} text={modalTranslations.findResponses} />
                        </button>
                    </div>
                </form>

                <div className="flex-grow overflow-y-auto pr-2 -mr-2 space-y-3">
                    {isSearching && (
                        <div className="text-center p-8 text-slate-500">
                            <div className="loader mx-auto mb-2"></div>
                            <TranslatedText lang={lang} text={modalTranslations.fetchingResponses} />
                        </div>
                    )}
                    {!isSearching && error && (
                        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            <strong className="font-bold"><TranslatedText lang={lang} text={translations.errorTitle} />: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    {!isSearching && !error && searchResults.length === 0 && (
                        <div className="text-center p-8 text-slate-500">
                            <TranslatedText lang={lang} text={modalTranslations.noResponsesFound} />
                        </div>
                    )}
                    {!isSearching && !error && searchResults.length > 0 && (
                        searchResults.map(result => (
                            <div
                                key={result.executionId}
                                onClick={() => setSelectedSubmissionId(result.executionId)}
                                className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedSubmissionId === result.executionId ? 'bg-indigo-50 border-indigo-400 shadow-md' : 'bg-white hover:bg-slate-50'}`}
                            >
                                <div className="flex items-start gap-3">
                                    <input
                                        type="radio"
                                        name="submission-selection"
                                        id={`submission-${result.executionId}`}
                                        checked={selectedSubmissionId === result.executionId}
                                        onChange={() => setSelectedSubmissionId(result.executionId)}
                                        className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <label htmlFor={`submission-${result.executionId}`} className="flex-1 cursor-pointer">
                                        <p className="font-semibold text-slate-800">{result.brandName || 'Untitled'}</p>
                                        <div className="grid grid-cols-2 gap-x-4 mt-2 text-xs text-slate-500">
                                            <p><strong>Date:</strong> {result.timestamp || 'N/A'}</p>
                                            <p><strong>Salesperson:</strong> {result.salesperson || 'N/A'}</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-6 flex-shrink-0">
                    <button
                        onClick={handleLoad}
                        disabled={!selectedSubmissionId || isLoadingFullSubmission}
                        className="w-full px-8 py-3 bg-green-600 text-white font-medium rounded-md shadow hover:bg-green-700 disabled:bg-slate-400 flex justify-center items-center"
                    >
                        {isLoadingFullSubmission ? (
                            <div
                                className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"
                                role="status"
                                aria-live="polite"
                            >
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            <TranslatedText lang={lang} text={modalTranslations.useThisResponse} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoadResponsesModal;
