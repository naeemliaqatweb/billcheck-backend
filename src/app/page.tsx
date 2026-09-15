import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'BillCheck PK (PakBill Hub) - Pakistan Utility Bill Checker & Tracker',
  description: 'Instant live electricity and gas bill checker for Pakistan. Check LESCO, MEPCO, IESCO, FESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO, K-Electric, SNGPL, and SSGC bills.',
};

const ELECTRICITY_PROVIDERS = [
  { code: 'LESCO', name: 'LESCO', city: 'Lahore & Kasur', color: 'from-amber-500/20 to-amber-600/10' },
  { code: 'MEPCO', name: 'MEPCO', city: 'Multan & South Punjab', color: 'from-orange-500/20 to-orange-600/10' },
  { code: 'IESCO', name: 'IESCO', city: 'Islamabad & Rawalpindi', color: 'from-blue-500/20 to-blue-600/10' },
  { code: 'FESCO', name: 'FESCO', city: 'Faisalabad & Sargodha', color: 'from-emerald-500/20 to-emerald-600/10' },
  { code: 'GEPCO', name: 'GEPCO', city: 'Gujranwala & Sialkot', color: 'from-teal-500/20 to-teal-600/10' },
  { code: 'PESCO', name: 'PESCO', city: 'Peshawar & KPK', color: 'from-cyan-500/20 to-cyan-600/10' },
  { code: 'HESCO', name: 'HESCO', city: 'Hyderabad & Sindh', color: 'from-purple-500/20 to-purple-600/10' },
  { code: 'SEPCO', name: 'SEPCO', city: 'Sukkur & Larkana', color: 'from-indigo-500/20 to-indigo-600/10' },
  { code: 'QESCO', name: 'QESCO', city: 'Quetta & Balochistan', color: 'from-rose-500/20 to-rose-600/10' },
  { code: 'TESCO', name: 'TESCO', city: 'Tribal Areas', color: 'from-lime-500/20 to-lime-600/10' },
  { code: 'KE', name: 'K-Electric', city: 'Karachi Metro', color: 'from-sky-500/20 to-sky-600/10' },
];

const GAS_PROVIDERS = [
  { code: 'SNGPL', name: 'SNGPL', desc: 'Sui Northern Gas Pipelines (Punjab & KPK)', color: 'from-red-500/20 to-orange-600/10' },
  { code: 'SSGC', name: 'SSGC', desc: 'Sui Southern Gas Company (Sindh & Balochistan)', color: 'from-amber-500/20 to-yellow-600/10' },
];

const FEATURES = [
  {
    icon: '⚡',
    title: 'All Electricity DISCOs (11 Providers)',
    titleUr: 'تمام 11 بجلی کمپنیوں کے بل',
    desc: 'Check live bills for LESCO, MEPCO, IESCO, FESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO, and K-Electric.',
  },
  {
    icon: '🔥',
    title: 'Gas Utilities (SNGPL & SSGC)',
    titleUr: 'سوئی ناردرن اور سوئی سدرن گیس بل',
    desc: 'Lookup Sui Northern Gas Pipelines Limited and Sui Southern Gas Company bills with 1-tap refresh.',
  },
  {
    icon: '💾',
    title: 'Offline Meter Manager',
    titleUr: 'میٹر محفوظ کریں اور بار بار چیک کریں',
    desc: 'Save Home, Office, Shop, and Rental meters with custom labels. View previous bills even without internet.',
  },
  {
    icon: '📊',
    title: '13-Month Trend & Spike Analytics',
    titleUr: '13 ماہ کا تاریخی موازنہ اور یونٹ گراف',
    desc: 'Interactive visual consumption charts, peak summer spike highlights, and month-over-month unit differences.',
  },
  {
    icon: '📄',
    title: 'Official Duplicate Bill View & PDF',
    titleUr: 'اصل ڈپلیکیٹ بل اور پی ڈی ایف ڈاؤن لوڈ',
    desc: 'View the authentic full duplicate bill document directly from provider servers and save as PDF.',
  },
  {
    icon: '🌐',
    title: 'Bilingual (اردو / English)',
    titleUr: 'مکمل اردو اور انگلش سپورٹ',
    desc: 'Full Urdu and English language interface with 1-tap switching and clean typography.',
  },
];

