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
};
