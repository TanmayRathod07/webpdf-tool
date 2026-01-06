import Link from "next/link";
import { Layers, Scissors, Image as ImageIcon, CheckCircle, Shield, Zap } from "lucide-react";

export default function Home() {
  const tools = [
    {
      icon: Layers,
      title: "Merge PDF",
      desc: "Combine multiple PDF files into one document.",
      href: "/merge",
      color: "text-blue-600 bg-blue-100",
    },
    {
      icon: Scissors,
      title: "Split PDF",
      desc: "Extract pages or split your PDF into multiple files.",
      href: "/split",
      color: "text-amber-600 bg-amber-100",
    },
    {
      icon: ImageIcon,
      title: "Image to PDF",
      desc: "Convert JPG, PNG or GIF images to PDF format.",
      href: "/image-to-pdf",
      color: "text-purple-600 bg-purple-100",
    },
  ];

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent pt-24 pb-20 text-center px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-main">
            Every tool you need to work with PDFs
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            100% Free. Secure. Runs primarily in your browser. No software installation required.
          </p>
          <div className="pt-4">
            <Link
              href="#tools"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-primary-hover transition-colors"
            >
              Explore All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-text-main">Most Popular Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="group bg-white rounded-2xl p-8 shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${tool.color} group-hover:scale-110 transition-transform duration-300`}>
                <tool.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-text-main group-hover:text-primary transition-colors">{tool.title}</h3>
              <p className="text-text-muted leading-relaxed">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features / SEO Content */}
      <section className="bg-surface py-20 border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why use QuickPDF?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl">Secure & Private</h3>
              <p className="text-text-muted">Most processing happens in your browser. Your files are safe and not stored on our servers.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl">Fast & Easy</h3>
              <p className="text-text-muted">Designed for speed. Get your work done in seconds with our intuitive interface.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl">100% Free</h3>
              <p className="text-text-muted">No hidden costs, no watermarks, and no registration required to use our tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placeholder */}
      <section className="container mx-auto px-4 flex justify-center">
        <div className="w-[728px] h-[90px] bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-sm">
          Ad Banner (728x90)
        </div>
      </section>
    </div>
  );
}
