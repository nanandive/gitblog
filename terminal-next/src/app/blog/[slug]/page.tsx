import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import BlogPostClient from './BlogPostClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({ slug: post.id }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();
    return <BlogPostClient post={post!} />;
}
