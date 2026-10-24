import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mark Bradley — Senior Full-Stack Developer',
  description: 'Resume of Mark Bradley, senior full-stack developer with 15+ years of experience.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
