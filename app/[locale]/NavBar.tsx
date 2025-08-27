"use client";

import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {useTranslations, useLocale} from "next-intl";
import {Link, getPathname, usePathname} from "@/i18n/navigation";
import {routing} from "@/i18n/routing";

export default function NavBar() {
  const tNav = useTranslations("Nav");          // Keys: home, register, previousEvent, about, signup
  const locale = useLocale();
  const pathname = usePathname();
  const home = getPathname({ href: "/", locale });

  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // ESC schließt das Menü
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Fokus auf ersten Link beim Öffnen
  useEffect(() => {
    if (open) firstLinkRef.current?.focus();
  }, [open]);

  const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  // Sprachumschalter-Button
  function LangSwitch() {
    return (
      <div className="flex gap-2 mt-6">
        {routing.locales.map((lng) =>
          lng === locale ? (
            <span key={lng} className="px-2 py-1 text-xs font-semibold rounded bg-pink-600/80">
              {lng.toUpperCase()}
            </span>
          ) : (
            <Link
              key={lng}
              href={pathname || "/"}
              locale={lng}
              prefetch={false}
              className="px-2 py-1 text-xs font-semibold rounded border border-pink-600/40 hover:bg-pink-600/10"
              onClick={() => setOpen(false)}
            >
              {lng.toUpperCase()}
            </Link>
          )
        )}
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-black/70 border-b border-pink-600/40">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand bleibt sichtbar */}
        <div className="flex items-center gap-3">
          <Image src="/Meta/logo.png" alt="Heart Times" width={40} height={40} className="shrink-0" />
          <Link href="/" className="font-bold tracking-wider text-pink-500 text-xl">
            HEART TIMES
          </Link>
        </div>

        {/* Menü-Button (öffnet Overlay) */}
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className="inline-flex items-center gap-2 rounded-xl border border-pink-600/40 px-3 py-2 hover:bg-pink-600/10"
        >
          {open ? <CloseIcon/> : <MenuIcon/>}
          <span className="hidden sm:inline">Menu</span>
        </button>
      </div>

      {/* Overlay-Menü */}
      {open && (
        <div
          className="fixed inset-0 z-30"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)} // Klick auf Backdrop schließt
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Panel */}
          <div
            className="absolute right-4 top-16 w-[min(22rem,92vw)] rounded-2xl border border-pink-600/40 bg-zinc-950 p-4 shadow-[0_0_60px_-20px_#db2777]"
            onClick={(e) => e.stopPropagation()} // Klicks im Panel nicht bubblen
          >
            <nav className="flex flex-col">
              {/* Seitenlinks */}
              <Link
                href="/"
                className="px-3 py-2 rounded hover:bg-pink-600/20 focus:outline-none focus:ring-2 focus:ring-pink-600"
                onClick={() => setOpen(false)}
                ref={firstLinkRef}
              >
                {tNav("home")}
              </Link>
              <Link
                href="/register"
                className="px-3 py-2 rounded hover:bg-pink-600/20 focus:outline-none focus:ring-2 focus:ring-pink-600"
                onClick={() => setOpen(false)}
              >
                {tNav("register")}
              </Link>
              <Link
                href="/previousEvent"
                className="px-3 py-2 rounded hover:bg-pink-600/20 focus:outline-none focus:ring-2 focus:ring-pink-600"
                onClick={() => setOpen(false)}
              >
                {tNav("previousEvent")}
              </Link>

              {/* Anker auf Startseite */}
              <a
                href={`${home}#about`}
                className="px-3 py-2 rounded hover:bg-pink-600/20 focus:outline-none focus:ring-2 focus:ring-pink-600"
                onClick={() => setOpen(false)}
              >
                {tNav("about")}
              </a>
              <a
                href={`${home}#signup`}
                className="px-3 py-2 rounded hover:bg-pink-600/20 focus:outline-none focus:ring-2 focus:ring-pink-600"
                onClick={() => setOpen(false)}
              >
                {tNav("signup")}
              </a>

              {/* Sprachumschalter */}
              <LangSwitch />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
