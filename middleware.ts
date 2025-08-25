// middleware.ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // matcht nur Seiten (keine Assets wie /favicon.ico, /_next, Dateien mit .)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
