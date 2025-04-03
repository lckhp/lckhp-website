import { useParams, Link } from "react-router-dom";
import certificatesData from "../assets/certificates/json/certificates.json";
import { useEffect, useState } from "react";

const CertificateView = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const certificate = certificatesData.certificates.find(
    (cert) => cert.uuid === uuid
  );

  useEffect(() => {
    if (!certificate) return;

    const images = import.meta.glob(
      "../assets/certificates/images/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp,WEBP}"
    );

    const imageName = `${certificate.uuid}.png`;
    const fullPath = `../assets/certificates/images/${imageName}`;

    if (images[fullPath]) {
      images[fullPath]().then((mod: any) => {
        setImageSrc(mod.default);
      });
    } else {
      setImageSrc(null); // fallback if image not found
    }
  }, [certificate]);

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = imageSrc || ""; // imageSrc is already loaded via useEffect
    link.download = `LCKHP-${certificate?.certificateType}-${certificate?.name}-${certificate?.issuedDate}.png`;
    link.click();
  };

  if (!certificate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl md:text-4xl font-bold">
          Sorry, the content you are looking for does not exist!
        </h1>
        <div className="navigation mt-8">
          <Link to="/" className="text-blue-400 hover:underline">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto text-center my-10">
      <div
        id="certificate"
        className="shadow-xl rounded-xl overflow-hidden relative bg-gray-100"
      >
        <div
          className="w-full pt-[75%] relative" // Aspect ratio (4:3) or use pt-[70.7%] for A4
          style={{ backgroundColor: "#f0f0f0" }}
        >
          {!imageSrc && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-600"></div>
            </div>
          )}

          {imageSrc && (
            <img
              src={imageSrc}
              alt={`Certificate of ${certificate.name}`}
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-in-out"
            />
          )}
        </div>
      </div>

      <p className="text-lg font-medium mt-6">
        This certifies that <strong>{certificate.name}</strong> has been awarded
        the <strong>{certificate.certificateType}</strong> by{" "}
        <strong>Leo Club of Kathmandu Himalayas Patan</strong> in recognition of
        their outstanding contribution and support to the success of{" "}
        <strong>{certificate.programName}</strong>, on{" "}
        <strong>{new Date(certificate.issuedDate).toLocaleDateString()}</strong>
        .
      </p>

      <button
        onClick={handleDownloadImage}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mt-5 shadow-md"
      >
        Download Certificate
      </button>

      <div className="navigation mt-8 flex justify-center">
        <Link to="/" className="text-blue-400 hover:underline">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default CertificateView;
