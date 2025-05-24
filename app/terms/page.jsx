import Head from 'next/head';
import Link from 'next/link';

const TermsAndConditionsPage = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Terms and Conditions - Jarvis AI</title>
      </Head>
      <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex">
        {/* Sidebar */}
        <aside className="w-full md:w-1/3 lg:w-1/4 pr-8 mb-8 md:mb-0">
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-blue-500 mb-4">Quick Navigation</h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <Link href="#introduction" className="hover:text-blue-300">
                  Introduction
                </Link>
              </li>
              <li>
                <Link href="#user-eligibility" className="hover:text-blue-300">
                  User Eligibility
                </Link>
              </li>
              <li>
                <Link href="#account-authentication" className="hover:text-blue-300">
                  Account & Authentication
                </Link>
              </li>
              <li>
                <Link href="#acceptable-use" className="hover:text-blue-300">
                  Acceptable Use
                </Link>
              </li>
              <li>
                <Link href="#privacy-data" className="hover:text-blue-300">
                  Privacy & Data Collection
                </Link>
              </li>
              <li>
                <Link href="#intellectual-property" className="hover:text-blue-300">
                  Intellectual Property
                </Link>
              </li>
              <li>
                <Link href="#limitation-liability" className="hover:text-blue-300">
                  Limitation of Liability
                </Link>
              </li>
              <li>
                <Link href="#service-availability" className="hover:text-blue-300">
                  Service Availability
                </Link>
              </li>
              <li>
                <Link href="#termination" className="hover:text-blue-300">
                  Termination
                </Link>
              </li>
              <li>
                <Link href="#changes-terms" className="hover:text-blue-300">
                  Changes to These Terms
                </Link>
              </li>
              <li>
                <Link href="#contact-information" className="hover:text-blue-300">
                  Contact Information
                </Link>
              </li>
            </ul>
          </div>
          {/* You can add more content to the sidebar here */}
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-2/3 lg:w-3/4 bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gray-700 py-6 px-4 sm:px-6">
            <h1 className="text-xl font-semibold text-white text-center">Terms and Conditions</h1>
          </div>
          <div className="bg-gray-800 p-6 sm:p-8">
            <p className="text-gray-300 mb-4"><strong>Effective Date:</strong> April 1, 2025</p>

            <div id="introduction" className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">1. Introduction</h2>
              <p className="text-gray-400 leading-relaxed">Welcome to Jarvis. By using our application, you agree to comply with these Terms and Conditions. If you do not agree, please refrain from using the app.</p>
            </div>

            <div id="user-eligibility" className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">2. User Eligibility</h2>
              <p className="text-gray-400 leading-relaxed">You must be at least 13 years of age to use this app. Users under the age of 18 require permission from a parent or legal guardian.</p>
            </div>

            <div id="account-authentication" className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">3. Account and Authentication</h2>
              <ul className="list-disc ml-6 text-gray-400 leading-relaxed">
                <li>You must provide accurate and current information during sign-in using Google or GitHub.</li>
                <li>You are solely responsible for maintaining the confidentiality and security of your account.</li>
              </ul>
            </div>

            <div id="acceptable-use" className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">4. Acceptable Use</h2>
              <p className="text-gray-400 leading-relaxed">You agree not to engage in the following activities:</p>
              <ul className="list-disc ml-6 text-gray-400 leading-relaxed">
                <li>Using the app for unlawful, harmful, or abusive purposes.</li>
                <li>Accessing or attempting to access the system without authorization.</li>
                <li>Uploading or sharing malicious content, including viruses and phishing schemes.</li>
              </ul>
            </div>

            <div id="privacy-data" className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">5. Privacy and Data Collection</h2>
              <p className="text-gray-400 leading-relaxed">Your use of the app is subject to our <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>, which outlines how your data is collected, used, and protected.</p>
            </div>

            <div id="intellectual-property" className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">6. Intellectual Property</h2>
              <ul className="list-disc ml-6 text-gray-400 leading-relaxed">
                <li>All trademarks, logos, content, and designs are the intellectual property of Jarvis or its licensors.</li>
                <li>You may not reproduce, modify, or distribute any content without prior written consent.</li>
              </ul>
            </div>

            <div id="limitation-liability" className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">7. Limitation of Liability</h2>
              <p className="text-gray-400 leading-relaxed">We are not liable for any direct or indirect damages, including data loss or service interruptions, resulting from your use of the app. Use at your own risk.</p>
            </div>

            <div id="service-availability" className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">8. Service Availability</h2>
              <p className="text-gray-400 leading-relaxed">We reserve the right to update, suspend, or discontinue any part of the app at any time without notice.</p>
            </div>

            <div id="termination" className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">9. Termination</h2>
              <p className="text-gray-400 leading-relaxed">We may restrict or terminate your access to the app if you violate these Terms and Conditions.</p>
            </div>

            <div id="changes-terms" className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">10. Changes to These Terms</h2>
              <p className="text-gray-400 leading-relaxed">We may revise these Terms at any time. Continued use of the app indicates your acceptance of any changes.</p>
            </div>

            <div id="contact-information" className="mb-8">
              <h2 className="text-lg font-semibold text-blue-500 mb-2">11. Contact Information</h2>
              <p className="text-gray-400 leading-relaxed">If you have any questions or concerns, feel free to contact us at <a href="mailto:spark2009971@gmail.com" className="text-blue-400 hover:underline">spark2009971@gmail.com</a>.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export const metadata = {
  title: "J.A.R.V.I.S | Terms",
};
export default TermsAndConditionsPage;