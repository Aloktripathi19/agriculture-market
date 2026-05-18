'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, Search, BookOpen } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import type { BlogPost } from '@/types';
import { blogService } from '@/lib/services/blogService';
import { formatDate, generateId, slugify } from '@/lib/utils';
import toast from 'react-hot-toast';

function BlogModal({ post, onClose, onSave }: { post: BlogPost | null; onClose: () => void; onSave: () => void }) {
  const isEdit = !!post;
  const [form, setForm] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    coverImage: post?.coverImage || '',
    author: post?.author || 'Admin',
    authorAvatar: post?.authorAvatar || '/co-founder.jpeg',
    category: post?.category || 'Market Insights',
    readTime: post?.readTime || 5,
    isPublished: post?.isPublished ?? true,
    isFeatured: post?.isFeatured ?? false,
    tags: post?.tags?.join(', ') || '',
  });

  const handleSave = async () => {
    const now = new Date().toISOString();
    const data: BlogPost = {
      id: post?.id || generateId('blog'),
      slug: post?.slug || slugify(form.title),
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage,
      author: form.author,
      authorAvatar: form.authorAvatar,
      category: form.category,
      readTime: form.readTime,
      isPublished: form.isPublished,
      isFeatured: form.isFeatured,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      createdAt: post?.createdAt || now,
      updatedAt: now,
    };
    if (isEdit) await blogService.update(data);
    else await blogService.create(data);
    onSave();
    toast.success(isEdit ? 'Post updated' : 'Post published');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="font-bold">{isEdit ? 'Edit Post' : 'New Blog Post'}</h2>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {[
            { label: 'Title *', key: 'title', type: 'text' },
            { label: 'Cover Image URL', key: 'coverImage', type: 'text' },
            { label: 'Category', key: 'category', type: 'text' },
            { label: 'Author', key: 'author', type: 'text' },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
              <input type={type} value={String((form as Record<string, unknown>)[key])} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Content</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-mono" placeholder="Write content in markdown-like format. Use ## for headings." />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tags (comma-separated)</label>
            <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="crops, export, market-trends" />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} className="w-4 h-4 rounded accent-primary-600" />
              <span className="text-sm text-slate-700">Published</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="w-4 h-4 rounded accent-primary-600" />
              <span className="text-sm text-slate-700">Featured</span>
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-3 p-5 border-t border-slate-100">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded-xl gradient-green text-white text-sm font-semibold">{isEdit ? 'Update' : 'Publish'}</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);

  const load = () => blogService.getAll().then(setPosts);
  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await blogService.delete(id);
    load();
    toast.success('Post deleted');
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">Blog Posts</h1>
          <button onClick={() => { setEditPost(null); setModalOpen(true); }} className="flex items-center gap-2 px-4 py-2.5 gradient-green text-white text-sm font-semibold rounded-xl">
            <Plus className="w-4 h-4" /> New Post
          </button>
        </div>

        <div className="space-y-3">
          {posts.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary-200 transition-all"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 line-clamp-1">{post.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-primary-50 text-primary-700 rounded-lg">{post.category}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-lg ${post.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{post.isPublished ? 'Published' : 'Draft'}</span>
                  {post.isFeatured && <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-700 rounded-lg">Featured</span>}
                  <span className="text-xs text-slate-400">{formatDate(post.createdAt)}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditPost(post); setModalOpen(true); }} className="p-2 rounded-lg hover:bg-primary-50 text-slate-500 hover:text-primary-600 transition-colors"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </motion.div>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No blog posts yet</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && <BlogModal post={editPost} onClose={() => { setModalOpen(false); setEditPost(null); }} onSave={() => { setModalOpen(false); setEditPost(null); load(); }} />}
      </AnimatePresence>
    </AdminLayout>
  );
}
