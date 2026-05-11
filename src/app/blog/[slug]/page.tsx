'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, Tag, ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import type { BlogPost } from '@/types';
import { blogService } from '@/lib/services/blogService';
import { formatDate } from '@/lib/utils';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);

  useEffect(() => {
    blogService.getBySlug(slug).then(async (p) => {
      setPost(p || null);
      const all = await blogService.getPublished();
      setRelated(all.filter((b) => b.id !== p?.id).slice(0, 3));
    });
  }, [slug]);

  if (!post) return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-slate-50 flex items-center justify-center">
        <div className="text-center"><p className="text-4xl mb-4">📰</p><p className="text-slate-500">Loading article...</p></div>
      </main>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-slate-50">
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="hover:text-primary-600">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/blog" className="hover:text-primary-600">Blog</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-900 truncate">{post.title}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              <div className="relative aspect-video overflow-hidden">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-primary-600 text-white text-sm font-semibold rounded-full">{post.category}</span>
              </div>

              <div className="p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mb-4 leading-tight">{post.title}</h1>

                <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{post.author}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-slate-500"><Clock className="w-4 h-4" />{post.readTime} min read</span>
                  <span className="text-sm text-slate-500">{formatDate(post.createdAt)}</span>
                </div>

                <div className="prose prose-slate max-w-none text-sm leading-relaxed">
                  {post.content.split('\n\n').map((para, i) => {
                    if (para.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-slate-900 mt-6 mb-3">{para.slice(3)}</h2>;
                    if (para.startsWith('**')) return <p key={i} className="text-slate-700 mb-3 font-medium">{para.replace(/\*\*/g, '')}</p>;
                    if (para.startsWith('1. ') || para.startsWith('- ')) {
                      const items = para.split('\n').filter(Boolean);
                      return <ul key={i} className="list-disc pl-5 mb-4 space-y-1">{items.map((item, j) => <li key={j} className="text-slate-700">{item.replace(/^[\d\.\-\*]\s/, '')}</li>)}</ul>;
                    }
                    return <p key={i} className="text-slate-600 mb-4">{para}</p>;
                  })}
                </div>

                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100">
                  {post.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                      <Tag className="w-3 h-3" />{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>

          {related.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold font-display text-slate-900 mb-5">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link key={r.id} href={`/blog/${r.slug}`} className="group bg-white rounded-xl border border-slate-100 overflow-hidden hover:border-primary-200 hover:shadow-sm transition-all">
                    <div className="aspect-video overflow-hidden bg-slate-50">
                      <img src={r.coverImage} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-primary-600 font-semibold mb-1">{r.category}</p>
                      <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">{r.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
