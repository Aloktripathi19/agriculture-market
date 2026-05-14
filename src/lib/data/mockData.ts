import type { Product, Category, Testimonial, FAQ, Banner, BlogPost } from '@/types';

export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Oilseeds',
    slug: 'oilseeds',
    description: 'Premium oilseed crops including soybean, mustard, sunflower, and groundnut for oil extraction and export',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
    icon: '🌻',
    productCount: 18,
    isActive: true,
    sortOrder: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cat-2',
    name: 'Coarse Grains',
    slug: 'coarse-grains',
    description: 'High-yield coarse grain crops including maize, jowar, bajra, and ragi for feed, starch, and flour industries',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80',
    icon: '🌽',
    productCount: 14,
    isActive: true,
    sortOrder: 2,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cat-3',
    name: 'Grains & Cereals',
    slug: 'grains',
    description: 'High-quality grains and cereals perfect for export and wholesale markets',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
    icon: '🌾',
    productCount: 18,
    isActive: true,
    sortOrder: 3,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cat-4',
    name: 'Pulses & Legumes',
    slug: 'pulses',
    description: 'Protein-rich pulses and legumes for domestic and international markets',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=800&q=80',
    icon: '🫘',
    productCount: 15,
    isActive: true,
    sortOrder: 4,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cat-5',
    name: 'Spices & Herbs',
    slug: 'spices',
    description: 'Aromatic spices and herbs from India\'s rich agricultural heritage',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
    icon: '🌶️',
    productCount: 28,
    isActive: true,
    sortOrder: 5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cat-6',
    name: 'Organic Crops',
    slug: 'organic',
    description: 'Certified organic crops grown without synthetic pesticides or fertilizers',
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&q=80',
    icon: '🌿',
    productCount: 20,
    isActive: true,
    sortOrder: 6,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'cat-7',
    name: 'Export Quality',
    slug: 'export-quality',
    description: 'Premium export-grade crops meeting international quality standards',
    image: 'https://images.unsplash.com/photo-1611095973763-414019e72400?w=800&q=80',
    icon: '🏆',
    productCount: 35,
    isActive: true,
    sortOrder: 7,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export const mockProducts: Product[] = [];


export const mockTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Ahmad Al-Rashidi',
    company: 'Dubai Grain Trading LLC',
    country: 'UAE',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
    review: 'AgroExport has been our trusted supplier for over 3 years. The quality of their Basmati Rice and soybean exports consistently meets our premium market standards. Their documentation and logistics support is excellent.',
    isActive: true,
    isFeatured: true,
    createdAt: '2024-06-15T00:00:00Z',
  },
  {
    id: 'test-2',
    name: 'Sarah Thompson',
    company: 'Green Valley Imports, UK',
    country: 'United Kingdom',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80',
    rating: 5,
    review: 'The organic turmeric and moringa we source from AgroExport passes all our stringent quality tests. They\'re always compliant with EU regulations. Highly recommended for serious import businesses.',
    isActive: true,
    isFeatured: true,
    createdAt: '2024-07-20T00:00:00Z',
  },
  {
    id: 'test-3',
    name: 'Tanaka Hiroshi',
    company: 'Nippon Organic Trade',
    country: 'Japan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    rating: 5,
    review: 'We specifically chose AgroExport for their Kashmir saffron and black pepper. The consistency in quality and their transparent sourcing practices align with our Japanese market demands. Exceptional service.',
    isActive: true,
    isFeatured: true,
    createdAt: '2024-08-10T00:00:00Z',
  },
  {
    id: 'test-4',
    name: 'Maria Santos',
    company: 'Organic Health Europe',
    country: 'Germany',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80',
    rating: 4,
    review: 'Their organic certifications are always up-to-date and the products match specifications precisely. The basmati rice and wheat are especially popular with our German customers. Great team to work with.',
    isActive: true,
    isFeatured: false,
    createdAt: '2024-09-05T00:00:00Z',
  },
  {
    id: 'test-5',
    name: 'James Wilson',
    company: 'Pure Grains Australia',
    country: 'Australia',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    rating: 5,
    review: 'Found AgroExport through a trade show and have been amazed at their professionalism. They helped us navigate the Australian import requirements for pulses and spices. Delivery is always on time.',
    isActive: true,
    isFeatured: true,
    createdAt: '2024-10-12T00:00:00Z',
  },
];

