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
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    글을 찾을 수 없습니다.
                </p>
                <Link
                    href="/"
                    className="text-sm mt-4 inline-block"
                    style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}
                >
                    ← 돌아가기
                </Link>
            </div>
        );
    }

    const related = getRelatedPosts(post);

    return (
        <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto pt-4 pb-16"
        >
            {/* Back */}
            <Link
                href="/"
                className="text-xs hover:opacity-60 transition-opacity"
                style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
            >
                ← back
            </Link>

            {/* Title + Meta */}
            <header className="mt-8 mb-8">
                <h1
                    className="text-2xl font-semibold tracking-tight leading-snug"
                    style={{ color: 'var(--text-primary)' }}
                >
                    {post.title}
                </h1>
                <p
                    className="mt-2 text-xs"
                    style={{
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-jetbrains), monospace',
                    }}
                >
                    {new Date(post.date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                    {' · '}
                    {post.readingTime || 5} min read
                    {' · '}
                    {post.category}
                </p>
            </header>

            {/* Content */}
            <div
                className="text-sm leading-7"
                style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}
            >
                {post.content}
            </div>

            {/* Connected notes */}
            {related.length > 0 && (
                <div className="mt-14 pt-6" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                        connected notes
                    </p>
                    {related.map((r) => (
                        <Link
                            key={r.id}
                            href={`/blog/${r.id}`}
                            className="block text-sm py-1 hover:opacity-60 transition-opacity"
                            style={{ color: 'var(--text-primary)', textDecoration: 'none' }}
                        >
                            {r.title}
                        </Link>
                    ))}
                </div>
            )}
        </motion.article>
    );
}
