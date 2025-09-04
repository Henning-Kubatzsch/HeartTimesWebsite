// app/[locale]/10commandments/page.tsx
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ReactNode } from 'react';

// ---------- UI Bits ----------
type GlitchTextProps = { children: ReactNode; className?: string };
const GlitchText = ({ children, className = "" }: GlitchTextProps) => (
  <div className={`relative inline-block font-salted ${className}`}>
    <span className="relative z-10">{children}</span>
    <span
      className="absolute inset-0 -z-0 translate-x-[2px] translate-y-[2px] text-fuchsia-500 blur-[0.5px] select-none"
      aria-hidden
    >
      {children}
    </span>
    <span
      className="absolute inset-0 -z-0 -translate-x-[2px] -translate-y-[2px] text-white blur-[0.5px] select-none"
      aria-hidden
    >
      {children}
    </span>
  </div>
);

export async function generateMetadata() {
  const t = await getTranslations('10commandments');
  return { title: t('title') };
}

export default async function TenCommandmentsPage() {
  const t = await getTranslations('10commandments');

  return (
    <main className="min-h-screen">
      {/* Hero: 2/3 Höhe, heller, Titel mittig */}
      <section className="relative h-[66vh] bg-[url('/Meta/bengalo.png')] bg-fixed bg-cover bg-center">
        {/* helleres Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
        {/* Titel mittig */}
        <div className="relative z-10 max-w-5xl mx-auto h-full flex items-center justify-center px-4">
          <h1 className="w-full text-center text-4xl md:text-6xl font-black text-white drop-shadow-lg">
            <GlitchText>{t('title')}</GlitchText>
          </h1>
        </div>
      </section>

      {/* Inhalt */}
      <section className="max-w-5xl mx-auto px-4 py-12 text-zinc-200">
        <div className="max-w-none">
          <h2 className="mt-10 text-2xl md:text-3xl font-bold text-pink-300">{t('rules.1.title')}</h2>
          <p className="mt-2">{t('rules.1.text')}</p>

          <h2 className="mt-10 text-2xl md:text-3xl font-bold text-pink-300">{t('rules.2.title')}</h2>
          <p className="mt-2">{t('rules.2.text')}</p>

          <h2 className="mt-10 text-2xl md:text-3xl font-bold text-pink-300">{t('rules.3.title')}</h2>
          <p className="mt-2">{t('rules.3.text')}</p>

          <h2 className="mt-10 text-2xl md:text-3xl font-bold text-pink-300">{t('rules.4.title')}</h2>
          <p className="mt-2">{t('rules.4.text')}</p>

          <h2 className="mt-10 text-2xl md:text-3xl font-bold text-pink-300">{t('rules.5.title')}</h2>
          <p className="mt-2">{t('rules.5.text')}</p>

          <h2 className="mt-10 text-2xl md:text-3xl font-bold text-pink-300">{t('rules.6.title')}</h2>
          <p className="mt-2">{t('rules.6.text')}</p>

          <h2 className="mt-10 text-2xl md:text-3xl font-bold text-pink-300">{t('rules.7.title')}</h2>
          <p className="mt-2">{t('rules.7.text')}</p>

          <h2 className="mt-10 text-2xl md:text-3xl font-bold text-pink-300">{t('rules.8.title')}</h2>
          <p className="mt-2">{t('rules.8.text')}</p>

          <h2 className="mt-10 text-2xl md:text-3xl font-bold text-pink-300">{t('rules.9.title')}</h2>
          <p className="mt-2">{t('rules.9.text')}</p>

          <h2 className="mt-10 text-2xl md:text-3xl font-bold text-pink-300">{t('rules.10.title')}</h2>
          <p className="mt-2">{t('rules.10.text')}</p>
        </div>

        {/* Button zurück */}
        <div className="pt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-pink-600 hover:bg-pink-600/10"
          >
            {t('back')}
          </Link>
        </div>
      </section>
    </main>
  );
}
