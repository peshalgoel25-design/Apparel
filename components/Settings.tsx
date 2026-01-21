import React from 'react';
import { Language } from '../types.ts';
import { TranslatedText } from './FormElements.tsx';

interface SettingsProps {
  webhookEnv: 'prod' | 'test';
  onWebhookEnvChange: (env: 'prod' | 'test') => void;
  isImageBased: boolean;
  onImageBasedChange: (isBased: boolean) => void;
  clipDuration: number;
  onClipDurationChange: (duration: number) => void;
  lang: Language;
  translations: any;
}

const Settings: React.FC<SettingsProps> = ({ webhookEnv, onWebhookEnvChange, isImageBased, onImageBasedChange, clipDuration, onClipDurationChange, lang, translations }) => {
  return (
    <details className="mb-8 bg-white rounded-lg shadow group">
      <summary className="p-4 text-lg font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center">
        <div className="flex items-center">
            <TranslatedText lang={lang} text={translations.settings.title} />
        </div>
        <svg className="w-5 h-5 text-slate-500 transition-transform duration-200 transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </summary>
      
      <div className="p-4 border-t border-slate-200 space-y-6">
        <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="image-based-toggle"
                name="image-based-toggle"
                type="checkbox"
                checked={isImageBased}
                onChange={(e) => onImageBasedChange(e.target.checked)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="image-based-toggle" className="font-medium text-gray-700">
                <TranslatedText lang={lang} text={translations.settings.imageBasedTitle} />
              </label>
              <p className="text-gray-500">
                <TranslatedText lang={lang} text={translations.settings.imageBasedHint} />
              </p>
            </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <TranslatedText lang={lang} text={translations.settings.webhookEnv} />
          </label>
          <div className="flex items-center justify-center space-x-2 border border-slate-300 p-1 rounded-lg bg-slate-50 max-w-sm mx-auto">
              <button
                type="button"
                onClick={() => onWebhookEnvChange('prod')}
                aria-pressed={webhookEnv === 'prod'}
                className={`px-4 py-2 text-sm font-medium rounded-md flex-1 text-center transition-colors
                  ${webhookEnv === 'prod' ? 'bg-green-600 text-white shadow-md' : 'bg-transparent text-slate-700 hover:bg-slate-200'}`}
              >
                <TranslatedText lang={lang} text={translations.settings.production} />
              </button>
              <button
                type="button"
                onClick={() => onWebhookEnvChange('test')}
                aria-pressed={webhookEnv === 'test'}
                className={`px-4 py-2 text-sm font-medium rounded-md flex-1 text-center transition-colors
                  ${webhookEnv === 'test' ? 'bg-yellow-500 text-white shadow-md' : 'bg-transparent text-slate-700 hover:bg-slate-200'}`}
              >
                <TranslatedText lang={lang} text={translations.settings.test} />
              </button>
          </div>
        </div>
        <div>
          <label htmlFor="clip-duration" className="block text-sm font-medium text-slate-700 mb-2">
            <TranslatedText lang={lang} text={translations.settings.clipDuration} />
          </label>
          <select 
            id="clip-duration"
            value={clipDuration}
            onChange={(e) => onClipDurationChange(Number(e.target.value))}
            className="block w-full max-w-sm mx-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value={15}>15 Seconds</option>
            <option value={30}>30 Seconds</option>
            <option value={60}>60 Seconds</option>
          </select>
        </div>
      </div>
    </details>
  );
};

export default Settings;
