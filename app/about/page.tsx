export default function About() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About WebPDF</h1>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6 text-gray-600 leading-relaxed">
                <p>
                    Welcome to <strong>WebPDF</strong>, a free and secure tool designed to make PDF management easy for everyone.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8">Our Mission</h2>
                <p>
                    Most online PDF tools upload your sensitive files to a remote server. We believe privacy is a right, not a feature.
                    That is why WebPDF runs <strong>entirely in your browser</strong>. Your files never leave your device.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8">The Developer</h2>
                <p>
                    This project is built and maintained by <strong>Tanmay Rathod</strong>, a Full Stack Developer based in Pune, India.
                    Passionate about building open-source tools that solve real-world problems.
                </p>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
                    <p className="text-sm text-blue-800">
                        <strong>Open Source:</strong> Developers can contribute to this project on GitHub to add new features or improve performance.
                    </p>
                </div>
            </div>
        </div>
    );
}
