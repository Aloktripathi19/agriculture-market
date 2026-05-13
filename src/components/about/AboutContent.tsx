'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Globe, Users, Award, Leaf, TrendingUp, ArrowRight, Check } from 'lucide-react';
import { certifications } from '@/lib/data/mockData';

const values = [
  { icon: Shield, title: 'Quality First', desc: 'Every crop undergoes rigorous quality testing before export', color: 'bg-primary-50 text-primary-600' },
  { icon: Globe, title: 'Global Reach', desc: 'Serving importers and distributors in 45+ countries', color: 'bg-blue-50 text-blue-600' },
  { icon: Leaf, title: 'Sustainability', desc: 'Promoting organic and sustainable agricultural practices', color: 'bg-emerald-50 text-emerald-600' },
  { icon: Users, title: 'Farmer Partnership', desc: 'Direct partnerships with verified farmers and cooperatives', color: 'bg-amber-50 text-amber-600' },
];


export function AboutContent() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-white/10 text-primary-200 text-sm font-semibold rounded-full mb-5 border border-white/20">
              Est. 2010 — 15 Years of Excellence
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold font-display text-white mb-4">
              Arihant Enterprises<br />Crop Export Platform
            </h1>
            <p className="text-primary-100/80 max-w-2xl mx-auto text-lg">
              We bridge the gap between India&apos;s finest farms and global buyers — bringing you certified,
              traceable, and premium-quality agricultural crops.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-sm font-semibold rounded-full mb-4">Our Mission</span>
              <h2 className="text-3xl font-bold font-display text-slate-900 mb-5">
                Connecting India&apos;s Agricultural Heritage to the World
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Founded in 2010, Arihant Enterprises was established with a singular vision: to create a transparent,
                quality-assured pathway for India&apos;s exceptional agricultural crops to reach global markets.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                India produces some of the world&apos;s finest crops — from Himalayan saffron to coastal spices,
                from Basmati rice to organic pulses. Our platform connects these farm-level treasures with the
                importers, distributors, and food manufacturers who value authenticity and quality.
              </p>
              <div className="space-y-3">
                {['Direct farmer partnerships', 'Third-party quality testing', 'Complete chain of custody documentation', 'Dedicated export compliance team'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative rounded-3xl overflow-hidden aspect-square max-w-md mx-auto">
                <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80" alt="Farms" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[{ v: '15+', l: 'Years' }, { v: '500+', l: 'Crops' }, { v: '45+', l: 'Countries' }].map((s) => (
                      <div key={s.l}>
                        <p className="text-xl font-bold text-primary-700">{s.v}</p>
                        <p className="text-xs text-slate-600">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display text-slate-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 text-center hover:shadow-card transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${v.color} flex items-center justify-center mx-auto mb-4`}>
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-Founder */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display text-slate-900">Leadership</h2>
            <p className="text-slate-500 mt-3">The vision behind Arihant Enterprises</p>
          </div>
          <div className="flex justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-100 hover:shadow-card transition-all max-w-xs w-full"
            >
              <img src="/co-founder.jpeg" alt="Co-Founder" className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg" />
              <p className="text-primary-600 text-sm font-semibold uppercase tracking-wide mb-1">Co-Founder</p>
              <p className="text-sm text-slate-500">10+ Years in Agricultural Export</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display text-slate-900">Our Certifications</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, i) => (
              <motion.div key={cert.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-100"
              >
                <span className="text-2xl">{cert.icon}</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{cert.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{cert.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-green">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-display text-white mb-4">Ready to Source Premium Indian Crops?</h2>
          <p className="text-primary-100 mb-8">Contact our export team today for pricing, certifications, and supply schedules.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-bold rounded-2xl shadow-xl hover:bg-primary-50 transition-colors">
            Get in Touch <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
