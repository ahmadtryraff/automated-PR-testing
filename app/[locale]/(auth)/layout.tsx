'use client';

import { Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { AUTH_SLIDES } from '@/src/constants/auth';
import { setError } from '@/src/features/auth/authSlice';
import { RootState } from '@/store';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';

import MessageDisplay from '@/components/ui/message-display';

import AuthFooter from './footer';
import AuthHeader from './header';

const DynamicAuthCarousel = dynamic(() => import('./auth-slider'), {
  ssr: false,
  loading: () => (
    <div className='flex items-center justify-center h-full'>
      <div className='w-8 h-8 border-2 border-gray-200 border-t-[#EF4F54] rounded-full animate-spin'></div>
    </div>
  ),
});

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage =
    pathname.endsWith('/login') ||
    pathname.endsWith('/reset-password') ||
    pathname.endsWith('/forgot-password');

  const dispatch = useDispatch();
  const { error, success } = useSelector((state: RootState) => state.auth);

  const t = useTranslations('auth');

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(setError(null));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const handleCloseMessage = () => {
    if (error) {
      dispatch(setError(null));
    }
  };

  return (
    <>
      {(error || success) && (
        <div className='fixed top-4 left-4 z-50 max-w-sm w-full'>
          <MessageDisplay
            message={{
              type: error ? 'error' : 'success',
              text: error ? error : success ? t('loginSuccess') : '',
            }}
            onClose={handleCloseMessage}
            variant='toast'
            autoDismiss={true}
            dismissDelay={4000}
          />
        </div>
      )}
      <div className='grid min-h-screen lg:grid-cols-[minmax(0,608fr),minmax(0,832fr)] xl:grid-cols-[608px,minmax(0,1fr)] min-[1440px]:grid-cols-[minmax(0,608fr),minmax(0,832fr)]'>
        <div className='flex h-full flex-col px-6 lg:px-11 lg:py-6'>
          <AuthHeader />
          <div className='flex flex-1 flex-col full-height [@media_(min-height:901px)]:justify-center'>
            <div className='mx-auto flex w-full max-w-[392px] flex-col gap-6 md:translate-x-1.5'>
              {children}
            </div>
          </div>
          <AuthFooter />
        </div>
        {isLoginPage && (
          <div className='hidden p-2 pl-0 lg:block'>
            <div className='relative size-full'>
              <Suspense
                fallback={
                  <div className='flex items-center justify-center h-full'>
                    <div className='w-8 h-8 border-2 border-gray-200 border-t-[#EF4F54] rounded-full animate-spin'></div>
                  </div>
                }
              >
                <DynamicAuthCarousel slides={AUTH_SLIDES} />
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
