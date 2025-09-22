'use client';

import { cnExt } from '@/utils/cn';
import NotificationButton from '@/components/notification-button';
import { SearchMenuButton } from '@/components/search';
import { useRouter } from 'next/navigation';
import { Image } from '@/components/ui/image';
import { LanguageSelect } from '@/components/language-select';
import { useTransition, Suspense } from 'react';
import { settlementsAction } from './actions';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  contentClassName?: string;
}

export default function Header({
  children,
  className,
  icon,
  title,
  description,
  contentClassName,
  ...rest
}: HeaderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSettlementsClick = () => {
    startTransition(async () => {
      if (typeof window !== 'undefined') {
        const accessType = localStorage.getItem('access-type');
        
        // Use Server Action for better performance
        const result = await settlementsAction(accessType || '');
        
        if (result?.error) {
          console.error('Settlements error:', result.error);
          router.push('/login');
          return;
        }

        if (accessType === 'brand') {
          router.push('/settlements-brand');
        } else if (accessType === 'vendor') {
          router.push('/settlements-vendor');
        } else {
          router.push('/login');
        }
      }
    });
  };

  return (
    <header
      className={cnExt(
        'flex min-h-[88px] flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-3 w-full lg:w-full',
        className,
      )}
      {...rest}
    >
      <div className='flex flex-1 gap-4 lg:gap-3.5 items-center'>
        <Suspense fallback={
          <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
        }>
          <Image
            src="/icons/icon-header-logo.png"
            alt="Header Logo"
            width={48}
            height={48}
            className="size-12"
          />
        </Suspense>
        <div className='space-y-1'>
          <div className='text-label-md lg:text-label-lg'>{title}</div>
          <div className='text-paragraph-sm text-text-sub-600'>
            {description}
          </div>
        </div>
      </div>
      <div className={cnExt('flex items-center gap-2', contentClassName)}>
        <button
          type="button"
          onClick={handleSettlementsClick}
          disabled={isPending}
          className="hidden lg:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'none', border: 'none', padding: 0, margin: 0 } as any}
        >
          <img src="/icons/wallet-3-line.svg" alt="Wallet" className="w-6 h-6" />
        </button>
        <Suspense fallback={
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
        }>
          <SearchMenuButton className='hidden lg:flex' />
        </Suspense>
        <Suspense fallback={
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
        }>
          <NotificationButton className='hidden lg:flex' />
        </Suspense>
        <LanguageSelect />
        {children}
      </div>
    </header>
  );
}