export const mockFAQs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What is the minimum order quantity for export crops?',
    answer: 'Minimum order quantities vary by crop. Generally, spices start from 10-25 kg, grains and pulses from 250-1000 kg, and oilseeds from 500 kg. For smaller quantities or sample orders, please contact our admin team through the inquiry form.',
    category: 'ordering',
    sortOrder: 1,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'faq-2',
    question: 'What certifications do your crops carry?',
    answer: 'Our crops carry various certifications including APEDA (Agricultural & Processed Food Products Export Development Authority), FSSAI (Food Safety and Standards Authority of India), GlobalGAP, USDA Organic, EU Organic, GI Tags, ISO 22000, and Halal/Kosher certifications depending on the crop. Specific certifications are listed on each product page.',
    category: 'quality',
    sortOrder: 2,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'faq-3',
    question: 'How do I place a bulk order or export inquiry?',
    answer: 'All bulk orders and export inquiries are handled directly by our admin team. You can submit an inquiry through the crop inquiry form, the contact page, or WhatsApp us directly. Our team will respond within 24 hours with pricing, availability, and shipping details.',
    category: 'ordering',
    sortOrder: 3,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'faq-4',
    question: 'Which crop categories do you deal in?',
    answer: 'We deal in a wide range of agricultural crops: Grains & Cereals (Basmati Rice, Wheat, Sorghum), Pulses & Legumes (Toor Dal, Chickpea, Moong), Oilseeds (Soybean, Mustard, Sunflower), Coarse Grains (Maize, Bajra, Jowar), Spices & Herbs (Turmeric, Cardamom, Black Pepper, Saffron), and Organic Crops.',
    category: 'export',
    sortOrder: 4,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'faq-5',
    question: 'What are the payment terms for bulk orders?',
    answer: 'For established customers, we offer NET 30/60 payment terms. For new customers, we typically require 30-50% advance payment with the balance against documents or Letter of Credit (LC) for large export orders. Our admin team will discuss the most suitable payment arrangement for your order.',
    category: 'payment',
    sortOrder: 5,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'faq-6',
    question: 'How is crop quality maintained during shipping?',
    answer: 'We use vacuum-sealed packaging for spices, nitrogen-flushed packaging for organic crops, and moisture-controlled containers for grains and oilseeds. Each shipment undergoes pre-shipment inspection by third-party agencies. We also provide full traceability documentation with each consignment.',
    category: 'shipping',
    sortOrder: 6,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'faq-7',
    question: 'Can I visit your partner farms?',
    answer: 'Yes, we welcome serious buyers and importers to visit our partner farms and processing facilities. Farm visits can be arranged with prior appointment through our admin team. We believe in complete transparency in our supply chain.',
    category: 'general',
    sortOrder: 7,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'faq-8',
    question: 'Do you provide crop samples before bulk orders?',
    answer: 'Yes, we provide samples for most crops. Sample quantities range from 100g to 1kg for spices and 1-5 kg for grains/oilseeds. Samples are charged at market rate plus courier costs. Sample costs are typically adjusted against the first bulk order. Contact our admin team to request samples.',
    category: 'ordering',
    sortOrder: 8,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'India\'s Spice Export Boom: Opportunities for Global Buyers in 2025',
    slug: 'india-spice-export-boom-2025',
    excerpt: 'India\'s spice exports reached a record $4.46 billion in FY2024. Discover the key drivers, top commodities, and how your business can capitalize on this growth.',
    content: `India has once again proven its dominance as the world's largest producer, consumer, and exporter of spices. The Spices Board of India reports that spice exports for FY2024 crossed $4.46 billion — a 14% increase over the previous year.

## Key Growth Drivers

**Rising Global Demand for Authentic Flavors**
Consumers worldwide are increasingly seeking authentic, ethnic cuisine experiences. This has driven demand for high-quality Indian spices in food manufacturing, restaurants, and retail sectors across the globe.

**Organic Certification Growth**
The organic spice segment is growing at 22% annually. Buyers from Europe and North America particularly prefer certified organic variants to meet regulatory requirements and consumer preferences.

**Technological Advances in Processing**
Modern spice processing units now use steam sterilization, cryogenic grinding, and cold storage to preserve essential oils and active compounds, resulting in superior quality products.

## Top Export Commodities

1. **Chilli** - 1.2 million tonnes exported, largest category
2. **Cumin** - Strong demand from Middle East and Europe
3. **Turmeric** - Booming due to health and wellness trends
4. **Cardamom** - Premium segment growing 18% YoY
5. **Black Pepper** - Recovering markets driving growth

## How to Source Effectively

Working with verified exporters who have APEDA registration, proper certifications, and consistent quality control is essential. Request third-party lab reports for key quality parameters before finalizing orders.`,
    coverImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
    author: 'Rajesh Kumar',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    category: 'Market Insights',
    tags: ['spices', 'export', 'market-trends', 'india', '2025'],
    isPublished: true,
    isFeatured: true,
    readTime: 6,
    createdAt: '2025-03-15T00:00:00Z',
    updatedAt: '2025-03-15T00:00:00Z',
  },
  {
    id: 'blog-2',
    title: 'Understanding GlobalGAP Certification: A Guide for Agricultural Exporters',
    slug: 'understanding-globalgap-certification-guide',
    excerpt: 'GlobalGAP certification opens doors to European supermarkets and premium retail chains. Learn what it means, how to achieve it, and why it matters for your export business.',
    content: `GlobalGAP (Global Good Agricultural Practice) is a private sector body that sets voluntary standards for the certification of agricultural products. For any exporter targeting European supermarkets, Walmart, Carrefour, or other major global retailers, GlobalGAP certification is virtually mandatory.

## What GlobalGAP Certifies

The certification covers the entire production process from before the seed goes into the ground to the non-processed product — essentially farm to fork. Key areas include:

- Food safety and traceability
- Environmental sustainability
- Worker health, safety, and welfare
- Integrated Crop Management (ICM)
- Responsible use of plant protection products

## The Certification Process

Getting GlobalGAP certified typically takes 6-12 months for a farm. The process involves:

1. **Gap Analysis** - Understanding current practices vs. requirements
2. **Implementation** - Setting up record-keeping, training staff, improving infrastructure
3. **Internal Audit** - Self-assessment against all control points
4. **Certification Body Audit** - External inspection by accredited body
5. **Certification Grant** - Valid for one year with annual renewal

## Why It Matters for Export Markets

European retailers like Tesco, LIDL, Aldi, and Carrefour require all fresh produce suppliers to hold GlobalGAP certification. Without it, access to these lucrative markets is effectively blocked.`,
    coverImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
    author: 'Priya Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80',
    category: 'Certification & Quality',
    tags: ['globalgap', 'certification', 'export', 'quality', 'europe'],
    isPublished: true,
    isFeatured: true,
    readTime: 8,
    createdAt: '2025-02-20T00:00:00Z',
    updatedAt: '2025-02-20T00:00:00Z',
  },
  {
    id: 'blog-3',
    title: 'Kharif & Rabi Crop Calendar: India\'s Procurement Guide for 2025',
    slug: 'kharif-rabi-crop-procurement-guide-2025',
    excerpt: 'Plan your crop procurement around India\'s two main harvest seasons. A complete sourcing calendar for grains, oilseeds, pulses, and spices throughout 2025.',
    content: `India's agricultural calendar revolves around two primary crop seasons — Kharif (summer sown, October-November harvest) and Rabi (winter sown, March-April harvest). Understanding these cycles is essential for planning your crop procurement effectively.

## Kharif Season (June–November)

Kharif crops are sown with the onset of the monsoon and harvested in autumn.

**Key Kharif Crops Available:**
- **Soybean** — Harvest: October-November. MP and Maharashtra dominate. Book early as prices peak post-harvest.
- **Maize (Yellow Corn)** — Harvest: September-October. Karnataka, AP, and Bihar are major producers.
- **Toor Dal (Pigeon Pea)** — Harvest: November-December. Karnataka and Maharashtra are key origins.
- **Groundnut** — Harvest: October-November. Gujarat accounts for 40% of India's production.
- **Sunflower Seeds** — Harvest: September-October. Karnataka is the leading state.

## Rabi Season (November–April)

Rabi crops are sown in winter and harvested in spring.

**Key Rabi Crops Available:**
- **Wheat (Sharbati/GW496)** — Harvest: March-April. Punjab, Haryana, and MP produce premium grades.
- **Yellow Mustard Seeds** — Harvest: February-March. Rajasthan dominates with 45% of national output.
- **Chickpea (Kabuli Chana)** — Harvest: March-April. MP and Rajasthan are top sources.
- **Cumin** — Harvest: March-April. Rajasthan and Gujarat supply 80% of the world's cumin.

## Planning Ahead for Best Prices

Procurement just after harvest yields the best combination of quality, volume, and price. For grains and oilseeds, bulk storage by aggregators typically means a 10-15% price premium if you wait 3+ months.`,
    coverImage: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
    author: 'Amit Patel',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    category: 'Seasonal Updates',
    tags: ['kharif', 'rabi', 'grain', 'oilseeds', 'procurement', 'seasonal'],
    isPublished: true,
    isFeatured: false,
    readTime: 6,
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z',
  },
];

