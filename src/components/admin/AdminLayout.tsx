'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, MessageSquare, BookOpen,
  Users, Image, Star, HelpCircle, Menu, X, ChevronRight,
  Wheat, Bell, LogOut, Settings
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Package, label: 'Crops / Products', href: '/admin/products' },
  { icon: MessageSquare, label: 'Inquiries', href: '/admin/inquiries', badge: true },
  { icon: BookOpen, label: 'Blog Posts', href: '/admin/blog' },
  { icon: Star, label: 'Testimonials', href: '/admin/testimonials' },
  { icon: HelpCircle, label: 'FAQs', href: '/admin/faqs' },
];

interface Props {
  children: React.ReactNode;
}

export function AdminLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inquiryCount, setInquiryCount] = useState(0);
  const { session, isLoading, logout, initialize } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace('/admin/login');
    }
  }, [session, isLoading, router]);

  useEffect(() => {
    import('@/lib/services/inquiryService').then(({ inquiryService }) => {
      inquiryService.getNewCount().then(setInquiryCount);
    });
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  if (isLoading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent" /></div>;
  }

  if (!session) return null;

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`${mobile ? 'w-full' : 'w-64'} flex flex-col h-full`}>
      <div className="p-5 border-b border-slate-100">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center">
            <Wheat className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold font-display text-slate-900 text-sm">Arihant Enterprises</span>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Main Menu</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-medium transition-all ${
                isActive ? 'gradient-green text-white shadow-md' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && inquiryCount > 0 && (
                <span className={`px-1.5 py-0.5 text-xs font-bold rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-red-500 text-white'}`}>
                  {inquiryCount}
                </span>
              )}
              {isActive && <ChevronRight className="w-3 h-3 opacity-70" />}
            </Link>
          );
        })}

        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Site</p>
          <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
            <Package className="w-4 h-4" /> View Live Site
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full gradient-green flex items-center justify-center text-white text-sm font-bold shrink-0">
              {session.name.charAt(0).toUpperCase()}
            </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">{session.name}</p>
            <p className="text-xs text-slate-400 truncate">{session.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 flex flex-col shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <span className="font-bold font-display text-slate-900">Arihant Enterprises</span>
                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-slate-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <Sidebar mobile />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold text-slate-900 text-sm">
                {navItems.find((n) => n.href === pathname)?.label || 'Dashboard'}
              </h1>
              <p className="text-xs text-slate-400">AgroExport Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500">
              <Bell className="w-5 h-5" />
              {inquiryCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
            <Link href="/" target="_blank" className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-primary-50 text-primary-700 text-xs font-medium rounded-lg hover:bg-primary-100 transition-colors">
              View Site
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
