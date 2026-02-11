'use client';

import { ReactNode } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
