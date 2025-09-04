// app/[locale]/registration_refund/page.tsx
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
  const t = await getTranslations('Registration_Refund');
  return { title: t('title') };
}

export default async function RegisterPage() {
  const t = await getTranslations('Registration_Refund');

  return (
    <main className="min-h-screen text-zinc-200">
      {/* Hero im gleichen Stil */}
      <section className="relative h-[66vh] bg-[url('/Meta/feets_bikes.png')] bg-fixed bg-cover bg-center">
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
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Lead */}
        <p className="mt-3 text-lg">{t('lead')}</p>

        {/* Registration window / capacity */}
        <section className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-pink-600/40 p-5">
            <h2 className="text-xl font-semibold text-pink-300">{t('sections.window.title')}</h2>
            <p className="mt-2 whitespace-pre-line">{t('sections.window.text')}</p>
          </div>

          <div className="rounded-2xl border border-pink-600/40 p-5">
            <h2 className="text-xl font-semibold text-pink-300">{t('sections.capacity.title')}</h2>
            <p className="mt-2 whitespace-pre-line">{t('sections.capacity.text')}</p>
          </div>
        </section>

        {/* Fees + payment/donation */}
        <section className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-pink-600/40 p-5">
            <h2 className="text-xl font-semibold text-pink-300">{t('sections.fees.title')}</h2>
            <ul className="mt-3 space-y-1">
              <li className="flex items-baseline justify-between">
                <span>{t('sections.fees.solo.label')}</span>
                <span className="font-semibold">{t('sections.fees.solo.price')}</span>
              </li>
              <li className="flex items-baseline justify-between">
                <span>{t('sections.fees.pair.label')}</span>
                <span className="font-semibold">{t('sections.fees.pair.price')}</span>
              </li>
            </ul>
            <p className="mt-3 text-sm text-zinc-400">{t('sections.fees.note')}</p>
          </div>

          <div className="rounded-2xl border border-pink-600/40 p-5">
            <h2 className="text-xl font-semibold text-pink-300">{t('sections.payment.title')}</h2>
            <p className="mt-2">{t('sections.payment.text')}</p>
            <p className="mt-3 text-sm">{t('sections.donation.text')}</p>
          </div>
        </section>

        {/* Refund policy */}
        <section className="mt-10 rounded-2xl border border-pink-600/40 p-5">
          <h2 className="text-xl font-semibold text-pink-300">{t('sections.refund.title')}</h2>
          <p className="mt-2">{t('sections.refund.intro')}</p>
          <ul className="mt-4 space-y-2">
            <li>• {t('sections.refund.rules.r1')}</li>
            <li>• {t('sections.refund.rules.r2')}</li>
            <li>• {t('sections.refund.rules.r3')}</li>
          </ul>
        </section>

        {/* Contingency (postponement/cancellation) */}
        <section className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-pink-600/40 p-5">
            <h2 className="text-xl font-semibold text-pink-300">{t('sections.postpone.title')}</h2>
            <p className="mt-2 whitespace-pre-line">{t('sections.postpone.text')}</p>
          </div>
          <div className="rounded-2xl border border-pink-600/40 p-5">
            <h2 className="text-xl font-semibold text-pink-300">{t('sections.abort.title')}</h2>
            <p className="mt-2 whitespace-pre-line">{t('sections.abort.text')}</p>
          </div>
        </section>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="px-5 py-3 rounded-2xl border border-pink-600 hover:bg-pink-600/10"
          >
            {t('backHome')}
          </Link>
        </div>
      </div>
    </main>
  );
}
