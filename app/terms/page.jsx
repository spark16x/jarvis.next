import Head from 'next/head';

const TermsAndConditionsPage = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Terms and Conditions</title>
      </Head>
      <body className="font-sans bg-gray-100 text-gray-800">
        <div className="container mx-auto mt-12 p-6 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-bold text-center mb-4">Terms and Conditions</h1>
          <p><strong>Effective Date:</strong> April 1, 2025</p>

          <div className="section mt-6">
            <h2 className="text-xl font-semibold mt-8 mb-2 text-center">1. Introduction</h2>
            <p className="text-base">Welcome to Jarvis. By using our application, you agree to comply with these Terms and Conditions. If you do not agree, please refrain from using the app.</p>
          </div>

          <div className="section mt-6">
            <h2 className="text-xl font-semibold mt-8 mb-2 text-center">2. User Eligibility</h2>
            <p className="text-base">You must be at least 13 years of age to use this app. Users under the age of 18 require permission from a parent or legal guardian.</p>
          </div>

          <div className="section mt-6">
            <h2 className="text-xl font-semibold mt-8 mb-2 text-center">3. Account and Authentication</h2>
            <ul className="list-disc ml-6">
              <li className="text-base">You must provide accurate and current information during sign-in using Google or GitHub.</li>
              <li className="text-base">You are solely responsible for maintaining the confidentiality and security of your account.</li>
            </ul>
          </div>

          <div className="section mt-6">
            <h2 className="text-xl font-semibold mt-8 mb-2 text-center">4. Acceptable Use</h2>
            <p className="text-base">You agree not to engage in the following activities:</p>
            <ul className="list-disc ml-6">
              <li className="text-base">Using the app for unlawful, harmful, or abusive purposes.</li>
              <li className="text-base">Accessing or attempting to access the system without authorization.</li>
              <li className="text-base">Uploading or sharing malicious content, including viruses and phishing schemes.</li>
            </ul>
          </div>

          <div className="section mt-6">
            <h2 className="text-xl font-semibold mt-8 mb-2 text-center">5. Privacy and Data Collection</h2>
            <p className="text-base">Your use of the app is subject to our Privacy Policy, which outlines how your data is collected, used, and protected.</p>
          </div>

          <div className="section mt-6">
            <h2 className="text-xl font-semibold mt-8 mb-2 text-center">6. Intellectual Property</h2>
            <ul className="list-disc ml-6">
              <li className="text-base">All trademarks, logos, content, and designs are the intellectual property of Jarvis or its licensors.</li>
              <li className="text-base">You may not reproduce, modify, or distribute any content without prior written consent.</li>
            </ul>
          </div>

          <div className="section mt-6">
            <h2 className="text-xl font-semibold mt-8 mb-2 text-center">7. Limitation of Liability</h2>
            <p className="text-base">We are not liable for any direct or indirect damages, including data loss or service interruptions, resulting from your use of the app. Use at your own risk.</p>
          </div>

          <div className="section mt-6">
            <h2 className="text-xl font-semibold mt-8 mb-2 text-center">8. Service Availability</h2>
            <p className="text-base">We reserve the right to update, suspend, or discontinue any part of the app at any time without notice.</p>
          </div>

          <div className="section mt-6">
            <h2 className="text-xl font-semibold mt-8 mb-2 text-center">9. Termination</h2>
            <p className="text-base">We may restrict or terminate your access to the app if you violate these Terms and Conditions.</p>
          </div>

          <div className="section mt-6">
            <h2 className="text-xl font-semibold mt-8 mb-2 text-center">10. Changes to These Terms</h2>
            <p className="text-base">We may revise these Terms at any time. Continued use of the app indicates your acceptance of any changes.</p>
          </div>

          <div className="section mt-6">
            <h2 className="text-xl font-semibold mt-8 mb-2 text-center">11. Contact Information</h2>
            <p className="text-base">If you have any questions or concerns, feel free to contact us at <a href="mailto:spark2009971@gmail.com" className="text-blue-500 hover:underline">spark2009971@gmail.com</a>.</p>
          </div>
        </div>
      </body>
    </>
  );
};

export default TermsAndConditionsPage;