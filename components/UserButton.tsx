import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/src/features/auth/authSlice';
import { cn } from '@/utils/cn';
import { useTranslations } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';

interface UserButtonProps {
  className?: string;
  messages: any;
}

function UserButtonContent({ className }: { className?: string }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const t = useTranslations();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 rounded-lg p-2 hover:bg-bg-weak-50 transition-colors',
          className
        )}
      >
        <div className="size-8 rounded-full bg-[#F5F5F5] flex items-center justify-center">
          <img src="/icons/user-line.svg" alt={t('user')} className="size-5" />
        </div>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full mb-2 right-0 w-48 rounded-lg border border-stroke-soft-200 bg-white shadow-lg py-1 z-50">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-text-sub-600 hover:bg-bg-weak-50 flex items-center gap-2"
            >
              <img src="/icons/logout-circle-r-line.svg" alt={t('logout')} className="size-4" />
              {t('logout')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function UserButton({ className, messages }: UserButtonProps) {
  return (
    <NextIntlClientProvider messages={messages}>
      <UserButtonContent className={className} />
    </NextIntlClientProvider>
  );
} 