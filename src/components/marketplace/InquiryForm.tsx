'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, Phone, MessageCircle } from 'lucide-react';
import { inquiryService } from '@/lib/services/inquiryService';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone number required'),
  company: z.string().default(''),
  country: z.string().min(2, 'Country required'),
  type: z.enum(['bulk-order', 'product-info', 'export', 'partnership', 'general']),
  quantity: z.string().default(''),
  message: z.string().min(1, 'Please describe your requirements'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  productId?: string;
  productName?: string;
}

export function InquiryForm({ productId, productName }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { type: productId ? 'bulk-order' : 'general' },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      await inquiryService.create({
        ...data,
        company: data.company || '',
        quantity: data.quantity || '',
        productId,
        productName,
      });
      toast.success('Inquiry submitted! Our team will contact you within 24 hours.');
      reset();
    } catch {
      toast.error('Failed to submit inquiry. Please try again or contact us directly.');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-lg font-bold font-display text-slate-900 mb-1">Send Inquiry to Admin</h3>
      <p className="text-sm text-slate-500 mb-6">
        {productName
          ? `Inquire about ${productName} — our team will respond within 24 hours`
          : 'Contact our team for crop sourcing, bulk orders, and export inquiries'}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name *</label>
            <input
              {...register('name')}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Your full name"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address *</label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone Number *</label>
            <input
              {...register('phone')}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="+1 234 567 8900"
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Country *</label>
            <input
              {...register('country')}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Your country"
            />
            {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Company / Organization</label>
            <input
              {...register('company')}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Your company name"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Inquiry Type *</label>
            <select
              {...register('type')}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="bulk-order">Bulk Order</option>
              <option value="export">Export Inquiry</option>
              <option value="product-info">Product Information</option>
              <option value="partnership">Partnership</option>
              <option value="general">General Inquiry</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Quantity / Volume Required</label>
          <input
            {...register('quantity')}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., 500 kg, 10 MT, 1 container..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Message / Requirements *</label>
          <textarea
            {...register('message')}
            rows={4}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            placeholder="Describe your requirements, destination country, certifications needed, delivery timeline..."
          />
          {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3.5 gradient-green text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:opacity-95 transition-all disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
        </button>
      </form>

      <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-medium hover:bg-emerald-100 transition-colors border border-emerald-200"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp Us
        </a>
        <a
          href="tel:+919876543210"
          className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl bg-primary-50 text-primary-700 text-sm font-medium hover:bg-primary-100 transition-colors border border-primary-200"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
      </div>
    </div>
  );
}
