import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface BlogPost {
    id: string;
    title: string;
    date: string;
    category: string;
    excerpt: string;
    content: string;
}

const postsDir = path.join(process.cwd(), 'content/posts');
const outputPath = path.join(process.cwd(), 'public/posts.json');

function generatePosts(): void {
    console.log('📝 Generating posts.json from MDX files...\n');

    // Check if posts directory exists
    if (!fs.existsSync(postsDir)) {
        console.error('❌ content/posts directory not found');
        process.exit(1);
    }

    // Get all MDX files
    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));

    if (files.length === 0) {
        console.warn('⚠️  No MDX/MD files found in content/posts');
        fs.writeFileSync(outputPath, JSON.stringify([], null, 2));
        return;
    }

    // Parse each file
    const posts: BlogPost[] = files.map(file => {
        const slug = file.replace(/\.mdx?$/, '');
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        console.log(`  ✓ ${slug}`);

        return {
            id: slug,
            title: data.title || slug,
            date: data.date || new Date().toISOString().split('T')[0],
            category: data.category || 'Uncategorized',
            excerpt: data.excerpt || content.slice(0, 150).replace(/[#*`]/g, '').trim() + '...',
            content: content.trim(),
        };
    });

    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Ensure public directory exists
    const publicDir = path.dirname(outputPath);
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write JSON file
    fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));

    console.log(`\n✅ Generated ${posts.length} posts → public/posts.json`);
}

generatePosts();
