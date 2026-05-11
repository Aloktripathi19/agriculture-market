'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/marketplace/ProductCard';
import type { Product, FilterOptions } from '@/types';
import { productService } from '@/lib/services/productService';

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: (searchParams.get('category') as FilterOptions['category']) || 'all',
    search: searchParams.get('search') || '',
    sortBy: 'newest',
    page: 1,
    pageSize: 12,
  });

  useEffect(() => {
    setIsLoading(true);
    productService.getFiltered(filters).then(({ products, total }) => {
      setProducts(products);
      setTotal(total);
      setIsLoading(false);
    });
  }, [filters]);

  const handleFilterChange = (f: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...f, page: f.page ?? 1 }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange({ search: searchInput });
  };

  const totalPages = Math.ceil(total / (filters.pageSize || 12));

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-slate-100" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-slate-100 rounded w-3/4" />
        <div className="h-4 bg-slate-100 rounded w-full" />
        <div className="h-4 bg-slate-100 rounded w-2/3" />
        <div className="flex justify-between">
          <div className="h-7 bg-slate-100 rounded w-1/3" />
          <div className="h-9 bg-slate-100 rounded-xl w-24" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="gradient-green py-14 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl lg:text-4xl font-bold font-display text-white mb-3">Crop Marketplace</h1>
            <p className="text-primary-100">
              Browse {total > 0 ? `${total} ` : ''}export-quality agricultural crops from India&apos;s finest farms
            </p>
          </motion.div>

          {/* Search */}
          <form onSubmit={handleSearch} className="mt-6 flex gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search crops, spices, grains..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border-0 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 shadow-lg"
              />
              {searchInput && (
                <button type="button" onClick={() => { setSearchInput(''); handleFilterChange({ search: '' }); }} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                </button>
              )}
            </div>
            <button type="submit" className="px-5 py-3 bg-primary-800 hover:bg-primary-900 text-white font-medium rounded-xl shadow-lg transition-colors">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main Content */}
          <div className="min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-3">
              <p className="text-sm text-slate-500">
                {isLoading ? 'Loading...' : `${total} crops found`}
              </p>

              <div className="flex items-center gap-3">
                {filters.search && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-lg text-sm text-primary-700">
                    Searching: <strong>&quot;{filters.search}&quot;</strong>
                    <button onClick={() => { setSearchInput(''); handleFilterChange({ search: '' }); }}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <select
                  value={filters.sortBy || 'newest'}
                  onChange={(e) => handleFilterChange({ sortBy: e.target.value as FilterOptions['sortBy'] })}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {!isLoading && products.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🌾</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No crops found</h3>
                <p className="text-slate-500 mb-6">Try adjusting your filters or search term</p>
                <button
                  onClick={() => setFilters({ category: 'all', sortBy: 'newest', page: 1, pageSize: 12 })}
                  className="px-6 py-2.5 gradient-green text-white rounded-xl font-medium"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {isLoading
                  ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
                  : products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => handleFilterChange({ page: (filters.page || 1) - 1 })}
                  disabled={(filters.page || 1) <= 1}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-primary-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => handleFilterChange({ page: p })}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${
                      filters.page === p
                        ? 'gradient-green text-white shadow'
                        : 'border border-slate-200 text-slate-600 hover:border-primary-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => handleFilterChange({ page: (filters.page || 1) + 1 })}
                  disabled={(filters.page || 1) >= totalPages}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-primary-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-slate-50 pt-20 flex items-center justify-center"><div className="text-slate-500">Loading marketplace...</div></div>}>
        <MarketplaceContent />
      </Suspense>
      <Footer />
    </>
  );
}
