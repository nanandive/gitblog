import { BlogPost, Category, CategoryInfo } from '@/types';

/**
 * Extract unique categories with post counts.
 */
export function getCategoryInfo(posts: BlogPost[]): CategoryInfo[] {
    const countMap = new Map<Category, number>();

    posts.forEach((post) => {
        const count = countMap.get(post.category) || 0;
        countMap.set(post.category, count + 1);
    });

    return Array.from(countMap.entries()).map(([name, count]) => ({
        name,
        count,
        slug: name.toLowerCase(),
    }));
}

/**
 * Filter posts by category.
 */
export function filterPostsByCategory(
    posts: BlogPost[],
    category: Category | 'All',
): BlogPost[] {
    if (category === 'All') return posts;
    return posts.filter((post) => post.category === category);
}
