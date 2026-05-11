'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { getDB } from '@/lib/db/indexeddb';
import { generateId } from '@/lib/utils';
import toast from 'react-hot-toast';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const db = await getDB();
      await db.put('newsletter', { id: generateId('sub'), email, subscribedAt: new Date().toISOString() });
      setSubmitted(true);
      toast.success('Successfully subscribed to crop market updates!');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 gradient-green relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='20' cy='20' r='3'/%3E%3C/g%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Mail className="w-7 h-7 text-white" />
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold font-display text-white mb-3">
            Stay Updated on Crop Markets
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            Get weekly market reports, seasonal crop availability, and export price updates directly in your inbox.
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-3 bg-white/15 rounded-2xl px-8 py-5 backdrop-blur-sm border border-white/20"
            >
              <CheckCircle className="w-6 h-6 text-white" />
              <p className="text-white font-semibold">You&apos;re subscribed! We&apos;ll be in touch soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your business email"
                required
                className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-primary-200 focus:outline-none focus:bg-white/15 focus:border-white/40 backdrop-blur-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-7 py-4 bg-white text-primary-700 font-bold rounded-xl shadow-xl hover:bg-primary-50 transition-colors disabled:opacity-70 flex-shrink-0"
              >
                {loading ? 'Subscribing...' : <>Subscribe <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}

          <p className="text-primary-200/70 text-xs mt-4">
            No spam. Unsubscribe anytime. Join 5,000+ agricultural trade professionals.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
