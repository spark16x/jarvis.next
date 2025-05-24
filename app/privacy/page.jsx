import Head from 'next/head';
import Link from 'next/link';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Privacy Policy – JARVIS AI</title>
      </Head>
      <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gray-700 py-6 px-4 sm:px-6">
            <h1 className="text-xl font-semibold text-white text-center">Privacy Policy</h1>
          </div>
          <div className="bg-gray-800 p-6 sm:p-8 text-gray-300">
            <p className="mb-4"><strong>Effective Date:</strong> April 1, 2025</p>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">1. Introduction</h2>
              <p className="leading-relaxed">Welcome to JARVIS AI. Your privacy is important to us. This Privacy Policy outlines the types of personal information we collect, how we use it, and how we protect it.</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">2. Information We Collect</h2>
              <p className="leading-relaxed">We collect minimal data necessary to provide our services, such as:</p>
              <ul className="list-disc ml-6 leading-relaxed">
                <li>Google or GitHub sign-in credentials (OAuth only)</li>
                <li>User preferences and settings</li>
                <li>Calendar and task data (if access is granted)</li>
                <li>Interaction history (for AI context awareness)</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">3. How We Use Your Information</h2>
              <p className="leading-relaxed">Your information is used to:</p>
              <ul className="list-disc ml-6 leading-relaxed">
                <li>Personalize and improve the app experience</li>
                <li>Enable voice and assistant functionality</li>
                <li>Sync your tasks, calendar, and preferences</li>
                <li>Provide support and service updates</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">4. Data Sharing and Security</h2>
              <p className="leading-relaxed">We do not sell or share your data with third parties, except as required by law. We use modern encryption and secure protocols to protect your data, but no system is completely secure.</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">5. Your Rights</h2>
              <ul className="list-disc ml-6 leading-relaxed">
                <li>You may revoke access from your Google or GitHub settings.</li>
                <li>You can request data deletion by contacting us directly.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">6. Cookies</h2>
              <p className="leading-relaxed">We may use cookies for functionality and analytics. You may disable cookies via your browser settings.</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">7. Changes to This Policy</h2>
              <p className="leading-relaxed">We may update this Privacy Policy. If we do, we will revise the effective date above and notify users through the app if needed.</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">8. Contact Us</h2>
              <p className="leading-relaxed">If you have any questions about this Privacy Policy, please email us at <Link href="mailto:spark2009971@gmail.com" className="text-blue-400 hover:underline">spark2009971@gmail.com</Link>.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const metadata = {
  title: "J.A.R.V.I.S | Privacy",
};
export default PrivacyPolicyPage;