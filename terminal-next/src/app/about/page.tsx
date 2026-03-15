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
                <blockquote
                    className="border-l-2 pl-5 py-1 italic text-lg"
                    style={{ borderColor: 'var(--accent)', color: 'var(--text-primary)' }}
                >
                    "Genius is 1% inspiration and 99% perspiration."
                    <footer className="text-sm mt-1 not-italic" style={{ color: 'var(--text-muted)' }}>
                        — Thomas Edison
                    </footer>
                </blockquote>
                <p>
                    재능보다 <strong style={{ color: 'var(--text-primary)' }}>꾸준함</strong>이 앞선다고 믿습니다.
                    매일 1%씩 나아지는 것이 결국 100%를 바꾼다고 생각하며 공부합니다.
                </p>
                <p>
                    백엔드 개발자로서 시스템의 안정성과 확장성을 고민하고, 실제로 써봐야 안다는 주의로 —
                    배운 것은 직접 만들어보거나 글로 정리합니다.
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
