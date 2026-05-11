'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import type { BlogPost } from '@/types';
import { blogService } from '@/lib/services/blogService';
import { formatDate } from '@/lib/utils';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    blogService.getPublished().then((p) => { setPosts(p); setIsLoading(false); });
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-slate-50">
        <div className="gradient-green py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl lg:text-4xl font-bold font-display text-white mb-3">Crop Market Insights</h1>
              <p className="text-primary-100">Expert articles on agricultural trade, crop seasonality, certifications, and market trends</p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
                  <div className="aspect-video bg-slate-100" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-slate-100 rounded w-3/4" />
                    <div className="h-4 bg-slate-100 rounded w-full" />
                    <div className="h-4 bg-slate-100 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-primary-200 hover:shadow-card transition-all h-full">
                    <div className="relative aspect-video overflow-hidden bg-slate-50">
                      <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary-600 text-white text-xs font-semibold rounded-lg">{post.category}</span>
                    </div>
                    <div className="p-5">
                      <h2 className="font-bold font-display text-slate-900 group-hover:text-primary-700 transition-colors mb-2 line-clamp-2 leading-snug">{post.title}</h2>
                      <p className="text-sm text-slate-500 line-clamp-3 mb-4">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <img src={post.authorAvatar} alt={post.author} className="w-5 h-5 rounded-full object-cover" />
                        {post.author}
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} min</span>
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