export default function Home() {
  const apkDownloadUrl =
    'https://github.com/naeemliaqatweb/billcheck-mobile/releases/download/v1.0.0-beta/billcheck-pk-debug.apk';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* ── Top Bar ── */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-xs py-2.5 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-sm">
        <span className="bg-emerald-950/80 text-emerald-200 text-[10px] uppercase font-black px-2 py-0.5 rounded-full border border-emerald-400/30">
          Android App Ready
        </span>
        <span>BillCheck PK (PakBill Hub) v1.0.0 is available for Android.</span>
      </div>

      {/* ── Navbar ── */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-md border border-slate-700 bg-slate-900 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="BillCheck PK Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white">BillCheck PK</span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.2 rounded-full border border-emerald-500/30">
                  Hub
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block -mt-0.5">By Arcloom Tech</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <a href="#features" className="text-xs font-semibold text-slate-300 hover:text-white hidden md:inline-block">
              Features
            </a>
            <a href="#providers" className="text-xs font-semibold text-slate-300 hover:text-white hidden md:inline-block">
              Providers
            </a>
            <Link
              href="/privacy"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Privacy Policy
            </Link>
            <a
              href={apkDownloadUrl}
              download
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950 transition active:scale-95"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
              </svg>
              <span>Download APK</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-slate-800/80">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_50%_20%,rgba(16,185,129,0.15),rgba(2,6,23,0))]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-emerald-400 text-xs font-semibold mb-6 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Fastest Pakistan Utility Bill Checker & Tracker
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight sm:leading-none mb-6">
            Check, Track &amp; Save <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
              Pakistan Utility Bills
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-4 font-normal leading-relaxed">
            All 11 Electricity Companies (LESCO, MEPCO, IESCO, FESCO, GEPCO, etc.) &amp; Gas (SNGPL, SSGC) in one fast, private mobile app.
          </p>
          <p className="text-sm sm:text-base text-emerald-300/90 font-medium mb-10 font-arabic">
            تمام پاکستانی بجلی اور گیس کے بل فوری چیک، موازنہ اور آف لائن محفوظ کریں۔
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={apkDownloadUrl}
              download
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base shadow-xl shadow-emerald-950 transition active:scale-95"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
              </svg>
              <span>Download Android APK (Direct)</span>
            </a>

            <Link
              href="/privacy"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm border border-slate-700/80 transition"
            >
              <span>🛡️ View Official Privacy Policy</span>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">✓ 100% Free &amp; Ad-Supported</span>
            <span className="flex items-center gap-1.5">✓ Local Device Storage</span>
            <span className="flex items-center gap-1.5">✓ Zero Login Required</span>
          </div>
        </div>
      </section>

      {/* ── Official Compliance & Non-Affiliation Disclaimer ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-amber-950/20 border border-amber-800/40 rounded-2xl p-5 text-amber-200/90 text-xs leading-relaxed flex items-start gap-3 shadow-lg">
          <span className="text-xl flex-shrink-0 mt-0.5">🛡️</span>
          <div>
            <strong className="font-bold text-amber-300 block mb-1 text-sm">
              Official Government &amp; Utility Non-Affiliation Compliance Notice
            </strong>
            <p className="text-slate-300 text-xs leading-relaxed">
              <strong>BillCheck PK</strong> is an independent utility application developed and operated by{' '}
              <strong className="text-white">Arcloom Tech</strong>. This application is <strong>NOT</strong> affiliated with, endorsed by, authorized by, or in any way officially connected with the Government of Pakistan, PITC, PEPCO, NEPRA, or individual electricity distribution companies (LESCO, MEPCO, IESCO, FESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO, K-Electric) or gas providers (SNGPL, SSGC). All utility trademarks and provider names belong to their respective registered entities.
            </p>
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            Powerful &amp; Modern
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
            Engineered for Fast, Reliable Bill Checking
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Designed from the ground up for Pakistani consumers with instant on-device fetching, history graphs, and offline bill management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-2xl mb-4">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{feat.title}</h3>
                <p className="text-xs text-emerald-400 font-medium mb-3 font-arabic">{feat.titleUr}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Supported Providers Section ── */}
      <section id="providers" className="border-t border-slate-800/80 bg-slate-900/40 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
              National Coverage
            </span>
            <h2 className="text-3xl font-black text-white mt-2">
              Supported Power &amp; Gas Providers
            </h2>
            <p className="text-slate-400 text-xs mt-2">
              Covers all distribution companies under PITC / WAPDA as well as Karachi K-Electric and Gas utilities.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <span>⚡</span> Electricity DISCOs (11)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {ELECTRICITY_PROVIDERS.map((p) => (
                <div
                  key={p.code}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-center hover:border-emerald-500/40 transition"
                >
                  <span className="font-mono font-black text-base text-white block">{p.name}</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5 truncate">{p.city}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <span>🔥</span> Gas Utilities (2)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GAS_PROVIDERS.map((g) => (
                <div
                  key={g.code}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3 hover:border-emerald-500/40 transition"
                >
                  <span className="text-2xl">🔥</span>
                  <div>
                    <span className="font-black text-white text-base block">{g.name}</span>
                    <span className="text-xs text-slate-400">{g.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800 py-12 bg-slate-950 text-slate-400 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-black text-sm">BillCheck PK (PakBill Hub)</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">Engineered by Arcloom Tech</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Lahore, Pakistan • Email: support@arcloom.com
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <Link href="/privacy" className="hover:text-emerald-400 text-emerald-400 font-semibold transition">
              Privacy Policy
            </Link>
            <a
              href="https://github.com/naeemliaqatweb/billcheck-mobile"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              GitHub Mobile
            </a>
            <a
              href="https://github.com/naeemliaqatweb/billcheck-backend"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              GitHub Backend
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-slate-900 text-center text-[11px] text-slate-600">
          © {new Date().getFullYear()} Arcloom Tech. All rights reserved. Independent utility tool.
        </div>
      </footer>
    </div>
  );
}
