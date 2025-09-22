'use client';

import { useEffect } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { getToken } from '@/src/utils/auth';

const publicRoutes = ['/login'];

export function LocaleAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale as string;

  useEffect(() => {
    if (!pathname || !locale) return;

    const token = getToken();
    const isPublicRoute = publicRoutes.some((route) => {
      const fullRoute = `/${locale}${route}`;
      return pathname === fullRoute || pathname.startsWith(fullRoute);
    });

    // If no token and trying to access protected route
    if (!token && !isPublicRoute) {
      router.push(`/${locale}/login`);
      return;
    }

    // If has token and trying to access other auth pages
    if (token && isPublicRoute) {
      router.push(`/${locale}`);
      return;
    }
  }, [pathname, router, locale]);

  return <>{children}</>;
}
