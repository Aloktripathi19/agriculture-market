import { openDB, DBSchema, IDBPDatabase } from 'idb';
import type { Product, Category, Inquiry, BlogPost, Testimonial, FAQ, Banner, AdminUser, NewsletterSubscriber } from '@/types';
import { mockProducts, mockCategories, mockTestimonials, mockFAQs, mockBlogPosts } from '@/lib/data/mockData';

interface AgroDB extends DBSchema {
  products: { key: string; value: Product; indexes: { by_category: string; by_slug: string } };
  categories: { key: string; value: Category; indexes: { by_slug: string } };
  inquiries: { key: string; value: Inquiry; indexes: { by_status: string } };
  blog_posts: { key: string; value: BlogPost; indexes: { by_slug: string } };
  testimonials: { key: string; value: Testimonial };
  faqs: { key: string; value: FAQ };
  banners: { key: string; value: Banner };
  admin_users: { key: string; value: AdminUser };
  newsletter: { key: string; value: NewsletterSubscriber };
}

let dbInstance: IDBPDatabase<AgroDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<AgroDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<AgroDB>('agro-marketplace', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('products')) {
        const ps = db.createObjectStore('products', { keyPath: 'id' });
        ps.createIndex('by_category', 'category');
        ps.createIndex('by_slug', 'slug', { unique: true });
      }
      if (!db.objectStoreNames.contains('categories')) {
        const cs = db.createObjectStore('categories', { keyPath: 'id' });
        cs.createIndex('by_slug', 'slug', { unique: true });
      }
      if (!db.objectStoreNames.contains('inquiries')) {
        const is = db.createObjectStore('inquiries', { keyPath: 'id' });
        is.createIndex('by_status', 'status');
      }
      if (!db.objectStoreNames.contains('blog_posts')) {
        const bs = db.createObjectStore('blog_posts', { keyPath: 'id' });
        bs.createIndex('by_slug', 'slug', { unique: true });
      }
      if (!db.objectStoreNames.contains('testimonials')) {
        db.createObjectStore('testimonials', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('faqs')) {
        db.createObjectStore('faqs', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('banners')) {
        db.createObjectStore('banners', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('admin_users')) {
        db.createObjectStore('admin_users', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('newsletter')) {
        db.createObjectStore('newsletter', { keyPath: 'id' });
      }
    },
  });

  await seedInitialData(dbInstance);
  return dbInstance;
}

async function seedInitialData(db: IDBPDatabase<AgroDB>) {
  const seededKey = 'agro-seeded-v2';
  if (localStorage.getItem(seededKey)) return;

  const tx = db.transaction(['products', 'categories', 'testimonials', 'faqs', 'blog_posts', 'admin_users'], 'readwrite');

  for (const p of mockProducts) await tx.objectStore('products').put(p);
  for (const c of mockCategories) await tx.objectStore('categories').put(c);
  for (const t of mockTestimonials) await tx.objectStore('testimonials').put(t);
  for (const f of mockFAQs) await tx.objectStore('faqs').put(f);
  for (const b of mockBlogPosts) await tx.objectStore('blog_posts').put(b);

  const adminUser: AdminUser = {
    id: 'admin-1',
    email: 'admin@agroexport.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  };
  await tx.objectStore('admin_users').put(adminUser);

  await tx.done;
  localStorage.setItem(seededKey, '1');
}
