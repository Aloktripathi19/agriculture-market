'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Leaf, Award, ArrowRight, MapPin } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice, STATUS_LABELS, STATUS_COLORS } from '@/lib/utils';

interface Props {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-primary-200 hover:shadow-card-hover transition-all duration-300"
    >
      <Link href={`/marketplace/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-slate-50">
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
      </Link>

      <div className="p-5">
        <Link href={`/marketplace/${product.slug}`}>
          <h3 className="font-semibold font-display text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors mb-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{product.origin}</span>
        </div>

        <p className="text-sm text-slate-500 line-clamp-2 mb-3">{product.shortDescription}</p>

        <div className="flex items-center gap-1 mb-4">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-sm font-medium text-slate-700">{product.rating}</span>
          <span className="text-xs text-slate-400">({product.reviewCount} reviews)</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xl font-bold text-primary-600">{formatPrice(product.price)}</p>
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
