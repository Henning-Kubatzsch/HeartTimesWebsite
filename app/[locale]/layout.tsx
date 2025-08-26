// app/[locale]/layout.tsx
import '../globals.css';
// NextIntlClientProvider: provides translated messages to React Tree; hasLocale: checks if locale is valid
import {NextIntlClientProvider, hasLocale} from 'next-intl';
// 404 if language not listed
import {notFound} from 'next/navigation';
// single source of truth for languages/ prefixes/ slugs
import {routing} from '@/i18n/routing';
//setRequestLocale: sets the locale for the current request; getMessages: loads messages for selected language and uses i18n/request.ts 
import {getMessages, setRequestLocale} from 'next-intl/server';
// Next Links
import Link from 'next/link';


type Props = { 
  children: React.ReactNode; 
  params: Promise<{locale: string}>;
}; 

// Tells Next: built with that language
export function generateStaticParams() { 
  return routing.locales.map((locale) => ({locale})); 
} 

export default async function LocaleLayout({children, params}: Props) { 
  const {locale} = await params; 
  if (!hasLocale(routing.locales, locale)) 
    notFound(); 
  // Set locale for current request, so getMessages() knows which to load
  setRequestLocale(locale); 
  const messages = await getMessages(); 

  // Button for switching locales, respecting 'as-needed' routing

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