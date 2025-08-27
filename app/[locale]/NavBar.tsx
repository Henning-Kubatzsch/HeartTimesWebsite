"use client";

import Image from "next/image";
import {useTranslations, useLocale} from "next-intl";
import {Link, getPathname, usePathname} from "@/i18n/navigation";
import {routing} from "@/i18n/routing";

export default function NavBar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname(); // z.B. "/", "/register", ...
  const tNav = useTranslations("Nav");



  // Für Anker-Links nutzen wir immer die Home-URL + Hash,
  // so funktioniert's von jeder Seite und behält die Locale.
  const home = "/";

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-black/70 border-b border-pink-600/40">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Image src="/Meta/logo.png" alt="Heart Times" width={40} height={40} className="shrink-0" />
          <Link href="/" className="font-bold tracking-wider text-pink-500 text-xl">
            HEART TIMES
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-1 text-sm">
          {/* i18n-Hooks */}
          {/* (Falls du das schon oben in der Komponente hast, nicht doppelt einfügen) */}
          {/* const tNav = useTranslations("Nav"); */}
          {/* const locale = useLocale(); */}
          {/* const home = getPathname({ href: "/", locale }); */}

          {/* Seiten-Links (typed, locale-aware) */}
          <Link href="/" className="px-3 py-2 rounded hover:bg-pink-600/20">
            {tNav("home")}
          </Link>
          <Link href="/register" className="px-3 py-2 rounded hover:bg-pink-600/20">
            {tNav("register")}
          </Link>
          <Link href="/previousEvent" className="px-3 py-2 rounded hover:bg-pink-600/20">
            {tNav("previousEvent")}
          </Link>

          {/* Anker zur Startseite (per <a>, damit Hash korrekt ist) */}
          <a href={`${home}#about`} className="px-3 py-2 rounded hover:bg-pink-600/20">
            {tNav("about")}
          </a>
          <a href={`${home}#signup`} className="px-3 py-2 rounded hover:bg-pink-600/20">
            {tNav("signup")}
          </a>
        </nav>

        {/* Language switch */}
        <div className="flex gap-2">
          {routing.locales.map((lng) =>
            lng === locale ? (
              <span key={lng} className="px-2 py-1 text-xs font-semibold rounded bg-pink-600/80">
                {lng.toUpperCase()}
              </span>
            ) : (
              // Link auf dieselbe Route, nur mit anderer Locale
              <Link
                key={lng}
                href={pathname || "/"}
                locale={lng}
                prefetch={false}
                className="px-2 py-1 text-xs font-semibold rounded border border-pink-600/40 hover:bg-pink-600/10"
              >
                {lng.toUpperCase()}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
