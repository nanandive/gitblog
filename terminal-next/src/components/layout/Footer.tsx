import React from 'react';

const SOCIAL_LINKS = [
    { label: 'GitHub', href: 'https://github.com/nanandive', icon: 'github' },
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
] as const;

export const Footer: React.FC = () => {
    return (
        <footer
            className="w-full max-w-5xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
            style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)' }}
        >
            <p>© 2025 nanandive. All rights reserved.</p>

            <div className="flex items-center gap-4">
                {SOCIAL_LINKS.map(({ label, href }) => (
                    <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-70 transition-opacity"
                        style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                    >
                        {label}
                    </a>
                ))}
            </div>
        </footer>
    );
};
