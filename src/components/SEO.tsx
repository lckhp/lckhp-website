import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Leo Club of Kathmandu Himalayas Patan | Youth Volunteer Organization in Nepal",
  description = "Leo Club of Kathmandu Himalayas Patan, Nepal's oldest Leo Club since 1974. Join youth volunteering, community service, and leadership programs in Kathmandu, Patan, and beyond.",
  keywords = "leo club nepal, leo club kathmandu, leo club patan, youth volunteering nepal, community service nepal",
  image = "/lckhp-logo.png",
  url = "https://lckhp.org",
  type = "website",
}) => {
  const siteUrl = "https://lckhp.org";
  const fullUrl = url.startsWith("http") ? url : `${siteUrl}${url}`;
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

export default SEO;
