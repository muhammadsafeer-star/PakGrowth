import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PakGrowth — Know Your Digital Score. Grow Your Business.',
  description:
    'Pakistan-focused digital business audit and growth platform for small businesses, startups, freelancers, local businesses, e-commerce sellers, and SMEs.',
  keywords: [
    'digital marketing audit Pakistan',
    'business digital audit Pakistan',
    'website audit Pakistan',
    'social media audit Pakistan',
    'digital presence checker',
    'SME digital marketing Pakistan',
    'PakGrowth',
  ],
  authors: [{ name: 'PakGrowth Technologies' }],
  openGraph: {
    title: 'PakGrowth — Know Your Digital Score. Grow Your Business.',
    description: 'Get a digital health check for your business and discover exactly what you should improve first.',
    url: 'https://pakgrowth.pk',
    siteName: 'PakGrowth',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-paknavy-900 text-slate-100 min-h-screen flex flex-col antialiased">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
