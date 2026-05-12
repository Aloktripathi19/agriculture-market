'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sprout, Award, Leaf, CalendarDays, Layers, Store } from 'lucide-react';

const stats = [
  { icon: Sprout, value: 200, suffix: '+', label: 'Crop Varieties', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Layers, value: 7, suffix: '', label: 'Crop Categories', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Award, value: 12, suffix: '+', label: 'Quality Certifications', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Leaf, value: 30, suffix: '%', label: 'Organic Certified Crops', color: 'text-teal-600', bg: 'bg-teal-50' },
  { icon: Store, value: 4, suffix: '', label: 'Certifications Held', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: CalendarDays, value: 365, suffix: '', label: 'Days Crop Supply', color: 'text-rose-600', bg: 'bg-rose-50' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl border border-slate-100 hover:border-primary-200 hover:shadow-card transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold font-display text-slate-900">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-slate-500 mt-1 leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
