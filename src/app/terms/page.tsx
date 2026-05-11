import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold font-display text-slate-900 mb-6">Terms of Service</h1>
          <div className="bg-white rounded-2xl border border-slate-100 p-8 text-sm leading-relaxed">
            <p className="text-slate-500 mb-6">Last updated: January 2025</p>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Platform Use</h2>
            <p className="text-slate-600 mb-4">AgroExport India operates as an admin-managed crop marketplace. Only the platform administrator can list, update, or remove crop listings. Users may browse and submit inquiries.</p>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Inquiries & Orders</h2>
            <p className="text-slate-600 mb-4">Submitting an inquiry does not constitute a binding order. All orders are confirmed and processed directly between the buyer and AgroExport India through formal agreements.</p>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Pricing</h2>
            <p className="text-slate-600 mb-4">All prices shown are indicative and subject to change based on market conditions, quality grade, and volume. Final pricing is confirmed by our export team.</p>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Contact</h2>
            <p className="text-slate-600">For questions about these terms, contact legal@agroexport.com</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
