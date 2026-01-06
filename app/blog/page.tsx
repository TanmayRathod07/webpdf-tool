import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import { blogPosts } from "../data/blogData";

export default function BlogPage() {
    const posts = blogPosts;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">QuickPDF Blog</h1>
                    <p className="text-lg text-gray-500">Tips, tutorials, and guides for working with PDF documents.</p>
                </div>

                {/* Top Ad */}
                <div className="w-full h-[90px] bg-gray-100 rounded mb-12 flex items-center justify-center relative overflow-hidden">
                    <AdBanner slot="1234567890" />
                    <span className="text-xs text-gray-400 font-mono absolute pointer-events-none">Ad Space (Top Banner)</span>
                </div>

                <div className="grid gap-8">
                    {posts.map((post) => (
                        <article key={post.id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <h2 className="text-2xl font-bold text-gray-800 hover:text-primary transition-colors">
                                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                </h2>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                                        {post.category}
                                    </span>
                                    <span>{post.date}</span>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {post.excerpt}
                            </p>
                            <Link
                                href={`/blog/${post.slug}`}
                                className="inline-flex items-center text-primary font-semibold hover:underline"
                            >
                                Read Article &rarr;
                            </Link>
                        </article>
                    ))}
                </div>

            </main>
        </div>
    );
}
