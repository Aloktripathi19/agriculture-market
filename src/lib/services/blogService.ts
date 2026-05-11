import type { BlogPost } from '@/types';
import { getDB } from '@/lib/db/indexeddb';

function generateId() {
  return `blog-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const blogService = {
  async getAll(): Promise<BlogPost[]> {
    const db = await getDB();
    const all = await db.getAll('blog_posts');
    return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getPublished(): Promise<BlogPost[]> {
    const all = await this.getAll();
    return all.filter((b) => b.isPublished);
  },

  async getFeatured(): Promise<BlogPost[]> {
    const all = await this.getPublished();
    return all.filter((b) => b.isFeatured).slice(0, 3);
  },

  async getBySlug(slug: string): Promise<BlogPost | undefined> {
    const db = await getDB();
    return db.getFromIndex('blog_posts', 'by_slug', slug);
  },

  async create(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const db = await getDB();
    const post: BlogPost = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await db.put('blog_posts', post);
    return post;
  },

  async update(post: BlogPost): Promise<void> {
    const db = await getDB();
    post.updatedAt = new Date().toISOString();
    await db.put('blog_posts', post);
  },

  async delete(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('blog_posts', id);
  },
};
