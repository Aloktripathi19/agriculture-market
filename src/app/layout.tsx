import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'Arihant Enterprises — Premium Crop Marketplace & Export Platform',
    template: '%s | Arihant Enterprises',
  },
  description:
    'India\'s leading agricultural crop marketplace for export-quality crops, grains, spices, pulses, and organic produce. Connect with verified exporters for bulk orders and international trade.',
  keywords: [
    'agriculture export India', 'crop marketplace', 'bulk crop orders', 'export quality crops',
    'Indian spices export', 'basmati rice export', 'organic crops India', 'pulses export',
  ],
  authors: [{ name: 'Arihant Enterprises' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Arihant Enterprises',
    title: 'Arihant Enterprises — Premium Crop Marketplace',
    description: 'India\'s premier agricultural crop marketplace for export and bulk trade.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { background: '#fff', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' },
            success: { iconTheme: { primary: '#16a34a', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  );
}
