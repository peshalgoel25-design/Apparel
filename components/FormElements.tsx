


import React from 'react';
import { MultilingualText, Language } from '../types.ts';
import { formTranslations } from '../data/translations.ts';

export const TranslatedText: React.FC<{ lang: string, text: MultilingualText, className?: string }> = ({ lang, text, className = '' }) => {
  if (!text) return null;
  const displayText = text[lang] || text.en;
  const subDisplayText = (lang !== 'en' && text.en) ? text.en : null;

  if (subDisplayText) {
    return (
      <span className={`${className} flex flex-col items-start`}>
        <span>{displayText}</span>
        <span className="opacity-60 text-[0.9em] mt-0.5 leading-tight">{subDisplayText}</span>
      </span>
    );
  }
  return <span className={className}>{displayText}</span>;
};

export const Section: React.FC<{ kIndex?: number | string, title: MultilingualText, context?: MultilingualText, children: React.ReactNode, lang: Language, disabled?: boolean }> = ({ kIndex, title, context, children, lang, disabled = false }) => (
  <section className={`mb-8 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-opacity ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
    <fieldset disabled={disabled} className="space-y-4">
      <header className="mb-3">
        <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
          {typeof kIndex === 'number' || (typeof kIndex === 'string' && kIndex !== '') ? `${kIndex}. ` : ""}<TranslatedText lang={lang} text={title} className="inline" />
        </h2>
        {context && (
          <p className="mt-1 text-[13px] leading-relaxed text-neutral-500">
            <TranslatedText lang={lang} text={context} />
          </p>
        )}
      </header>
      {children}
    </fieldset>
  </section>
);

export const Label: React.FC<{ qIndex?: string, text: MultilingualText, hint?: MultilingualText, required?: boolean, lang: Language, className?: string }> = ({ qIndex, text, hint, required, lang, className }) => (
  <div className={className}>
    <label className="block text-[15px] font-medium text-neutral-900">
      {qIndex ? `${qIndex} ` : ""}<TranslatedText lang={lang} text={text} className="inline" />
      {required ? <span className="ml-1 text-red-500">*</span> : null}
    </label>
    {hint && (
      <p className="mt-1 text-xs leading-relaxed text-neutral-500">
        <TranslatedText lang={lang} text={hint} />
      </p>
    )}
  </div>
);

export const TextInput: React.FC<{ value: string, onChange: (v: string) => void, placeholder?: MultilingualText | string, lang?: Language, disabled?: boolean, required?: boolean, id?: string }> = ({ value, onChange, placeholder, lang, disabled, required, id }) => {
  const getPlaceholder = () => {
    if (!placeholder) return '';
    if (typeof placeholder === 'string') return placeholder;
    if (lang) return placeholder[lang] || placeholder.en;
    return placeholder.en || '';
  };

  return (
    <input
      className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-[15px] outline-none ring-neutral-300 focus:ring-2 disabled:bg-slate-100 disabled:text-neutral-500 min-h-[48px] shadow-sm transition-all focus:border-indigo-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={getPlaceholder()}
      disabled={disabled}
      required={required}
      id={id}
    />
  );
};

export const TextArea: React.FC<{ value: string, onChange: (v: string) => void, placeholder?: MultilingualText | string, lang?: Language, rows?: number, disabled?: boolean, required?: boolean, id?: string }> = ({ value, onChange, placeholder, lang, rows = 3, disabled, required, id }) => {
  const getPlaceholder = () => {
    if (!placeholder) return '';
    if (typeof placeholder === 'string') return placeholder;
    if (lang) return placeholder[lang] || placeholder.en;
    return placeholder.en || '';
  };

  return (
    <textarea
      rows={rows}
      className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 text-[15px] outline-none ring-neutral-300 focus:ring-2 disabled:bg-slate-100 disabled:text-neutral-500 min-h-[60px] shadow-sm transition-all focus:border-indigo-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={getPlaceholder()}
      disabled={disabled}
      required={required}
      id={id}
    />
  );
};

export const Chip: React.FC<{ active: boolean, onClick: () => void, children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`${active
      ? "bg-neutral-900 text-white shadow-md"
      : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
      } inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-medium transition-all disabled:hover:bg-neutral-100 disabled:text-neutral-500 min-h-[44px] border border-transparent ${active ? 'border-neutral-800' : 'border-neutral-200'}`}
  >
    {children}
  </button>
);

export const MultiChips: React.FC<{ options: Record<string, MultilingualText>, value: string[], onChange: (v: string[]) => void, lang: Language, maxSelections?: number }> = ({ options, value = [], onChange, lang, maxSelections = 99 }) => {
  const toggle = (opt: string) => {
    const currentValue = value || [];
    if (currentValue.includes(opt)) {
      onChange(currentValue.filter((v) => v !== opt));
    } else {
      if (currentValue.length >= maxSelections) {
        // Remove the first selected item and add the new one
        const newSelection = [...currentValue.slice(1), opt];
        onChange(newSelection);
      } else {
        onChange([...currentValue, opt]);
      }
    }
  };
  return (
    <div className="mt-3 flex flex-wrap gap-3">
      {Object.entries(options).map(([key, text]) => (
        <Chip key={key} active={(value || []).includes(key)} onClick={() => toggle(key)}>
          <TranslatedText lang={lang} text={text} />
        </Chip>
      ))}
    </div>
  );
};

export const SingleChips: React.FC<{ options: Record<string, MultilingualText>, value: string, onChange: (v: string) => void, lang: Language }> = ({ options, value, onChange, lang }) => (
  <div className="mt-3 flex flex-wrap gap-3">
    {Object.entries(options).map(([key, text]) => (
      <Chip key={key} active={value === key} onClick={() => onChange(key)}>
        <TranslatedText lang={lang} text={text} />
      </Chip>
    ))}
  </div>
);


export const SuggestedInput: React.FC<{
  children: React.ReactNode;
  suggestion?: string | string[];
  onAccept: (suggestion: string | string[]) => void;
  lang: Language;
  displayValue?: string;
}> = ({ children, suggestion, onAccept, lang, displayValue }) => {
  if (!suggestion || (Array.isArray(suggestion) && suggestion.length === 0)) {
    return <>{children}</>;
  }
  const displaySuggestion = displayValue || (Array.isArray(suggestion) ? suggestion.join(', ') : (typeof suggestion === 'object' ? JSON.stringify(suggestion) : suggestion));
  return (
    <div className="relative">
      {children}
      <div className="mt-3 p-3 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center gap-3 animate-fade-in shadow-sm">
        <div className="bg-indigo-600 text-white rounded-full p-1.5 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-[13px] text-indigo-900 flex-1 leading-snug">
          <strong className="font-bold uppercase tracking-tighter text-[11px] block text-indigo-700"><TranslatedText lang={lang} text={formTranslations.audio.suggestionTitle} /></strong>
          <span className="line-clamp-2">{displaySuggestion}</span>
        </p>
        <button
          type="button"
          onClick={() => onAccept(suggestion)}
          className="flex-shrink-0 bg-white text-indigo-600 border border-indigo-200 rounded-full h-10 w-10 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-95"
          aria-label="Accept suggestion"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};
