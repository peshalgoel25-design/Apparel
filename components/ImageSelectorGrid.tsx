import React from 'react';
import { Language, MultilingualText } from '../types.ts';
import { TranslatedText } from './FormElements.tsx';

interface ImageSelectorGridProps {
  options: { id: string; imageUrl: string; title: MultilingualText; }[];
  value: string[];
  onChange: (v: string[]) => void;
  lang: Language;
  maxSelections?: number;
}

const ImageSelectorGrid: React.FC<ImageSelectorGridProps> = ({ options, value = [], onChange, lang, maxSelections = 2 }) => {
  const toggle = (id: string) => {
    const currentValue = value || [];
    if (currentValue.includes(id)) {
      onChange(currentValue.filter((x) => x !== id));
    } else {
      if (currentValue.length >= maxSelections) {
        const newSelection = [...currentValue.slice(1), id];
        onChange(newSelection);
      } else {
        onChange([...currentValue, id]);
      }
    }
  }

  return (
    <div className="mt-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {options.map((o) => {
          const isSelected = value.includes(o.id);
          const isDisabled = !isSelected && value.length >= maxSelections;
          
          return (
            <button
              type="button"
              key={o.id}
              onClick={() => toggle(o.id)}
              disabled={isDisabled}
              className={`block rounded-lg border text-left transition-all duration-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSelected
                  ? "border-indigo-600 ring-2 ring-indigo-500"
                  : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md"
              } disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:ring-0 disabled:hover:border-neutral-200 h-full`}
            >
              <div className="aspect-square w-full bg-slate-100">
                <img src={o.imageUrl} alt={o.title.en} className="w-full h-full object-cover object-top" loading="lazy" width="200" height="200" />
              </div>
              <div className="p-2">
                <div className="text-sm font-medium text-neutral-900"><TranslatedText lang={lang} text={o.title} /></div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ImageSelectorGrid;
