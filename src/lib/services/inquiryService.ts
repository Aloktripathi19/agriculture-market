import type { Inquiry } from '@/types';
import { supabase } from '@/lib/db/supabase';

function generateId() {
  return `inq-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const inquiryService = {
  async getAll(): Promise<Inquiry[]> {
    const { data } = await supabase.from('inquiries').select('data').order('updated_at', { ascending: false });
    return (data ?? []).map((r) => r.data as Inquiry);
  },

  async getById(id: string): Promise<Inquiry | undefined> {
    const { data } = await supabase.from('inquiries').select('data').eq('id', id).single();
    return data ? (data.data as Inquiry) : undefined;
  },

  async create(input: Omit<Inquiry, 'id' | 'status' | 'notes' | 'createdAt' | 'updatedAt'>): Promise<Inquiry> {
    const inquiry: Inquiry = {
      ...input,
      id: generateId(),
      status: 'new',
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await supabase.from('inquiries').insert({ id: inquiry.id, data: inquiry, updated_at: inquiry.updatedAt });
    return inquiry;
  },

  async update(inquiry: Inquiry): Promise<void> {
    inquiry.updatedAt = new Date().toISOString();
    await supabase.from('inquiries').update({ data: inquiry, updated_at: inquiry.updatedAt }).eq('id', inquiry.id);
  },

  async delete(id: string): Promise<void> {
    await supabase.from('inquiries').delete().eq('id', id);
  },

  async getNewCount(): Promise<number> {
    const all = await this.getAll();
    return all.filter((i) => i.status === 'new').length;
  },
};
