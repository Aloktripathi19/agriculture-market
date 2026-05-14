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
};
