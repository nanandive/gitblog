'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS, getCategoryInfo, filterPostsByCategory } from '@/lib/constants';
import { PostCard } from '@/components/blog/PostCard';
import { CategoryFilter } from '@/components/blog/CategoryFilter';
import { Category } from '@/types';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const categories = getCategoryInfo(BLOG_POSTS);
  const filteredPosts = filterPostsByCategory(BLOG_POSTS, activeCategory);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-8 pb-4"
      >
        <h1
          className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          All Posts.
        </h1>
        <p
          className="mt-3 text-lg leading-relaxed max-w-lg"
          style={{ color: 'var(--text-secondary)' }}
        >
          코드, 디자인, 그리고 만드는 것에 대한 기록.
        </p>
      </motion.section>

      {/* Category Filter */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </motion.section>

      {/* Post List */}
      <section>
        <div
          className="divide-y"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))
          ) : (
            <p
              className="py-12 text-center text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              No posts in this category yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
