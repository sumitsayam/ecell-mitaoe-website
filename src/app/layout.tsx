import type { Metadata } from 'next';
import './globals.css';
import { ModalProvider } from '@/components/modals/ModalContext';

export const metadata: Metadata = {
  title: 'E-Cell MITAOE — Ideas Into Impact | Entrepreneurship & Innovation',
  description:
    'Official website of the Entrepreneurship Cell at MIT Academy of Engineering, Pune. Fostering bold student founders, venture discovery, and real-world impact.',
  keywords: [
    'E-Cell MITAOE',
    'MIT Academy of Engineering',
    'Pune Entrepreneurship',
    'Student Startups',
    'Innovation Cell',
    'Ideas Into Impact',
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
      className="scroll-smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-white text-foreground antialiased selection:bg-primary selection:text-white">
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
