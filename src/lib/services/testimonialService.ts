import type { Testimonial } from '@/types';
import { supabase } from '@/lib/db/supabase';

export const testimonialService = {
  async getAll(): Promise<Testimonial[]> {
    const { data } = await supabase.from('testimonials').select('data').order('updated_at', { ascending: false });
    return (data ?? []).map((r) => r.data as Testimonial);
  },

  async getFeatured(): Promise<Testimonial[]> {
    const all = await this.getAll();
    return all.filter((t) => t.isActive && t.isFeatured);
  },

  async create(t: Testimonial): Promise<void> {
    await supabase.from('testimonials').insert({ id: t.id, data: t, updated_at: new Date().toISOString() });
  },

  async update(t: Testimonial): Promise<void> {
    await supabase.from('testimonials').update({ data: t, updated_at: new Date().toISOString() }).eq('id', t.id);
  },

  async delete(id: string): Promise<void> {
    await supabase.from('testimonials').delete().eq('id', id);
  },
};
