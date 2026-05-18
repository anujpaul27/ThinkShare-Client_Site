'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(true);

  // যতক্ষণ মাউন্ট না হচ্ছে, ততক্ষণ স্ক্রিপ্ট ছাড়া সাধারণ চাইল্ড রিটার্ন করবে
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={true}
      themes={['light', 'dark']}
      storageKey="ideavault-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
