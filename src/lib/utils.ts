import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = '₹') {
  if (price >= 100000) return `${currency}${(price / 100000).toFixed(1)}L`;
  if (price >= 1000) return `${currency}${(price / 1000).toFixed(1)}K`;
  return `${currency}${price.toLocaleString('en-IN')}`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function truncate(text: string, length = 100) {
  return text.length > length ? text.slice(0, length) + '…' : text;
}

export const STATUS_COLORS = {
  available: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  limited: 'text-amber-600 bg-amber-50 border-amber-200',
  'out-of-stock': 'text-red-600 bg-red-50 border-red-200',
  'pre-order': 'text-blue-600 bg-blue-50 border-blue-200',
} as const;

export const STATUS_LABELS = {
  available: 'In Stock',
  limited: 'Limited Stock',
  'out-of-stock': 'Out of Stock',
  'pre-order': 'Pre-Order',
} as const;

export const INQUIRY_STATUS_COLORS = {
  new: 'text-blue-600 bg-blue-50',
  'in-progress': 'text-amber-600 bg-amber-50',
  resolved: 'text-emerald-600 bg-emerald-50',
  closed: 'text-gray-600 bg-gray-50',
} as const;
