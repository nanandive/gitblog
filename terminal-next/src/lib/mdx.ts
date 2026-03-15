import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/types';

const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * Get all blog posts with frontmatter
 */
export function getAllPosts(): BlogPost[] {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
        .filter(name => name.endsWith('.mdx') || name.endsWith('.md'))
        .map(fileName => {
            const slug = fileName.replace(/\.mdx?$/, '');
            return getPostBySlug(slug);
        })
        .filter((post): post is BlogPost => post !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
    try {
        const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
        const mdPath = path.join(postsDirectory, `${slug}.md`);

        const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            id: slug,
            title: data.title || slug,
            date: data.date || new Date().toISOString().split('T')[0],
            category: data.category || 'Uncategorized',
            excerpt: data.excerpt || content.slice(0, 150) + '...',
            content: content,
            tags: data.tags || [],
            related: data.related || [],
        };
    } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
    }
}

/**
 * Get all post slugs for static generation
 */
export function getAllPostSlugs(): string[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    return fs.readdirSync(postsDirectory)
        .filter(name => name.endsWith('.mdx') || name.endsWith('.md'))
        .map(name => name.replace(/\.mdx?$/, ''));
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): BlogPost[] {
    return getAllPosts().filter(post =>
        post.category.toLowerCase() === category.toLowerCase()
    );
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
    const posts = getAllPosts();
    const categories = [...new Set(posts.map(post => post.category))];
    return categories.sort();
}

/**
 * Auto-compute related posts without requiring manual frontmatter.
 *
 * Scoring:
 *   +10  same slug prefix cluster (e.g. "mysql-*" ↔ "mysql-*")
 *   +5   same category
 *   +2   per shared keyword in slug
 */
export function getAutoRelatedPosts(slug: string, limit = 4): BlogPost[] {
    const allPosts = getAllPosts();
    const current = allPosts.find(p => p.id === slug);
    if (!current) return [];

    const slugPrefix = (s: string) => s.split('-')[0];
    const slugTokens = (s: string) => new Set(s.split('-').filter(t => t.length > 2));

    const currentPrefix = slugPrefix(slug);
    const currentTokens = slugTokens(slug);

    return allPosts
        .filter(p => p.id !== slug)
        .map(p => {
            let score = 0;
            if (slugPrefix(p.id) === currentPrefix) score += 10;
            if (p.category === current.category) score += 5;
            const shared = [...slugTokens(p.id)].filter(t => currentTokens.has(t));
            score += shared.length * 2;
            return { post: p, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score
            || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
        .map(({ post }) => post)
        .slice(0, limit);
}
