import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AboutContent } from '@/components/about/AboutContent';

export const metadata = { title: 'About Us — India\'s Premier Crop Export Platform' };

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
