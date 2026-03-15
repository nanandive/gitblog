import { getAllPosts } from '@/lib/mdx';
import HomeClient from './HomeClient';

export default async function HomePage() {
  const posts = getAllPosts();
  return <HomeClient posts={posts} />;
}
