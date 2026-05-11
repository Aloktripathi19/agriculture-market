'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/types';
import { categoryService } from '@/lib/services/categoryService';

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categoryService.getActive().then(setCategories);
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link
                href={`/marketplace?category=${cat.slug}`}
                className="group flex flex-col items-center p-5 rounded-2xl border border-slate-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all duration-300 text-center card-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center text-2xl mb-3 group-hover:bg-primary-100 transition-colors group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-800 group-hover:text-primary-700 transition-colors leading-tight">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{cat.productCount} crops</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Link href="/marketplace" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
            View all crop categories <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
