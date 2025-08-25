// i18n/routing.ts
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  // '/' ohne Prefix für Default, '/en' mit Prefix
  localePrefix: 'as-needed',
});
