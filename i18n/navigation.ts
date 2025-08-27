import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

// Exportiere locale-aware Router/Link, die deine routing-Regeln respektieren
export const {Link, useRouter, usePathname, redirect, getPathname} =
  createNavigation(routing);
