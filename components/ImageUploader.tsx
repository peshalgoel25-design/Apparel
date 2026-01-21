
import React, { useState, useEffect, useRef } from 'react';
import { UploadedImage, Language, MultilingualText } from '../types.ts';
import { Label } from './FormElements.tsx';

interface ImageUploaderProps {
    uploadedImages: UploadedImage[];
    onImagesChange: (images: UploadedImage[]) => void;
    lang: Language;
    title: MultilingualText;
}

const compressImage = (dataUrl: string, maxWidth = 1024, quality = 0.7): Promise<string> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            } else {
                resolve(dataUrl);
            }
        };
        img.onerror = () => resolve(dataUrl);
        img.src = dataUrl;
    });
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ uploadedImages, onImagesChange, lang, title }) => {
    const [isCapturing, setIsCapturing] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
    const [imageToView, setImageToView] = useState<string | null>(null);
    const [lastRemoved, setLastRemoved] = useState<{ image: UploadedImage, index: number } | null>(null);
    const [showUndo, setShowUndo] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const filesArray = Array.from(files);
            const imagePromises = filesArray.map((file: File) => {
                return new Promise<UploadedImage>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = async (event) => {
                        const rawData = event.target?.result as string;
                        const data = await compressImage(rawData);
                        resolve({ fileName: file.name, mimeType: 'image/jpeg', data });
                    };
                    reader.readAsDataURL(file);
                });
            });
            const newImages = await Promise.all(imagePromises);
            onImagesChange([...uploadedImages, ...newImages]);
        }
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) fileInputRef.current.value = '';
        fileInputRef.current?.click();
    };

    const stopCameraStream = () => {
        if (videoRef.current?.srcObject) {
            (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const startCamera = async () => {
        setIsCapturing(true);
        await new Promise(resolve => setTimeout(resolve, 100));

        if (!videoRef.current) {
            setIsCapturing(false);
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: { ideal: 'environment' },
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
            }
        } catch (err) {
            console.error("Camera access denied or error:", err);
            try {
                const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = fallbackStream;
                    await videoRef.current.play();
                }
            } catch (fallbackErr) {
                console.error("Fallback camera also failed:", fallbackErr);
                setIsCapturing(false);
            }
        }
    };

    const handleCapture = async () => {
        if (!videoRef.current || !canvasRef.current) return;
        const context = canvasRef.current.getContext('2d');
        if (!context) return;

        const width = videoRef.current.videoWidth;
        const height = videoRef.current.videoHeight;
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        context.drawImage(videoRef.current, 0, 0, width, height);

        const rawDataUrl = canvasRef.current.toDataURL('image/jpeg', 1.0);
        stopCameraStream();
        setIsCapturing(false);

        const dataUrl = await compressImage(rawDataUrl);
        onImagesChange([...uploadedImages, { fileName: `capture_${Date.now()}.jpg`, mimeType: 'image/jpeg', data: dataUrl }]);
    };

    const handleRemove = (index: number) => {
        const removed = uploadedImages[index];
        setLastRemoved({ image: removed, index });
        setShowUndo(true);
        onImagesChange(uploadedImages.filter((_, i) => i !== index));

        // Hide undo after 5 seconds
        setTimeout(() => {
            setShowUndo(false);
        }, 5000);
    };

    const handleUndo = () => {
        if (lastRemoved) {
            const newImages = [...uploadedImages];
            newImages.splice(lastRemoved.index, 0, lastRemoved.image);
            onImagesChange(newImages);
            setLastRemoved(null);
            setShowUndo(false);
        }
    };

    useEffect(() => {
        return () => stopCameraStream();
    }, []);

    const openPreview = (data: string) => {
        setImageToView(data);
        setIsImageViewerOpen(true);
    };

    return (
        <div>
            <Label text={title} lang={lang} />
            {uploadedImages.length > 0 && (
                <div className="mt-2 mb-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {uploadedImages.map((image, index) => (
                        <div key={index} className="relative aspect-square">
                            <img
                                src={image.data}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover rounded-md shadow-sm border cursor-pointer"
                                onClick={() => openPreview(image.data)}
                            />
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); handleRemove(index); }}
                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg shadow-lg border-2 border-white z-10"
                                aria-label="Remove image"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {showUndo && (
                <div className="mb-4 p-3 bg-slate-800 text-white rounded-lg flex justify-between items-center animate-fade-in shadow-xl">
                    <span className="text-sm">Image removed</span>
                    <button type="button" onClick={handleUndo} className="text-indigo-400 font-bold px-4 py-1 hover:text-indigo-300">UNDO</button>
                </div>
            )}

            <div className="mt-2 flex flex-col sm:flex-row gap-3">
                <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" ref={fileInputRef} />
                <button type="button" onClick={handleUploadClick} className="w-full sm:w-auto flex-1 inline-flex justify-center items-center px-4 py-3 border border-slate-300 text-sm font-semibold rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 min-h-[44px]">
                    Upload Image(s)
                </button>
                <button type="button" onClick={startCamera} className="w-full sm:w-auto flex-1 inline-flex justify-center items-center px-4 py-3 border border-slate-300 text-sm font-semibold rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 min-h-[44px]">
                    Take Photo
                </button>
            </div>
            {isCapturing && (
                <div className="camera-overlay">
                    <div className="bg-white p-4 rounded-lg shadow-xl max-w-xl w-full">
                        <video ref={videoRef} playsInline className="w-full h-auto rounded bg-black mx-auto block"></video>
                        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
                            <button type="button" onClick={handleCapture} className="w-full sm:w-auto px-10 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 font-semibold min-h-[44px]">Capture</button>
                            <button type="button" onClick={() => { stopCameraStream(); setIsCapturing(false); }} className="w-full sm:w-auto px-10 py-3 bg-slate-200 rounded-md shadow hover:bg-slate-300 font-semibold min-h-[44px]">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            <canvas ref={canvasRef} className="hidden"></canvas>

            {isImageViewerOpen && imageToView && (
                <div className="modal-overlay" onClick={() => setIsImageViewerOpen(false)}>
                    <div className="bg-white p-4 rounded-lg shadow-xl max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                        <img src={imageToView} alt="Full size preview" className="w-full h-auto object-contain max-h-[70vh] mx-auto" />
                        <button type="button" onClick={() => setIsImageViewerOpen(false)} className="mt-4 w-full px-6 py-3 bg-slate-200 rounded-md shadow hover:bg-slate-300 font-bold min-h-[44px]">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;