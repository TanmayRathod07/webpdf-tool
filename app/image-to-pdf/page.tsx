"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import jsPDF from 'jspdf';
import { UploadCloud, RotateCw, Trash2, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

interface ImageFile {
    file: File;
    preview: string;
    id: string;
    rotation: number; // 0, 90, 180, 270
}

export default function ImageToPdfPage() {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [options, setOptions] = useState({
        margin: 'small', // none, small, big
        orientation: 'portrait', // portrait, landscape
        pageSize: 'a4',
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newImages = acceptedFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            id: Math.random().toString(36).substr(2, 9),
            rotation: 0
        }));
        setImages(prev => [...prev, ...newImages]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }
    });

    const removeImage = (id: string) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const rotateImage = (id: string) => {
        setImages(prev => prev.map(img =>
            img.id === id ? { ...img, rotation: (img.rotation + 90) % 360 } : img
        ));
    };

    const handleConvert = async () => {
        if (images.length === 0) return;
        setIsProcessing(true);

        try {
            const doc = new jsPDF({
                orientation: options.orientation as 'p' | 'l',
                unit: 'mm',
                format: options.pageSize,
            });

            const width = doc.internal.pageSize.getWidth();
            const height = doc.internal.pageSize.getHeight();

            let margin = 0;
            if (options.margin === 'small') margin = 10;
            if (options.margin === 'big') margin = 25;

            const availWidth = width - (margin * 2);
            const availHeight = height - (margin * 2);

            for (let i = 0; i < images.length; i++) {
                if (i > 0) doc.addPage();

                const img = images[i];

                // Process image via Canvas to normalize format and handle rotation
                // This prevents CRC errors and ensures consistent output
                const { dataUrl, width: imgWidthOriginal, height: imgHeightOriginal } = await processImageToDataUrl(img.preview, img.rotation);

                // Fit logic
                const ratio = Math.min(availWidth / imgWidthOriginal, availHeight / imgHeightOriginal);
                const imgWidth = imgWidthOriginal * ratio;
                const imgHeight = imgHeightOriginal * ratio;

                const x = (width - imgWidth) / 2;
                const y = (height - imgHeight) / 2;

                doc.addImage(dataUrl, 'JPEG', x, y, imgWidth, imgHeight, undefined, 'FAST');
            }

            doc.save('converted-images.pdf');
        } catch (err) {
            console.error("Conversion failed:", err);
            alert("Failed to convert images.");
        } finally {
            setIsProcessing(false);
        }
    };

    /**
     * Loads an image and draws it to a canvas to normalize data.
     * Returns a clean JPEG Data URL.
     */
    const processImageToDataUrl = (url: string, rotation: number): Promise<{ dataUrl: string, width: number, height: number }> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error("Canvas context not available"));
                    return;
                }

                // Handle rotation dimensions
                if (rotation === 90 || rotation === 270) {
                    canvas.width = img.height;
                    canvas.height = img.width;
                } else {
                    canvas.width = img.width;
                    canvas.height = img.height;
                }

                // Rotate context
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(rotation * Math.PI / 180);

                // Draw image centered
                ctx.drawImage(img, -img.width / 2, -img.height / 2);

                resolve({
                    dataUrl: canvas.toDataURL('image/jpeg', 0.95),
                    width: canvas.width,
                    height: canvas.height
                });
            };
            img.onerror = reject;
            img.src = url;
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Image to PDF</h1>
                    <p className="text-gray-500">Convert JPG, PNG, and GIF images to PDF documents.</p>
                </div>

                {/* Top Ad */}
                <div className="w-full h-[90px] bg-gray-100 rounded mb-6 flex items-center justify-center relative overflow-hidden">
                    <AdBanner slot="1234567890" />
                    <span className="text-xs text-gray-400 font-mono absolute pointer-events-none">Ad Space (Top Banner)</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Main Content */}
                    <div className="flex-1 space-y-6">

                        {/* Upload Area */}
                        <div
                            {...getRootProps()}
                            className={`
                border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer relative
                ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 bg-white hover:border-gray-400'}
              `}
                        >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center pointer-events-none">
                                <UploadCloud size={40} className="text-gray-400 mb-4" />
                                <p className="text-lg font-semibold text-gray-700">Add Images</p>
                                <p className="text-sm text-gray-500">Drag & drop or click</p>
                            </div>
                        </div>

                        {/* Image Grid */}
                        {images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {images.map((img) => (
                                    <div key={img.id} className="relative group bg-white p-2 rounded-lg shadow-sm border border-border">
                                        <div className="aspect-[3/4] bg-gray-100 rounded overflow-hidden relative">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={img.preview}
                                                alt="Preview"
                                                className="w-full h-full object-contain"
                                                style={{ transform: `rotate(${img.rotation}deg)` }}
                                            />
                                        </div>
                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); rotateImage(img.id); }}
                                                className="p-1 bg-white/90 rounded shadow hover:text-primary"
                                                title="Rotate"
                                            >
                                                <RotateCw size={16} />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                                                className="p-1 bg-white/90 rounded shadow hover:text-red-500"
                                                title="Remove"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar Settings */}
                    <div className="w-full lg:w-80 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-border sticky top-4">
                            <h2 className="font-bold text-lg mb-6">PDF Settings</h2>

                            <div className="space-y-4 mb-8">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700">Page Orientation</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setOptions(o => ({ ...o, orientation: 'portrait' }))}
                                            className={`px-3 py-2 text-sm rounded border ${options.orientation === 'portrait' ? 'bg-primary/10 border-primary text-primary' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            Portrait
                                        </button>
                                        <button
                                            onClick={() => setOptions(o => ({ ...o, orientation: 'landscape' }))}
                                            className={`px-3 py-2 text-sm rounded border ${options.orientation === 'landscape' ? 'bg-primary/10 border-primary text-primary' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            Landscape
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700">Margin</label>
                                    <select
                                        value={options.margin}
                                        onChange={(e) => setOptions(o => ({ ...o, margin: e.target.value }))}
                                        className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    >
                                        <option value="none">No Margin</option>
                                        <option value="small">Small Margin</option>
                                        <option value="big">Big Margin</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                onClick={handleConvert}
                                disabled={images.length === 0 || isProcessing}
                                className="w-full py-3 bg-primary text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                            >
                                {isProcessing ? 'Converting...' : 'Convert to PDF'}
                                {!isProcessing && <ArrowRight size={18} />}
                            </button>
                        </div>

                        {/* Sidebar Ad */}
                        <div className="w-full h-[600px] bg-gray-100 rounded flex items-center justify-center relative overflow-hidden border border-dashed border-gray-300">
                            <AdBanner slot="9876543210" />
                            <span className="text-xs text-gray-400 font-mono absolute pointer-events-none">Ad Space (Vertical)</span>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
