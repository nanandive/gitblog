import { getPostBySlug } from '@/lib/mdx';
import BlogPostClient from './BlogPostClient';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();
    return <BlogPostClient post={post!} />;
}
