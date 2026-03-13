'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';

const NAV_ITEMS = [
    { label: 'Blog', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: 'Graph', href: '/graph' },
    { label: 'About', href: '/about' },
] as const;

export const Header: React.FC = () => {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md" style={{ backgroundColor: 'color-mix(in srgb, var(--bg-primary) 85%, transparent)' }}>
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-lg font-bold tracking-tight hover:opacity-70 transition-opacity"
                    style={{ color: 'var(--text-primary)', textDecoration: 'none' }}
                >
                    nanandive.
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-1">
                    {NAV_ITEMS.map(({ label, href }) => {
                        const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
                        return (
                            <Link
                                key={href}
                                href={href}
                                className="px-3 py-1.5 text-sm rounded-lg transition-all duration-150"
                                style={{
                                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                                    backgroundColor: isActive ? 'color-mix(in srgb, var(--accent) 8%, transparent)' : 'transparent',
                                    fontWeight: isActive ? 600 : 400,
                                    textDecoration: 'none',
                                }}
                            >
                                {label}
                            </Link>
                        );
                    })}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="ml-2 p-2 rounded-lg transition-colors duration-150 hover:opacity-70"
                        style={{ color: 'var(--text-muted)' }}
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {theme === 'light' ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        )}
                    </button>
                </nav>
            </div>
        </header>
    );
};
