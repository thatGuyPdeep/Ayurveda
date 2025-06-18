import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import CartSidebar from "@/components/cart/CartSidebar";
import "./globals.css";
import { AuthInitializer } from '@/components/AuthInitializer'
import { QueryProvider } from '@/components/QueryProvider'
import { Toaster } from 'react-hot-toast'

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AyuraVeda Royale - Premium Ayurvedic Products & Royal Wellness",
  description: "Experience premium Ayurvedic medicines, luxury wellness products, and royal consultations. Embrace holistic health with authentic, time-tested remedies and modern luxury.",
  keywords: "ayurveda royale, premium ayurvedic products, royal wellness, luxury herbal medicines, ayurvedic consultation, holistic health, authentic ayurveda",
  authors: [{ name: "AyuraVeda Royale Team" }],
  creator: "AyuraVeda Royale",
  publisher: "AyuraVeda Royale",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ayurvedaroyale.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/crown-favicon.svg",
    shortcut: "/crown-favicon.svg",
    apple: "/crown-favicon.svg",
  },
  openGraph: {
    title: "AyuraVeda Royale - Premium Ayurvedic Products & Royal Wellness",
    description: "Experience premium Ayurvedic medicines, luxury wellness products, and royal consultations. Embrace holistic health with authentic remedies.",
    url: "https://ayurvedaroyale.com",
    siteName: "AyuraVeda Royale",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AyuraVeda Royale - Premium Ayurvedic Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AyuraVeda Royale - Premium Ayurvedic Products & Royal Wellness",
    description: "Experience premium Ayurvedic medicines, luxury wellness products, and royal consultations.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfairDisplay.variable} ${inter.variable} font-body antialiased bg-ivory text-charcoal`}>
        <QueryProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <AuthInitializer />
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1">
                    {children}
                  </main>
                  <Footer />
                </div>
                <CartSidebar />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
