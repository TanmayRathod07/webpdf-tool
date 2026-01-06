"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';
// PDF.js will be imported dynamically to prevent server-side build errors
import download from 'downloadjs';
import { UploadCloud, CheckCircle, Download, AlertCircle, Trash2 } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

interface PdfPage {
    pageIndex: number; // 0-based
    imageUrl: string;
    selected: boolean;
}

export default function SplitPage() {
    // State
    const [file, setFile] = useState<File | null>(null);
    const [pages, setPages] = useState<PdfPage[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);


    // --- Helpers ---

    const generateThumbnails = async (pdfFile: File) => {
        setIsProcessing(true);
        setError(null);
        setPages([]);

        try {
            // Dynamically import PDF.js
            const pdfjsLib = await import('pdfjs-dist');
            pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

            const arrayBuffer = await pdfFile.arrayBuffer();
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            const pdf = await loadingTask.promise;

            const newPages: PdfPage[] = [];

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 0.5 }); // Thumbnail scale
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                if (!context) throw new Error("Canvas context not available");

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({
                    canvasContext: context,
                    viewport: viewport,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any).promise;

                newPages.push({
                    pageIndex: i - 1,
                    imageUrl: canvas.toDataURL(),
                    selected: false,
                });
            }

            setPages(newPages);
        } catch (err: unknown) {
            console.error("Error generating thumbnails:", err);
            const errorMessage = err instanceof Error ? err.message : "Failed to load PDF. It might be corrupted or password protected.";
            setError(errorMessage);
            setFile(null); // Reset file on error
        } finally {
            setIsProcessing(false);
        }
    };

    // --- Handlers ---

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const pdf = acceptedFiles.find(f => f.type === 'application/pdf');
        if (pdf) {
            setFile(pdf);
            generateThumbnails(pdf);
        } else {
            setError("Please upload a valid PDF file.");
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false,
    });

    const togglePageSelection = (index: number) => {
        setPages(prev => prev.map((p, i) => i === index ? { ...p, selected: !p.selected } : p));
    };

    const selectAll = () => {
        setPages(prev => prev.map(p => ({ ...p, selected: true })));
    };

    const deselectAll = () => {
        setPages(prev => prev.map(p => ({ ...p, selected: false })));
    };

    const handleExtract = async () => {
        const selectedPages = pages.filter(p => p.selected);
        if (!file || selectedPages.length === 0) return;

        setIsProcessing(true);
        try {
            const fileBuffer = await file.arrayBuffer();
            const srcPdf = await PDFDocument.load(fileBuffer);
            const newPdf = await PDFDocument.create();

            const pageIndices = selectedPages.map(p => p.pageIndex);
            const copiedPages = await newPdf.copyPages(srcPdf, pageIndices);

            copiedPages.forEach(page => newPdf.addPage(page));

            const pdfBytes = await newPdf.save();
            download(pdfBytes, `split-${file.name}`, 'application/pdf');
        } catch (err) {
            console.error("Extraction failed:", err);
            setError("Failed to extract pages.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setPages([]);
        setError(null);
    };

    // --- Render ---

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Split PDF</h1>
                    <p className="text-gray-500">Extract specific pages from your PDF document.</p>
                </div>

                {/* Top Ad */}
                <div className="w-full h-[90px] bg-gray-100 rounded mb-6 flex items-center justify-center relative overflow-hidden">
                    <AdBanner slot="1234567890" />
                    <span className="text-xs text-gray-400 font-mono absolute pointer-events-none">Ad Space (Top Banner)</span>
                </div>

                {!file ? (
                    /* Upload State */
                    <div className="max-w-xl mx-auto">
                        <div
                            {...getRootProps()}
                            className={`
                border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer relative
                ${isDragActive ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-gray-300 bg-white hover:border-gray-400'}
              `}
                        >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center pointer-events-none">
                                <div className={`p-4 rounded-full mb-4 ${isDragActive ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'}`}>
                                    <UploadCloud size={48} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Upload a PDF to Split</h3>
                                <p className="text-text-muted">Drag & drop or click to select</p>
                            </div>
                        </div>
                        {error && (
                            <div className="mt-4 bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-3">
                                <AlertCircle size={20} />
                                <p>{error}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Editor State */
                    <div className="bg-white rounded-xl shadow-sm border border-border flex flex-col md:flex-row overflow-hidden min-h-[600px]">

                        {/* Sidebar Controls */}
                        <div className="w-full md:w-80 border-r border-border bg-gray-50 p-6 flex flex-col gap-6 sticky top-0 h-auto md:h-auto">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1 truncate" title={file.name}>{file.name}</h3>
                                <p className="text-sm text-text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB • {pages.length} Pages</p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <button onClick={selectAll} className="flex-1 px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">Select All</button>
                                    <button onClick={deselectAll} className="flex-1 px-3 py-2 text-sm font-medium bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">Clear</button>
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-200 space-y-3">
                                <div className="text-sm text-gray-600 flex justify-between">
                                    <span>Selected:</span>
                                    <span className="font-bold">{pages.filter(p => p.selected).length} pages</span>
                                </div>
                                <button
                                    onClick={handleExtract}
                                    disabled={pages.filter(p => p.selected).length === 0 || isProcessing}
                                    className="w-full py-3 bg-primary text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                                >
                                    {isProcessing ? 'Processing...' : 'Split PDF'}
                                    {!isProcessing && <Download size={18} />}
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="w-full py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={18} /> Remove File
                                </button>
                            </div>
                        </div>

                        {/* Grid Area */}
                        <div className="flex-1 p-6 md:p-8 bg-gray-100/50">
                            {isProcessing && pages.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="animate-pulse flex flex-col items-center">
                                        <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                    {pages.map((page) => (
                                        <div
                                            key={page.pageIndex}
                                            onClick={() => togglePageSelection(page.pageIndex)}
                                            className={`
                                    relative aspect-[1/1.4] rounded-lg shadow-sm cursor-pointer transition-all group overflow-hidden border-2
                                    ${page.selected ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-gray-300'}
                                `}
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={page.imageUrl}
                                                alt={`Page ${page.pageIndex + 1}`}
                                                className="w-full h-full object-contain bg-white"
                                            />
                                            <div className={`
                                    absolute inset-x-0 bottom-0 p-2 text-center text-sm font-medium transition-colors
                                    ${page.selected ? 'bg-primary text-white' : 'bg-gray-900/80 text-white opacity-0 group-hover:opacity-100'}
                                `}>
                                                Page {page.pageIndex + 1}
                                            </div>
                                            {page.selected && (
                                                <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1 shadow-sm">
                                                    <CheckCircle size={16} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
}
