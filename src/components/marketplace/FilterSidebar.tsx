'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, Leaf, Award } from 'lucide-react';
import type { FilterOptions } from '@/types';

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

interface Props {
  filters: FilterOptions;
  onFilterChange: (f: Partial<FilterOptions>) => void;
  onReset: () => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export function FilterSidebar({ filters, onFilterChange, onReset, isMobile, isOpen, onClose }: Props) {
  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </h3>
        <button
          onClick={onReset}
          className="text-xs text-primary-600 hover:text-primary-700 font-medium"
        >
          Reset All
        </button>
      </div>

      {/* Sort */}
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Sort By</h4>
        <select
          value={filters.sortBy || 'newest'}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterOptions['sortBy'] })}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Quality Filters */}
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quality</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={!!filters.isOrganic}
              onChange={(e) => onFilterChange({ isOrganic: e.target.checked || undefined })}
              className="w-4 h-4 rounded accent-primary-600"
            />
            <Leaf className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-sm text-slate-700">Organic Certified</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={!!filters.isExportQuality}
              onChange={(e) => onFilterChange({ isExportQuality: e.target.checked || undefined })}
              className="w-4 h-4 rounded accent-primary-600"
            />
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-sm text-slate-700">Export Quality</span>
          </label>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Availability</h4>
        <div className="space-y-1">
          {[
            { value: 'all', label: 'All' },
            { value: 'available', label: 'In Stock' },
            { value: 'limited', label: 'Limited Stock' },
            { value: 'pre-order', label: 'Pre-Order' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => onFilterChange({ status: opt.value as FilterOptions['status'] })}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                (filters.status || 'all') === opt.value
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-full bg-white z-50 shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">Filter Crops</h3>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">{content}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return <div className="bg-white rounded-2xl border border-slate-100 p-5">{content}</div>;
}
