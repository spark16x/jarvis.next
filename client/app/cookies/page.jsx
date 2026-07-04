import Link from 'next/link';

const CookiePolicyPage = () => {
  return (
    <div className="bg-zinc-950 text-zinc-300 min-h-screen py-16 px-6 selection:bg-zinc-800 selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[300px] radial-glow pointer-events-none -z-10 opacity-50"></div>

      <div className="max-w-2xl mx-auto space-y-8">
        <header className="space-y-3">
          <Link href="/" className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition">
            ← Back to HQ
          </Link>
          <h1 className="text-3xl font-semibold text-white tracking-tight">Cookie Policy</h1>
          <p className="text-xs text-zinc-500 font-mono">Last updated: May 7, 2025</p>
        </header>

        <section className="space-y-4 text-sm leading-relaxed text-zinc-400">
          <p>
            This Cookie Policy explains how <strong className="text-zinc-200">Jarvis AI</strong> ("we", "our", or "us") uses cookies and similar technologies when you visit our website or use our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">1. What Are Cookies?</h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            Cookies are small text files stored on your device when you visit a website. They help us improve your experience, remember your preferences, and analyze how our site is used.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">2. Why We Use Cookies</h2>
          <ul className="list-disc list-inside text-sm leading-relaxed text-zinc-400 space-y-1 pl-1">
            <li>Remember you when you log in</li>
            <li>Save your settings and preferences (like themes or avatars)</li>
            <li>Analyze traffic and performance using tools like Google Analytics</li>
            <li>Enable features such as voice control or personalized dashboards</li>
            <li>Show relevant ads if applicable</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">3. Types of Cookies We Use</h2>
          <div className="overflow-x-auto border border-zinc-900 rounded-xl bg-zinc-900/10">
            <table className="w-full text-left text-xs font-mono text-zinc-400 border-collapse">
              <thead>
                <tr className="border-b border-zinc-900 bg-zinc-900/30 text-zinc-500">
                  <th className="p-3.5 font-medium">Type</th>
                  <th className="p-3.5 font-medium">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                <tr className="hover:bg-zinc-900/20">
                  <td className="p-3.5 font-semibold text-zinc-300">Essential</td>
                  <td className="p-3.5 text-zinc-400">Required for website functionality (e.g., login, navigation)</td>
                </tr>
                <tr className="hover:bg-zinc-900/20">
                  <td className="p-3.5 font-semibold text-zinc-300">Functional</td>
                  <td className="p-3.5 text-zinc-400">Stores preferences like language or theme</td>
                </tr>
                <tr className="hover:bg-zinc-900/20">
                  <td className="p-3.5 font-semibold text-zinc-300">Analytics</td>
                  <td className="p-3.5 text-zinc-400">Helps us understand how you use our site</td>
                </tr>
                <tr className="hover:bg-zinc-900/20">
                  <td className="p-3.5 font-semibold text-zinc-300">Advertising</td>
                  <td className="p-3.5 text-zinc-400">Delivers ads that are relevant to you</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">4. Third-Party Cookies</h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            We may allow trusted third-party services (like Google or Supabase) to place cookies. These providers may use their own cookies to collect data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">5. Your Choices</h2>
          <ul className="list-disc list-inside text-sm leading-relaxed text-zinc-400 space-y-1 pl-1">
            <li>Accept or reject non-essential cookies via our cookie banner</li>
            <li>Control cookies through your browser settings</li>
            <li>Delete cookies at any time via your device</li>
          </ul>
          <p className="text-xs text-zinc-500 font-mono italic">
            Note: Disabling cookies may affect your user experience.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">6. Changes to This Policy</h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            We may update this Cookie Policy to reflect changes in our practices or legal requirements. Updates will be posted on this page with a new "Last updated" date.
          </p>
        </section>
      </div>
    </div>
  );
};

export const metadata = {
  title: "Jarvis next | Cookies",
};

export default CookiePolicyPage;