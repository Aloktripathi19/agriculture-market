import type { Inquiry } from '@/types';
import { getDB } from '@/lib/db/indexeddb';

function generateId() {
  return `inq-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const inquiryService = {
  async getAll(): Promise<Inquiry[]> {
    const db = await getDB();
    const all = await db.getAll('inquiries');
    return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getById(id: string): Promise<Inquiry | undefined> {
    const db = await getDB();
    return db.get('inquiries', id);
  },

  async create(data: Omit<Inquiry, 'id' | 'status' | 'notes' | 'createdAt' | 'updatedAt'>): Promise<Inquiry> {
    const db = await getDB();
    const inquiry: Inquiry = {
      ...data,
      id: generateId(),
      status: 'new',
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await db.put('inquiries', inquiry);
    return inquiry;
  },

  async update(inquiry: Inquiry): Promise<void> {
    const db = await getDB();
    inquiry.updatedAt = new Date().toISOString();
    await db.put('inquiries', inquiry);
  },

  async delete(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('inquiries', id);
  },

  async getNewCount(): Promise<number> {
    const db = await getDB();
    const all = await db.getAllFromIndex('inquiries', 'by_status', 'new');
    return all.length;
  },
};
