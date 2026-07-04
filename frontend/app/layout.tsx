import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mutual NDA Creator',
  description: 'Generate a Mutual Non-Disclosure Agreement using the Common Paper standard.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">{children}</body>
    </html>
  );
}
