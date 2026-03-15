import { getPostBySlug } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

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
                {post.date && (
                    <p
                        className="mt-2 text-xs"
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
            </header>

            {/* MDX Content — styled via .mdx-prose in globals.css */}
            <div className="mdx-prose">
                <MDXRemote source={post.content} />
            </div>
        </article>
    );
}
