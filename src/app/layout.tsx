import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/components/language-provider';
import { AppHeader } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { Suspense } from 'react';
import { Footer } from '@/components/layout/footer';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Nejat Digital',
  description: 'Your guide to Islamic knowledge and practice.',
};

const themeScript = `
  (function() {
    try {
      const theme = localStorage.getItem('nejat-digital-theme') || 'teal';
      const root = document.documentElement;
      root.classList.remove('light', 'dark', 'rose', 'blue', 'black', 'teal');
      root.classList.add(theme);
    } catch (e) {
      console.error("Failed to set theme from localStorage", e);
    }
  })();
`;


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} font-body antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex flex-col min-h-screen">
              <AppHeader />
              <main className="flex-grow flex">
                  <Suspense>
                    {children}
                  </Suspense>
              </main>
              <Footer />
            </div>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
