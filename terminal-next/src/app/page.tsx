'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS, getCategoryInfo, filterPostsByCategory } from '@/lib/constants';
import { Category } from '@/types';
import Link from 'next/link';

const SIDE_PROJECTS = [
  { name: 'nanandive blog', desc: '이 블로그', href: '/' },
  // 여기에 사이드 프로젝트 추가
  // { name: 'Project Name', desc: '설명', href: 'https://...' },
] as const;

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const categories = getCategoryInfo(BLOG_POSTS);
  const filteredPosts = filterPostsByCategory(BLOG_POSTS, activeCategory);

  // Sort by date descending
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="max-w-2xl mx-auto">
      {/* Bio — compact, leerob-style */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="pt-12 pb-10"
      >
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          백엔드 개발자. 코드, 아키텍처, 그리고 만드는 것에 대해 기록합니다.
          {SIDE_PROJECTS.length > 0 && (
            <>
              {' '}사이드 프로젝트:{' '}
              {SIDE_PROJECTS.map((p, i) => (
                <span key={p.name}>
                  <a
                    href={p.href}
                    target={p.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 decoration-1 hover:opacity-60 transition-opacity"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {p.name}
                  </a>
                  {i < SIDE_PROJECTS.length - 1 && ', '}
                </span>
              ))}
            </>
          )}
        </p>
      </motion.section>

      {/* Category tabs — subtle, small */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="flex flex-wrap gap-1 pb-6"
      >
        <TabButton
          label="All"
          isActive={activeCategory === 'All'}
          onClick={() => setActiveCategory('All')}
        />
        {categories.map(({ name }) => (
          <TabButton
            key={name}
            label={name}
            isActive={activeCategory === name}
            onClick={() => setActiveCategory(name)}
          />
        ))}
      </motion.div>

      {/* Post list — minimal: title + date only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group flex items-baseline justify-between gap-4 py-3 transition-opacity hover:opacity-60"
              style={{ textDecoration: 'none' }}
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
                {formatDate(post.date)}
              </span>
            </Link>
          ))
        ) : (
          <p className="py-8 text-sm text-center" style={{ color: 'var(--text-muted)' }}>
            이 카테고리에 글이 없습니다.
          </p>
        )}
      </motion.div>
    </div>
  );
}

/* ===== Helper Components ===== */

function TabButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 text-xs rounded-md transition-all duration-150 cursor-pointer border-none"
      style={{
        color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
        backgroundColor: isActive
          ? 'color-mix(in srgb, var(--text-primary) 6%, transparent)'
          : 'transparent',
        fontWeight: isActive ? 500 : 400,
      }}
    >
      {label}
    </button>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}.${month}.${day}`;
}
