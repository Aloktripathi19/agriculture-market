'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, ChevronDown } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import type { FAQ } from '@/types';
import { faqService } from '@/lib/services/faqService';
import { generateId } from '@/lib/utils';
import toast from 'react-hot-toast';

function FAQModal({ faq, onClose, onSave }: { faq: FAQ | null; onClose: () => void; onSave: () => void }) {
  const isEdit = !!faq;
  const [form, setForm] = useState({
    question: faq?.question || '',
    answer: faq?.answer || '',
    category: faq?.category || 'general',
    sortOrder: faq?.sortOrder || 10,
    isActive: faq?.isActive ?? true,
  });

  const handleSave = async () => {
    const data: FAQ = {
      id: faq?.id || generateId('faq'),
      createdAt: faq?.createdAt || new Date().toISOString(),
      ...form,
    };
    if (isEdit) await faqService.update(data);
    else await faqService.create(data);
    onSave();
    toast.success(isEdit ? 'FAQ updated' : 'FAQ added');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="font-bold">{isEdit ? 'Edit FAQ' : 'Add FAQ'}</h2>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Question *</label>
            <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Enter the question..." />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Answer *</label>
            <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={5} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" placeholder="Enter the detailed answer..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                {['general', 'ordering', 'export', 'quality', 'payment', 'shipping'].map((c) => (
                  <option key={c} value={c} className="capitalize">{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Sort Order</label>
              <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded accent-primary-600" />
            <span className="text-sm text-slate-700">Active (visible on site)</span>
          </label>
        </div>
        <div className="flex justify-end gap-3 p-5 border-t border-slate-100">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded-xl gradient-green text-white text-sm font-semibold">Save FAQ</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editFaq, setEditFaq] = useState<FAQ | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const load = async () => {
    const all = await faqService.getAll();
    setFaqs(all);
  };
  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    await faqService.delete(id);
    load();
    toast.success('FAQ deleted');
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">FAQ Management</h1>
          <button onClick={() => { setEditFaq(null); setModalOpen(true); }} className="flex items-center gap-2 px-4 py-2.5 gradient-green text-white text-sm font-semibold rounded-xl">
            <Plus className="w-4 h-4" /> Add FAQ
          </button>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div key={faq.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="bg-white rounded-xl border border-slate-100 overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4">
                <button className="flex-1 text-left" onClick={() => setOpenId(openId === faq.id ? null : faq.id)}>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-xs rounded-lg capitalize ${faq.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{faq.isActive ? 'Active' : 'Hidden'}</span>
                    <span className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs rounded-lg capitalize">{faq.category}</span>
                    <span className="text-xs text-slate-400">#{faq.sortOrder}</span>
                  </div>
                  <p className="font-semibold text-slate-900 text-sm mt-1">{faq.question}</p>
                </button>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openId === faq.id ? 'rotate-180' : ''}`} />
                <button onClick={() => { setEditFaq(faq); setModalOpen(true); }} className="p-1.5 rounded-lg hover:bg-primary-50 text-slate-500 hover:text-primary-600"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(faq.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="px-4 pb-4 text-sm text-slate-600 border-t border-slate-50 pt-3">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          {faqs.length === 0 && <div className="text-center py-12 text-slate-400">No FAQs yet</div>}
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && <FAQModal faq={editFaq} onClose={() => { setModalOpen(false); setEditFaq(null); }} onSave={() => { setModalOpen(false); setEditFaq(null); load(); }} />}
      </AnimatePresence>
    </AdminLayout>
  );
}
