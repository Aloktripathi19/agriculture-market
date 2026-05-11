'use client';
import { motion } from 'framer-motion';
import { Search, FileText, Handshake, Truck, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Browse Our Crop Catalog',
    description: 'Explore 200+ certified agricultural crops — grains, oilseeds, pulses, and spices — with detailed specifications, certifications, and origin info.',
    color: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    border: 'border-emerald-200',
  },
  {
    icon: FileText,
    step: '02',
    title: 'Submit an Inquiry',
    description: 'Fill out a simple inquiry form with your crop requirements, quantity, destination, and preferred timeline. No registration needed.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
    border: 'border-blue-200',
  },
  {
    icon: Handshake,
    step: '03',
    title: 'Get a Custom Quote',
    description: 'Our team reviews your requirements and responds within 24 hours with pricing, availability, certifications, and shipping details.',
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
    border: 'border-amber-200',
  },
  {
    icon: Truck,
    step: '04',
    title: 'Farm to Your Destination',
    description: 'We handle packaging, documentation, pre-shipment testing, and logistics — so your certified crops arrive on time, every time.',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
    border: 'border-purple-200',
  },
];

const highlights = [
  { icon: '✅', text: 'APEDA & FSSAI Certified' },
  { icon: '🧪', text: 'Pre-Shipment Lab Tested' },
  { icon: '📦', text: 'Custom Packaging Available' },
  { icon: '⚡', text: '24hr Query Response' },
];

export function MarketTrends() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-sm font-semibold rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-slate-900">
            How to <span className="text-gradient">Source Crops</span> from Us
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            From inquiry to delivery — a straightforward process designed for serious buyers and importers.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-6 rounded-2xl border ${s.border} ${s.color} group hover:shadow-card transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <s.icon className={`w-6 h-6 ${s.iconColor}`} />
                </div>
                <span className="text-4xl font-black text-slate-100 group-hover:text-slate-200 transition-colors leading-none">
                  {s.step}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2 leading-snug">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.description}</p>

              {/* Connector arrow (not on last) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white rounded-full border border-slate-200 items-center justify-center shadow-sm">
                  <span className="text-slate-400 text-xs">→</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl gradient-green p-8 lg:p-12"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold font-display text-white mb-3">
                Ready to Source Quality Crops?
              </h3>
              <p className="text-primary-100 max-w-lg">
                Browse our full catalog and send us an inquiry today. Our team responds within 24 hours with a personalised quote.
              </p>
              <div className="flex flex-wrap gap-3 mt-5">
                {highlights.map((h) => (
                  <span key={h.text} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full text-white text-xs font-medium backdrop-blur-sm border border-white/15">
                    {h.icon} {h.text}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/marketplace"
                className="px-7 py-3.5 bg-white text-primary-700 font-bold rounded-xl shadow-xl hover:bg-primary-50 transition-colors text-center"
              >
                Browse Crops
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
