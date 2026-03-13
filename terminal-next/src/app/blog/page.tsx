import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export const metadata: Metadata = {
    title: 'Blog Archive | NANANDIVE',
    description: 'All blog posts from NANANDIVE - Cyber-Aesthetic Developer Blog',
};

export default function BlogListPage() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        href="/"
                        className="text-cyan-400 font-black tracking-widest text-sm hover:text-white transition-colors"
                    >
                        ← TERMINAL
                    </Link>
                    <span className="text-white/20 font-mono text-xs">ARCHIVE_MODE</span>
                </div>
            </nav>

            {/* Header */}
            <header className="pt-24 pb-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
                        ARCHIVE
                    </h1>
                    <p className="text-white/40 font-mono text-sm">
                        {posts.length} DATA_SEGMENTS AVAILABLE
                    </p>
                </div>
            </header>

            {/* Post List */}
            <main className="px-6 pb-20">
                <div className="max-w-4xl mx-auto space-y-6">
                    {posts.map((post, idx) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.id}`}
                            className="block group"
                        >
                            <article className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 flex flex-col md:flex-row gap-6">
                                <div className="w-20 h-20 bg-white/5 rounded-xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
                                    {idx % 3 === 0 ? '💠' : idx % 3 === 1 ? '🐚' : '🧠'}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">
                                        <span className="text-cyan-400">{post.category}</span>
                                        <span>•</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-white/40 text-sm line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-white/20 text-xs font-mono">
                        © 2024 NANANDIVE. Built with Next.js + MDX
                    </p>
                </div>
            </footer>
        </div>
    );
}
