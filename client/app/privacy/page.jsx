import Link from 'next/link';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-zinc-950 text-zinc-300 min-h-screen py-16 px-6 selection:bg-zinc-800 selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[300px] radial-glow pointer-events-none -z-10 opacity-50"></div>

      <div className="max-w-2xl mx-auto space-y-8">
        <header className="space-y-3">
          <Link href="/" className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition">
            ← Back to HQ
          </Link>
          <h1 className="text-3xl font-semibold text-white tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-zinc-500 font-mono">Effective Date: April 1, 2025</p>
        </header>

        <section className="space-y-4 text-sm leading-relaxed text-zinc-400">
          <p>
            Welcome to JARVIS AI. Your privacy is important to us. This Privacy Policy outlines the types of personal information we collect, how we use it, and how we protect it.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">1. Introduction</h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            This Policy covers the usage of Jarvis next, a virtual assistant developed for automation and integration. By accessing the system, you authorize the data processing rules defined below.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">2. Information We Collect</h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            We collect minimal data necessary to provide our services, such as:
          </p>
          <ul className="list-disc list-inside text-sm leading-relaxed text-zinc-400 space-y-1 pl-1">
            <li>Google or GitHub sign-in credentials (OAuth only)</li>
            <li>User preferences and settings</li>
            <li>Calendar and task data (if access is granted)</li>
            <li>Interaction history (for AI context awareness)</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">3. How We Use Your Information</h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            Your information is used to:
          </p>
          <ul className="list-disc list-inside text-sm leading-relaxed text-zinc-400 space-y-1 pl-1">
            <li>Personalize and improve the app experience</li>
            <li>Enable voice and assistant functionality</li>
            <li>Sync your tasks, calendar, and preferences</li>
            <li>Provide support and service updates</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">4. Data Sharing and Security</h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            We do not sell or share your data with third parties, except as required by law. We use modern encryption and secure protocols to protect your data, but no system is completely secure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">5. Your Rights</h2>
          <ul className="list-disc list-inside text-sm leading-relaxed text-zinc-400 space-y-1 pl-1">
            <li>You may revoke access from your Google or GitHub settings.</li>
            <li>You can request data deletion by contacting us directly.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">6. Cookies</h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            We may use cookies for functionality and analytics. You may disable cookies via your browser settings. Refer to our <Link href="/cookies" className="text-zinc-200 underline hover:text-white">Cookie Policy</Link> for details.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">7. Changes to This Policy</h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            We may update this Privacy Policy. If we do, we will revise the effective date above and notify users through the app if needed.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">8. Contact Us</h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            If you have any questions about this Privacy Policy, please email us at{' '}
            <Link href="mailto:spark2009971@gmail.com" className="text-zinc-100 underline hover:text-white transition">
              spark2009971@gmail.com
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
};

export const metadata = {
  title: "Jarvis next | Privacy",
};

export default PrivacyPolicyPage;