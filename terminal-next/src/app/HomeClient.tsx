'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BlogPost, Category } from '@/types';
import Link from 'next/link';

/* ===== Side Projects ===== */
const PROJECTS = [
    {
        name: 'nanandive blog',
        desc: 'Next.js 기반 개인 블로그. 공부 기록과 기술 회고.',
        href: '/',
        tech: 'Next.js · MDX',
        emoji: '📝',
    },
    {
        name: 'ticket-service',
        desc: '대규모 트래픽 환경의 티켓 예매 시스템. Redis + Kafka 활용.',
        href: 'https://github.com/nanandive/ticket-service',
        tech: 'Spring Boot · Redis · Kafka',
        emoji: '🎫',
    },
    {
        name: 'backend-challenge-hub',
        desc: '백엔드 기술 면접 준비 & 코딩 챌린지 모음.',
        href: 'https://github.com/nanandive/backend-challenge-hub',
        tech: 'Java · Spring',
        emoji: '💪',
    },
];

/* ===== Stagger delay util ===== */
const stagger = (i: number) => ({ delay: i * 0.06, duration: 0.35 });

/* ===== Category info util ===== */
function getCategoryInfo(posts: BlogPost[]) {
    const countMap = new Map<Category, number>();
    posts.forEach((post) => {
        const count = countMap.get(post.category) || 0;
        countMap.set(post.category, count + 1);
    });
    return Array.from(countMap.entries()).map(([name, count]) => ({ name, count }));
}

interface HomeClientProps {
    posts: BlogPost[];
}

