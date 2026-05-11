'use client';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { InquiryForm } from '@/components/marketplace/InquiryForm';

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+91 79998 37117', href: 'tel:+917999837117', color: 'text-primary-600 bg-primary-50' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+91 79998 37117', href: 'https://wa.me/917999837117', color: 'text-emerald-600 bg-emerald-50' },
  { icon: Mail, label: 'Email', value: 'arihant.entt108@gmail.com', href: 'mailto:arihant.entt108@gmail.com', color: 'text-blue-600 bg-blue-50' },
  { icon: MapPin, label: 'Address', value: 'Ward No. 7, Gandharvpuri, Post Gandharvpuri, Dewas, Madhya Pradesh - 455118, India', href: '#', color: 'text-rose-600 bg-rose-50' },
];

export function ContactPageContent() {
  return (
    <div className="bg-slate-50">
      {/* Header */}
      <div className="gradient-green py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl lg:text-4xl font-bold font-display text-white mb-3">Contact Our Export Team</h1>
            <p className="text-primary-100 max-w-2xl">
              Reach out to us for bulk crop orders, export inquiries, pricing, certifications, or partnership opportunities.
              We respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-5">
            <h2 className="text-xl font-bold font-display text-slate-900 mb-6">Get in Touch</h2>

            {contactInfo.map((info) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-primary-200 hover:shadow-sm transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl ${info.color} flex items-center justify-center flex-shrink-0`}>
                  <info.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{info.label}</p>
                  <p className="text-sm font-medium text-slate-800 mt-0.5 group-hover:text-primary-700 transition-colors">{info.value}</p>
                </div>
              </motion.a>
            ))}

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/917999837117"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl shadow-lg hover:bg-emerald-600 transition-colors mt-6"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp Now
            </motion.a>

            {/* Note */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm text-amber-800">
                <strong>Admin-Only Platform:</strong> All crop listings, pricing, and orders are managed exclusively by our admin team.
                Buyers, farmers, and sellers should contact us directly to place orders or list crops.
              </p>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-2">
            <InquiryForm />
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-slate-200 h-64 bg-gradient-to-br from-primary-50 to-emerald-50 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-10 h-10 text-primary-400 mx-auto mb-3" />
            <p className="font-semibold text-slate-700">Arihant Enterprises</p>
            <p className="text-sm text-slate-500">Ward No. 7, Gandharvpuri, Dewas, Madhya Pradesh - 455118</p>
          </div>
        </div>
      </div>
    </div>
  );
}
