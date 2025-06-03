import { useParams } from "react-router-dom";
import certificatesData from "../assets/certificates/json/certificates.json";
import { useEffect, useState } from "react";
import GoHomeButton from "../components/GoHomeButton";

const CertificateView = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageError, setImageError] = useState<boolean>(false);

  const certificate = certificatesData.certificates.find(
    (cert) => cert.uuid === uuid
  );

  const sanitizeFilename = (str: string) =>
    str.replace(/[^a-z0-9]/gi, "_").toLowerCase();

  useEffect(() => {
    if (!certificate || !certificate.folder) return;

    const images = import.meta.glob(
      "../assets/certificates/images/**/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp,WEBP}"
    );

    const imageName = `${certificate.uuid}.png`;
    const fullPath = `../assets/certificates/images/${certificate.folder}/${imageName}`;

    if (images[fullPath]) {
      images[fullPath]().then((mod: any) => {
        setImageSrc(mod.default);
        setImageError(false);
      });
    } else {
      setImageSrc(null);
      setImageError(true);
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

  if (!uuid || !certificate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center px-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Sorry, the certificate you are looking for does not exist!
        </h1>
        <GoHomeButton variant="secondary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto text-center my-10 px-4">
      <div
        id="certificate"
        className="shadow-xl rounded-xl overflow-hidden relative bg-gray-100"
      >
        <div
          className="w-full pt-[75%] relative"
          style={{ backgroundColor: "#f0f0f0" }}
        >
          {!imageSrc && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-600"></div>
            </div>
          )}

          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center text-red-600 font-semibold">
              Unable to load certificate image.
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
        <strong>{certificate.issuer}</strong> in recognition of their
        outstanding contribution and support to the success of{" "}
        <strong>{certificate.programName}</strong>, on{" "}
        <strong>{new Date(certificate.issuedDate).toLocaleDateString()}</strong>
        .
      </p>

      {imageSrc && (
        <button
          onClick={handleDownloadImage}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mt-5 shadow-md"
        >
          Download Certificate
        </button>
      )}

      <div className="mt-8">
        <GoHomeButton variant="primary" />
      </div>
    </div>
  );
};

export default CertificateView;
