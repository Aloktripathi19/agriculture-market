import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold font-display text-slate-900 mb-6">Privacy Policy</h1>
          <div className="bg-white rounded-2xl border border-slate-100 p-8 prose prose-slate max-w-none text-sm leading-relaxed">
            <p className="text-slate-500 mb-6">Last updated: January 2025</p>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Information We Collect</h2>
            <p className="text-slate-600 mb-4">We collect information you provide when submitting inquiries, subscribing to our newsletter, or contacting us. This includes name, email, phone number, company, and country.</p>
            <h2 className="text-xl font-bold text-slate-900 mb-3">How We Use Information</h2>
            <p className="text-slate-600 mb-4">Information is used to respond to your inquiries, provide crop pricing and availability details, and send relevant agricultural market updates if you opt in.</p>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Data Storage</h2>
            <p className="text-slate-600 mb-4">This website stores data locally in your browser using IndexedDB. No data is transmitted to external servers except for inquiry emails sent to our admin team.</p>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Contact</h2>
            <p className="text-slate-600">For privacy concerns, contact us at privacy@agroexport.com</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