export default function HomeClient({ posts }: HomeClientProps) {
    const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

    const categories = getCategoryInfo(posts);
    const sorted = [...posts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    const filteredPosts =
        activeCategory === 'All'
            ? sorted
            : sorted.filter((p) => p.category === activeCategory);
    const recentPosts = sorted.slice(0, 4);

    return (
        <div className="max-w-4xl mx-auto pt-6">
            {/* ===== Bento Grid — Row 1 ===== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Bio Card — 2/3 width */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={stagger(0)}
                    className="md:col-span-2 rounded-2xl p-6 flex flex-col justify-between"
                    style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                    }}
                >
                    <div>
                        <h1
                            className="text-2xl font-bold tracking-tight mb-2"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            nanandive
                        </h1>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            백엔드 개발자. 코드, 아키텍처, 인프라, 그리고
                            <br />
                            만드는 것에 대해 기록합니다.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 mt-5">
                        <SocialPill href="https://github.com/nanandive" label="GitHub" />
                        <SocialPill href="mailto:hello@nanandive.dev" label="Email" />
                    </div>
                </motion.div>

                {/* Graph Card — 1/3 width */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={stagger(1)}
                >
                    <Link
                        href="/graph"
                        className="block h-full rounded-2xl p-6 transition-all duration-200 hover:scale-[1.02]"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-subtle)',
                            textDecoration: 'none',
                        }}
                    >
                        <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                            Note Graph
                        </p>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            옵시디언처럼 글들의 연결을 시각화합니다
                        </p>
                        <div className="mt-4 flex gap-1.5">
                            {['#22c55e', '#a855f7', '#3b82f6', '#f97316', '#06b6d4', '#ec4899', '#eab308'].map(
                                (c) => (
                                    <span
                                        key={c}
                                        className="w-2.5 h-2.5 rounded-full"
                                        style={{ backgroundColor: c }}
                                    />
                                ),
                            )}
                        </div>
                    </Link>
                </motion.div>
            </div>

            {/* ===== Bento Grid — Row 2: Recent Posts ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {recentPosts.map((post, i) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={stagger(i + 2)}
                    >
                        <Link
                            href={`/blog/${post.id}`}
                            className="block rounded-2xl p-5 h-full transition-all duration-200 hover:scale-[1.02]"
                            style={{
                                backgroundColor: 'var(--bg-secondary)',
                                border: '1px solid var(--border-subtle)',
                                textDecoration: 'none',
                            }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span
                                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                                    style={{
                                        backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                                        color: 'var(--accent)',
                                    }}
                                >
                                    {post.category}
                                </span>
                                <span
                                    className="text-[11px] tabular-nums"
                                    style={{
                                        color: 'var(--text-muted)',
                                        fontFamily: 'var(--font-jetbrains), monospace',
                                    }}
                                >
                                    {formatDate(post.date)}
                                </span>
                            </div>
                            <h3
                                className="text-sm font-semibold leading-snug"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {post.title}
                            </h3>
                            <p
                                className="text-xs mt-1.5 line-clamp-2"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                {post.excerpt}
                            </p>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* ===== Bento Grid — Row 3: Project Carousel ===== */}
            {PROJECTS.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={stagger(6)}
                    className="mb-8"
                >
                    <ProjectCarousel projects={PROJECTS} />
                </motion.div>
            )}

            {/* ===== All Posts Section ===== */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <p
                        className="text-xs font-medium uppercase tracking-widest"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        all posts
                    </p>
                    <div className="flex flex-wrap gap-1 ml-auto">
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
                    </div>
                </div>

                <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                    }}
                >
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, i) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.id}`}
                                className="flex items-baseline justify-between gap-4 px-5 py-3.5 transition-colors duration-150 hover:opacity-70"
                                style={{
                                    textDecoration: 'none',
                                    borderBottom:
                                        i < filteredPosts.length - 1
                                            ? '1px solid var(--border-subtle)'
                                            : 'none',
                                }}
                            >
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <span
                                        className="text-[10px] px-2 py-0.5 rounded-full shrink-0"
                                        style={{
                                            backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)',
                                            color: 'var(--accent)',
                                        }}
                                    >
                                        {post.category}
                                    </span>
                                    <span
                                        className="text-sm font-medium truncate"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {post.title}
                                    </span>
                                </div>
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
                </div>
            </motion.section>
        </div>
    );
}

/* ===== Helper Components ===== */

function SocialPill({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-full transition-all duration-150 hover:scale-105"
            style={{
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                textDecoration: 'none',
            }}
        >
            {label}
        </a>
    );
}

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
            className="px-2 py-0.5 text-[11px] rounded transition-all duration-150 cursor-pointer border-none"
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

/* ===== Project Carousel ===== */
interface Project {
    name: string;
    desc: string;
    href: string;
    tech: string;
    emoji: string;
}

function ProjectCarousel({ projects }: { projects: Project[] }) {
    const [current, setCurrent] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollTo = useCallback(
        (index: number) => {
            const clamped = Math.max(0, Math.min(index, projects.length - 1));
            setCurrent(clamped);
            if (scrollRef.current) {
                const card = scrollRef.current.children[clamped] as HTMLElement;
                if (card) {
                    scrollRef.current.scrollTo({
                        left: card.offsetLeft - 16,
                        behavior: 'smooth',
                    });
                }
            }
        },
        [projects.length],
    );

    const handleScroll = useCallback(() => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const scrollLeft = container.scrollLeft;
        const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth || 300;
        const index = Math.round(scrollLeft / (cardWidth + 16));
        setCurrent(Math.max(0, Math.min(index, projects.length - 1)));
    }, [projects.length]);

    return (
        <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <p
                    className="text-xs font-medium uppercase tracking-widest"
                    style={{ color: 'var(--text-muted)' }}
                >
                    projects
                </p>
                {/* Arrows */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => scrollTo(current - 1)}
                        disabled={current === 0}
                        className="w-7 h-7 flex items-center justify-center rounded-lg border-none cursor-pointer transition-all duration-150 disabled:opacity-30"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border-subtle)',
                        }}
                    >
                        ←
                    </button>
                    <button
                        onClick={() => scrollTo(current + 1)}
                        disabled={current === projects.length - 1}
                        className="w-7 h-7 flex items-center justify-center rounded-lg border-none cursor-pointer transition-all duration-150 disabled:opacity-30"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border-subtle)',
                        }}
                    >
                        →
                    </button>
                </div>
            </div>

            {/* Scrollable cards */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto pb-3"
                style={{
                    scrollSnapType: 'x mandatory',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                {projects.map((project) => (
                    <a
                        key={project.name}
                        href={project.href}
                        target={project.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="shrink-0 w-[280px] md:w-[320px] rounded-2xl p-5 transition-all duration-200 hover:scale-[1.02]"
                        style={{
                            scrollSnapAlign: 'start',
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-subtle)',
                            textDecoration: 'none',
                        }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{project.emoji}</span>
                            <span
                                className="text-[10px] font-medium uppercase tracking-widest"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                Project
                            </span>
                        </div>
                        <h3
                            className="text-sm font-semibold mb-1"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            {project.name}
                        </h3>
                        <p
                            className="text-xs leading-relaxed mb-3"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            {project.desc}
                        </p>
                        <p
                            className="text-[11px]"
                            style={{
                                color: 'var(--text-muted)',
                                fontFamily: 'var(--font-jetbrains), monospace',
                            }}
                        >
                            {project.tech}
                        </p>
                    </a>
                ))}
            </div>

            {/* Dot indicators */}
            {projects.length > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-2">
                    {projects.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            className="border-none cursor-pointer p-0 transition-all duration-200 rounded-full"
                            style={{
                                width: current === i ? 16 : 6,
                                height: 6,
                                backgroundColor:
                                    current === i ? 'var(--text-secondary)' : 'var(--border-subtle)',
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
