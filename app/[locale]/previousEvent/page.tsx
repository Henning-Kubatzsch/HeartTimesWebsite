// app/[locale]/previous-event/page.tsx
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
  const t = await getTranslations('PreviousEvent');
  return { title: t('title') };
}

export default async function PreviousEventPage() {
  const t = await getTranslations('PreviousEvent');

  return (
    <main className="min-h-screen">
      {/* Hero im gleichen Stil wie 10commandments */}
      <section className="relative h-[66vh] bg-[url('/Meta/startingLine.png')] bg-fixed bg-cover bg-center">
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
        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-pink-600/40 p-5">
            <h2 className="font-semibold text-pink-300">{t('highlights')}</h2>
            <ul className="mt-3 list-disc list-inside space-y-1">
              <li>{t('points.0')}</li>
              <li>{t('points.1')}</li>
              <li>{t('points.2')}</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-pink-600/40 p-5">
            <h2 className="font-semibold text-pink-300">{t('numbers')}</h2>
            <ul className="mt-3 list-disc list-inside space-y-1">
              <li>{t('nums.0')}</li>
              <li>{t('nums.1')}</li>
              <li>{t('nums.2')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10">
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
