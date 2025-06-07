import { useParams } from "react-router-dom";
import certificatesData from "../assets/certificates/json/certificates.json";
import { useEffect, useState, useRef } from "react";
import GoHomeButton from "../components/GoHomeButton";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import QRCode from "react-qr-code";
import gsap from "gsap";
import Header from "./Header";
import Footer from "./Footer";

const CertificateView = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageError, setImageError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();
  const [verificationUrl, setVerificationUrl] = useState<string>("");

  const certificate = certificatesData.certificates.find(
    (cert) => cert.uuid === uuid
  );

  const sanitizeFilename = (str: string) =>
    str.replace(/[^a-z0-9]/gi, "_").toLowerCase();

  useEffect(() => {
    // Set the verification URL for QR code
    if (window.location) {
      setVerificationUrl(window.location.href);
    }

    if (!certificate || !certificate.folder) return;
    setIsLoading(true);
    setShowConfetti(false);

    const images = import.meta.glob(
      "../assets/certificates/images/**/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp,WEBP}"
    );

    const imageName = `${certificate.uuid}.png`;
    const fullPath = `../assets/certificates/images/${certificate.folder}/${imageName}`;

    if (images[fullPath]) {
      images[fullPath]().then((mod: any) => {
        setImageSrc(mod.default);
        setImageError(false);
        setTimeout(() => {
          setIsLoading(false);
          setShowConfetti(true);

          // Stop confetti after 5 seconds
          setTimeout(() => {
            setShowConfetti(false);
          }, 5000);
        }, 500);
      });
    } else {
      setImageSrc(null);
      setImageError(true);
      setIsLoading(false);
    }
  }, [certificate]);

  const handleDownloadImage = () => {
    if (!imageSrc || !certificate) return;

    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = `LCKHP-${sanitizeFilename(
      certificate.certificateType
    )}-${sanitizeFilename(certificate.name)}-${certificate.issuedDate}.png`;
    link.click();
  };

  const handleShareCertificate = () => {
    if (navigator.share && certificate) {
      navigator
        .share({
          title: `${certificate.certificateType} - ${certificate.name}`,
          text: `Check out this certificate awarded to ${certificate.name} by ${certificate.issuer}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Certificate link copied to clipboard!");
    }
  };

  if (!uuid || !certificate) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white text-center px-4 flex-grow">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              Sorry, the certificate you are looking for does not exist!
            </h1>
            <GoHomeButton variant="secondary" className="mt-6" />
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Using a single container with the pattern background for both content and footer */}
      <div className="flex-grow flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 relative">
        {/* Background pattern that covers everything */}
        <div
          className="absolute inset-0 bg-repeat opacity-5 z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: "100px 100px",
          }}
        />

        {/* Main content area with padding */}
        <div className="flex-grow py-12 px-4 relative z-10">
          {showConfetti && (
            <Confetti
              width={width}
              height={height}
              recycle={false}
              numberOfPieces={300}
              gravity={0.15}
            />
          )}

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 text-center">
              <motion.h1
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Certificate of {certificate.certificateType.split(" ").pop()}
              </motion.h1>
              <motion.div
                className="h-1 w-24 bg-green-600 mx-auto rounded-full mb-4"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              />
              <motion.p
                className="text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Issued by{" "}
                <span className="font-semibold">{certificate.issuer}</span>
              </motion.p>
            </div>

            <motion.div
              ref={certificateRef}
              id="certificate"
              className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-200"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.01 }}
              layout
            >
              {/* Decorative seal watermark */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full border-8 border-green-600 opacity-10 z-0"></div>
              <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full border-4 border-green-600 opacity-10 z-0"></div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full border-2 border-green-600 opacity-10 z-0"></div>

              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-green-600 rounded-tl-lg z-10" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-green-600 rounded-tr-lg z-10" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-green-600 rounded-bl-lg z-10" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-green-600 rounded-br-lg z-10" />

              {/* Decorative ribbon */}
              <div className="absolute -right-14 top-8 w-52 h-8 bg-green-600 rotate-45 shadow-md z-10 flex items-center justify-center">
                <span className="text-white text-xs font-semibold translate-x-2">
                  VERIFIED
                </span>
              </div>

              <div className="w-full relative">
                {(isLoading || (!imageSrc && !imageError)) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50 min-h-[300px]">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600 mb-4"></div>
                      <p className="text-gray-600 font-medium">
                        Loading certificate...
                      </p>
                    </div>
                  </div>
                )}

                {imageError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-50 text-red-700 font-semibold p-6 text-center min-h-[300px]">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <p>Unable to load certificate image.</p>
                    </div>
                  </div>
                )}

                {imageSrc && !isLoading && (
                  <motion.img
                    src={imageSrc}
                    alt={`Certificate of ${certificate.name}`}
                    className="w-full h-auto object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <motion.div
                className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Certificate Details
                </h2>

                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-start">
                    <span className="font-medium text-gray-600 w-full md:w-1/3 md:pt-1">
                      Recipient:
                    </span>
                    <span className="text-gray-800 font-bold md:w-2/3">
                      {certificate.name}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start">
                    <span className="font-medium text-gray-600 w-full md:w-1/3 md:pt-1">
                      Certificate Type:
                    </span>
                    <span className="text-gray-800 md:w-2/3">
                      {certificate.certificateType}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start">
                    <span className="font-medium text-gray-600 w-full md:w-1/3 md:pt-1">
                      Issuing Authority:
                    </span>
                    <span className="text-gray-800 md:w-2/3">
                      {certificate.issuer}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start">
                    <span className="font-medium text-gray-600 w-full md:w-1/3 md:pt-1">
                      Program:
                    </span>
                    <span className="text-gray-800 md:w-2/3">
                      {certificate.programName}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start">
                    <span className="font-medium text-gray-600 w-full md:w-1/3 md:pt-1">
                      Issue Date:
                    </span>
                    <span className="text-gray-800 md:w-2/3">
                      {new Date(certificate.issuedDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 mt-6 pt-6">
                  <p className="text-gray-700 italic">
                    This digital certificate verifies that{" "}
                    <span className="font-semibold">{certificate.name}</span>{" "}
                    has been recognized for their participation and contribution
                    to the success of this program.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center justify-center relative overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                {/* Embossed seal effect */}
                <div className="absolute w-32 h-32 rounded-full border-4 border-gray-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-inner opacity-40"></div>

                <h2 className="text-lg font-semibold text-gray-800 mb-4 relative z-10">
                  Verify Certificate
                </h2>
                <div className="bg-white p-2 rounded-lg border border-gray-200 mb-3 shadow-md relative z-10">
                  <QRCode
                    value={verificationUrl}
                    size={150}
                    className="mx-auto"
                    fgColor="#166534" // green-800
                  />
                </div>
                <p className="text-sm text-center text-gray-600 mt-2 relative z-10">
                  Scan this QR code to verify the authenticity of this
                  certificate.
                </p>
                <div className="mt-4 w-full text-center relative z-10">
                  <p className="text-xs font-medium text-gray-500 break-all">
                    {certificate.uuid}
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {imageSrc && (
                <>
                  <button
                    onClick={handleDownloadImage}
                    className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download Certificate
                  </button>

                  <button
                    onClick={handleShareCertificate}
                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    Share Certificate
                  </button>
                </>
              )}

              <GoHomeButton
                variant="secondary"
                className="transition-all duration-300 transform hover:scale-105"
              />
            </motion.div>

            <motion.div
              className="mt-20 text-center text-gray-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <p>
                © {new Date().getFullYear()} Leo Club of Kathmandu Himalayas
                Patan. All rights reserved.
              </p>
              <p className="mt-1">
                This certificate can be verified by the QR code or the URL
                provided.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer - directly under the content with same background pattern */}
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CertificateView;
