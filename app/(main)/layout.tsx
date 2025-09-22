'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './sidebar';
import HeaderMobile from './header-mobile';
import { SearchMenu } from '@/components/search';
import { Suspense } from 'react';
import { MainSuspense, SidebarLoading } from './loading';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isOnboarding = pathname.includes('onboarding-brand') || pathname.includes('onboarding-vendor');

  if (isOnboarding) {
    return (
      <MainSuspense>
        {children}
      </MainSuspense>
    );
  }

  return (
    <div className='grid min-h-screen grid-cols-1 content-start items-start lg:grid-cols-[auto,minmax(0,1fr)]'>
      <Suspense fallback={<SidebarLoading />}>
        <Sidebar />
      </Suspense>
      <HeaderMobile />
      <div className='mx-auto flex w-full max-w-[1360px] flex-1 flex-col'>
        <MainSuspense>
          {children}
        </MainSuspense>
      </div>
      <Suspense fallback={
        <div className="fixed top-4 right-4 w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
      }>
        <SearchMenu />
      </Suspense>
    </div>
  );
}
