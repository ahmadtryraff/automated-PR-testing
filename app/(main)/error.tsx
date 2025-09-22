'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MainError({ error, reset }: ErrorProps) {
  const t = useTranslations('common');

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Main Layout Error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {t('error.title') || 'Something went wrong'}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('error.description') || 'An error occurred while loading this page.'}
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-[#EF4F54] text-white py-2 px-4 rounded-lg hover:bg-[#c94d48] transition-colors"
          >
            {t('error.tryAgain') || 'Try again'}
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {t('error.goHome') || 'Go home'}
          </button>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500">
              Error details (development only)
            </summary>
            <pre className="mt-2 text-xs text-gray-600 bg-gray-100 p-2 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
