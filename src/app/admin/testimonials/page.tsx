'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, Star } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import type { Testimonial } from '@/types';
import { getDB } from '@/lib/db/indexeddb';
import { generateId, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

function TestimonialModal({ item, onClose, onSave }: { item: Testimonial | null; onClose: () => void; onSave: () => void }) {
  const isEdit = !!item;
  const [form, setForm] = useState({
    name: item?.name || '',
    company: item?.company || '',
    country: item?.country || '',
    avatar: item?.avatar || '',
    rating: item?.rating || 5,
    review: item?.review || '',
    isActive: item?.isActive ?? true,
    isFeatured: item?.isFeatured ?? false,
  });

  const handleSave = async () => {
    const db = await getDB();
    const data: Testimonial = {
      id: item?.id || generateId('test'),
      createdAt: item?.createdAt || new Date().toISOString(),
      ...form,
    };
    await db.put('testimonials', data);
    onSave();
    toast.success(isEdit ? 'Updated' : 'Added');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="font-bold">{isEdit ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {[
            { label: 'Name', key: 'name' }, { label: 'Company', key: 'company' },
            { label: 'Country', key: 'country' },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
              <input value={String((form as Record<string, unknown>)[key])} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((r) => (
                <button key={r} type="button" onClick={() => setForm({ ...form, rating: r })} className={`w-9 h-9 rounded-xl text-lg transition-colors ${form.rating >= r ? 'text-amber-400' : 'text-slate-200'}`}>
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Review</label>
            <textarea value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} rows={4} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded accent-primary-600" /><span className="text-sm">Active</span></label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="w-4 h-4 rounded accent-primary-600" /><span className="text-sm">Featured</span></label>
          </div>
        </div>
        <div className="flex justify-end gap-3 p-5 border-t border-slate-100">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded-xl gradient-green text-white text-sm font-semibold">Save</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Testimonial | null>(null);

  const load = async () => {
    const db = await getDB();
    const all = await db.getAll('testimonials');
    setItems(all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  };
  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    const db = await getDB();
    await db.delete('testimonials', id);
    load();
    toast.success('Deleted');
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Testimonials</h1>
          <button onClick={() => { setEditItem(null); setModalOpen(true); }} className="flex items-center gap-2 px-4 py-2.5 gradient-green text-white text-sm font-semibold rounded-xl">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-card transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full gradient-green flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{t.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.company} • {t.country}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setEditItem(t); setModalOpen(true); }} className="p-1 text-slate-400 hover:text-primary-600"><Edit className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(t.id)} className="p-1 text-slate-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, j) => <Star key={j} className={`w-3.5 h-3.5 ${j < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />)}
              </div>
              <p className="text-xs text-slate-600 line-clamp-3 italic">&ldquo;{t.review}&rdquo;</p>
              <div className="flex gap-1.5 mt-3">
                {t.isActive && <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-lg">Active</span>}
                {t.isFeatured && <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-lg">Featured</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && <TestimonialModal item={editItem} onClose={() => { setModalOpen(false); setEditItem(null); }} onSave={() => { setModalOpen(false); setEditItem(null); load(); }} />}
      </AnimatePresence>
    </AdminLayout>
  );
}
