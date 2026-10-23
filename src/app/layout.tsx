import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'E-Cell MITAOE — Ideas Into Impact | Entrepreneurship & Innovation',
  description:
    'Official website and management portal for the Entrepreneurship Cell at MIT Academy of Engineering, Pune. Fostering bold student founders, venture discovery, and real-world impact.',
  keywords: [
    'E-Cell MITAOE',
    'MIT Academy of Engineering',
    'Pune Entrepreneurship',
    'Student Startups',
    'Innovation Cell',
    'Ideas Into Impact'
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-canvas text-body antialiased selection:bg-navy-850 selection:text-white">
        {children}
      </body>
    </html>
  );
}
