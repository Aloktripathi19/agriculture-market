import type { Product, FilterOptions } from '@/types';
import { getDB } from '@/lib/db/indexeddb';

export const productService = {
  async getAll(): Promise<Product[]> {
    const db = await getDB();
    return db.getAll('products');
  },

  async getById(id: string): Promise<Product | undefined> {
    const db = await getDB();
    return db.get('products', id);
  },

  async getBySlug(slug: string): Promise<Product | undefined> {
    const db = await getDB();
    return db.getFromIndex('products', 'by_slug', slug);
  },

  async getByCategory(category: string): Promise<Product[]> {
    const db = await getDB();
    return db.getAllFromIndex('products', 'by_category', category);
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
      case 'price-asc':
        all.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        all.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        all.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        all.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    const total = all.length;
    const page = options.page || 1;
    const pageSize = options.pageSize || 12;
    const start = (page - 1) * pageSize;
    const products = all.slice(start, start + pageSize);

    return { products, total };
  },

  async create(product: Product): Promise<void> {
    const db = await getDB();
    await db.put('products', product);
  },

  async update(product: Product): Promise<void> {
    const db = await getDB();
    product.updatedAt = new Date().toISOString();
    await db.put('products', product);
  },

  async delete(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('products', id);
  },

  async getRelated(product: Product, limit = 4): Promise<Product[]> {
    const all = await this.getByCategory(product.category);
    return all.filter((p) => p.id !== product.id).slice(0, limit);
  },
};
