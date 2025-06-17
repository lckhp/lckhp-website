import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  language?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, any>[];
}

const SEO: React.FC<SEOProps> = ({
  title = "Leo Club of Kathmandu Himalayas Patan | Youth Volunteer Organization in Nepal",
  description = "Leo Club of Kathmandu Himalayas Patan, Nepal's oldest Leo Club since 1974. Join youth volunteering, community service, and leadership programs in Kathmandu, Patan, and beyond.",
  keywords = "leo club nepal, leo club kathmandu, leo club patan, youth volunteering nepal, community service nepal",
  image = "/lckhp-logo.png",
  url = "https://lckhp.org",
  type = "website",
  author = "Leo Club of Kathmandu Himalayas Patan",
  publishedDate,
  modifiedDate,
  language = "en-US",
  canonicalUrl,
  structuredData = [],
}) => {
  const siteUrl = "https://lckhp.org";
  const fullUrl = url.startsWith("http") ? url : `${siteUrl}${url}`;
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;
  const canonicalLink = canonicalUrl || fullUrl;

  // Structured data for the organization
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Leo Club of Kathmandu Himalayas Patan",
    url: "https://lckhp.org",
    logo: {
      "@type": "ImageObject",
      url: "https://lckhp.org/lckhp-logo.png",
      width: "512",
      height: "512",
    },
    description:
      "Nepal's oldest Leo Club established in 1974, offering youth leadership opportunities and community service activities.",
    sameAs: [
      "https://www.facebook.com/leokhp",
      "https://www.instagram.com/lckhp",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Patan",
      addressRegion: "Lalitpur",
      addressCountry: "Nepal",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "lckhp@gmail.com",
    },
    foundingDate: "1974",
    founder: {
      "@type": "Person",
      name: "Lions Club of Kathmandu Himalayas Patan",
    },
  };

  // Structured data for website
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://lckhp.org",
    name: "Leo Club of Kathmandu Himalayas Patan",
    description:
      "Official website of Leo Club of Kathmandu Himalayas Patan, Nepal's oldest Leo Club.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://lckhp.org/?s={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: language,
    publisher: {
      "@type": "Organization",
      name: "Leo Club of Kathmandu Himalayas Patan",
      logo: {
        "@type": "ImageObject",
        url: "https://lckhp.org/lckhp-logo.png",
      },
    },
  };

  // Breadcrumb structured data (if we're not on the homepage)
  const breadcrumbJsonLd =
    url !== "/"
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://lckhp.org",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: title.split("|")[0].trim(),
              item: fullUrl,
            },
          ],
        }
      : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="language" content={language} />
      <meta httpEquiv="Content-Language" content={language} />
      {publishedDate && (
        <meta name="article:published_time" content={publishedDate} />
      )}
      {modifiedDate && (
        <meta name="article:modified_time" content={modifiedDate} />
      )}

      {/* Robots Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Mobile Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#1e3a8a" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta
        property="og:site_name"
        content="Leo Club of Kathmandu Himalayas Patan"
      />
      <meta property="og:locale" content="en_US" />
      {publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {modifiedDate && (
        <meta property="article:modified_time" content={modifiedDate} />
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@lckhp" />
      <meta name="twitter:creator" content="@lckhp" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalLink} />

      {/* Alternate Languages */}
      <link rel="alternate" href={fullUrl} hrefLang="en-US" />
      <link rel="alternate" href={fullUrl} hrefLang="x-default" />

      {/* DNS Prefetch and Preconnect */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />

      {/* Core Structured data JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(organizationJsonLd)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(websiteJsonLd)}
      </script>

      {/* Breadcrumb structured data (if not on homepage) */}
      {breadcrumbJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      )}

      {/* Additional structured data from props */}
      {structuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
