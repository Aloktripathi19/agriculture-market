'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Shield, Award, TrendingUp } from 'lucide-react';

const badges = [
  { icon: Award, label: 'Export Quality' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-primary-200 text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
              India&apos;s Premier Crop Export Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight"
            >
              Premium Indian
              <span className="block text-primary-300 mt-1">Crops for Global</span>
              <span className="block">Markets</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-primary-100/80 leading-relaxed max-w-lg"
            >
              Source certified export-quality agricultural crops directly from India&apos;s finest farms.
              Grains, spices, pulses, and organic crops — premium quality, farm to market.
            </motion.p>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              {badges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-sm backdrop-blur-sm"
                >
                  <Icon className="w-3.5 h-3.5 text-primary-300" />
                  {label}
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <Link
                href="/marketplace"
                className="flex items-center justify-center gap-2 px-7 py-4 bg-white text-primary-700 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:bg-primary-50 transition-all group text-base"
              >
                Browse Crops
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-7 py-4 bg-transparent text-white font-semibold rounded-2xl border border-white/30 hover:bg-white/10 transition-all text-base backdrop-blur-sm"
              >
                <Play className="w-4 h-4" />
                Request a Quote
              </Link>
            </motion.div>
          </div>

          {/* Right — Image Cards */}
          <div className="hidden lg:block relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl w-full aspect-square max-w-md mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80"
                  alt="Premium crops"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />
              </div>

              {/* Floating card 1 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-8 top-1/4 glass rounded-2xl p-4 shadow-xl max-w-[170px]"
              >
                <div className="text-2xl mb-1">🌾</div>
                <p className="text-xs text-slate-600 font-semibold">Basmati Rice</p>
                <p className="text-xs text-primary-600 font-medium mt-0.5">APEDA Certified • GI Tagged</p>
                <div className="mt-2 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-xs">★</span>
                  ))}
                </div>
              </motion.div>

              {/* Floating card 2 */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -right-8 bottom-1/4 glass rounded-2xl p-4 shadow-xl max-w-[170px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm">🧪</div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">Quality Assured</p>
                    <p className="text-xs text-slate-500">Pre-Shipment Tested</p>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }} />
                </div>
                <p className="text-xs text-emerald-600 font-medium mt-1">Zero Quality Rejects</p>
              </motion.div>

              {/* Stats badge */}
              <div className="absolute top-4 right-4 glass rounded-xl px-3 py-2 text-center shadow-lg">
                <p className="text-2xl font-bold text-primary-600">500+</p>
                <p className="text-xs text-slate-500">Crop Varieties</p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
