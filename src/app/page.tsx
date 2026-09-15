'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const PROVIDERS = [
  { code: 'LESCO', name: 'LESCO (Lahore)', type: 'electricity', example: '08115120562000' },
  { code: 'MEPCO', name: 'MEPCO (Multan)', type: 'electricity', example: '15151123456789' },
  { code: 'IESCO', name: 'IESCO (Islamabad / Rawalpindi)', type: 'electricity', example: '01143123456789' },
  { code: 'FESCO', name: 'FESCO (Faisalabad)', type: 'electricity', example: '12131123456789' },
  { code: 'GEPCO', name: 'GEPCO (Gujranwala)', type: 'electricity', example: '09121123456789' },
  { code: 'PESCO', name: 'PESCO (Peshawar)', type: 'electricity', example: '26161123456789' },
  { code: 'HESCO', name: 'HESCO (Hyderabad)', type: 'electricity', example: '21171123456789' },
  { code: 'SEPCO', name: 'SEPCO (Sukkur)', type: 'electricity', example: '22181123456789' },
  { code: 'QESCO', name: 'QESCO (Quetta)', type: 'electricity', example: '24191123456789' },
  { code: 'TESCO', name: 'TESCO (Tribal Areas)', type: 'electricity', example: '25201123456789' },
  { code: 'KELECTRIC', name: 'K-Electric (Karachi)', type: 'electricity', example: '0400012345678' },
  { code: 'SNGPL', name: 'SNGPL (Sui Northern Gas)', type: 'gas', example: '12345678901' },
  { code: 'SSGC', name: 'SSGC (Sui Southern Gas)', type: 'gas', example: '1234567890' },
];

