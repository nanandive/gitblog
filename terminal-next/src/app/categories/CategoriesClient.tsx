'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types';
import Link from 'next/link';

interface CategoryGroup {
    name: string;
    count: number;
    posts: BlogPost[];
}

interface CategoriesClientProps {
    categories: CategoryGroup[];
}

export default function CategoriesClient({ categories }: CategoriesClientProps) {
    return (
        <div className="space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1
                    className="text-3xl font-bold tracking-tight"
                    style={{ color: 'var(--text-primary)' }}
                >
                    Categories
                </h1>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                    카테고리별로 정리된 글 목록입니다.
                </p>
            </motion.div>

            <div className="space-y-12">
                {categories.map(({ name, count, posts }, catIdx) => (
                    <motion.section
                        key={name}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: catIdx * 0.08 }}
                    >
                        <div className="flex items-baseline gap-2 mb-4">
                            <h2
                                className="text-xl font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {name}
                            </h2>
                            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                ({count})
                            </span>
                        </div>

                        <div
                            className="rounded-xl overflow-hidden"
                            style={{
                                backgroundColor: 'var(--bg-secondary)',
                                border: '1px solid var(--border-subtle)',
                            }}
                        >
                            {posts.map((post, i) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.id}`}
                                    className="flex items-baseline justify-between gap-4 px-5 py-3.5 transition-colors duration-150 hover:opacity-70"
                                    style={{
                                        textDecoration: 'none',
                                        borderBottom:
                                            i < posts.length - 1
                                                ? '1px solid var(--border-subtle)'
                                                : 'none',
                                    }}
                                >
                                    <span
                                        className="text-sm font-medium truncate"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {post.title}
                                    </span>
                                    <span
                                        className="text-xs shrink-0 tabular-nums"
                                        style={{
                                            color: 'var(--text-muted)',
                                            fontFamily: 'var(--font-jetbrains), monospace',
                                        }}
                                    >
                                        {post.excerpt?.slice(0, 40)}...
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </motion.section>
                ))}
            </div>
        </div>
    );
}
