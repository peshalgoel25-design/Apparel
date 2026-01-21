
import React from 'react';
import { Language } from '../types.ts';
import { formTranslations } from '../data/translations.ts';
import { psychographicOptions } from '../data/psychographics.ts';
import { TranslatedText } from './FormElements.tsx';

interface PsychographicGridProps {
  options: { id: string; imageUrl: string; title: string; desc: string, category: string }[];
  value: string[];
  onChange: (v: string[]) => void;
  lang: Language;
}

const PsychographicGrid: React.FC<PsychographicGridProps> = ({ options, value, onChange, lang }) => {
  const toggle = (id: string) => {
    const clickedOption = psychographicOptions.find(o => o.id === id);
    if (!clickedOption) return;

    const category = clickedOption.category;

    if (value.includes(id)) {
      onChange(value.filter((x) => x !== id));
    } else {
      const selectedInCategory = value.filter(selectedId => {
        const option = psychographicOptions.find(o => o.id === selectedId);
        return option?.category === category;
      }).length;

      if (selectedInCategory < 2) {
        onChange([...value, id]);
      }
    }
  }

  const groupedOptions = options.reduce((acc, option) => {
    (acc[option.category] = acc[option.category] || []).push(option);
    return acc;
  }, {} as Record<string, typeof options>);

  const categoryOrder = ['men', 'women', 'youth_boys', 'youth_girls', 'kids'];

  const selectedCountsPerCategory = value.reduce((acc, selectedId) => {
    const option = psychographicOptions.find(o => o.id === selectedId);
    if (option) {
      acc[option.category] = (acc[option.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="mt-3 space-y-4">
      {categoryOrder.map(categoryKey => {
        if (!groupedOptions[categoryKey]) return null;
        return (
          <details key={categoryKey} open className="group border border-neutral-200 rounded-lg bg-white shadow-sm">
            <summary className="p-4 font-semibold text-neutral-800 cursor-pointer list-none flex justify-between items-center">
              <span className="capitalize"><TranslatedText lang={lang} text={formTranslations.section3.q3_2[`category_${categoryKey}`]} /></span>
              <svg className="w-5 h-5 text-slate-500 transition-transform duration-200 transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </summary>
            <div className="p-4 border-t border-neutral-200">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {groupedOptions[categoryKey]?.map((o) => {
                  const isSelected = value.includes(o.id);
                  const categoryCount = selectedCountsPerCategory[o.category] || 0;
                  const isDisabled = !isSelected && categoryCount >= 2;

                  return (
                    <button
                      type="button"
                      key={o.id}
                      onClick={() => toggle(o.id)}
                      disabled={isDisabled}
                      className={`flex flex-col rounded-lg border text-left transition-all duration-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 min-h-[220px] ${isSelected
                          ? "border-indigo-600 ring-2 ring-indigo-500 shadow-sm"
                          : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <div className="aspect-[4/3] w-full bg-slate-100 flex-shrink-0">
                        <img src={o.imageUrl} alt={o.title} className="w-full h-full object-cover object-top" loading="lazy" />
                      </div>
                      <div className="p-2 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="text-[13px] font-bold text-neutral-900 leading-tight line-clamp-2 min-h-[32px]">{o.title}</div>
                          <div className="mt-1 text-[11px] text-neutral-500 leading-tight line-clamp-2 min-h-[28px]">{o.desc}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
};

export default PsychographicGrid;
