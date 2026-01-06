"use client";

import React, { useState } from 'react';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

export default function Contact() {
    const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- CONFIGURATION ---
    // PASTE YOUR WEB3FORMS ACCESS KEY INSIDE THE QUOTES BELOW
    const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(event.currentTarget);
            formData.append("access_key", ACCESS_KEY);

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult("Success");
                (event.target as HTMLFormElement).reset();
            } else {
                console.error("Error", data);
                setResult("Error");
            }
        } catch (error) {
            console.error("Network Error", error);
            setResult("Error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#F5F5F7] min-h-full flex-1 flex flex-col font-sans selection:bg-blue-100">
            <div className="container mx-auto px-4 pt-16 pb-12 max-w-2xl flex-1">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-semibold text-[#1D1D1F] tracking-tight mb-4">
                        Get in touch.
                    </h1>
                    <p className="text-lg text-[#86868B] font-medium">
                        Found a bug? Have a suggestion? We'd love to hear from you.
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white p-8 md:p-12 rounded-[30px] shadow-sm border border-gray-100">

                    {result === "Success" ? (
                        // Success View
                        <div className="text-center py-10 animate-fade-in">
                            <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={40} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1D1D1F] mb-2">Message Sent!</h3>
                            <p className="text-[#86868B] max-w-xs mx-auto">
                                Thanks for reaching out, Tanmay. We will get back to you shortly.
                            </p>
                            <button
                                onClick={() => setResult("")}
                                className="mt-8 text-[#0071E3] hover:underline font-medium text-sm transition-all"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        // Form View
                        <form onSubmit={onSubmit} className="space-y-6">

                            {/* Name Field */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#86868B] uppercase tracking-wider ml-1">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full bg-[#F5F5F7] border-0 rounded-2xl px-5 py-4 text-[#1D1D1F] text-lg placeholder-gray-400 focus:ring-2 focus:ring-[#0071E3] transition-all outline-none"
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#86868B] uppercase tracking-wider ml-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-[#F5F5F7] border-0 rounded-2xl px-5 py-4 text-[#1D1D1F] text-lg placeholder-gray-400 focus:ring-2 focus:ring-[#0071E3] transition-all outline-none"
                                    placeholder="john@example.com"
                                />
                            </div>

                            {/* Message Field */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#86868B] uppercase tracking-wider ml-1">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full bg-[#F5F5F7] border-0 rounded-2xl px-5 py-4 text-[#1D1D1F] text-lg placeholder-gray-400 focus:ring-2 focus:ring-[#0071E3] transition-all outline-none resize-none"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            {/* Error Message (if any) */}
                            {result === "Error" && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
                                    <AlertCircle size={18} />
                                    Something went wrong. Please try again later.
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#0071E3] hover:bg-[#0077ED] active:scale-[0.99] text-white font-semibold text-lg py-4 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-lg shadow-blue-500/30"
                            >
                                {isSubmitting ? (
                                    <> <Loader2 className="animate-spin" size={24} /> Sending... </>
                                ) : (
                                    <> Send Message <Send size={20} /> </>
                                )}
                            </button>

                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
