'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Package, MessageSquare, Tag, BookOpen, TrendingUp, Users, ArrowRight, Star } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import type { Inquiry, Product } from '@/types';
import { productService } from '@/lib/services/productService';
import { inquiryService } from '@/lib/services/inquiryService';
import { formatDate, INQUIRY_STATUS_COLORS } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const chartData = [
  { month: 'Jan', inquiries: 12, products: 45 },
  { month: 'Feb', inquiries: 18, products: 47 },
  { month: 'Mar', inquiries: 24, products: 50 },
  { month: 'Apr', inquiries: 32, products: 52 },
  { month: 'May', inquiries: 28, products: 55 },
  { month: 'Jun', inquiries: 40, products: 58 },
];

const exportData = [
  { month: 'Jan', value: 4.2 },
  { month: 'Feb', value: 5.8 },
  { month: 'Mar', value: 7.1 },
  { month: 'Apr', value: 6.9 },
  { month: 'May', value: 8.4 },
  { month: 'Jun', value: 9.2 },
];

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([productService.getAll(), inquiryService.getAll()]).then(([p, i]) => {
      setProducts(p);
      setInquiries(i);
      setIsLoading(false);
    });
  }, []);

  const stats = [
    { icon: Package, label: 'Total Crops', value: products.length, change: '+3 this week', color: 'text-primary-600 bg-primary-50', href: '/admin/products' },
    { icon: MessageSquare, label: 'Total Inquiries', value: inquiries.length, change: `${inquiries.filter((i) => i.status === 'new').length} new`, color: 'text-blue-600 bg-blue-50', href: '/admin/inquiries' },
    { icon: Star, label: 'Export Quality', value: products.filter((p) => p.isExportQuality).length, change: 'certified products', color: 'text-amber-600 bg-amber-50', href: '/admin/products' },
    { icon: TrendingUp, label: 'Organic Crops', value: products.filter((p) => p.isOrganic).length, change: 'of total portfolio', color: 'text-emerald-600 bg-emerald-50', href: '/admin/products' },
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <div className="gradient-green rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold font-display mb-1">Welcome back, Admin 👋</h2>
          <p className="text-primary-100 text-sm">Here&apos;s what&apos;s happening with your crop marketplace today.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={stat.href} className="flex flex-col p-5 bg-white rounded-2xl border border-slate-100 hover:border-primary-200 hover:shadow-card transition-all group">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.change}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-bold text-slate-900 mb-5">Monthly Inquiries</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="inquiries" fill="#16a34a" radius={[6, 6, 0, 0]} name="Inquiries" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-bold text-slate-900 mb-5">Export Value Trend (₹ Crore)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={exportData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />
                <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2.5} dot={{ fill: '#16a34a', strokeWidth: 0, r: 4 }} name="Value (₹Cr)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-slate-50">
            <h3 className="font-bold text-slate-900">Recent Inquiries</h3>
            <Link href="/admin/inquiries" className="text-sm text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  {['Name', 'Company', 'Type', 'Product', 'Status', 'Date'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {inquiries.slice(0, 5).map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-medium text-slate-900">{inq.name}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-500">{inq.company || '—'}</td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-lg capitalize">{inq.type}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-500 truncate max-w-[150px]">{inq.productName || '—'}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-lg capitalize ${INQUIRY_STATUS_COLORS[inq.status]}`}>{inq.status}</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-400">{formatDate(inq.createdAt)}</td>
                  </tr>
                ))}
                {inquiries.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-10 text-center text-slate-400 text-sm">No inquiries yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Package, label: 'Add New Crop', href: '/admin/products', color: 'gradient-green' },
            { icon: MessageSquare, label: 'Manage Inquiries', href: '/admin/inquiries', color: 'bg-blue-500' },
            { icon: BookOpen, label: 'Write Article', href: '/admin/blog', color: 'bg-purple-500' },
            { icon: Tag, label: 'Add Category', href: '/admin/categories', color: 'bg-amber-500' },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={`${action.color} flex flex-col items-center gap-2 p-5 rounded-2xl text-white hover:opacity-90 transition-opacity text-center`}
            >
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-semibold">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
