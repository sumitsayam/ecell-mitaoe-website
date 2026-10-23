import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display, Space_Grotesk } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'E-Cell MITAOE | Ideas Into Impact | Entrepreneurship & Innovation',
  description:
    'MIT Academy of Engineering Pune Entrepreneurship Cell. A community of ambitious learners, creators, and builders driving real-world impact.',
  keywords: ['E-Cell MITAOE', 'Entrepreneurship Cell', 'MIT Pune', 'Startups', 'Innovation', 'Ideas Into Impact'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="min-h-screen bg-cream-100 text-ink antialiased selection:bg-navy-850 selection:text-cream-50">
        {children}
      </body>
    </html>
  );
}
