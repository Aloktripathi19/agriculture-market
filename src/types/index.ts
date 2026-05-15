export type ProductCategory =
  | 'fruits'
  | 'vegetables'
  | 'grains'
  | 'pulses'
  | 'spices'
  | 'organic'
  | 'export-quality';

export type ProductStatus = 'available' | 'limited' | 'out-of-stock' | 'pre-order';
export type InquiryStatus = 'new' | 'in-progress' | 'resolved' | 'closed';
export type InquiryType = 'bulk-order' | 'product-info' | 'export' | 'partnership' | 'general';
export type UserRole = 'admin' | 'viewer';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  price?: number;
  priceUnit?: string;
  minOrderQty?: number;
  minOrderUnit?: string;
  images: string[];
  thumbnail: string;
  status: ProductStatus;
  isExportQuality: boolean;
  isOrganic: boolean;
  isFeatured: boolean;
  harvestDate: string;
  availableUntil: string;
  origin: string;
  farmingMethod: string;
  packagingDetails: string;
  exportCountries: string[];
  certifications: string[];
  nutritionInfo: string;
  specifications: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  productCount: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  type: InquiryType;
  productId?: string;
  productName?: string;
  message: string;
  quantity?: string;
  status: InquiryStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  country: string;
  avatar?: string;
  rating: number;
  review: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
  lastLogin: string;
}


export interface DashboardStats {
  totalProducts: number;
  totalInquiries: number;
  newInquiries: number;
  totalCategories: number;
  totalBlogPosts: number;
  totalSubscribers: number;
  featuredProducts: number;
  exportQualityProducts: number;
}

export interface FilterOptions {
  category?: ProductCategory | 'all';
  status?: ProductStatus | 'all';
  isOrganic?: boolean;
  isExportQuality?: boolean;
  minPrice?: number;
  maxPrice?: number;
  origin?: string;
  search?: string;
  sortBy?: 'name' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
  page?: number;
  pageSize?: number;
}
