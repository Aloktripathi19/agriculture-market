'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import type { BlogPost } from '@/types';
import { blogService } from '@/lib/services/blogService';
import { formatDate } from '@/lib/utils';

export function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    blogService.getFeatured().then(setPosts);
  }, []);

  if (!posts.length) return null;

  const [featured, ...rest] = posts;

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-sm font-semibold rounded-full mb-4">
              Insights & Updates
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-slate-900">
              Crop Market <span className="text-gradient">Insights</span>
            </h2>
          </div>
          <Link href="/blog" className="flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors flex-shrink-0">
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link href={`/blog/${featured.slug}`} className="group block rounded-2xl overflow-hidden border border-slate-100 hover:border-primary-200 hover:shadow-card transition-all h-full">
              <div className="relative aspect-video overflow-hidden bg-slate-50">
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                  {featured.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-primary-700 transition-colors mb-2 leading-snug">
                  {featured.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-4">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <img src={featured.authorAvatar} alt={featured.author} className="w-5 h-5 rounded-full object-cover" />
                    {featured.author}
                  </div>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime} min read</span>
                  <span>{formatDate(featured.createdAt)}</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Other posts */}
          <div className="space-y-4">
            {rest.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group flex gap-4 p-4 rounded-xl border border-slate-100 hover:border-primary-200 hover:shadow-sm transition-all">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-primary-600 font-semibold">{post.category}</span>
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-2 mt-0.5 mb-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min · {formatDate(post.createdAt)}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            <Link
              href="/blog"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-primary-200 text-primary-700 text-sm font-semibold hover:bg-primary-50 transition-colors"
            >
              All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