export default function Home() {
  const [utilityType, setUtilityType] = useState<'electricity' | 'gas'>('electricity');
  const [company, setCompany] = useState('LESCO');
  const [refNo, setRefNo] = useState('08115120562000');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, any> | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const filteredProviders = PROVIDERS.filter((p) => p.type === utilityType);

  const handleTypeChange = (type: 'electricity' | 'gas') => {
    setUtilityType(type);
    const first = PROVIDERS.find((p) => p.type === type);
    if (first) {
      setCompany(first.code);
      setRefNo(first.example);
    }
  };

  const handleProviderChange = (code: string) => {
    setCompany(code);
    const found = PROVIDERS.find((p) => p.code === code);
    if (found) {
      setRefNo(found.example);
    }
  };

  const checkBill = async () => {
    if (!refNo.trim()) {
      setErrorMsg('Please enter a valid reference number.');
      return;
    }
    setLoading(true);
    setResult(null);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/bills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, referenceNumber: refNo }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMsg(data.error || 'Failed to fetch bill. Please verify the reference number.');
      } else {
        setResult(data);
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Network error while reaching bill server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* ── Top Announcement Bar ── */}
      <div className="bg-emerald-600 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="bg-emerald-800 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded">Staging Live</span>
        <span>BillCheck PK Staging Preview & API Gateway is now active.</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
        {/* ── Main Hero Header ── */}
        <header className="flex flex-col md:flex-row items-center justify-between border-b border-slate-800/80 pb-8 mb-10 gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-900 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="BillCheck PK Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  v1.0.0 Staging
                </span>
                <span className="text-xs text-slate-400">By Arcloom Tech</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white mt-1 tracking-tight">
                BillCheck PK <span className="text-emerald-400">Hub</span>
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                Official web staging & API testing hub for Pakistan Electricity & Gas Bill Checker.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/naeemliaqatweb/billcheck-mobile/releases/download/v1.0.0-beta/billcheck-pk-debug.apk"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950 transition active:scale-95"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/>
              </svg>
              Download Android APK (Beta)
            </a>
            <a
              href="https://github.com/naeemliaqatweb/billcheck-mobile"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-sm border border-slate-800 transition"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub Mobile
            </a>
          </div>
        </header>

        {/* ── Policy Disclaimer ── */}
        <div className="bg-amber-950/20 border border-amber-800/40 rounded-2xl p-4 mb-10 text-amber-200/90 text-xs leading-relaxed flex items-start gap-3">
          <span className="text-lg">🛡️</span>
          <div>
            <strong className="font-bold text-amber-300">Official Compliance Notice:</strong>
            <p className="mt-0.5 text-slate-300">
              BillCheck PK is an independent bill viewing utility engineered by <strong className="text-white">Arcloom Tech</strong>. This tool fetches public utility information and is not an official representative of the Government of Pakistan, PITC, PEPCO, or individual distribution companies (LESCO, GEPCO, FESCO, IESCO, MEPCO, PESCO, SNGPL, SSGC, KE).
            </p>
          </div>
        </div>

        {/* ── Interactive Web Bill Checker Widget ── */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-12 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🔍</span> Live Web Bill Checker
              </h2>
              <p className="text-slate-400 text-xs mt-1">Test live bill scraping directly in the browser.</p>
            </div>

            {/* Utility Tabs */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => handleTypeChange('electricity')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  utilityType === 'electricity'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>⚡</span> Electricity (11)
              </button>
              <button
                onClick={() => handleTypeChange('gas')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  utilityType === 'gas'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🔥</span> Gas (2)
              </button>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Select Company
              </label>
              <select
                value={company}
                onChange={(e) => handleProviderChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-medium"
              >
                {filteredProviders.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Reference Number / Consumer ID
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={refNo}
                  onChange={(e) => setRefNo(e.target.value)}
                  placeholder="e.g. 08115120562000"
                  className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono tracking-wide"
                />
                <button
                  onClick={checkBill}
                  disabled={loading}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-7 py-3 rounded-xl transition shadow-lg shadow-emerald-950 disabled:opacity-50 flex items-center justify-center gap-2 flex-shrink-0"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Fetching...
                    </>
                  ) : (
                    'Check Bill Now'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-xl text-rose-300 text-xs mb-6">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Rendered Bill Result Card */}
          {result && (
            <div className="mt-6 border border-emerald-500/40 rounded-2xl bg-slate-950/80 p-6 shadow-inner animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-2">
                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Live Verified Bill
                  </span>
                  <h3 className="text-xl font-black text-white">{result.company} Online Bill</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Due Date</span>
                  <span className="text-sm font-bold text-amber-400 font-mono">{result.dueDate || 'N/A'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">Payable (Within Due Date)</span>
                  <span className="text-lg font-black text-emerald-400">
                    Rs. {result.payableWithinDueDate?.toLocaleString() || result.amount || '0'}
                  </span>
                </div>
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">Late Payment Surcharge</span>
                  <span className="text-lg font-black text-rose-400">
                    Rs. {result.latePaymentSurcharge?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">Consumer Name</span>
                  <span className="text-sm font-bold text-white truncate block">
                    {result.consumerName || 'Registered Consumer'}
                  </span>
                </div>
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">Units Consumed</span>
                  <span className="text-sm font-bold text-white font-mono">
                    {result.unitsConsumed ? `${result.unitsConsumed} kWh` : 'N/A'}
                  </span>
                </div>
              </div>

              {result.billPdfUrl && (
                <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-300">Official Web Bill Copy:</span>
                  <a
                    href={result.billPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-bold underline"
                  >
                    Open Official Bill Link ↗
                  </a>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ── App Features & Staging Showcase ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl mb-4">
              💾
            </div>
            <h3 className="text-base font-bold text-white mb-2">Offline Meter Manager</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Save home, office, or rental meters with custom labels. Instant 1-tap bill refresh anytime.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl mb-4">
              📊
            </div>
            <h3 className="text-base font-bold text-white mb-2">Expense & Unit Analytics</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Track 6-month historical billing trends, monthly average spikes, and peak power units consumed.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl mb-4">
              🌐
            </div>
            <h3 className="text-base font-bold text-white mb-2">Bilingual Support</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Full RTL Urdu & English switchable interface with seamless Dark Mode support.
            </p>
          </div>
        </section>

        {/* ── API Endpoints Documentation ── */}
        <section className="bg-slate-900/40 border border-slate-800/70 rounded-2xl p-6 mb-12">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>📡</span> Developer API Integration
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-bold">GET</span>
              <span className="text-slate-300 ml-2">/api/bills</span>
              <p className="text-slate-400 font-sans text-[11px] mt-2">
                Returns the list of 13 supported power & gas utilities along with code formatting.
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">POST</span>
              <span className="text-slate-300 ml-2">/api/bills</span>
              <p className="text-slate-400 font-sans text-[11px] mt-2">
                Accepts JSON: <code className="text-emerald-400">{'{"company": "LESCO", "referenceNumber": "..."}'}</code>
              </p>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-slate-800/80 pt-8 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BillCheck PK • Engineered by <strong className="text-slate-300">Arcloom Tech</strong></p>
          <p className="mt-1">All brand logos & names belong to their respective utility operators.</p>
        </footer>
      </div>
    </div>
  );
}
