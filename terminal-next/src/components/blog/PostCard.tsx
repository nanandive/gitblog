'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types';

interface PostCardProps {
    post: BlogPost;
    index?: number;
}

/**
 * Borderless post card — no borders, no shadows.
 * Uses whitespace and typography to separate content.
 */
export const PostCard: React.FC<PostCardProps> = ({ post, index = 0 }) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
        >
            <Link
                href={`/blog/${post.id}`}
                className="group block py-6 transition-all duration-150"
                style={{ textDecoration: 'none' }}
            >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    {/* Date */}
                    <time
                        dateTime={post.date}
                        className="text-sm shrink-0 tabular-nums"
                        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-jetbrains), monospace' }}
                    >
                        {new Date(post.date).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        })}
                    </time>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <h3
                            className="text-lg font-semibold group-hover:opacity-60 transition-opacity duration-150 leading-snug"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            {post.title}
                        </h3>
                        <p
                            className="mt-1 text-sm line-clamp-2 leading-relaxed"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            {post.excerpt}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                            <span
                                className="text-xs px-2 py-0.5 rounded-md"
                                style={{
                                    color: 'var(--accent)',
                                    backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)',
                                }}
                            >
                                {post.category}
                            </span>
                            {post.readingTime && (
                                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                    {post.readingTime} min read
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};
