'use client';
import { motion } from 'framer-motion';
import { Shield, CheckCircle } from 'lucide-react';

const exportCountries = [
  { name: 'United Arab Emirates', flag: '🇦🇪', exports: 'Basmati Rice, Soybean, Spices' },
  { name: 'United Kingdom', flag: '🇬🇧', exports: 'Organic Spices, Pulses, Wheat' },
  { name: 'United States', flag: '🇺🇸', exports: 'Organic Crops, Spices, Basmati' },
  { name: 'Germany', flag: '🇩🇪', exports: 'Organic Turmeric, Black Pepper, Cardamom' },
  { name: 'Japan', flag: '🇯🇵', exports: 'Saffron, Premium Spices, Organic Crops' },
  { name: 'Australia', flag: '🇦🇺', exports: 'Spices, Pulses, Organic Crops' },
  { name: 'Canada', flag: '🇨🇦', exports: 'Basmati Rice, Pulses, Spices' },
  { name: 'Netherlands', flag: '🇳🇱', exports: 'Spices, Pulses, Oilseeds' },
  { name: 'Saudi Arabia', flag: '🇸🇦', exports: 'Basmati Rice, Wheat, Cardamom' },
  { name: 'Singapore', flag: '🇸🇬', exports: 'Premium Spices, Pulses' },
  { name: 'France', flag: '🇫🇷', exports: 'Saffron, Exotic Spices, Organic Crops' },
  { name: 'New Zealand', flag: '🇳🇿', exports: 'Organic Crops, Oilseeds' },
];

const certifications = [
  { name: 'Udyam Certificate', icon: '🏭', description: 'Ministry of MSME — Udyam Registration for small and medium enterprises' },
  { name: 'Import Export Certificate', icon: '🌍', description: 'IEC issued by DGFT — authorizes international import and export trade' },
  { name: 'APEDA Certificate', icon: '🏛️', description: 'Agricultural & Processed Food Products Export Development Authority' },
  { name: 'GST Certificate', icon: '📋', description: 'Goods and Services Tax registration — Government of India' },
];

export function ExportSection() {
  return (
    <section className="section-padding gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Export Countries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-sm font-semibold rounded-full mb-4">
            Global Reach
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-slate-900">
            Exporting to <span className="text-gradient">45+ Countries</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            Our crops reach kitchens, food manufacturers, and distributors across the globe — from Middle East supermarkets to European organic chains.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-20">
          {exportCountries.map((country, i) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-xl p-4 border border-slate-100 hover:border-primary-200 hover:shadow-card transition-all text-center group"
            >
              <div className="text-3xl mb-2">{country.flag}</div>
              <p className="text-sm font-semibold text-slate-800 group-hover:text-primary-700 transition-colors leading-tight">
                {country.name}
              </p>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{country.exports}</p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-700 text-sm font-semibold rounded-full mb-4">
            Certifications & Compliance
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold font-display text-slate-900">
            Meeting <span className="text-gradient-gold">Global Standards</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            All our crops are certified by internationally recognized bodies, ensuring compliance with the strictest food safety and quality regulations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-100 hover:border-primary-200 hover:shadow-card transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-xl flex-shrink-0">
                {cert.icon}
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="text-sm font-semibold text-slate-900">{cert.name}</h3>
                  <CheckCircle className="w-3.5 h-3.5 text-primary-500" />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{cert.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 relative overflow-hidden rounded-3xl gradient-green p-8 lg:p-12 text-white"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-primary-200" />
                <h3 className="text-2xl font-bold font-display">Quality Guarantee</h3>
              </div>
              <p className="text-primary-100 leading-relaxed">
                Every consignment undergoes rigorous pre-shipment inspection by accredited third-party laboratories.
                We provide full traceability documentation — from farm to final destination.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: '100%', l: 'Pre-shipment Tested' },
                { v: '0%', l: 'Quality Rejections' },
                { v: '98%', l: 'On-time Delivery' },
                { v: '24hr', l: 'Query Response' },
              ].map((item) => (
                <div key={item.l} className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                  <p className="text-2xl font-bold">{item.v}</p>
                  <p className="text-xs text-primary-200 mt-1">{item.l}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
