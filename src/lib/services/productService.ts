import type { Product, FilterOptions } from '@/types';
import { supabase } from '@/lib/db/supabase';

export const productService = {
  async getAll(): Promise<Product[]> {
    const { data } = await supabase.from('products').select('data').order('updated_at', { ascending: false });
    return (data ?? []).map((r) => r.data as Product);
  },

  async getById(id: string): Promise<Product | undefined> {
    const { data } = await supabase.from('products').select('data').eq('id', id).single();
    return data ? (data.data as Product) : undefined;
  },

  async getBySlug(slug: string): Promise<Product | undefined> {
    const all = await this.getAll();
    return all.find((p) => p.slug === slug);
  },

  async getByCategory(category: string): Promise<Product[]> {
    const all = await this.getAll();
    return all.filter((p) => p.category === category);
  },

  async getFeatured(): Promise<Product[]> {
    const all = await this.getAll();
    return all.filter((p) => p.isFeatured).slice(0, 8);
  },

  async getFiltered(options: FilterOptions): Promise<{ products: Product[]; total: number }> {
    let all = await this.getAll();

    if (options.search) {
      const q = options.search.toLowerCase();
      all = all.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.origin.toLowerCase().includes(q)
      );
    }

    if (options.category && options.category !== 'all') {
      all = all.filter((p) => p.category === options.category);
    }

    if (options.isOrganic) all = all.filter((p) => p.isOrganic);
    if (options.isExportQuality) all = all.filter((p) => p.isExportQuality);

    if (options.status && options.status !== 'all') {
      all = all.filter((p) => p.status === options.status);
    }

    if (options.minPrice !== undefined) all = all.filter((p) => p.price >= options.minPrice!);
    if (options.maxPrice !== undefined) all = all.filter((p) => p.price <= options.maxPrice!);

    switch (options.sortBy) {
      case 'price-asc': all.sort((a, b) => a.price - b.price); break;
      case 'price-desc': all.sort((a, b) => b.price - a.price); break;
      case 'newest': all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'rating': all.sort((a, b) => b.rating - a.rating); break;
      case 'name': all.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    const total = all.length;
    const page = options.page || 1;
    const pageSize = options.pageSize || 12;
    return { products: all.slice((page - 1) * pageSize, page * pageSize), total };
  },

  async create(product: Product): Promise<void> {
    await supabase.from('products').upsert({ id: product.id, data: product, updated_at: new Date().toISOString() });
  },

  async update(product: Product): Promise<void> {
    product.updatedAt = new Date().toISOString();
    await supabase.from('products').update({ data: product, updated_at: product.updatedAt }).eq('id', product.id);
  },

  async delete(id: string): Promise<void> {
    await supabase.from('products').delete().eq('id', id);
  },

  async getRelated(product: Product, limit = 4): Promise<Product[]> {
    const all = await this.getByCategory(product.category);
    return all.filter((p) => p.id !== product.id).slice(0, limit);
  },
};
