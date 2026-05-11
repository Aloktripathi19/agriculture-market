import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedCrops } from '@/components/home/FeaturedCrops';
import { SeasonalHighlights } from '@/components/home/SeasonalHighlights';
import { MarketTrends } from '@/components/home/MarketTrends';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { BlogPreview } from '@/components/home/BlogPreview';
import { FAQSection } from '@/components/home/FAQSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedCrops />
        <SeasonalHighlights />
        <MarketTrends />
        <TestimonialsSection />
        <BlogPreview />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
