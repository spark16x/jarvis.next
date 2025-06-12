import Head from 'next/head';

const CookiePolicyPage = () => {
  return (
    <>
      <body className="bg-gray-900 text-white font-sans px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-blue-500">🍪 Cookie Policy</h1>
          <p className="text-gray-300 mb-4">Last updated: <strong>May 7, 2025</strong></p>

          <p className="text-gray-300 mb-6">
            This Cookie Policy explains how <strong>Jarvis AI</strong> ("we", "our", or "us") uses cookies and similar technologies when you visit our website or use our services.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-2">1. What Are Cookies?</h2>
          <p className="text-gray-300 mb-6">
            Cookies are small text files stored on your device when you visit a website. They help us improve your experience, remember your preferences, and analyze how our site is used.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-2">2. Why We Use Cookies</h2>
          <ul className="list-disc list-inside text-gray-300 mb-6">
            <li>Remember you when you log in</li>
            <li>Save your settings and preferences (like themes or avatars)</li>
            <li>Analyze traffic and performance using tools like Google Analytics</li>
            <li>Enable features such as voice control or personalized dashboards</li>
            <li>Show relevant ads if applicable</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mb-2">3. Types of Cookies We Use</h2>
          <table className="w-full text-left text-gray-300 mb-6 border border-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3 border border-gray-700">Type</th>
                <th className="p-3 border border-gray-700">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-850">
                <td className="p-3 border border-gray-700">Essential</td>
                <td className="p-3 border border-gray-700">Required for website functionality (e.g., login, navigation)</td>
              </tr>
              <tr className="bg-gray-900">
                <td className="p-3 border border-gray-700">Functional</td>
                <td className="p-3 border border-gray-700">Stores preferences like language or theme</td>
              </tr>
              <tr className="bg-gray-850">
                <td className="p-3 border border-gray-700">Analytics</td>
                <td className="p-3 border border-gray-700">Helps us understand how you use our site</td>
              </tr>
              <tr className="bg-gray-900">
                <td className="p-3 border border-gray-700">Advertising</td>
                <td className="p-3 border border-gray-700">Delivers ads that are relevant to you</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-2xl font-semibold text-white mb-2">4. Third-Party Cookies</h2>
          <p className="text-gray-300 mb-6">
            We may allow trusted third-party services (like Google or Supabase) to place cookies. These providers may use their own cookies to collect data.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-2">5. Your Choices</h2>
          <ul className="list-disc list-inside text-gray-300 mb-6">
            <li>Accept or reject non-essential cookies via our cookie banner</li>
            <li>Control cookies through your browser settings</li>
            <li>Delete cookies at any time via your device</li>
          </ul>
          <p className="text-gray-400 mb-6">
            <em>Note: Disabling cookies may affect your user experience.</em>
          </p>

          <h2 className="text-2xl font-semibold text-white mb-2">6. Changes to This Policy</h2>
          <p className="text-gray-300">
            We may update this Cookie Policy to reflect changes in our practices or legal requirements. Updates will be posted on this page with a new "Last updated" date.
          </p>
        </div>
      </body>
    </>
  );
};
export const metadata = {
  title: "J.A.R.V.I.S | Cookies",
};
export default CookiePolicyPage;