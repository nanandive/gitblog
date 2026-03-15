import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer
            className="w-full max-w-4xl mx-auto px-6 py-10 text-xs"
            style={{ color: 'var(--text-muted)' }}
        >
            <div className="flex items-center gap-3">
                <a
                    href="https://github.com/nanandive"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-60 transition-opacity"
                    style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                >
                    github
                </a>
                <span style={{ color: 'var(--border-subtle)' }}>·</span>
                <a
                    href="mailto:hello@nanandive.dev"
                    className="hover:opacity-60 transition-opacity"
                    style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                >
                    email
                </a>
            </div>
        </footer>
    );
};
