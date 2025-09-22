'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { getToken } from '@/src/utils/auth';

const publicRoutes = ['/login'];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale as string;
  const [isChecking, setIsChecking] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !pathname || !locale) return;

    const checkAuth = () => {
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

      setIsChecking(false);
    };

    // Add a small delay to ensure all hooks are properly initialized
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [isClient, pathname, router, locale]);

  // Don't show loading on server-side
  if (!isClient) {
    return <>{children}</>;
  }

  // Don't show loading state - let Next.js loading.js handle it
  if (isChecking) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