export const exportCountries = [
  { name: 'United Arab Emirates', flag: '🇦🇪', exports: 'Basmati Rice, Soybean, Spices' },
  { name: 'United Kingdom', flag: '🇬🇧', exports: 'Organic Spices, Pulses, Wheat' },
  { name: 'United States', flag: '🇺🇸', exports: 'Organic Crops, Spices, Basmati' },
  { name: 'Germany', flag: '🇩🇪', exports: 'Organic Turmeric, Black Pepper, Cardamom' },
  { name: 'Japan', flag: '🇯🇵', exports: 'Saffron, Premium Spices, Organic Crops' },
  { name: 'Australia', flag: '🇦🇺', exports: 'Spices, Pulses, Organic Crops' },
  { name: 'Canada', flag: '🇨🇦', exports: 'Basmati Rice, Pulses, Spices' },
  { name: 'Netherlands', flag: '🇳🇱', exports: 'Spices, Pulses, Oilseeds' },
  { name: 'Saudi Arabia', flag: '🇸🇦', exports: 'Basmati Rice, Wheat, Cardamom' },
  { name: 'Singapore', flag: '🇸🇬', exports: 'Premium Spices, Pulses' },
  { name: 'France', flag: '🇫🇷', exports: 'Saffron, Exotic Spices, Organic Crops' },
  { name: 'New Zealand', flag: '🇳🇿', exports: 'Organic Crops, Oilseeds' },
];

export const certifications = [
  { name: 'Udyam Certificate', icon: '🏭', description: 'Ministry of MSME — Udyam Registration for small and medium enterprises' },
  { name: 'Import Export Certificate', icon: '🌍', description: 'IEC issued by DGFT — authorizes international import and export trade' },
  { name: 'APEDA Certificate', icon: '🏛️', description: 'Agricultural & Processed Food Products Export Development Authority' },
  { name: 'GST Certificate', icon: '📋', description: 'Goods and Services Tax registration — Government of India' },
];



