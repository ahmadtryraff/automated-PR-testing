'use client';

import { useLocale } from 'next-intl';

export function RTLHandler() {
  const locale = useLocale();
  
  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="contents">
      {/* This div handles RTL direction for Arabic locale */}
    </div>
  );
}
