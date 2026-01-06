
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Cookie Policy - WebPDF' };

export default function Cookies() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            <div className="flex-1 container mx-auto px-4 py-12 max-w-3xl bg-white shadow-sm my-8 p-8 rounded-xl">
                <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

                <section className="space-y-4 text-gray-700">
                    <p>This Cookie Policy explains how WebPDF uses cookies and similar technologies.</p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">What are cookies?</h2>
                    <p>Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences.</p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">How we use cookies</h2>
                    <ul className="list-disc ml-6 space-y-2">
                        <li><strong>Essential Cookies:</strong> Necessary for the website to function (e.g., keeping you logged in).</li>
                        <li><strong>Advertising Cookies (Google AdSense):</strong> Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites.</li>
                        <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with the site.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">Managing Cookies</h2>
                    <p>
                        You can choose to disable cookies through your individual browser options. However, this may affect your ability to use certain features of our website.
                    </p>
                    <p>
                        To opt out of personalized advertising from Google, visit <a href="https://www.google.com/settings/ads" className="text-blue-600 underline">Google Ad Settings</a>.
                    </p>
                </section>
            </div>
        </div>
    );
}
