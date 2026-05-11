import type { Category } from '@/types';
import { getDB } from '@/lib/db/indexeddb';

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const db = await getDB();
    const all = await db.getAll('categories');
    return all.sort((a, b) => a.sortOrder - b.sortOrder);
  },

  async getActive(): Promise<Category[]> {
    const all = await this.getAll();
    return all.filter((c) => c.isActive);
  },

  async getBySlug(slug: string): Promise<Category | undefined> {
    const db = await getDB();
    return db.getFromIndex('categories', 'by_slug', slug);
  },

  async create(category: Category): Promise<void> {
    const db = await getDB();
    await db.put('categories', category);
  },

  async update(category: Category): Promise<void> {
    const db = await getDB();
    category.updatedAt = new Date().toISOString();
    await db.put('categories', category);
  },

  async delete(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('categories', id);
  },
};
