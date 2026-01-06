import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdBanner from "@/components/AdBanner";
import { notFound } from "next/navigation";
import { blogPosts } from "../../data/blogData";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogPostPage(props: PageProps) {
    const params = await props.params;
    const { slug } = params;

    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">

                <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
                </Link>

                <article className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border">
                    <header className="mb-8">
                        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{post.category}</span>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">{post.title}</h1>
                        <p className="text-gray-500">Published on {post.date} • By {post.author}</p>
                    </header>

                    {/* Ad inside content */}
                    <div className="my-8 w-full h-[250px] bg-gray-100 rounded flex items-center justify-center relative overflow-hidden">
                        <AdBanner slot="1234567890" />
                        <span className="text-xs text-gray-400 font-mono absolute pointer-events-none">Ad Space (In-Article)</span>
                    </div>

                    <div className="prose prose-lg px-4 text-gray-700 max-w-none space-y-4">
                        {post.content.split('\n').map((line, index) => {
                            const trimmed = line.trim();
                            if (!trimmed) return <br key={index} />;

                            // Very basic formatting
                            if (trimmed.startsWith('### ')) {
                                return <h3 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-4">{trimmed.replace('### ', '')}</h3>;
                            }
                            if (trimmed.startsWith('* ')) {
                                return (
                                    <ul key={index} className="list-disc pl-5">
                                        <li>{parseLinks(trimmed.replace('* ', ''))}</li>
                                    </ul>
                                );
                            }
                            if (trimmed.startsWith('**') && trimmed.endsWith('**')) { // Simple bold check for lines
                                return <p key={index} className="font-bold">{parseLinks(trimmed.replace(/\*\*/g, ''))}</p>
                            }

                            return <p key={index} className="leading-relaxed whitespace-pre-line">{parseLinks(trimmed)}</p>;
                        })}
                    </div>
                </article>
            </main>
        </div>
    );
}

// Simple helper to parse [text](/link) markdown (basic implementation)
function parseLinks(text: string) {
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
            return <Link key={i} href={match[2]} className="text-blue-600 hover:underline">{match[1]}</Link>;
        }
        // Also handle bolding inside text like **bold**
        const boldParts = part.split(/(\*\*.*?\*\*)/g);
        if (boldParts.length > 1) {
            return boldParts.map((bp, j) => {
                if (bp.startsWith('**') && bp.endsWith('**')) {
                    return <strong key={`${i}-${j}`}>{bp.slice(2, -2)}</strong>;
                }
                return bp;
            });
        }
        return part;
    });
}
