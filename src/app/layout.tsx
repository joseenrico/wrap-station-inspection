import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { ins } from 'framer-motion/client';;

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
      <body className={''}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}