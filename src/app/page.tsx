'use client';

import React, { useState } from 'react';

export default function Home() {
  const [company, setCompany] = useState('LESCO');
  const [refNo, setRefNo] = useState('12345678901234');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testApi = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/bills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, referenceNumber: refNo }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-md uppercase tracking-wider">
                Production Ready
              </span>
              <span className="text-xs text-slate-400">v1.0.0</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-2">
              BillCheck PK <span className="text-emerald-400">Backend API</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              High-performance API Proxy & Parser for Pakistan Electricity & Gas Bills by Arcloom Tech
            </p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-400 border border-emerald-800/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              API Online & Healthy
            </span>
          </div>
        </header>

        {/* Legal Disclaimer Box (Play Store Policy Compliant) */}
        <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-4 mb-8 text-amber-200/90 text-xs leading-relaxed flex items-start gap-3">
          <span className="text-base mt-0.5">⚠️</span>
          <div>
            <strong className="font-bold text-amber-300">Mandatory Policy Disclaimer:</strong>
            <p className="mt-0.5">
              BillCheck PK (developed by Arcloom Tech) is an independent utility tracking tool developed to help consumers view and manage public utility bills. This application is NOT affiliated with, endorsed by, or representing the Government of Pakistan, PITC, PEPCO, or any state-owned utility company (LESCO, MEPCO, IESCO, SNGPL, etc.).
            </p>
          </div>
        </div>

        {/* Interactive API Tester */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>⚡</span> Live API Test Console
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Utility Company
              </label>
              <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="LESCO">LESCO (Lahore)</option>
                <option value="MEPCO">MEPCO (Multan)</option>
                <option value="IESCO">IESCO (Islamabad)</option>
                <option value="FESCO">FESCO (Faisalabad)</option>
                <option value="GEPCO">GEPCO (Gujranwala)</option>
                <option value="PESCO">PESCO (Peshawar)</option>
                <option value="HESCO">HESCO (Hyderabad)</option>
                <option value="SEPCO">SEPCO (Sukkur)</option>
                <option value="QESCO">QESCO (Quetta)</option>
                <option value="TESCO">TESCO (Tribal Areas)</option>
                <option value="KELECTRIC">K-Electric (Karachi)</option>
                <option value="SNGPL">SNGPL (Sui Northern Gas)</option>
                <option value="SSGC">SSGC (Sui Southern Gas)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                14-Digit Reference Number / Consumer ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={refNo}
                  onChange={(e) => setRefNo(e.target.value)}
                  placeholder="Enter 14-digit reference number"
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
                <button
                  onClick={testApi}
                  disabled={loading}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition disabled:opacity-50"
                >
                  {loading ? 'Checking...' : 'Check Bill'}
                </button>
              </div>
            </div>
          </div>

          {result && (
            <div className="mt-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                JSON Response:
              </span>
              <pre className="bg-slate-950 border border-slate-800 text-emerald-400 p-4 rounded-xl text-xs overflow-x-auto font-mono">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </section>

        {/* API Documentation */}
        <section className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-3">📡 Endpoints Reference</h2>
          <div className="space-y-4 text-sm">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="bg-blue-600/30 text-blue-400 px-2 py-0.5 rounded font-bold">GET</span>
                <span className="text-slate-200">/api/bills</span>
              </div>
              <p className="text-slate-400 text-xs mt-1">Returns all supported utility companies & disclaimers.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="bg-emerald-600/30 text-emerald-400 px-2 py-0.5 rounded font-bold">POST</span>
                <span className="text-slate-200">/api/bills</span>
              </div>
              <p className="text-slate-400 text-xs mt-1">Accepts `{`{ company, referenceNumber }`}` and returns parsed bill details.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
