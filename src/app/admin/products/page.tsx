'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Star, Award, Leaf, X, Image as ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AdminLayout } from '@/components/admin/AdminLayout';
import type { Product, ProductStatus } from '@/types';
import { productService } from '@/lib/services/productService';
import { STATUS_LABELS, STATUS_COLORS, formatDate, generateId, slugify } from '@/lib/utils';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2),
  shortDescription: z.string().min(10),
  description: z.string().min(20),
  thumbnail: z.string().url('Enter valid image URL'),
  status: z.enum(['available', 'limited', 'out-of-stock', 'pre-order']),
  isExportQuality: z.boolean(),
  isOrganic: z.boolean(),
  isFeatured: z.boolean(),
  rating: z.number().min(0).max(5).default(0),
  origin: z.string().min(2),
  farmingMethod: z.string().default(''),
  packagingDetails: z.string().default(''),
  harvestDate: z.string().default(''),
  availableUntil: z.string().default(''),
  specifications: z.string().default(''),
  nutritionInfo: z.string().default(''),
});

type FormData = z.infer<typeof schema>;


function ProductModal({ product, onClose, onSave }: { product: Product | null; onClose: () => void; onSave: (p: Product) => void }) {
  const isEdit = !!product;
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: product ? {
      name: product.name, shortDescription: product.shortDescription,
      description: product.description, thumbnail: product.thumbnail,
      status: product.status, isExportQuality: product.isExportQuality, isOrganic: product.isOrganic,
      isFeatured: product.isFeatured, rating: product.rating ?? 0, origin: product.origin, farmingMethod: product.farmingMethod,
      packagingDetails: product.packagingDetails, harvestDate: product.harvestDate?.split('T')[0],
      availableUntil: product.availableUntil?.split('T')[0],
      specifications: typeof product.specifications === 'string' ? product.specifications : '',
      nutritionInfo: typeof product.nutritionInfo === 'string' ? product.nutritionInfo : '',
    } : { status: 'available', isExportQuality: false, isOrganic: false, isFeatured: false },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const now = new Date().toISOString();
    const newProduct: Product = {
      id: product?.id || generateId('prod'),
      slug: product?.slug || slugify(data.name),
      images: product?.images || [data.thumbnail],
      exportCountries: product?.exportCountries || [],
      certifications: product?.certifications || [],
      tags: product?.tags || [],
      reviewCount: product?.reviewCount || 0,
      createdAt: product?.createdAt || now,
      updatedAt: now,
      ...data,
    };
    if (isEdit) await productService.update(newProduct);
    else await productService.create(newProduct);
    onSave(newProduct);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">{isEdit ? 'Edit Crop' : 'Add New Crop'}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Crop Name *</label>
              <input {...register('name')} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="e.g. Basmati Rice 1121" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Status *</label>
              <select {...register('status')} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                <option value="available">Available</option>
                <option value="limited">Limited Stock</option>
                <option value="out-of-stock">Out of Stock</option>
                <option value="pre-order">Pre-Order</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Thumbnail URL *</label>
              <input {...register('thumbnail')} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="https://images.unsplash.com/..." />
              {errors.thumbnail && <p className="text-xs text-red-500 mt-1">{errors.thumbnail.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Origin</label>
              <input {...register('origin')} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="State, India" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Rating (0–5)</label>
              <input {...register('rating', { valueAsNumber: true })} type="number" min={0} max={5} step={0.1} placeholder="e.g. 4.5" className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Harvest Date</label>
              <input {...register('harvestDate')} type="date" className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Short Description *</label>
              <input {...register('shortDescription')} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              {errors.shortDescription && <p className="text-xs text-red-500 mt-1">{errors.shortDescription.message}</p>}
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Description *</label>
              <textarea {...register('description')} rows={5} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Specifications</label>
              <textarea {...register('specifications')} rows={3} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" placeholder="e.g. Grain Length: 8.3mm, Moisture: 12%, Broken: 1% max" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nutrition Info</label>
              <textarea {...register('nutritionInfo')} rows={3} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" placeholder="e.g. Calories: 130kcal, Protein: 2.7g, Carbs: 28g, Fat: 0.3g" />
            </div>
          </div>

          <div className="flex gap-6">
            {[
              { key: 'isExportQuality', label: 'Export Quality', icon: '🏆' },
              { key: 'isOrganic', label: 'Organic', icon: '🌿' },
              { key: 'isFeatured', label: 'Featured', icon: '⭐' },
            ].map(({ key, label, icon }) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input {...register(key as keyof FormData)} type="checkbox" className="w-4 h-4 rounded accent-primary-600" />
                <span className="text-sm text-slate-700">{icon} {label}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-2 sticky bottom-0 bg-white border-t border-slate-100 -mx-5 px-5 py-4 -mb-5 mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 rounded-xl gradient-green text-white text-sm font-semibold hover:opacity-95 disabled:opacity-60">
              {isSubmitting ? 'Saving...' : isEdit ? 'Update Crop' : 'Add Crop'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    const all = await productService.getAll();
    setProducts(all);
    setFiltered(all);
    setIsLoading(false);
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(products.filter((p) => p.name.toLowerCase().includes(q) || p.origin.toLowerCase().includes(q)));
  }, [search, products]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this crop? This cannot be undone.')) return;
    await productService.delete(id);
    await load();
    toast.success('Crop deleted');
  };

  const handleSave = async () => {
    setModalOpen(false);
    setEditProduct(null);
    await load();
    toast.success(editProduct ? 'Crop updated' : 'Crop added');
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-slate-900">Crops & Products</h1>
          <button onClick={() => { setEditProduct(null); setModalOpen(true); }} className="flex items-center gap-2 px-4 py-2.5 gradient-green text-white text-sm font-semibold rounded-xl shadow hover:opacity-95">
            <Plus className="w-4 h-4" /> Add New Crop
          </button>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search crops..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <span className="flex items-center px-3 py-2 bg-slate-100 rounded-xl text-sm text-slate-600">{filtered.length} crops</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  {['Crop', 'Status', 'Quality', 'Updated', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-4 py-3"><div className="h-10 bg-slate-100 rounded-lg" /></td>
                      {[...Array(5)].map((_, j) => <td key={j} className="px-4 py-3"><div className="h-6 bg-slate-100 rounded" /></td>)}
                    </tr>
                  ))
                ) : filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.thumbnail} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                          onError={(e) => { if (!e.currentTarget.dataset.fb) { e.currentTarget.dataset.fb = '1'; e.currentTarget.src = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&q=80'; } }}
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-900 line-clamp-1">{p.name}</p>
                          <p className="text-xs text-slate-400">{p.origin}</p>
                        </div>
                      </div>
                    </td>
                                        <td className="px-4 py-3"><span className={`px-2 py-1 text-xs font-medium rounded-lg border ${STATUS_COLORS[p.status]}`}>{STATUS_LABELS[p.status]}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {p.isExportQuality && <span title="Export Quality" className="text-amber-500">🏆</span>}
                        {p.isOrganic && <span title="Organic" className="text-emerald-500">🌿</span>}
                        {p.isFeatured && <span title="Featured" className="text-yellow-500">⭐</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{formatDate(p.updatedAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => { setEditProduct(p); setModalOpen(true); }} className="p-1.5 rounded-lg hover:bg-primary-50 text-slate-500 hover:text-primary-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!isLoading && filtered.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-10 text-center text-slate-400">No crops found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && <ProductModal product={editProduct} onClose={() => { setModalOpen(false); setEditProduct(null); }} onSave={handleSave} />}
      </AnimatePresence>
    </AdminLayout>
  );
}
