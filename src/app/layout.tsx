import type { Metadata } from 'next';
import './globals.css';
import { ModalProvider } from '@/components/modals/ModalContext';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

export const metadata: Metadata = {
  title: 'E-Cell MIT AOE — Ideas into Impact | Entrepreneurship & Innovation',
  description:
    'Official website of the Entrepreneurship Cell at MIT Academy of Engineering, Pune. Fostering bold student founders, venture discovery, and real-world impact.',
  keywords: [
    'E-Cell MIT AOE',
    'MIT Academy of Engineering',
    'Pune Entrepreneurship',
    'Student Startups',
    'Innovation Cell',
    'Ideas into Impact',
  ],
  openGraph: {
    title: 'E-Cell MIT AOE — Ideas into Impact',
    description:
      'Official website of the Entrepreneurship Cell at MIT Academy of Engineering, Pune. Fostering student founders with pre-seed funding, makerspace labs, and patent assistance.',
    siteName: 'E-Cell MIT AOE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased selection:bg-[var(--accent)] selection:text-white transition-colors duration-150">
        <ThemeProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
