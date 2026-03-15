'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types';
import Link from 'next/link';

export default function BlogPostClient({ post }: { post: BlogPost }) {
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
                    {post.date
                        ? new Date(post.date).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })
                        : ''}
                    {' · '}
                    {post.category}
                </p>
            </header>

            {/* Content — rendered as prose */}
            <div
                className="prose prose-sm max-w-none text-sm leading-7"
                style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}
            >
                {post.content}
            </div>
        </motion.article>
    );
}
