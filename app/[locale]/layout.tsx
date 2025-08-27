// app/[locale]/layout.tsx
import "../globals.css";
import {NextIntlClientProvider} from "next-intl";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import {getMessages, setRequestLocale} from "next-intl/server";
import NavBar from "./NavBar";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NavBar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

/*

// app/[locale]/layout.tsx
import '../globals.css';
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';

type Props = {
  children: React.ReactNode;
  // In Next 15 sind params awaitable:
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  // Für getMessages & Formatierung
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <header style={{display:'flex', justifyContent:'flex-end', gap:'1rem', padding:'1rem'}}>
            {routing.locales.map((lng) =>
              lng === locale ? null : (
                <Link key={lng} href="/" locale={lng} prefetch={false}>
                  {lng.toUpperCase()}
                </Link>
              )
            )}
          </header>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
*/