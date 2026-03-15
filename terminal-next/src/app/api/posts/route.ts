import { NextResponse } from 'next/server';
import { getAllPosts, getAutoRelatedPosts } from '@/lib/mdx';

export async function GET() {
    const posts = getAllPosts();
    return NextResponse.json(
        posts.map(p => ({
            id: p.id,
            title: p.title,
            category: p.category,
            excerpt: p.excerpt,
            // Include auto-computed related slugs for graph edges
            relatedPosts: getAutoRelatedPosts(p.id, 3).map(r => r.id),
        }))
    );
}
