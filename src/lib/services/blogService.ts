import type { BlogPost } from '@/types';
import { supabase } from '@/lib/db/supabase';

function generateId() {
  return `blog-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const blogService = {
  async getAll(): Promise<BlogPost[]> {
    const { data } = await supabase.from('blog_posts').select('data').order('updated_at', { ascending: false });
    return (data ?? []).map((r) => r.data as BlogPost);
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
    const all = await this.getAll();
    return all.find((b) => b.slug === slug);
  },

  async create(input: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const post: BlogPost = {
      ...input,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await supabase.from('blog_posts').insert({ id: post.id, data: post, updated_at: post.updatedAt });
    return post;
  },

  async update(post: BlogPost): Promise<void> {
    post.updatedAt = new Date().toISOString();
    await supabase.from('blog_posts').update({ data: post, updated_at: post.updatedAt }).eq('id', post.id);
  },

  async delete(id: string): Promise<void> {
    await supabase.from('blog_posts').delete().eq('id', id);
  },
};
