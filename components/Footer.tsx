import Link from 'next/link';
import { Github, Mail, Coffee } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">

                    {/* 1. Brand & Developer Info */}
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            WebPDF
                        </h2>
                        <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
                            Secure, client-side PDF tools running entirely in your browser.
                            Built with ❤️ by
                            <a href="https://tanmayrathod.com" className="text-white hover:underline ml-1">
                                Tanmay Rathod
                            </a>.
                        </p>

                        {/* GitHub & Socials */}
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/TanmayRathod07/quickpdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 hover:text-white transition"
                                aria-label="GitHub Repository"
                            >
                                <Github size={20} />
                            </a>
                            <Link
                                href="/contact"
                                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 hover:text-white transition"
                                aria-label="Contact Form"
                            >
                                <Mail size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* 2. Quick Links */}
                    <div>
                        <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Product</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/merge" className="hover:text-red-400 transition">Merge PDF</Link></li>
                            <li><Link href="/split" className="hover:text-red-400 transition">Split PDF</Link></li>
                            <li><Link href="/image-to-pdf" className="hover:text-red-400 transition">Image to PDF</Link></li>
                            <li><Link href="/blog" className="hover:text-red-400 transition">Blog</Link></li>
                        </ul>
                    </div>

                    {/* 3. Company & Support */}
                    <div>
                        <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Support</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-red-400 transition">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-red-400 transition">Contact Us</Link></li>
                            <li>
                                {/* Buy Me A Coffee Button */}
                                <a
                                    href="https://buymeacoffee.com/tanmayrathod"
                                    target="_blank"
                                    className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition mt-2 font-medium"
                                >
                                    <Coffee size={16} /> Buy me a coffee
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} WebPDF. Open Source Contribution Welcome.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
