import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">
            Privacy Policy
          </h1>

          <div className="rounded-lg bg-white p-8 shadow-md">
            <div className="space-y-6">
              <section>
                <h2 className="mb-3 text-xl font-semibold text-green-700">
                  Introduction
                </h2>
                <p className="text-gray-700">
                  Leo Club of Kathmandu Himalayas Patan ("we," "our," or "us")
                  respects your privacy and is committed to protecting your
                  personal data. This privacy policy will inform you about how
                  we look after your personal data when you visit our website
                  and tell you about your privacy rights and how the law
                  protects you.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold text-green-700">
                  Information We Collect
                </h2>
                <p className="text-gray-700">
                  We may collect, use, store, and transfer different kinds of
                  personal data about you, including:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-gray-700">
                  <li>
                    Identity Data: includes first name, last name, username or
                    similar identifier.
                  </li>
                  <li>
                    Contact Data: includes email address and telephone numbers.
                  </li>
                  <li>
                    Technical Data: includes internet protocol (IP) address,
                    browser type and version, time zone setting and location,
                    browser plug-in types and versions, operating system and
                    platform.
                  </li>
                  <li>
                    Usage Data: includes information about how you use our
                    website.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold text-green-700">
                  How We Use Your Information
                </h2>
                <p className="text-gray-700">
                  We will only use your personal data when the law allows us to.
                  Most commonly, we will use your personal data in the following
                  circumstances:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-gray-700">
                  <li>To provide and maintain our service.</li>
                  <li>To notify you about changes to our service.</li>
                  <li>
                    To allow you to participate in interactive features of our
                    service when you choose to do so.
                  </li>
                  <li>To provide customer support.</li>
                  <li>
                    To gather analysis or valuable information so that we can
                    improve our service.
                  </li>
                  <li>To monitor the usage of our service.</li>
                  <li>To detect, prevent and address technical issues.</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold text-green-700">
                  Cookies
                </h2>
                <p className="text-gray-700">
                  Cookies are files with a small amount of data which may
                  include an anonymous unique identifier. Cookies are sent to
                  your browser from a website and stored on your device. You can
                  instruct your browser to refuse all cookies or to indicate
                  when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold text-green-700">
                  Data Security
                </h2>
                <p className="text-gray-700">
                  We have put in place appropriate security measures to prevent
                  your personal data from being accidentally lost, used, or
                  accessed in an unauthorized way, altered, or disclosed.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold text-green-700">
                  Your Legal Rights
                </h2>
                <p className="text-gray-700">
                  Under certain circumstances, you have rights under data
                  protection laws in relation to your personal data, including
                  the right to:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-gray-700">
                  <li>Request access to your personal data.</li>
                  <li>Request correction of your personal data.</li>
                  <li>Request erasure of your personal data.</li>
                  <li>Object to processing of your personal data.</li>
                  <li>Request restriction of processing your personal data.</li>
                  <li>Request transfer of your personal data.</li>
                  <li>Right to withdraw consent.</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold text-green-700">
                  Changes to This Privacy Policy
                </h2>
                <p className="text-gray-700">
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "last updated" date.
                </p>
                <p className="mt-2 text-gray-700">
                  Last updated: June 12, 2024
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold text-green-700">
                  Contact Us
                </h2>
                <p className="text-gray-700">
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                </p>
                <p className="mt-2 text-gray-700">
                  <strong>Email:</strong> info@lckhp.org
                  <br />
                  <strong>Phone:</strong> +977 9869375899
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
