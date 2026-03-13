import React from 'react';

export default function AboutPage() {
    return (
        <div className="max-w-[var(--max-content)] mx-auto py-8 space-y-8">
            <h1
                className="text-3xl font-bold tracking-tight"
                style={{ color: 'var(--text-primary)' }}
            >
                About
            </h1>

            <div className="space-y-6 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <p>
                    안녕하세요, <strong style={{ color: 'var(--text-primary)' }}>nanandive</strong>입니다.
                </p>
                <p>
                    개발과 디자인에 관심이 많고, 만드는 것을 좋아합니다.
                    이 블로그는 코드, 디자인, 그리고 배운 것들을 기록하는 공간입니다.
                </p>
                <p>
                    현재 사용하는 기술 스택은 React, TypeScript, Next.js, Tailwind CSS 등이며,
                    새로운 기술과 도구들을 탐구하는 것을 즐깁니다.
                </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem' }}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Contact</h2>
                <div className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <p>
                        GitHub:{' '}
                        <a href="https://github.com/nanandive" target="_blank" rel="noopener noreferrer" className="underline">
                            @nanandive
                        </a>
                    </p>
                    <p>
                        Email:{' '}
                        <a href="mailto:hello@nanandive.dev" className="underline">
                            hello@nanandive.dev
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
