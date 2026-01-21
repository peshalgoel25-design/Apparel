import React, { useState, useEffect, useCallback, useRef, useImperativeHandle } from 'react';
import { GoogleGenAI } from "@google/genai";
import { TranscribedClip, Language } from '../types';
import { formTranslations } from '../data/translations';
import { TranslatedText } from './FormElements';
import { blobToBase64 } from '../utils';
import { GEMINI_API_KEY } from '../constants';

const AudioTranscriptionManager = React.forwardRef<
    { stopAll: () => void },
    {
        fullTranscript: string;
        onTranscriptChange: (t: string | ((prev: string) => string)) => void;
        lang: Language;
        disabled?: boolean;
        clipDuration: number;
        clips: TranscribedClip[];
        setClips: React.Dispatch<React.SetStateAction<TranscribedClip[]>>;
    }
>(({ fullTranscript, onTranscriptChange, lang, disabled, clipDuration, clips, setClips }, ref) => {
    const [status, setStatus] = useState<"idle" | "recording" | "processing" | "error">("idle");
    const [isContinuousRecording, setIsContinuousRecording] = useState(false);
    const [micDevices, setMicDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedMicId, setSelectedMicId] = useState<string>('');
    const [isTranscriptModalOpen, setIsTranscriptModalOpen] = useState(false);

    const recRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<number | null>(null);
    const isContinuousRef = useRef(isContinuousRecording);
    isContinuousRef.current = isContinuousRecording;

    const autoTranscribe = useCallback(async (clipId: string, blob: Blob) => {
        setClips(prev => prev.map(c => c.id === clipId ? { ...c, transcriptionStatus: 'transcribing' } : c));
        try {
            if (!GEMINI_API_KEY) {
                throw new Error("Gemini API Key is missing");
            }
            const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

            const base64Audio = await blobToBase64(blob);
            const audioPart = { inlineData: { data: base64Audio, mimeType: blob.type } };
            const textPart = { text: "Transcribe this audio recording accurately." };

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: { parts: [audioPart, textPart] },
            });

            const newTranscript = response.text;
            if (newTranscript && newTranscript.trim() !== "") {
                onTranscriptChange(prev => prev ? `${prev}\n\n---\n\n${newTranscript}` : newTranscript);
                setClips(prev => prev.map(c => c.id === clipId ? { ...c, transcriptionStatus: 'done', transcript: newTranscript } : c));
            } else {
                throw new Error("Empty transcript returned.");
            }
        } catch (err) {
            console.error("Transcription failed for clip " + clipId, err);
            setClips(prev => prev.map(c => c.id === clipId ? { ...c, transcriptionStatus: 'failed' } : c));
        }
    }, [onTranscriptChange, setClips]);

    const stopCurrentAndSave = useCallback(() => {
        if (recRef.current?.state === 'recording') {
            recRef.current.stop();
        }
    }, []);

    const recordingCounter = useRef(0);

    const startNewRecordingCycle = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: selectedMicId ? { exact: selectedMicId } : undefined } });

            recRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
            chunksRef.current = [];
            recRef.current.ondataavailable = (e) => e.data.size > 0 && chunksRef.current.push(e.data);

            recRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                if (blob.size === 0) { // Don't save empty clips
                    if (isContinuousRef.current) startNewRecordingCycle();
                    return;
                }

                recordingCounter.current += 1;
                const url = URL.createObjectURL(blob);
                const newClip: TranscribedClip = {
                    id: `clip_${Date.now()}`,
                    name: `Recording ${recordingCounter.current}`,
                    url,
                    blob,
                    transcript: '',
                    transcriptionStatus: 'pending',
                };
                setClips(prev => [...prev, newClip]);
                autoTranscribe(newClip.id, blob);

                stream.getTracks().forEach(track => track.stop());

                if (isContinuousRef.current) {
                    startNewRecordingCycle();
                } else {
                    setStatus('idle');
                }
            };

            recRef.current.start();
            setStatus("recording");
            timerRef.current = window.setTimeout(stopCurrentAndSave, clipDuration * 1000);
        } catch (err) {
            console.error(err);
            setStatus("error");
            setIsContinuousRecording(false);
        }
    }, [clipDuration, selectedMicId, autoTranscribe, stopCurrentAndSave, setClips]);

    const toggleContinuousRecording = () => {
        if (isContinuousRecording) {
            // Stopping
            setIsContinuousRecording(false);
            if (timerRef.current) clearTimeout(timerRef.current);
            stopCurrentAndSave();
        } else {
            // Starting
            setIsContinuousRecording(true);
        }
    };

    useEffect(() => {
        if (isContinuousRecording && status !== 'recording') {
            startNewRecordingCycle();
        }
    }, [isContinuousRecording, status, startNewRecordingCycle]);

    useImperativeHandle(ref, () => ({
        stopAll: () => {
            if (isContinuousRecording) {
                toggleContinuousRecording();
            }
        }
    }));

    useEffect(() => {
        let isMounted = true;
        const getMics = async () => {
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true });
                const devices = await navigator.mediaDevices.enumerateDevices();
                if (!isMounted) return;
                const audioDevices = devices.filter(d => d.kind === 'audioinput');
                setMicDevices(audioDevices);
                if (audioDevices.length > 0) {
                    setSelectedMicId(audioDevices[0].deviceId);
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Could not get microphone devices:", err);
                    setStatus('error');
                }
            }
        };
        getMics();
        return () => { isMounted = false; };
    }, []);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const failedClips = clips.filter(c => c.transcriptionStatus === 'failed');

    const handleRetryFailed = () => {
        failedClips.forEach(clip => {
            autoTranscribe(clip.id, clip.blob);
        });
    };

    return (
        <fieldset disabled={disabled} className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    onClick={toggleContinuousRecording}
                    disabled={status === 'processing'}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold text-white shadow min-h-[44px] ${!isContinuousRecording ? 'bg-neutral-900 hover:bg-black' : 'bg-red-600 hover:bg-red-700'} disabled:bg-slate-400 transition-colors`}
                >
                    <TranslatedText lang={lang} text={!isContinuousRecording ? formTranslations.audio.addNote : formTranslations.audio.stopNote} />
                </button>
                <div className="flex items-center gap-2 text-sm bg-white border border-slate-300 rounded-lg px-2 min-h-[44px]">
                    <label htmlFor="mic-select" className="font-medium text-neutral-700 whitespace-nowrap"><TranslatedText lang={lang} text={formTranslations.audio.micSource} /></label>
                    <select id="mic-select" value={selectedMicId} onChange={e => setSelectedMicId(e.target.value)} disabled={isContinuousRecording} className="border-none bg-transparent py-2 text-sm focus:ring-0 outline-none cursor-pointer">
                        {micDevices.map(device => (
                            <option key={device.deviceId} value={device.deviceId}>{device.label || `Microphone ${micDevices.indexOf(device) + 1}`}</option>
                        ))}
                    </select>
                </div>
                <span className="text-sm text-neutral-500 italic bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                    <TranslatedText lang={lang} text={formTranslations.audio.status[status]} />
                </span>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-neutral-800 uppercase tracking-wider"><TranslatedText lang={lang} text={formTranslations.audio.clipsTitle} /></label>
                </div>
                <div className="max-h-72 space-y-3 overflow-y-auto rounded-xl border bg-slate-50 p-4 shadow-inner">
                    {clips.length > 0 ? clips.map(clip => (
                        <div key={clip.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-900 text-[14px] truncate flex-1">{clip.name}</span>
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-sm border ${clip.transcriptionStatus === 'done' ? 'bg-green-50 text-green-700 border-green-100' :
                                    clip.transcriptionStatus === 'failed' ? 'bg-red-50 text-red-700 border-red-100' :
                                        'bg-indigo-50 text-indigo-700 border-indigo-100 animate-pulse'
                                    }`}>
                                    {clip.transcriptionStatus === 'transcribing' && 'Transcribing...'}
                                    {clip.transcriptionStatus === 'done' && '✓ Transcribed'}
                                    {clip.transcriptionStatus === 'failed' && 'Failed'}
                                    {clip.transcriptionStatus === 'pending' && 'Pending'}
                                </span>
                            </div>
                            <audio src={clip.url} controls className="w-full h-9 rounded-md overflow-hidden" />
                        </div>
                    )) : <p className="text-neutral-500 text-sm italic text-center py-4">Recorded clips will appear here.</p>}
                </div>
                {failedClips.length > 0 && (
                    <div className="flex justify-center mt-2">
                        <button
                            type="button"
                            onClick={handleRetryFailed}
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold"
                        >
                            <TranslatedText lang={lang} text={formTranslations.audio.retryFailed} /> ({failedClips.length})
                        </button>
                    </div>
                )}
            </div>

            {fullTranscript && (
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-neutral-800"><TranslatedText lang={lang} text={formTranslations.audio.transcriptTitle} /></label>
                        <button type="button" onClick={() => setIsTranscriptModalOpen(true)} className="text-xs rounded-md px-2 py-1 bg-slate-200 hover:bg-slate-300"><TranslatedText lang={lang} text={formTranslations.audio.transcriptExpand} /></button>
                    </div>
                    <div className="h-24 overflow-y-auto rounded-lg border bg-slate-50 p-3 text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">
                        {fullTranscript}
                    </div>
                </div>
            )}
            {isTranscriptModalOpen && (
                <div className="modal-overlay">
                    <div className="bg-white p-4 rounded-lg shadow-xl max-w-2xl w-full flex flex-col max-h-[90vh]">
                        <h3 className="text-lg font-semibold mb-2"><TranslatedText lang={lang} text={formTranslations.audio.transcriptModalTitle} /></h3>
                        <div className="overflow-y-auto flex-grow p-2 border rounded-md bg-slate-50 whitespace-pre-wrap">
                            {fullTranscript}
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button onClick={() => { handleCopy(fullTranscript); alert('Copied!'); }} className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700">
                                <TranslatedText lang={lang} text={formTranslations.audio.copy} />
                            </button>
                            <button onClick={() => setIsTranscriptModalOpen(false)} className="px-4 py-2 bg-slate-200 rounded-md shadow hover:bg-slate-300">
                                <TranslatedText lang={lang} text={formTranslations.audio.transcriptClose} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </fieldset>
    );
});

export default AudioTranscriptionManager;