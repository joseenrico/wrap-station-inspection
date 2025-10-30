import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const rubik = Rubik({ subsets: ['latin'], weight: ['400', '500', '600', '700']   });

export const metadata: Metadata = {
  title: 'WrapStation Inspection Report',
  description: 'Professional vehicle inspection reporting system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}