"use client";

import { useState, ReactNode } from "react";

// ---------- UI Bits (nicht exportieren) ----------
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

function Logo({ className = "", large = false }: { className?: string; large?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Heart Times Logo Platzhalter"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" rx="24" fill="#0a0a0a" stroke="#db2777" opacity="0.25" />
      <g filter={large ? "url(#glow)" : undefined}>
        <path d="M128 220s-78-48-94-96c-10-30 6-68 44-68 28 0 46 24 50 30 4-6 22-30 50-30 38 0 54 38 44 68-16 48-94 96-94 96z" fill="#db2777" />
        <polyline points="96,128 128,96 112,160 160,112" fill="none" stroke="#000" strokeWidth="10" strokeLinejoin="round" />
        <text x="128" y="230" textAnchor="middle" fontSize="24" fill="#db2777" fontWeight="800" letterSpacing="4">HEART TIMES</text>
      </g>
    </svg>
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

// ---------- Page (default export) ----------
export default function HeartTimesSite() {
  const [mode, setMode] = useState<"solo" | "team">("solo");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-black/70 border-b border-pink-600/40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <span className="font-bold tracking-wider text-pink-500 text-xl">HEART TIMES</span>
          </div>
          <nav className="text-sm">
            <a href="#about" className="px-3 py-2 rounded hover:bg-pink-600/20">About</a>
            <a href="#signup" className="px-3 py-2 rounded hover:bg-pink-600/20">Anmeldung</a>
            <a href="#faq" className="px-3 py-2 rounded hover:bg-pink-600/20">FAQ</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-pink-600/30">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] font-salted">
              <span className="block">MTB &amp; Gravel</span>
              <span className="block mt-2"><GlitchText>HEART TIMES</GlitchText></span>
              <span className="block mt-2">CHALLENGE</span>
            </h1>
            <p className="mt-4 text-lg text-pink-200/90">
              Selbstorganisiertes Gravel/MTB-Event. Kein Kommerz, keine Cops, nur Trails,
              Schweiß und gute Menschen. Queer · links · punk · renegade.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#signup" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-pink-600 hover:bg-pink-500 transition font-semibold">
                Anmelden
              </a>
              <a href="#about" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-pink-600 hover:bg-pink-600/10 transition">
                Mehr erfahren
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md aspect-square bg-zinc-900 border border-pink-600/40 rounded-3xl p-6 flex items-center justify-center shadow-[0_0_60px_-20px_#db2777]">
              <Logo className="w-64 h-64" large />
            </div>
          </div>
        </div>
        <GridNoise />
      </section>

      {/* About */}
      <section id="about" className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-4">Worum geht es?</h2>
            <p className="text-zinc-200">
              HEART TIMES ist ein DIY-Ride, kein Rennen. Wir teilen GPX-Routen, Spots
              zum Auffüllen und einen Treffpunkt. Du bist selbst verantwortlich für
              deine Sicherheit, dein Bike und deine Crew. Respektiere Wald, Feld und
              Menschen. No Drop, no Nazis, no Sexismus.
            </p>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3"><Dot /> Schwarzer &amp; pinker Dresscode: erwünscht, nicht Pflicht.</li>
            <li className="flex items-center gap-3"><Dot /> FLINTA-first Startblock.</li>
            <li className="flex items-center gap-3"><Dot /> Spenden statt Startgeld.</li>
            <li className="flex items-center gap-3"><Dot /> After-Ride: Park, Pizza, portable Box.</li>
          </ul>
        </div>
      </section>

      {/* Sign Up */}
      <section id="signup" className="border-y border-pink-600/30 bg-zinc-950/50">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-6">Anmeldung</h2>
          <p className="text-zinc-300 mb-6">
            Wähle <span className="font-semibold">Solo</span> oder <span className="font-semibold">Team</span>. Bei Team werden zwei Masken angezeigt.
          </p>

          {/* Mode Toggle */}
          <div className="inline-flex rounded-2xl border border-pink-600/40 overflow-hidden mb-8">
            <button
              onClick={() => setMode("solo")}
              className={`px-5 py-3 font-semibold ${mode === "solo" ? "bg-pink-600" : "bg-transparent hover:bg-pink-600/10"}`}
              aria-pressed={mode === "solo"}
            >
              Solo
            </button>
            <button
              onClick={() => setMode("team")}
              className={`px-5 py-3 font-semibold ${mode === "team" ? "bg-pink-600" : "bg-transparent hover:bg-pink-600/10"}`}
              aria-pressed={mode === "team"}
            >
              Team
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert("Danke! Wir melden uns per Mail."); }} className="grid gap-8">
            {mode === "solo" ? (
              <PersonForm title="Solo" prefix="solo" />
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                <PersonForm title="Team · Person A" prefix="a" />
                <PersonForm title="Team · Person B" prefix="b" />
              </div>
            )}

            <div className="flex items-start gap-3 text-sm">
              <input id="terms" type="checkbox" required className="mt-1 accent-pink-600" />
              <label htmlFor="terms" className="text-zinc-300">
                Ich checke: Eigenverantwortung, Trail-Etikette, Respekt. Keine Haftung übernommen.
              </label>
            </div>

            <button type="submit" className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-pink-600 hover:bg-pink-500 font-semibold">
              Abschicken
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6">FAQ</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Faq q="Brauche ich eine Race-Lizenz?" a="Nein. Das ist kein Rennen, sondern ein gemeinsamer Ride." />
          <Faq q="Ist die Route geheim?" a="Wir teilen GPX vorab per E-Mail an Angemeldete." />
          <Faq q="Gravel oder MTB?" a="Beides okay. Reifen ≥ 38 mm empfohlen." />
          <Faq q="Wer organisiert das?" a="Kollektiv: queer · links · punk · renegade. DIY seit Tag eins." />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-pink-600/30">
        <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-zinc-400 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} HEART TIMES — Ride fast, be kind.</p>
          <p>
            Kontakt:{" "}
            <a className="underline hover:text-pink-400" href="mailto:hearttimes@riseup.net">
              hearttimes@riseup.net
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
