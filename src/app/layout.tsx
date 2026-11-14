import type { Metadata } from 'next';
import './globals.css';

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
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-foreground antialiased selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
