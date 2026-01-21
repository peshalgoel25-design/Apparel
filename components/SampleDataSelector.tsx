import React from 'react';
import { MultilingualText, Language } from '../types.ts';

interface SampleDataSelectorProps {
  sampleProfiles: { name: MultilingualText, data: any, category: 'fmcg' | 'industrial' | 'apparels' }[];
  onSelect: (data: any, name: MultilingualText, category: 'fmcg' | 'industrial' | 'apparels') => void;
  lang: Language;
  translations: any;
  disabled?: boolean;
}

const SampleDataSelector: React.FC<SampleDataSelectorProps> = ({ sampleProfiles, onSelect, lang, translations, disabled }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(event.target.value, 10);
    if (!isNaN(index) && sampleProfiles[index]) {
      onSelect(sampleProfiles[index].data, sampleProfiles[index].name, sampleProfiles[index].category);
      event.target.value = "";
    }
  };

  return (
    <div className="relative w-full sm:w-auto sm:flex-1">
      <select
        defaultValue=""
        onChange={handleChange}
        className="w-full h-full appearance-none bg-white border border-slate-300 text-slate-700 text-base font-medium rounded-md shadow-sm px-6 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-slate-50 cursor-pointer disabled:bg-slate-200 disabled:cursor-not-allowed"
        aria-label="Select a sample brand to load"
        disabled={disabled}
      >
        <option value="" disabled>
          {translations.selectSamplePrompt[lang] || translations.selectSamplePrompt.en}
        </option>
        {sampleProfiles.map((profile, index) => (
          <option key={index} value={index}>
            {profile.name[lang] || profile.name.en}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
      </div>
    </div>
  );
};

export default SampleDataSelector;