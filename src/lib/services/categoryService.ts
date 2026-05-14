import type { Category } from '@/types';
import { supabase } from '@/lib/db/supabase';

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const { data } = await supabase.from('categories').select('data').order('updated_at', { ascending: true });
    return (data ?? []).map((r) => r.data as Category).sort((a, b) => a.sortOrder - b.sortOrder);
  },

  async getActive(): Promise<Category[]> {
    const all = await this.getAll();
    return all.filter((c) => c.isActive);
  },

  async getBySlug(slug: string): Promise<Category | undefined> {
    const all = await this.getAll();
    return all.find((c) => c.slug === slug);
  },

  async create(category: Category): Promise<void> {
    await supabase.from('categories').upsert({ id: category.id, data: category, updated_at: new Date().toISOString() });
  },

  async update(category: Category): Promise<void> {
    category.updatedAt = new Date().toISOString();
    await supabase.from('categories').update({ data: category, updated_at: category.updatedAt }).eq('id', category.id);
  },

  async delete(id: string): Promise<void> {
    await supabase.from('categories').delete().eq('id', id);
  },
};
