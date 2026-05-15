'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Star, MapPin, Calendar, Package, Award, Leaf, ArrowLeft,
  ChevronRight, Check, Globe, Phone, MessageCircle, Download
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { InquiryForm } from '@/components/marketplace/InquiryForm';
import type { Product } from '@/types';
import { productService } from '@/lib/services/productService';
import { STATUS_LABELS, STATUS_COLORS, formatDate } from '@/lib/utils';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'nutrition'>('details');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    productService.getBySlug(slug).then(async (p) => {
      if (!p) { setNotFound(true); return; }
      setProduct(p);
      const rel = await productService.getRelated(p);
      setRelated(rel);
    });
  }, [slug]);

  if (notFound) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <p className="text-6xl mb-4">🌾</p>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Crop Not Found</h1>
            <Link href="/marketplace" className="text-primary-600 hover:underline">Back to Marketplace</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="aspect-square bg-slate-200 rounded-2xl" />
              <div className="space-y-4">
                <div className="h-8 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-2/3" />
                <div className="h-12 bg-slate-200 rounded-xl w-1/2 mt-6" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-20">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="hover:text-primary-600">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/marketplace" className="hover:text-primary-600">Marketplace</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-900 font-medium truncate">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Images + Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Images */}
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 p-4">
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-50 mb-4">
                  <img
                    src={product.images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (!e.currentTarget.dataset.fb) {
                        e.currentTarget.dataset.fb = '1';
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80';
                      }
                    }}
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-colors ${
                          activeImage === i ? 'border-primary-500' : 'border-transparent'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover"
                          onError={(e) => { if (!e.currentTarget.dataset.fb) { e.currentTarget.dataset.fb = '1'; e.currentTarget.src = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80'; } }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${STATUS_COLORS[product.status]}`}>
                    {STATUS_LABELS[product.status]}
                  </span>
                  {product.isExportQuality && (
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium rounded-lg">
                      <Award className="w-3 h-3" /> Export Quality
                    </span>
                  )}
                  {product.isOrganic && (
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium rounded-lg">
                      <Leaf className="w-3 h-3" /> Certified Organic
                    </span>
                  )}
                </div>

                <h1 className="text-2xl lg:text-3xl font-bold font-display text-slate-900 mb-2">{product.name}</h1>

                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-medium text-slate-700">{product.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-primary-500" />
                    <span>{product.origin}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>Harvest: {formatDate(product.harvestDate)}</span>
                  </div>
                </div>


                {/* Tabs */}
                <div className="border-b border-slate-100 mb-5">
                  <div className="flex gap-6">
                    {(['details', 'specs', 'nutrition'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                          activeTab === tab
                            ? 'border-primary-500 text-primary-700'
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {tab === 'details' ? 'Product Details' : tab === 'specs' ? 'Specifications' : 'Nutrition Info'}
                      </button>
                    ))}
                  </div>
                </div>

                {activeTab === 'details' && (
                  <div className="space-y-4">
                    <p className="text-slate-600 leading-relaxed text-sm">{product.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Farming Method</h4>
                        <p className="text-sm text-slate-700">{product.farmingMethod}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Packaging</h4>
                        <p className="text-sm text-slate-700">{product.packagingDetails}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Available Until</h4>
                        <p className="text-sm text-slate-700">{formatDate(product.availableUntil)}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Certifications</h4>
                        <div className="flex flex-wrap gap-1">
                          {product.certifications.map((c) => (
                            <span key={c} className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs rounded-md">{c}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {product.exportCountries.length > 0 && (
                      <div className="pt-2">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2 flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5" /> Currently Exporting To
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {product.exportCountries.map((c) => (
                            <span key={c} className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-lg">{c}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'specs' && (
                  <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {typeof product.specifications === 'string' && product.specifications ? product.specifications : 'No specifications added yet.'}
                  </p>
                )}

                {activeTab === 'nutrition' && (
                  <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {typeof product.nutritionInfo === 'string' && product.nutritionInfo ? product.nutritionInfo : 'No nutrition info added yet.'}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Inquiry + Actions */}
            <div className="space-y-5">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <h3 className="font-bold text-slate-900 mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/917999837117?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full py-3 px-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp for Quote
                  </a>
                  <a
                    href="tel:+917999837117"
                    className="flex items-center gap-3 w-full py-3 px-4 border border-primary-300 text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Call for Pricing
                  </a>
                  <button className="flex items-center gap-3 w-full py-3 px-4 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors text-sm">
                    <Download className="w-4 h-4" />
                    Download Product Sheet
                  </button>
                </div>

                <div className="mt-5 p-4 bg-primary-50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-primary-800">Admin Managed Platform</p>
                      <p className="text-xs text-primary-600 mt-0.5">
                        All orders and pricing are handled directly by our admin team. Contact us for exact quotes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <InquiryForm productId={product.id} productName={product.name} />
            </div>
          </div>

          {/* Related Crops */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold font-display text-slate-900 mb-6">Related Crops</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
