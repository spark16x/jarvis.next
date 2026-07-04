import Link from 'next/link';

const TermsAndConditionsPage = () => {
  return (
    <div className="bg-zinc-950 text-zinc-300 min-h-screen py-16 px-6 selection:bg-zinc-800 selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[300px] radial-glow pointer-events-none -z-10 opacity-50"></div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 md:sticky md:top-24 h-fit">
          <div className="border border-zinc-900 bg-zinc-900/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-mono tracking-wider text-zinc-500 uppercase">Quick Nav</h3>
            <ul className="text-xs font-mono space-y-2.5">
              <li><Link href="#introduction" className="text-zinc-400 hover:text-white transition">01 / Introduction</Link></li>
              <li><Link href="#user-eligibility" className="text-zinc-400 hover:text-white transition">02 / User Eligibility</Link></li>
              <li><Link href="#account-authentication" className="text-zinc-400 hover:text-white transition">03 / Credentials</Link></li>
              <li><Link href="#acceptable-use" className="text-zinc-400 hover:text-white transition">04 / Acceptable Use</Link></li>
              <li><Link href="#privacy-data" className="text-zinc-400 hover:text-white transition">05 / Privacy & Data</Link></li>
              <li><Link href="#intellectual-property" className="text-zinc-400 hover:text-white transition">06 / IP Rights</Link></li>
              <li><Link href="#limitation-liability" className="text-zinc-400 hover:text-white transition">07 / Liability Limits</Link></li>
              <li><Link href="#service-availability" className="text-zinc-400 hover:text-white transition">08 / Availability</Link></li>
              <li><Link href="#termination" className="text-zinc-400 hover:text-white transition">09 / Termination</Link></li>
              <li><Link href="#changes-terms" className="text-zinc-400 hover:text-white transition">10 / Terms Changes</Link></li>
              <li><Link href="#contact-information" className="text-zinc-400 hover:text-white transition">11 / Contact</Link></li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8 max-w-2xl">
          <header className="space-y-3">
            <Link href="/" className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition">
              ← Back to HQ
            </Link>
            <h1 className="text-3xl font-semibold text-white tracking-tight">Terms and Conditions</h1>
            <p className="text-xs text-zinc-500 font-mono">Effective Date: April 1, 2025</p>
          </header>

          <div className="space-y-8 text-sm leading-relaxed text-zinc-400">
            <div id="introduction" className="space-y-2">
              <h2 className="text-base font-semibold text-white font-mono">1. Introduction</h2>
              <p>Welcome to Jarvis. By using our application, you agree to comply with these Terms and Conditions. If you do not agree, please refrain from using the app.</p>
            </div>

            <div id="user-eligibility" className="space-y-2">
              <h2 className="text-base font-semibold text-white font-mono">2. User Eligibility</h2>
              <p>You must be at least 13 years of age to use this app. Users under the age of 18 require permission from a parent or legal guardian.</p>
            </div>

            <div id="account-authentication" className="space-y-2">
              <h2 className="text-base font-semibold text-white font-mono">3. Account and Authentication</h2>
              <ul className="list-disc list-inside space-y-1 pl-1">
                <li>You must provide accurate and current information during sign-in using Google or GitHub.</li>
                <li>You are solely responsible for maintaining the confidentiality and security of your account.</li>
              </ul>
            </div>

            <div id="acceptable-use" className="space-y-2">
              <h2 className="text-base font-semibold text-white font-mono">4. Acceptable Use</h2>
              <p>You agree not to engage in the following activities:</p>
              <ul className="list-disc list-inside space-y-1 pl-1">
                <li>Using the app for unlawful, harmful, or abusive purposes.</li>
                <li>Accessing or attempting to access the system without authorization.</li>
                <li>Uploading or sharing malicious content, including viruses and phishing schemes.</li>
              </ul>
            </div>

            <div id="privacy-data" className="space-y-2">
              <h2 className="text-base font-semibold text-white font-mono">5. Privacy and Data Collection</h2>
              <p>Your use of the app is subject to our <Link href="/privacy" className="text-zinc-200 underline hover:text-white">Privacy Policy</Link>, which outlines how your data is collected, used, and protected.</p>
            </div>

            <div id="intellectual-property" className="space-y-2">
              <h2 className="text-base font-semibold text-white font-mono">6. Intellectual Property</h2>
              <ul className="list-disc list-inside space-y-1 pl-1">
                <li>All trademarks, logos, content, and designs are the intellectual property of Jarvis or its licensors.</li>
                <li>You may not reproduce, modify, or distribute any content without prior written consent.</li>
              </ul>
            </div>

            <div id="limitation-liability" className="space-y-2">
              <h2 className="text-base font-semibold text-white font-mono">7. Limitation of Liability</h2>
              <p>We are not liable for any direct or indirect damages, including data loss or service interruptions, resulting from your use of the app. Use at your own risk.</p>
            </div>

            <div id="service-availability" className="space-y-2">
              <h2 className="text-base font-semibold text-white font-mono">8. Service Availability</h2>
              <p>We reserve the right to update, suspend, or discontinue any part of the app at any time without notice.</p>
            </div>

            <div id="termination" className="space-y-2">
              <h2 className="text-base font-semibold text-white font-mono">9. Termination</h2>
              <p>We may restrict or terminate your access to the app if you violate these Terms and Conditions.</p>
            </div>

            <div id="changes-terms" className="space-y-2">
              <h2 className="text-base font-semibold text-white font-mono">10. Changes to These Terms</h2>
              <p>We may revise these Terms at any time. Continued use of the app indicates your acceptance of any changes.</p>
            </div>

            <div id="contact-information" className="space-y-2">
              <h2 className="text-base font-semibold text-white font-mono">11. Contact Information</h2>
              <p>If you have any questions or concerns, feel free to contact us at{' '}
                <Link href="mailto:spark2009971@gmail.com" className="text-zinc-100 underline hover:text-white transition">
                  spark2009971@gmail.com
                </Link>.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export const metadata = {
  title: "Jarvis next | Terms",
};

export default TermsAndConditionsPage;