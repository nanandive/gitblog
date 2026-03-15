import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/mdx';

export async function GET() {
    const posts = getAllPosts();
    return NextResponse.json(
        posts.map(p => ({
            id: p.id,
            title: p.title,
            category: p.category,
            excerpt: p.excerpt,
        }))
    );
}
