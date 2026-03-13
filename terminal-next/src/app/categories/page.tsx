'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS, getCategoryInfo, filterPostsByCategory } from '@/lib/constants';
import { PostCard } from '@/components/blog/PostCard';
import Link from 'next/link';

export default function CategoriesPage() {
    const categories = getCategoryInfo(BLOG_POSTS);

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
                {categories.map(({ name, count, slug }) => {
                    const posts = filterPostsByCategory(BLOG_POSTS, name);
                    return (
                        <motion.section
                            key={name}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
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
                                className="divide-y"
                                style={{ borderColor: 'var(--border-subtle)' }}
                            >
                                {posts.map((post, index) => (
                                    <PostCard key={post.id} post={post} index={index} />
                                ))}
                            </div>
                        </motion.section>
                    );
                })}
            </div>
        </div>
    );
}
