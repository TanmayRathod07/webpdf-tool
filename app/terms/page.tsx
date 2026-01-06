
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service - WebPDF' };

export default function Terms() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            <div className="flex-1 container mx-auto px-4 py-12 max-w-3xl bg-white shadow-sm my-8 p-8 rounded-xl">
                <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

                <section className="space-y-4 text-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 mt-8">1. Acceptance of Terms</h2>
                    <p>By accessing WebPDF, you agree to be bound by these Terms of Service. If you do not agree, please do not use our tools.</p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">2. Use License</h2>
                    <p>
                        WebPDF grants you a personal, non-exclusive, non-transferable license to use our software for personal or commercial PDF manipulation.
                        You may not attempt to reverse engineer the code or use the service for illegal activities.
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">3. Disclaimer of Warranties</h2>
                    <p className="uppercase font-semibold">
                        The services are provided "as is". WebPDF makes no warranties, expressed or implied.
                    </p>
                    <p>
                        Since file processing happens locally on your device, we are not responsible for any data loss, file corruption, or browser crashes
                        that may occur during the use of our tools. Please always keep a backup of your original files.
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-8">4. Limitations</h2>
                    <p>
                        In no event shall WebPDF or its owners be liable for any damages (including, without limitation, damages for loss of data or profit)
                        arising out of the use or inability to use the materials on WebPDF.
                    </p>
                </section>
            </div>
        </div>
    );
}
