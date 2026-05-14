import type { FAQ } from '@/types';
import { supabase } from '@/lib/db/supabase';

export const faqService = {
  async getAll(): Promise<FAQ[]> {
    const { data } = await supabase.from('faqs').select('data').order('updated_at', { ascending: true });
    return (data ?? []).map((r) => r.data as FAQ).sort((a, b) => a.sortOrder - b.sortOrder);
  },

  async getActive(): Promise<FAQ[]> {
    const all = await this.getAll();
    return all.filter((f) => f.isActive);
  },

  async create(f: FAQ): Promise<void> {
    await supabase.from('faqs').insert({ id: f.id, data: f, updated_at: new Date().toISOString() });
  },

  async update(f: FAQ): Promise<void> {
    await supabase.from('faqs').update({ data: f, updated_at: new Date().toISOString() }).eq('id', f.id);
  },

  async delete(id: string): Promise<void> {
    await supabase.from('faqs').delete().eq('id', id);
  },
};
