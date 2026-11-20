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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-700/60 text-slate-300 border border-slate-600/40">
            Privacy &amp; Security Policy
          </span>
          <span className="text-xs text-slate-400">Last updated: November 20, 2026</span>
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
            <strong>BillCheck PK is an independent utility application developed by Arcloom Tech.</strong>
          </p>
          <ul className="list-disc list-inside text-xs sm:text-sm space-y-1.5 text-amber-100/90 mb-4">
            <li>This app does <strong>NOT</strong> represent and is <strong>NOT</strong> affiliated with, endorsed by, authorized by, or officially connected with the Government of Pakistan, Ministry of Energy (Power Division), WAPDA, PEPCO, PITC, NEPRA, OGRA, or any government or private utility company.</li>
            <li>The application acts solely as a convenient mobile viewer for publicly accessible online billing portals. All trademarks, company names, and logos belong to their respective registered owners.</li>
          </ul>

          <div className="p-3 mb-4 rounded-lg bg-amber-950/40 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed" dir="rtl">
            <strong>اہم وضاحت (Urdu):</strong> یہ ایپ ایک نجی و آزاد یوٹیلیٹی ٹول ہے۔ اس کا حکومتِ پاکستان، وزارتِ توانائی، یا کسی بھی سرکاری ڈسکوز کمپنی سے کوئی باضابطہ الحاق یا نمائندگی نہیں ہے۔ یہ ایپ صرف عوامی طور پر دستیاب ویب پورٹلز سے صارف کو اس کا جائز بل دکھانے میں مدد فراہم کرتی ہے۔
          </div>

          <h3 className="text-sm font-bold text-amber-300 mb-2">
            Official Sources of Government &amp; Utility Information:
          </h3>
          <p className="text-xs text-amber-100/80 mb-2">
            Bill information is retrieved directly from publicly accessible online portals operated by the respective utility providers:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-amber-100/90 font-mono">
            <div>• PITC: <a href="https://bill.pitc.com.pk/" target="_blank" rel="noreferrer" className="underline text-sky-400">bill.pitc.com.pk</a></div>
            <div>• LESCO: <a href="https://bill.pitc.com.pk/lescobill" target="_blank" rel="noreferrer" className="underline text-sky-400">bill.pitc.com.pk/lescobill</a></div>
            <div>• IESCO: <a href="https://bill.pitc.com.pk/iescobill" target="_blank" rel="noreferrer" className="underline text-sky-400">bill.pitc.com.pk/iescobill</a></div>
            <div>• FESCO: <a href="https://bill.pitc.com.pk/fescobill" target="_blank" rel="noreferrer" className="underline text-sky-400">bill.pitc.com.pk/fescobill</a></div>
            <div>• MEPCO: <a href="https://bill.pitc.com.pk/mepcobill" target="_blank" rel="noreferrer" className="underline text-sky-400">bill.pitc.com.pk/mepcobill</a></div>
            <div>• GEPCO: <a href="https://bill.pitc.com.pk/gepcobill" target="_blank" rel="noreferrer" className="underline text-sky-400">bill.pitc.com.pk/gepcobill</a></div>
            <div>• PESCO: <a href="https://bill.pitc.com.pk/pescobill" target="_blank" rel="noreferrer" className="underline text-sky-400">bill.pitc.com.pk/pescobill</a></div>
            <div>• HESCO: <a href="https://bill.pitc.com.pk/hescobill" target="_blank" rel="noreferrer" className="underline text-sky-400">bill.pitc.com.pk/hescobill</a></div>
            <div>• SEPCO: <a href="https://bill.pitc.com.pk/sepcobill" target="_blank" rel="noreferrer" className="underline text-sky-400">bill.pitc.com.pk/sepcobill</a></div>
            <div>• QESCO: <a href="https://bill.pitc.com.pk/qescobill" target="_blank" rel="noreferrer" className="underline text-sky-400">bill.pitc.com.pk/qescobill</a></div>
            <div>• TESCO: <a href="https://bill.pitc.com.pk/tescobill" target="_blank" rel="noreferrer" className="underline text-sky-400">bill.pitc.com.pk/tescobill</a></div>
            <div>• K-Electric: <a href="https://www.ke.com.pk/customer-services/bill-and-e-services/" target="_blank" rel="noreferrer" className="underline text-sky-400">ke.com.pk</a></div>
            <div>• SNGPL: <a href="https://www.sngpl.com.pk/" target="_blank" rel="noreferrer" className="underline text-sky-400">sngpl.com.pk</a></div>
            <div>• SSGC: <a href="https://viewbill.ssgc.com.pk/" target="_blank" rel="noreferrer" className="underline text-sky-400">viewbill.ssgc.com.pk</a></div>
          </div>
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
            4. Data Retention &amp; User Data Deletion
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-2">
            You retain 100% control over your data. Because all account references and meter numbers are saved strictly on your local device, you can delete all saved records, history, and cached bills at any time by tapping <em>&quot;Clear Saved Bills &amp; Reset App&quot;</em> in the App Settings, or by clearing app storage / uninstalling the app from Android Settings.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            For any queries or if you wish to request the manual erasure of any support correspondence, you may contact our privacy desk at <a href="mailto:support@arcloom.com" className="text-sky-400 underline">support@arcloom.com</a>.
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
