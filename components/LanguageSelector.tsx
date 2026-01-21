import React from 'react';
import { Language } from '../types.ts';

interface LanguageSelectorProps {
  lang: Language;
  setLang: (l: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ lang, setLang }) => {
    const languages: { code: Language, name: string }[] = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'हिन्दी (Hindi)' },
        { code: 'ta', name: 'தமிழ் (Tamil)' },
        { code: 'te', name: 'తెలుగు (Telugu)' },
        { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    ];
    return (
        <div className="relative">
            <select
                id="language-selector"
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="block appearance-none w-full bg-white border border-slate-300 hover:border-slate-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
                {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
    );
};

export default LanguageSelector;