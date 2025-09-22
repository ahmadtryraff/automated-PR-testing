'use client';

import { usePathname } from 'next/navigation';

export function MainLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOnboarding = pathname.includes('onboarding-brand') || pathname.includes('onboarding-vendor');
  
  if (isOnboarding) {
    return <>{children}</>;
  }
  
  return <>{children}</>;
}
