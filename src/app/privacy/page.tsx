import React from 'react';

export const metadata = {
  title: 'Privacy Policy - BillCheck PK (PakBill Hub)',
  description: 'Official Privacy Policy and Government Non-Affiliation Disclaimers for BillCheck PK mobile application.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-slate-800/90 rounded-2xl border border-slate-700/60 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
        
        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ✓ 100% Google Play Policy Compliant
          </span>
          <span className="text-xs text-slate-400">Last updated: September 15, 2026</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
          Privacy Policy for BillCheck PK (PakBill Hub)
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
          Arcloom Tech (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the <strong>BillCheck PK (PakBill Hub)</strong> mobile application (the &quot;Service&quot;). This policy outlines our standards regarding the collection, use, and disclosure of data when you use our mobile application.
        </p>

        {/* Section 1: Non-Affiliation Disclaimer (Critical for Play Store) */}
        <div className="mb-8 p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
          <h2 className="text-base sm:text-lg font-bold text-amber-300 mb-2 flex items-center gap-2">
            ⚠️ 1. Important Government &amp; Utility Non-Affiliation Disclaimer
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed text-amber-100/90 mb-3">
            <strong>BillCheck PK is an independent utility app developed by Arcloom Tech.</strong>
          </p>
          <ul className="list-disc list-inside text-xs sm:text-sm space-y-1.5 text-amber-100/90">
            <li>This app is <strong>NOT</strong> affiliated with, endorsed by, authorized by, or in any way officially connected with the Government of Pakistan, WAPDA, PEPCO, NEPRA, or any government electricity distribution company (LESCO, GEPCO, FESCO, IESCO, MEPCO, PESCO, HESCO, QESCO, SEPCO, TESCO, K-Electric) or gas utility company (SNGPL, SSGC).</li>
            <li>The application acts solely as a convenient mobile viewer for publicly accessible online billing portals. All trademarks, company names, and logos belong to their respective registered owners.</li>
          </ul>
        </div>

        {/* Section 2: Data Collection & Storage */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3">
            2. Information Collection and Storage
          </h2>
          <ul className="list-disc list-inside text-sm text-slate-300 space-y-2 leading-relaxed">
            <li><strong>Local Device Storage:</strong> Reference numbers, consumer IDs, and nicknames are stored <strong>strictly locally on your device</strong> (using device sandboxed storage) to allow quick checking of monthly bills.</li>
            <li><strong>No User Accounts:</strong> We do not require registration, login, phone numbers, email addresses, passwords, or CNIC numbers.</li>
            <li><strong>No Payment Data:</strong> We do not process bill payments in-app or collect any bank account, credit/debit card, or wallet financial details.</li>
          </ul>
        </div>

        {/* Section 3: Third Party & Ads */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3">
            3. Third-Party Services &amp; Advertising
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-3">
            Our application integrates third-party services that may process non-personal diagnostic and advertising data:
          </p>
          <ul className="list-disc list-inside text-sm text-slate-300 space-y-1.5 leading-relaxed">
            <li><strong>Google Play Services:</strong> Core Android functionality and updates.</li>
            <li><strong>Google AdMob:</strong> Serves advertisements to keep the application 100% free for all users in accordance with Google&apos;s Privacy Policy.</li>
          </ul>
        </div>

        {/* Section 4: Data Deletion */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3">
            4. Data Retention &amp; User Control
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            You retain 100% control over your data. You can delete all saved meters and local cached bills at any time by tapping <em>&quot;Clear Saved Bills &amp; Reset App&quot;</em> in the App Settings.
          </p>
        </div>

        {/* Section 5: Children's Privacy */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-3">
            5. Children&apos;s Privacy
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Our Service is not directed to children under the age of 13. We do not knowingly collect personally identifiable information from children.
          </p>
        </div>

        {/* Section 6: Contact */}
        <div className="pt-6 border-t border-slate-700">
          <h2 className="text-lg font-bold text-white mb-2">
            6. Contact Us
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            For questions or suggestions regarding this Privacy Policy, contact us at:
          </p>
          <div className="mt-3 p-4 rounded-xl bg-slate-900/60 border border-slate-700/80 text-sm text-slate-300">
            <p className="font-semibold text-emerald-400">Arcloom Tech</p>
            <p>Email: <a href="mailto:support@arcloom.com" className="text-sky-400 underline">support@arcloom.com</a></p>
            <p>Location: Lahore, Pakistan</p>
          </div>
        </div>

      </div>
    </main>
  );
}
