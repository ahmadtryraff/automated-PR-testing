import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { RTLHandler } from './rtl-handler';
import { FontProvider } from '@/components/font-provider';
import { LocaleAuthGuard } from './locale-auth-guard';

const validLocales = ['en', 'ar'] as const;
type ValidLocale = typeof validLocales[number];

export function generateStaticParams() {
  return validLocales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!validLocales.includes(locale as ValidLocale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <RTLHandler />
      <FontProvider>
        <LocaleAuthGuard>
          {children}
        </LocaleAuthGuard>
      </FontProvider>
    </NextIntlClientProvider>
  );
} 