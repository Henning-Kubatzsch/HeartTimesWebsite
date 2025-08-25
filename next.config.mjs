// next.config.mjs (ESM)
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  // ...deine bestehende Config
};

const withNextIntl = createNextIntlPlugin(); // optional: Pfad zu i18n/request.ts übergeben
export default withNextIntl(nextConfig);
