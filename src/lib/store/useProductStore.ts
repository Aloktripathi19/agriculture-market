'use client';
import { create } from 'zustand';
import type { Product, FilterOptions } from '@/types';
import { productService } from '@/lib/services/productService';

interface ProductStore {
  products: Product[];
  total: number;
  isLoading: boolean;
  filters: FilterOptions;
  setFilters: (f: Partial<FilterOptions>) => void;
  fetchProducts: () => Promise<void>;
  resetFilters: () => void;
}

const defaultFilters: FilterOptions = {
  category: 'all',
  sortBy: 'newest',
  page: 1,
  pageSize: 12,
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  total: 0,
  isLoading: false,
  filters: defaultFilters,

  setFilters: (f) => {
    set((s) => ({ filters: { ...s.filters, ...f, page: f.page ?? 1 } }));
    get().fetchProducts();
  },

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const { products, total } = await productService.getFiltered(get().filters);
      set({ products, total, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  resetFilters: () => {
    set({ filters: defaultFilters });
    get().fetchProducts();
  },
}));
