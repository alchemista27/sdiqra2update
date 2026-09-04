import "../globals.css";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './public.css';
import NewsTicker from "@/components/NewsTicker";
import { FloatingWidgets } from "@/components/FloatingWidgets";
import { settingsApi } from "@/lib/api";

export const dynamic = 'force-dynamic';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  let whatsappNumber = '';
  try {
    const res = await settingsApi.getAll();
    whatsappNumber = res.data?.whatsapp_number || '';
  } catch (err) {
    console.warn("Backend offline, using default whatsapp number.");
  }

  return (
    <div className="flex flex-col min-h-screen relative pb-24 md:pb-12">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <NewsTicker />
      <FloatingWidgets whatsappNumber={whatsappNumber} />
    </div>
  );
}
