'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Testimonial } from '@/types';
import { getDB } from '@/lib/db/indexeddb';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    getDB().then((db) => db.getAll('testimonials')).then((data) =>
      setTestimonials(data.filter((t) => t.isActive))
    );
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-sm font-semibold rounded-full mb-4">
            Client Testimonials
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-slate-900">
            What Our <span className="text-gradient">Buyers Say</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            Over 2,000 satisfied importers, distributors, and buyers worldwide trust us for their agricultural crop sourcing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-white rounded-2xl border border-slate-100 p-6 hover:border-primary-200 hover:shadow-card transition-all"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-primary-100" />

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className={`w-4 h-4 ${j < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                ))}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">&ldquo;{t.review}&rdquo;</p>

              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-primary-100"
                />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.company}</p>
                  <p className="text-xs text-primary-600 font-medium">{t.country}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
