import { getAllPosts } from '@/lib/mdx';
import CategoriesClient from './CategoriesClient';

export default async function CategoriesPage() {
    const posts = getAllPosts();

    // Group by category
    const categoryMap = new Map<string, typeof posts>();
    posts.forEach((post) => {
        const cat = post.category || 'Uncategorized';
        if (!categoryMap.has(cat)) categoryMap.set(cat, []);
        categoryMap.get(cat)!.push(post);
    });

    const categories = Array.from(categoryMap.entries()).map(([name, catPosts]) => ({
        name,
        count: catPosts.length,
        posts: catPosts,
    }));

    return <CategoriesClient categories={categories} />;
}
