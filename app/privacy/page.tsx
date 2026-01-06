
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy - WebPDF' };

export default function Privacy() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            <div className="flex-1 container mx-auto px-4 py-12 max-w-3xl bg-white shadow-sm my-8 p-8 rounded-xl">
                <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                <p className="text-gray-500 mb-6">Last Updated: January 2026</p>

                <section className="space-y-4 text-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 mt-8">1. How We Handle Your Files</h2>
                    <p>
                        Unlike other PDF tools, <strong>WebPDF operates entirely in your browser</strong>.
                        When you merge, split, or compress files, the data never leaves your device.
                        Your files are <strong>not</strong> uploaded to our servers, and we (WebPDF) cannot view, copy, or store your documents.
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">2. Data Collection</h2>
                    <p>
                        We do not collect personal data (like names or emails) unless you voluntarily provide it via email.
                        However, we use third-party tools to improve our service:
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                        <li><strong>Google Analytics:</strong> Collects anonymous usage data (e.g., pages visited, device type).</li>
                        <li><strong>Google AdSense:</strong> Displays advertisements. Google may use cookies to serve ads based on your prior visits to this website.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">3. Cookies</h2>
                    <p>
                        We use cookies to personalize content and ads, to provide social media features and to analyze our traffic.
                        By using our website, you consent to our use of cookies.
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">4. Contact Us</h2>
                    <p>
                        If you have questions about this Privacy Policy, please contact us at:
                        <br />
                        <span className="font-medium">contact@tanmayrathod.com</span>
                    </p>
                </section>
            </div>
        </div>
    );
}
