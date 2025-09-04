"use client";

import {useState, ReactNode} from "react";
import Image from "next/image";
import {useTranslations, useLocale} from "next-intl";


// ---------- UI Bits ----------
type GlitchTextProps = { children: ReactNode; className?: string };
const GlitchText = ({ children, className = "" }: GlitchTextProps) => (
  <div className={`relative inline-block font-salted ${className}`}>
    <span className="relative z-10">{children}</span>
    <span className="absolute inset-0 -z-0 translate-x-[2px] translate-y-[2px] text-fuchsia-500 blur-[0.5px] select-none" aria-hidden>
      {children}
    </span>
    <span className="absolute inset-0 -z-0 -translate-x-[2px] -translate-y-[2px] text-white blur-[0.5px] select-none" aria-hidden>
      {children}
    </span>
  </div>
);

function PersonForm({ title, prefix }: { title: string; prefix: string }) {
  return (
    <fieldset className="border border-pink-600/40 rounded-2xl p-5">
      <legend className="px-2 text-pink-400 font-semibold tracking-wide">{title}</legend>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${prefix}-name`} className="block text-sm text-zinc-300 mb-1">Name</label>
          <input id={`${prefix}-name`} name={`${prefix}-name`} type="text" required placeholder="Vorname Nachname" className="w-full px-3 py-2 rounded-xl bg-black border border-pink-600/40 focus:outline-none focus:ring-2 focus:ring-pink-600" />
        </div>
        <div>
          <label htmlFor={`${prefix}-email`} className="block text-sm text-zinc-300 mb-1">E-Mail</label>
          <input id={`${prefix}-email`} name={`${prefix}-email`} type="email" required placeholder="du@beispiel.org" className="w-full px-3 py-2 rounded-xl bg-black border border-pink-600/40 focus:outline-none focus:ring-2 focus:ring-pink-600" />
        </div>
        <div>
          <label htmlFor={`${prefix}-flinta`} className="block text-sm text-zinc-300 mb-1">Selbsteinschätzung</label>
          <select id={`${prefix}-flinta`} name={`${prefix}-flinta`} required className="w-full px-3 py-2 rounded-xl bg-black border border-pink-600/40 focus:outline-none focus:ring-2 focus:ring-pink-600">
            <option value="">Bitte wählen…</option>
            <option value="flinta">FLINTA*</option>
            <option value="nicht-flinta">nicht FLINTA*</option>
            <option value="sage-ich-nicht">möchte ich nicht sagen</option>
          </select>
        </div>
        <div>
          <label htmlFor={`${prefix}-notes`} className="block text-sm text-zinc-300 mb-1">Hinweise (optional)</label>
          <input id={`${prefix}-notes`} name={`${prefix}-notes`} type="text" placeholder="z. B. Allergien, Bike, Pronomen" className="w-full px-3 py-2 rounded-xl bg-black border border-pink-600/40 focus:outline-none focus:ring-2 focus:ring-pink-600" />
        </div>
      </div>
    </fieldset>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-2xl border border-pink-600/40 p-4">
      <summary className="cursor-pointer font-semibold text-pink-300 group-open:text-white">{q}</summary>
      <p className="mt-2 text-zinc-300">{a}</p>
    </details>
  );
}

function Dot() {
  return <span aria-hidden className="inline-block w-2 h-2 rounded-full bg-pink-600" />;
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/Meta/logo.png"
        alt="Heart Times Logo"
        fill
        sizes="(max-width: 768px) 33vw, 256px"
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  );
}

function GridNoise() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-20">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#db2777" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

// ---------- Page ----------
export default function HeartTimesSite() {
  const t = useTranslations('Home');
  const [mode, setMode] = useState<"solo" | "team">("solo");
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Header
      <header className="sticky top-0 z-10 backdrop-blur bg-black/70 border-b border-pink-600/40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <span className="font-bold tracking-wider text-pink-500 text-xl">HEART TIMES</span>
          </div>
          <nav className="text-sm">
            <a href="#about" className="px-3 py-2 rounded hover:bg-pink-600/20">{t('nav.about')}</a>
            <a href="#signup" className="px-3 py-2 rounded hover:bg-pink-600/20">{t('nav.signup')}</a>
            <a href="#faq" className="px-3 py-2 rounded hover:bg-pink-600/20">FAQ</a>
          </nav>
        </div>
      </header>
      */}

       

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-pink-600/30">
        {/* Hintergrundbild */}
        <Image
          src="/Meta/dirtyRagSmallHeart.png"   // dein Bild
          alt="MTB & Gravel Hero"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Overlay für Kontrast (optional) */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Inhalt */}
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] font-salted">
              <span className="block">MTB &amp; Gravel</span>
              <span className="block mt-2"><GlitchText>HEART TIMES</GlitchText></span>
              <span className="block mt-2">CHALLENGE</span>
            </h1>
            <p className="mt-4 text-lg text-pink-200/90">{t('hero.lead')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#signup"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-pink-600 hover:bg-pink-500 transition font-semibold"
              >
                {t('hero.cta')}
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-pink-600 hover:bg-pink-600/10 transition"
              >
                {t('hero.more')}
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md aspect-square bg-zinc-900/80 border border-pink-600/40 rounded-3xl p-6 flex items-center justify-center shadow-[0_0_60px_-20px_#db2777]">
              <Logo className="w-70 h-70" />
            </div>
          </div>
        </div>

        <GridNoise />
      </section>


      {/* Sign Up */}
      <section id="signup" className="border-y border-pink-600/30 bg-zinc-950/50">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-6">{t('signup.title')}</h2>
          <p className="text-zinc-300 mb-6">{t('signup.hint')}</p>

          {/* Mode Toggle */}
          <div className="inline-flex rounded-2xl border border-pink-600/40 overflow-hidden mb-8">
            <button
              onClick={() => setMode("solo")}
              className={`px-5 py-3 font-semibold ${mode === "solo" ? "bg-pink-600" : "bg-transparent hover:bg-pink-600/10"}`}
              aria-pressed={mode === "solo"}
            >
              {t('signup.modes.solo')}
            </button>
            <button
              onClick={() => setMode("team")}
              className={`px-5 py-3 font-semibold ${mode === "team" ? "bg-pink-600" : "bg-transparent hover:bg-pink-600/10"}`}
              aria-pressed={mode === "team"}
            >
              {t('signup.modes.team')}
            </button>
          </div>

          <form onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const fd = new FormData(form);

            // helper: FormData -> Entry
            const entry = (p: string) => ({
              name: String(fd.get(`${p}-name`) || '').trim(),
              email: String(fd.get(`${p}-email`) || '').trim(),
              self: String(fd.get(`${p}-flinta`) || '').trim(), // 'flinta' | 'nicht-flinta' | 'sage-ich-nicht'
              notes: String(fd.get(`${p}-notes`) || '').trim() || undefined
            });

            // payload bauen
            const payload =
              mode === 'solo'
                ? { mode: 'solo' as const, locale, entries: [entry('solo')] }
                : { mode: 'team' as const, locale, entries: [entry('a'), entry('b')] };

            // mini-validierung
            if (payload.entries.some(r => !r.name || !r.email)) {
              alert('Bitte Name und E-Mail ausfüllen.');
              return;
            }

            try {
              const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });
              const data = await res.json();

              if (res.ok && data?.ok) {
                alert('Danke! Wir melden uns per Mail.');
                form.reset();
                setMode('solo'); // zurücksetzen, optional
              } else {
                alert(`Fehler: ${data?.error ?? 'Unbekannter Fehler'}`);
              }
            } catch {
              alert('Netzwerkfehler. Versuch es später nochmal.');
            }
          }}
          className="grid gap-8">        
          {mode === 'solo' ? (
            <PersonForm title={t('signup.forms.solo')} prefix="solo" />
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              <PersonForm title={t('signup.forms.teamA')} prefix="a" />
              <PersonForm title={t('signup.forms.teamB')} prefix="b" />
            </div>
          )}

          <div className="flex items-start gap-3 text-sm">
            <input id="terms" type="checkbox" required className="mt-1 accent-pink-600" />
            <label htmlFor="terms" className="text-zinc-300">
              {t('signup.terms')}
            </label>
          </div>

          <button type="submit" className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-pink-600 hover:bg-pink-500 font-semibold">
            {t('signup.submit')}
          </button>
        </form>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6">FAQ</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Faq q={t('faq.q1')} a={t('faq.a1')} />
          <Faq q={t('faq.q2')} a={t('faq.a2')} />
          <Faq q={t('faq.q3')} a={t('faq.a3')} />
          <Faq q={t('faq.q4')} a={t('faq.a4')} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-pink-600/30">
        <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-zinc-400 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} HEART TIMES — Ride fast, be kind.</p>
          <p>
            {t('footer.contact')}{" "}
            <a className="underline hover:text-pink-400" href="mailto:hearttimes@riseup.net">
              hearttimes@riseup.net
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
