import type { Metadata } from 'next';
import { Barlow_Condensed, Be_Vietnam_Pro } from 'next/font/google';
import { siteContent } from '@/data/content';
import './globals.css';

const bodyFont = Be_Vietnam_Pro({
  variable: '--font-body',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const displayFont = Barlow_Condensed({
  variable: '--font-display',
  subsets: ['latin', 'vietnamese'],
  weight: ['700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: siteContent.title,
  description: siteContent.description,
  openGraph: {
    title: siteContent.title,
    description: siteContent.description,
    type: 'website',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="vi" className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
