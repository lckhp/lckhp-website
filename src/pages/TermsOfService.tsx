import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const TermsOfService = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">
            Terms of Service
          </h1>

          <div className="rounded-lg bg-white p-8 shadow-md">
            <div className="space-y-6">
              <section>
                <h2 className="mb-3 text-xl font-semibold text-green-700">
                  Introduction
                </h2>
                <p className="text-gray-700">
                  These Terms of Service ("Terms") govern your use of the Leo
                  Club of Kathmandu Himalayas Patan website ("Service"). Please
                  read these Terms carefully before using our Service.
                </p>
                <p className="mt-2 text-gray-700">
                  By accessing or using the Service, you agree to be bound by
                  these Terms. If you disagree with any part of the terms, then
                  you may not access the Service.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold text-green-700">
                  Use License
                </h2>
                <p className="text-gray-700">
                  Permission is granted to temporarily view the materials
                  (information or software) on Leo Club of Kathmandu Himalayas
                  Patan's website for personal, non-commercial transitory
                  viewing only. This is the grant of a license, not a transfer
                  of title, and under this license you may not:
                </p>
                <ul className="ml-6 mt-2 list-disc space-y-1 text-gray-700">
                  <li>Modify or copy the materials;</li>
                  <li>
                    Use the materials for any commercial purpose, or for any
                    public display (commercial or non-commercial);
                  </li>
                  <li>
                    Attempt to decompile or reverse engineer any software
                    contained on Leo Club of Kathmandu Himalayas Patan's
                    website;
                  </li>
                  <li>
                    Remove any copyright or other proprietary notations from the
                    materials; or
                  </li>
                  <li>
                    Transfer the materials to another person or "mirror" the
                    materials on any other server.
                  </li>
                </ul>
                <p className="mt-2 text-gray-700">
                  This license shall automatically terminate if you violate any
                  of these restrictions and may be terminated by Leo Club of
                  Kathmandu Himalayas Patan at any time.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold text-green-700">
                  Disclaimer
                </h2>
                <p className="text-gray-700">
                  The materials on Leo Club of Kathmandu Himalayas Patan's
                  website are provided on an 'as is' basis. Leo Club of
                  Kathmandu Himalayas Patan makes no warranties, expressed or
                  implied, and hereby disclaims and negates all other warranties
                  including, without limitation, implied warranties or
                  conditions of merchantability, fitness for a particular
                  purpose, or non-infringement of intellectual property or other
                  violation of rights.
                </p>
                <p className="mt-2 text-gray-700">
                  Further, Leo Club of Kathmandu Himalayas Patan does not
                  warrant or make any representations concerning the accuracy,
                  likely results, or reliability of the use of the materials on
                  its website or otherwise relating to such materials or on any
                  sites linked to this site.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold text-green-700">
                  Limitations
                </h2>
                <p className="text-gray-700">
                  In no event shall Leo Club of Kathmandu Himalayas Patan or its
                  suppliers be liable for any damages (including, without
                  limitation, damages for loss of data or profit, or due to
                  business interruption) arising out of the use or inability to
                  use the materials on Leo Club of Kathmandu Himalayas Patan's
                  website, even if Leo Club of Kathmandu Himalayas Patan or a
                  Leo Club of Kathmandu Himalayas Patan authorized
                  representative has been notified orally or in writing of the
                  possibility of such damage.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold text-green-700">
                  Accuracy of Materials
                </h2>
                <p className="text-gray-700">
                  The materials appearing on Leo Club of Kathmandu Himalayas
                  Patan's website could include technical, typographical, or
                  photographic errors. Leo Club of Kathmandu Himalayas Patan
                  does not warrant that any of the materials on its website are
                  accurate, complete or current. Leo Club of Kathmandu Himalayas
                  Patan may make changes to the materials contained on its
                  website at any time without notice.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold text-green-700">
                  Links
                </h2>
                <p className="text-gray-700">
                  Leo Club of Kathmandu Himalayas Patan has not reviewed all of
                  the sites linked to its website and is not responsible for the
                  contents of any such linked site. The inclusion of any link
                  does not imply endorsement by Leo Club of Kathmandu Himalayas
                  Patan of the site. Use of any such linked website is at the
                  user's own risk.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold text-green-700">
                  Modifications
                </h2>
                <p className="text-gray-700">
                  Leo Club of Kathmandu Himalayas Patan may revise these terms
                  of service for its website at any time without notice. By
                  using this website you are agreeing to be bound by the then
                  current version of these terms of service.
                </p>
                <p className="mt-2 text-gray-700">
                  Last updated: June 12, 2024
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold text-green-700">
                  Governing Law
                </h2>
                <p className="text-gray-700">
                  These terms and conditions are governed by and construed in
                  accordance with the laws of Nepal and you irrevocably submit
                  to the exclusive jurisdiction of the courts in that State or
                  location.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold text-green-700">
                  Contact Us
                </h2>
                <p className="text-gray-700">
                  If you have any questions about these Terms, please contact us
                  at:
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

export default TermsOfService;
