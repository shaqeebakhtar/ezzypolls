import type { Metadata } from 'next';
import '@/styles/globals.css';
import { geistSans } from '@/styles/fonts';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'ezzyPolls',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased font-sans min-h-screen`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
