import { blogPosts } from '../data/blog-posts';
import type { BlogPost } from './types';

export async function getBlogPosts(): Promise<BlogPost[]> {
  return Promise.resolve(blogPosts);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const post = blogPosts.find(post => post.slug === slug);
  return Promise.resolve(post || null);
}