'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sprout, FlaskConical, FileCheck, Clock, PackageCheck, Leaf } from 'lucide-react';

const benefits = [
  {
    icon: Sprout,
    title: 'Direct Farm Sourcing',
    description: 'We work directly with 50+ partner farms across India — no middlemen, ensuring fresher crops and better pricing for buyers.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'hover:border-emerald-200',
  },
  {
    icon: FlaskConical,
    title: 'Pre-Shipment Lab Tested',
    description: 'Every consignment undergoes third-party lab testing for pesticide residue, moisture, aflatoxin, and nutritional parameters before dispatch.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'hover:border-blue-200',
  },
  {
    icon: FileCheck,
    title: 'Complete Documentation',
    description: 'Phytosanitary certificates, COA, fumigation reports, packing lists, and all export documents provided with every shipment.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'hover:border-amber-200',
  },
  {
    icon: Clock,
    title: '24-Hour Response',
    description: 'Submit an inquiry and our team responds within 24 hours with pricing, availability, and a customised procurement plan.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'hover:border-purple-200',
  },
  {
    icon: PackageCheck,
    title: 'Export-Ready Packaging',
    description: 'Custom packaging in PP bags, jute bags, vacuum packs, or containers — tailored to your destination country\'s import standards.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'hover:border-rose-200',
  },
  {
    icon: Leaf,
    title: 'Organic Certified Options',
    description: '30% of our crop portfolio carries USDA Organic, EU Organic, or India Organic certification — ready for premium retail and health markets.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'hover:border-teal-200',
  },
];

const trust = [
  { value: '100%', label: 'Pre-Shipment Tested' },
  { value: '24hr', label: 'Query Response Time' },
  { value: '4', label: 'Certifications Held' },
  { value: '365', label: 'Days Crop Supply' },
];

export function SeasonalHighlights() {
  return (
    <section className="section-padding gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-sm font-semibold rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-slate-900">
            Why Buyers Trust <span className="text-gradient">Arihant Enterprises</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            We combine direct farm relationships, strict quality control, and seamless export processes to deliver crops you can rely on.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`bg-white rounded-2xl border border-slate-100 ${b.border} p-6 hover:shadow-card transition-all group`}
            >
              <div className={`w-12 h-12 rounded-xl ${b.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <b.icon className={`w-6 h-6 ${b.color}`} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{b.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {trust.map((t, i) => (
              <div key={t.label} className="text-center">
                <p className="text-3xl font-black text-primary-600 font-display">{t.value}</p>
                <p className="text-sm text-slate-500 mt-1">{t.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <p className="text-slate-600 text-sm text-center sm:text-left">
              Ready to source certified agricultural crops for your business?
            </p>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 py-3 gradient-green text-white font-semibold rounded-xl shadow hover:opacity-95 transition-opacity shrink-0"
            >
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
