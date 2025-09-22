'use client';

import { useLocale } from 'next-intl';
import { cn } from '@/utils/cn';

interface FontProviderProps {
  children: React.ReactNode;
  className?: string;
}

export function FontProvider({ children, className }: FontProviderProps) {
  const locale = useLocale();
  
  const fontClass = locale === 'ar' ? 'font-arabic' : '';
  
  return (
    <div className={cn(fontClass, className)}>
      {children}
    </div>
  );
} 