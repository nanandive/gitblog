import { getPostBySlug, getAutoRelatedPosts } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const prettyCodeOptions = {
    theme: 'github-dark',
    keepBackground: true,
    defaultLang: 'plaintext',
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    // Auto-compute related posts (slug prefix → category → keyword overlap)
    // Explicit frontmatter `related` takes priority if set
    const explicitSlugs: string[] = post.related ?? [];
    const connectedNotes = getAutoRelatedPosts(slug, 4);
    // If explicit slugs exist, filter to those first
    const finalNotes = explicitSlugs.length > 0
        ? connectedNotes.filter(n => explicitSlugs.includes(n.id))
        : connectedNotes;

    return (
        <article className="max-w-2xl mx-auto pt-4 pb-20">
            {/* Back */}
            <Link
                href="/"
                className="text-xs hover:opacity-60 transition-opacity"
                style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
            >
                ← back
            </Link>

            {/* Title + Meta */}
            <header className="mt-8 mb-10">
                <div
                    className="text-[10px] px-2 py-0.5 rounded-full inline-block font-medium mb-3"
                    style={{
                        backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                        color: 'var(--accent)',
                    }}
                >
                    {post.category}
                </div>
                <h1
                    className="text-2xl font-semibold tracking-tight leading-snug"
                    style={{ color: 'var(--text-primary)' }}
                >
                    {post.title}
                </h1>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                    {post.date && (
                        <p
                            className="text-xs tabular-nums"
                            style={{
                                color: 'var(--text-muted)',
                                fontFamily: 'var(--font-jetbrains), monospace',
                            }}
                        >
                            {new Date(post.date).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-1.5 flex-wrap">
                            {post.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="text-[10px] px-2 py-0.5 rounded-full"
                                    style={{
                                        backgroundColor: 'var(--bg-code)',
                                        color: 'var(--text-muted)',
                                    }}
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            {/* MDX Content — rehype-pretty-code handles code blocks */}
            <div className="mdx-prose">
                <MDXRemote
                    source={post.content}
                    options={{
                        mdxOptions: {
                            rehypePlugins: [
                                () => rehypePrettyCode(prettyCodeOptions as any),
                            ],
                        },
                    }}
                />
            </div>

            {/* ===== Obsidian Connected Notes ===== */}
            {finalNotes.length > 0 && (
                <div
                    className="mt-16 pt-8"
                    style={{ borderTop: '1px solid var(--border-subtle)' }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        {/* Obsidian-style node icon */}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
                            <circle cx="12" cy="12" r="3" />
                            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                        </svg>
                        <p
                            className="text-xs font-medium uppercase tracking-widest"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            {explicitSlugs.length > 0 ? 'connected notes' : `more in ${post.category}`}
                        </p>
                    </div>
                    <div
                        className="rounded-xl overflow-hidden"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-subtle)',
                        }}
                    >
                        {finalNotes.map((note, i) => (
                            <Link
                                key={note.id}
                                href={`/blog/${note.id}`}
                                className="flex items-baseline justify-between gap-4 px-5 py-3.5 transition-all duration-150 hover:opacity-70"
                                style={{
                                    textDecoration: 'none',
                                    borderBottom: i < finalNotes.length - 1
                                        ? '1px solid var(--border-subtle)'
                                        : 'none',
                                }}
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    <span
                                        className="text-[9px] px-1.5 py-0.5 rounded-full shrink-0"
                                        style={{
                                            backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)',
                                            color: 'var(--accent)',
                                        }}
                                    >
                                        {note.category}
                                    </span>
                                    <span
                                        className="text-sm truncate"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {note.title}
                                    </span>
                                </div>
                                <span
                                    className="text-[11px] shrink-0 tabular-nums"
                                    style={{
                                        color: 'var(--text-muted)',
                                        fontFamily: 'var(--font-jetbrains), monospace',
                                    }}
                                >
                                    {new Date(note.date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </article>
    );
}
