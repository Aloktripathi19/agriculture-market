'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const galleryItems = [
  { id: 1, src: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80', category: 'Grains', title: 'Golden Wheat Fields' },
  { id: 2, src: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80', category: 'Spices', title: 'Premium Spices' },
  { id: 3, src: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=80', category: 'Fruits', title: 'Alphonso Mangoes' },
  { id: 4, src: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=800&q=80', category: 'Pulses', title: 'Premium Pulses' },
  { id: 5, src: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&q=80', category: 'Spices', title: 'Organic Turmeric' },
  { id: 6, src: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&q=80', category: 'Fruits', title: 'Seedless Grapes' },
  { id: 7, src: 'https://images.unsplash.com/photo-1536304993881-ff86e0c9c5f2?w=800&q=80', category: 'Grains', title: 'Basmati Rice' },
  { id: 8, src: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&q=80', category: 'Organic', title: 'Organic Produce' },
  { id: 9, src: 'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=800&q=80', category: 'Fruits', title: 'Pomegranate' },
  { id: 10, src: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80', category: 'Vegetables', title: 'Fresh Vegetables' },
  { id: 11, src: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=80', category: 'Vegetables', title: 'Baby Spinach' },
  { id: 12, src: 'https://images.unsplash.com/photo-1567817723876-fdb1553c4c5c?w=800&q=80', category: 'Spices', title: 'Kashmir Saffron' },
];

const categories = ['All', 'Grains', 'Spices', 'Fruits', 'Pulses', 'Vegetables', 'Organic'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImg, setLightboxImg] = useState<typeof galleryItems[0] | null>(null);

  const filtered = activeCategory === 'All' ? galleryItems : galleryItems.filter((g) => g.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-slate-50">
        <div className="gradient-green py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl lg:text-4xl font-bold font-display text-white mb-2">Crop Gallery</h1>
              <p className="text-primary-100">A visual showcase of our premium agricultural crop portfolio</p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'gradient-green text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-slate-100"
                  onClick={() => setLightboxImg(item)}
                >
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-white text-sm font-medium">{item.title}</p>
                    <p className="text-white/70 text-xs">{item.category}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setLightboxImg(null)}
            >
              <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                src={lightboxImg.src}
                alt={lightboxImg.title}
                className="max-w-full max-h-[80vh] rounded-2xl object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-4 text-center text-white">
                <p className="font-semibold">{lightboxImg.title}</p>
                <p className="text-sm text-white/60">{lightboxImg.category}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
