// i18n/routing.ts
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/registration_refund': '/registration_refund',
    '/previousEvent': '/previousEvent',
    '/10commandments': '/10commandments'
  }
});
