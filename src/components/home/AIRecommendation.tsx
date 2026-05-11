'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';

const questions = [
  {
    id: 'q1',
    question: 'What type of crops are you looking for?',
    options: ['Grains & Cereals', 'Spices & Herbs', 'Pulses & Legumes', 'Organic Products'],
    key: 'cropType',
  },
  {
    id: 'q2',
    question: 'What is your primary use case?',
    options: ['Food Manufacturing', 'Retail Distribution', 'Restaurant / HoReCa', 'Export Resale'],
    key: 'useCase',
  },
  {
    id: 'q3',
    question: 'What volume are you looking for initially?',
    options: ['Sample (< 10kg)', 'Small Batch (10–100kg)', 'Bulk (100kg–1MT)', 'Large Scale (1MT+)'],
    key: 'volume',
  },
];

const recommendations: Record<string, { name: string; reason: string; href: string; icon: string }[]> = {
  'Grains & Cereals-Food Manufacturing-Large Scale (1MT+)': [
    { name: 'Basmati Rice 1121', reason: 'Premium long-grain for food manufacturing, consistent quality at scale', href: '/marketplace/basmati-rice-1121', icon: '🌾' },
    { name: 'Sharbati Wheat', reason: 'High-protein wheat ideal for premium flour production', href: '/marketplace/organic-wheat-sharbati', icon: '🌾' },
  ],
};

function getRecommendations(answers: Record<string, string>) {
  const key = Object.values(answers).join('-');
  if (recommendations[key]) return recommendations[key];
  return [
    { name: 'Basmati Rice 1121', reason: 'Best-selling export crop matching your profile', href: '/marketplace/basmati-rice-1121', icon: '🌾' },
    { name: 'Organic Turmeric', reason: 'High demand in your target market segment', href: '/marketplace/organic-turmeric-powder', icon: '🟡' },
    { name: 'Black Pepper (Malabar)', reason: 'Premium quality spice for your use case', href: '/marketplace/indian-black-pepper', icon: '⚫' },
  ];
}

export function AIRecommendation() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ReturnType<typeof getRecommendations> | null>(null);

  const handleAnswer = (key: string, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setResults(getRecommendations(newAnswers));
        setLoading(false);
      }, 1500);
    }
  };

  const reset = () => { setStep(0); setAnswers({}); setResults(null); };

  return (
    <section className="section-padding bg-gradient-to-br from-primary-950 via-primary-900 to-forest-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: `radial-gradient(circle at 30% 50%, rgba(74, 222, 128, 0.3) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(22, 163, 74, 0.2) 0%, transparent 60%)` }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="glass rounded-3xl p-6 sm:p-8 border border-white/10">
          <AnimatePresence mode="wait">
            {!results && !loading && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-slate-400">Step {step + 1} of {questions.length}</span>
                  <div className="flex-1 h-1 bg-white/10 rounded-full">
                    <div
                      className="h-1 gradient-green rounded-full transition-all"
                      style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-6 mt-4">
                  {questions[step].question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(questions[step].key, opt)}
                      className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-primary-700/30 hover:border-primary-400/40 transition-all text-left group"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary-400 group-hover:scale-125 transition-transform" />
                      <span className="text-sm font-medium text-white">{opt}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Loader2 className="w-10 h-10 text-primary-400 animate-spin mx-auto mb-4" />
                <p className="text-primary-200">Analyzing your requirements...</p>
              </motion.div>
            )}

            {results && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-primary-400" />
                  <h3 className="font-semibold text-white">Recommended Crops for You</h3>
                </div>

                <div className="space-y-3 mb-6">
                  {results.map((r) => (
                    <Link
                      key={r.name}
                      href={r.href}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all group"
                    >
                      <span className="text-2xl">{r.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-white group-hover:text-primary-300 transition-colors">{r.name}</p>
                        <p className="text-xs text-primary-200/70 mt-0.5">{r.reason}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={reset} className="flex-1 py-3 rounded-xl border border-white/20 text-white/80 text-sm hover:bg-white/10 transition-colors">
                    Start Over
                  </button>
                  <Link href="/contact" className="flex-1 py-3 rounded-xl gradient-green text-white text-sm font-semibold text-center hover:opacity-90 transition-opacity">
                    Get Detailed Quote
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
