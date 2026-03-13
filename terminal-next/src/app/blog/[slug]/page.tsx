'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getPostById, getRelatedPosts } from '@/lib/constants';
import Link from 'next/link';

export default function BlogPostPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const post = getPostById(slug);

    if (!post) {
        return (
            <div className="py-20 text-center">
                <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    Post not found
                </h1>
                <button
                    onClick={() => router.push('/')}
                    className="mt-4 text-sm underline cursor-pointer border-none bg-transparent"
                    style={{ color: 'var(--accent)' }}
                >
                    ← Back to all posts
                </button>
            </div>
        );
    }

    const related = getRelatedPosts(post);

    return (
        <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-[var(--max-content)] mx-auto py-8"
        >
            {/* Back button */}
            <Link
                href="/"
                className="inline-flex items-center gap-1 text-sm mb-8 hover:opacity-60 transition-opacity"
                style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
            >
                ← All Posts
            </Link>

            {/* Header */}
            <header className="mb-10">
                <h1
                    className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight"
                    style={{ color: 'var(--text-primary)' }}
                >
                    {post.title}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <time dateTime={post.date} style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
                        {new Date(post.date).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                    <span>·</span>
                    <span>{post.readingTime || 5} min read</span>
                    <span>·</span>
                    <span
                        className="px-2 py-0.5 rounded-md text-xs"
                        style={{
                            color: 'var(--accent)',
                            backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)',
                        }}
                    >
                        {post.category}
                    </span>
                </div>
            </header>

            {/* Separator */}
            <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '0 0 2.5rem 0' }} />

            {/* Content */}
            <div className="prose" style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }}>
                {post.content}
            </div>

            {/* Related posts (Obsidian-style connections) */}
            {related.length > 0 && (
                <section className="mt-16 pt-8" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
                        Connected Notes
                    </h3>
                    <div className="space-y-3">
                        {related.map((relPost) => (
                            <Link
                                key={relPost.id}
                                href={`/blog/${relPost.id}`}
                                className="block py-2 hover:opacity-60 transition-opacity"
                                style={{ color: 'var(--text-primary)', textDecoration: 'none' }}
                            >
                                <span className="font-medium">{relPost.title}</span>
                                <span className="ml-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                                    {relPost.category}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Footer nav */}
            <div className="mt-16 pt-8 text-center" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <Link
                    href="/"
                    className="text-sm hover:opacity-60 transition-opacity"
                    style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                >
                    ← Back to all posts
                </Link>
            </div>
        </motion.article>
    );
}
