'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, Trash2, X, Phone, Mail, MessageCircle } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import type { Inquiry, InquiryStatus } from '@/types';
import { inquiryService } from '@/lib/services/inquiryService';
import { formatDate, INQUIRY_STATUS_COLORS } from '@/lib/utils';
import toast from 'react-hot-toast';

const statusOptions: InquiryStatus[] = ['new', 'in-progress', 'resolved', 'closed'];

function InquiryModal({ inquiry, onClose, onUpdate }: { inquiry: Inquiry; onClose: () => void; onUpdate: (i: Inquiry) => void }) {
  const [status, setStatus] = useState(inquiry.status);
  const [notes, setNotes] = useState(inquiry.notes);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const updated = { ...inquiry, status, notes };
    await inquiryService.update(updated);
    onUpdate(updated);
    toast.success('Inquiry updated');
    setSaving(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">Inquiry Details</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Contact */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Name</p>
              <p className="text-sm font-semibold text-slate-900">{inquiry.name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Company</p>
              <p className="text-sm text-slate-700">{inquiry.company || '—'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Country</p>
              <p className="text-sm text-slate-700">{inquiry.country}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Type</p>
              <span className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs rounded-lg capitalize">{inquiry.type}</span>
            </div>
          </div>

          {/* Contact Actions */}
          <div className="flex gap-2">
            <a href={`mailto:${inquiry.email}`} className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-700 text-xs rounded-lg font-medium hover:bg-blue-100 transition-colors">
              <Mail className="w-3.5 h-3.5" /> {inquiry.email}
            </a>
            <a href={`tel:${inquiry.phone}`} className="flex items-center gap-1.5 px-3 py-2 bg-primary-50 text-primary-700 text-xs rounded-lg font-medium hover:bg-primary-100 transition-colors">
              <Phone className="w-3.5 h-3.5" /> {inquiry.phone}
            </a>
            <a href={`https://wa.me/${inquiry.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 text-xs rounded-lg font-medium hover:bg-emerald-100 transition-colors">
              <MessageCircle className="w-3.5 h-3.5" /> WA
            </a>
          </div>

          {inquiry.productName && (
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500">Product Inquiry</p>
              <p className="text-sm font-medium text-slate-900">{inquiry.productName}</p>
              {inquiry.quantity && <p className="text-xs text-slate-500 mt-0.5">Quantity: {inquiry.quantity}</p>}
            </div>
          )}

          <div>
            <p className="text-xs text-slate-500 mb-1">Message</p>
            <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3">{inquiry.message}</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as InquiryStatus)} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white capitalize">
              {statusOptions.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Admin Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" placeholder="Add internal notes about this inquiry..." />
          </div>

          <p className="text-xs text-slate-400">Received: {formatDate(inquiry.createdAt)}</p>
        </div>
        <div className="flex justify-end gap-3 p-5 border-t border-slate-100">
          <button onClick={onClose} className="px-5 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50">Close</button>
          <button onClick={handleSave} disabled={saving} className="px-5 py-2 rounded-xl gradient-green text-white text-sm font-semibold hover:opacity-95 disabled:opacity-60">
            {saving ? 'Saving...' : 'Update Inquiry'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filtered, setFiltered] = useState<Inquiry[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    const all = await inquiryService.getAll();
    setInquiries(all);
    setFiltered(all);
    setIsLoading(false);
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    let result = inquiries;
    if (statusFilter !== 'all') result = result.filter((i) => i.status === statusFilter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((i) => i.name.toLowerCase().includes(q) || i.email.toLowerCase().includes(q) || i.company.toLowerCase().includes(q));
    }
    setFiltered(result);
  }, [search, statusFilter, inquiries]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    await inquiryService.delete(id);
    toast.success('Inquiry deleted');
    load();
  };

  const handleUpdate = (updated: Inquiry) => {
    setInquiries((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    setSelected(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <h1 className="text-xl font-bold text-slate-900">Inquiry Management</h1>

        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>

          <div className="flex gap-2">
            {['all', 'new', 'in-progress', 'resolved', 'closed'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors capitalize ${
                  statusFilter === s ? 'gradient-green text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-300'
                }`}
              >
                {s === 'all' ? 'All' : s} {s === 'new' && inquiries.filter((i) => i.status === 'new').length > 0 && `(${inquiries.filter((i) => i.status === 'new').length})`}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  {['Contact', 'Company', 'Country', 'Type', 'Product', 'Status', 'Date', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {[...Array(8)].map((_, j) => <td key={j} className="px-4 py-3"><div className="h-6 bg-slate-100 rounded" /></td>)}
                    </tr>
                  ))
                ) : filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-900">{inq.name}</p>
                      <p className="text-xs text-slate-400">{inq.email}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">{inq.company || '—'}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{inq.country}</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-lg capitalize">{inq.type}</span></td>
                    <td className="px-4 py-3 text-sm text-slate-500 max-w-[120px] truncate">{inq.productName || '—'}</td>
                    <td className="px-4 py-3"><span className={`px-2.5 py-1 text-xs font-medium rounded-lg capitalize ${INQUIRY_STATUS_COLORS[inq.status]}`}>{inq.status}</span></td>
                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{formatDate(inq.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => setSelected(inq)} className="p-1.5 rounded-lg hover:bg-primary-50 text-slate-500 hover:text-primary-600 transition-colors"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(inq.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!isLoading && filtered.length === 0 && (
                  <tr><td colSpan={8} className="px-4 py-10 text-center text-slate-400 text-sm">No inquiries found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && <InquiryModal inquiry={selected} onClose={() => setSelected(null)} onUpdate={handleUpdate} />}
      </AnimatePresence>
    </AdminLayout>
  );
}
