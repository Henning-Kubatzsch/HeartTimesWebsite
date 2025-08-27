// app/[locale]/register/page.tsx
import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';

export async function generateMetadata() {
  const t = await getTranslations('Register');
  return { title: t('title') };
}

export default async function RegisterPage() {
  const t = await getTranslations('Register');

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <p className="mt-3 text-zinc-300 whitespace-pre-line">{t('lead')}</p>

      <div className="mt-8 flex gap-3">
        <Link href="/" className="px-4 py-2 rounded-xl border border-pink-600/40 hover:bg-pink-600/10">
          {t('backHome')}
        </Link>
        <Link href="/" className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 font-semibold">
          {t('goToForm')}
        </Link>
      </div>
    </main>
  );
}
