// app/[locale]/layout.tsx
import '../globals.css';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {getMessages, setRequestLocale} from 'next-intl/server';
import Link from 'next/link';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: LayoutProps<'/[locale]'>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Für SSG: Locale in den Store setzen (verhindert Dynamic Rendering)
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <header style={{display: 'flex', justifyContent: 'flex-end', gap: '1rem', padding: '1rem'}}>
          {routing.locales.map((lng) =>
            lng === locale ? null : (
              <Link key={lng} href={`/${lng}`}>
                <button>{lng.toUpperCase()}</button>
              </Link>
            )
          )}
        </header>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
