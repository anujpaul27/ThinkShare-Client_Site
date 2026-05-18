'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(true);
  
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
