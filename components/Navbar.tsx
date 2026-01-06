import Link from "next/link";
import { Layers } from "lucide-react";

export default function Header() {
    return (
        <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-90 transition-opacity">
                    <Layers className="w-6 h-6" />
                    <span>QuickPDF</span>
                </Link>

                {/* Navigation - Desktop */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/merge" className="text-sm font-medium text-text-main hover:text-primary transition-colors">
                        Merge PDF
                    </Link>
                    <Link href="/split" className="text-sm font-medium text-text-main hover:text-primary transition-colors">
                        Split PDF
                    </Link>
                    <Link href="/image-to-pdf" className="text-sm font-medium text-text-main hover:text-primary transition-colors">
                        Image to PDF
                    </Link>
                    <Link href="/blog" className="text-sm font-medium text-text-main hover:text-primary transition-colors">
                        Blog
                    </Link>
                    <span className="text-sm font-medium text-text-muted cursor-not-allowed" title="Coming Soon">
                        Compress PDF <span className="text-[10px] bg-secondary text-white px-1.5 py-0.5 rounded-full ml-1">Soon</span>
                    </span>
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    <button className="text-sm font-medium text-text-main hover:text-primary transition-colors">
                        Login
                    </button>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm">
                        Get Started
                    </button>
                </div>
            </div>
        </header>
    );
}
