import { BlogPost, Category, CategoryInfo } from '@/types';

/**
 * Blog post data with relatedPosts for Obsidian-style graph.
 * In production, this would come from MDX frontmatter.
 */
export const BLOG_POSTS: BlogPost[] = [
    {
        id: 'intro-to-react',
        title: 'Modern React with TypeScript',
        date: '2024-05-15',
        category: 'Development',
        excerpt: 'Exploring the latest patterns in React 18 and why TypeScript is essential for modern web applications.',
        readingTime: 5,
        relatedPosts: ['gemini-api-guide'],
        content: `# Modern React with TypeScript

React has evolved significantly. With the introduction of Hooks and now Server Components, the landscape is more exciting than ever.

## Why TypeScript?
TypeScript provides type safety that catches errors during development rather than at runtime. For large-scale React applications, it's not just a preference; it's a requirement for maintainability.

## Key Takeaways
1. Functional Components are the standard.
2. Use useMemo and useCallback judiciously.
3. Strict mode is your friend.`,
    },
    {
        id: 'ubuntu-customization',
        title: 'My Top 10 Ubuntu Tweaks',
        date: '2024-06-01',
        category: 'Linux',
        excerpt: 'How I turn my stock Ubuntu installation into a powerhouse terminal workstation.',
        readingTime: 4,
        relatedPosts: [],
        content: `# My Top 10 Ubuntu Tweaks

Ubuntu is great out of the box, but a few tweaks make it perfect.

1. **GNOME Tweaks**: Essential for changing fonts and themes.
2. **Oh My Zsh**: Makes the terminal actually usable.
3. **Powerlevel10k**: Best theme for Zsh.
4. **Auto-hide Dock**: Get more screen real estate.
5. **Night Light**: Save your eyes during late-night coding sessions.`,
    },
    {
        id: 'gemini-api-guide',
        title: 'Integrating Gemini AI in Web Apps',
        date: '2024-06-10',
        category: 'AI',
        excerpt: 'A deep dive into the Google GenAI SDK and how to build responsive AI features.',
        readingTime: 8,
        relatedPosts: ['intro-to-react'],
        content: `# Integrating Gemini AI

The Gemini API is powerful and easy to use. With the @google/genai SDK, you can bring multimodal capabilities to any web app.

\`\`\`typescript
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash',
  contents: 'Summarize this blog post.',
});
\`\`\`

Real-time interactions like streaming and function calling allow for truly dynamic user experiences.`,
    },
];

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

/**
 * Find a post by ID.
 */
export function getPostById(id: string): BlogPost | undefined {
    return BLOG_POSTS.find((post) => post.id === id);
}

/**
 * Get related posts for a given post.
 */
export function getRelatedPosts(post: BlogPost): BlogPost[] {
    if (!post.relatedPosts) return [];
    return post.relatedPosts
        .map((id) => BLOG_POSTS.find((p) => p.id === id))
        .filter(Boolean) as BlogPost[];
}
