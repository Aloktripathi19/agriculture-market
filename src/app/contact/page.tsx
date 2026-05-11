import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactPageContent } from '@/components/contact/ContactPageContent';

export const metadata = { title: 'Contact Us — Get Export Quote' };

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <ContactPageContent />
      </main>
      <Footer />
    </>
  );
}
