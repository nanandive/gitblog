import { getAllPosts } from '@/lib/mdx';
import HomeClient from './HomeClient';

export default function HomePage() {
  const posts = getAllPosts();
  return <HomeClient posts={posts} />;
}
