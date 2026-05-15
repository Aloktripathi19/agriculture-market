'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, Leaf, Award, MapPin } from 'lucide-react';
import type { Product } from '@/types';
import { productService } from '@/lib/services/productService';
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/utils';

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-primary-200 hover:shadow-card-hover transition-all duration-300 card-hover"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            if (!e.currentTarget.dataset.fb) {
              e.currentTarget.dataset.fb = '1';
              e.currentTarget.src = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80';
            }
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isExportQuality && (
            <span className="flex items-center gap-1 px-2 py-1 bg-amber-500 text-white text-xs font-semibold rounded-lg shadow">
              <Award className="w-3 h-3" /> Export
            </span>
          )}
          {product.isOrganic && (
            <span className="flex items-center gap-1 px-2 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow">
              <Leaf className="w-3 h-3" /> Organic
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-lg border ${STATUS_COLORS[product.status]}`}>
            {STATUS_LABELS[product.status]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold font-display text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors">
            {product.name}
          </h3>
        </div>

        <p className="text-sm text-slate-500 line-clamp-2 mb-2">{product.shortDescription}</p>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-full text-xs text-slate-600 font-medium mb-3 max-w-full">
          <MapPin className="w-3 h-3 text-primary-500 flex-shrink-0" />
          <span className="truncate">{product.origin}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium text-slate-700">{product.rating}</span>
          </div>
          <Link
            href={`/marketplace/${product.slug}`}
            className="flex items-center gap-1.5 px-4 py-2 gradient-green text-white text-sm font-medium rounded-xl shadow hover:opacity-90 transition-opacity"
          >
            Inquire <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-slate-100" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-slate-100 rounded w-3/4" />
        <div className="h-4 bg-slate-100 rounded w-full" />
        <div className="h-4 bg-slate-100 rounded w-2/3" />
        <div className="flex justify-between items-center">
          <div className="h-7 bg-slate-100 rounded w-1/3" />
          <div className="h-9 bg-slate-100 rounded-xl w-24" />
        </div>
      </div>
    </div>
  );
}

export function FeaturedCrops() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    productService.getFeatured().then((p) => {
      setProducts(p);
      setIsLoading(false);
    });
  }, []);

  return (
    <section className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-sm font-semibold rounded-full mb-4">
              Featured Crops
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-slate-900">
              Premium Crops <span className="text-gradient">for Export</span>
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl">
              Carefully selected export-quality agricultural crops — certified, traceable, and ready for global markets.
            </p>
          </div>
          <Link
            href="/marketplace"
            className="flex items-center gap-2 px-5 py-2.5 border border-primary-300 text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors flex-shrink-0"
          >
            View All Crops <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-8 py-4 gradient-green text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:opacity-95 transition-all"
          >
            Explore Full Crop Catalog <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
