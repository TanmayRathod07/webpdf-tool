"use client";

import React, { useState, useCallback, DragEvent, ChangeEvent } from 'react';
import { PDFDocument } from 'pdf-lib';
import download from 'downloadjs';
import { FileText, X, UploadCloud, AlertCircle, ArrowDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

// --- Constants & Config ---
const CONFIG = {
    MAX_FILES: 20,
    ACCEPTED_TYPE: 'application/pdf',
    OUTPUT_FILENAME: 'merged-document.pdf',
};

// --- Helper Components ---

/**
 * Renders a single file card in the list.
 */
const FileCard = ({ file, index, onRemove }: { file: File; index: number; onRemove: (index: number) => void }) => (
    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm mb-2 animate-fade-in">
        <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-red-50 p-2 rounded text-red-600">
                <FileText size={20} />
            </div>
            <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
                    {file.name}
                </p>
                <p className="text-xs text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
            </div>
        </div>
        <button
            onClick={() => onRemove(index)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            aria-label="Remove file"
        >
            <X size={18} />
        </button>
    </div>
);

// --- Main Page Component ---

export default function MergePage() {
    // State
    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDragActive, setIsDragActive] = useState(false);

    // --- Handlers ---

    const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    }, []);

    const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    }, []);

    const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        validateAndAddFiles(droppedFiles);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            validateAndAddFiles(selectedFiles);
        }
    };

    /**
     * Validates file types and strictly filters non-PDFs.
     * @param {File[]} newFiles 
     */
    const validateAndAddFiles = (newFiles: File[]) => {
        setError(null);
        const validPdfs = newFiles.filter(file => file.type === CONFIG.ACCEPTED_TYPE);

        if (validPdfs.length !== newFiles.length) {
            setError(`Some files were skipped because they are not PDFs.`);
        }

        if (validPdfs.length + files.length > CONFIG.MAX_FILES) {
            setError(`You can only merge up to ${CONFIG.MAX_FILES} files at once.`);
            return;
        }

        setFiles((prev) => [...prev, ...validPdfs]);
    };

    const removeFile = (indexToRemove: number) => {
        setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    /**
     * CORE LOGIC: Merges PDFs in browser memory.
     * Uses ArrayBuffers to avoid high memory spikes.
     */
    const handleMerge = async () => {
        if (files.length < 2) return;

        setIsProcessing(true);
        setError(null);

        try {
            // 1. Create a new empty PDF
            const mergedPdf = await PDFDocument.create();

            // 2. Iterate and Copy Pages
            for (const file of files) {
                try {
                    const fileBuffer = await file.arrayBuffer();
                    const pdf = await PDFDocument.load(fileBuffer);
                    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                    copiedPages.forEach((page) => mergedPdf.addPage(page));
                } catch (fileErr) {
                    console.error(`Error processing file ${file.name}:`, fileErr);
                    throw new Error(`Could not read ${file.name}. It might be encrypted or password protected.`);
                }
            }

            // 3. Save and Download
            const pdfBytes = await mergedPdf.save();
            download(pdfBytes, CONFIG.OUTPUT_FILENAME, CONFIG.ACCEPTED_TYPE);

        } catch (err: unknown) {
            console.error("Merge failed:", err);
            const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred during the merge.";
            setError(errorMessage);
        } finally {
            setIsProcessing(false);
        }
    };

    // --- Render ---

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar is handled by Layout, but included here conceptually if needed by structure */}
            {/* <Navbar /> */}

            <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">

                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Merge PDF Files</h1>
                    <p className="text-gray-500">Combine multiple PDFs into one unified document. 100% Free & Secure.</p>
                </div>

                {/* Top Ad Unit (Fixed Height for CLS Prevention) */}
                <div className="w-full h-[90px] bg-gray-100 rounded mb-6 flex items-center justify-center overflow-hidden">
                    <AdBanner slot="1234567890" />
                    <span className="text-xs text-gray-400 font-mono absolute pointer-events-none">Ad Space (Top Banner)</span>
                </div>

                {/* Main Interface */}
                <div className="grid md:grid-cols-3 gap-6">

                    {/* Left: Upload Area */}
                    <div className="md:col-span-2 space-y-4">

                        {/* Drag & Drop Zone */}
                        <div
                            onDragEnter={handleDragEnter}
                            onDragOver={handleDragEnter} // Necessary to allow dropping
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`
                border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer relative
                ${isDragActive ? 'border-blue-500 bg-blue-50 scale-[1.01]' : 'border-gray-300 bg-white hover:border-gray-400'}
              `}
                        >
                            <input
                                type="file"
                                multiple
                                accept=".pdf"
                                onChange={handleFileInput}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />

                            <div className="flex flex-col items-center pointer-events-none">
                                <div className={`p-4 rounded-full mb-4 ${isDragActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                                    <UploadCloud size={32} />
                                </div>
                                <p className="text-lg font-semibold text-gray-700">
                                    {isDragActive ? 'Drop files here' : 'Select PDF files'}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">or drag and drop PDFs here</p>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-start gap-3 border border-red-100 animate-slide-in">
                                <AlertCircle className="shrink-0 mt-0.5" size={18} />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        {/* File List */}
                        {files.length > 0 && (
                            <div className="bg-gray-100 p-4 rounded-xl">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                        Files to Merge ({files.length})
                                    </h3>
                                    <button
                                        onClick={() => setFiles([])}
                                        className="text-xs text-red-500 hover:text-red-700 hover:underline"
                                    >
                                        Clear All
                                    </button>
                                </div>
                                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                                    {files.map((file, idx) => (
                                        <FileCard
                                            key={`${file.name}-${idx}`}
                                            file={file}
                                            index={idx}
                                            onRemove={removeFile}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Sidebar & Action */}
                    <div className="space-y-6">

                        {/* Action Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Total Files</span>
                                    <span className="font-medium text-gray-900">{files.length}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Estimated Size</span>
                                    <span className="font-medium text-gray-900">
                                        {(files.reduce((acc, f) => acc + f.size, 0) / 1024 / 1024).toFixed(2)} MB
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleMerge}
                                disabled={files.length < 2 || isProcessing}
                                className={`
                  w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all
                  ${files.length < 2
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl active:scale-[0.98]'}
                `}
                            >
                                {isProcessing ? (
                                    <>Processing...</>
                                ) : (
                                    <>
                                        Merge PDFs <ArrowDown size={20} />
                                    </>
                                )}
                            </button>

                            {files.length < 2 && (
                                <p className="text-xs text-center text-gray-400 mt-3">
                                    Please select at least 2 files.
                                </p>
                            )}
                        </div>

                        {/* Sidebar Ad (Square) */}
                        <div className="w-full h-[250px] bg-gray-100 rounded flex items-center justify-center border border-dashed border-gray-300 overflow-hidden relative">
                            <AdBanner slot="9876543210" />
                            <span className="text-xs text-gray-400 font-mono absolute pointer-events-none">Ad Space (Square)</span>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
