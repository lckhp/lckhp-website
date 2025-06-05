/**
 * This script will ping search engines to notify them about sitemap updates
 * Can be run manually or added to your CI/CD pipeline
 */

// List of search engine ping URLs
const searchEnginePings = [
  // Google
  "https://www.google.com/ping?sitemap=https://lckhp.org/sitemap.xml",
  "https://www.google.com/ping?sitemap=https://lckhp.org/members-sitemap.xml",
  "https://www.google.com/ping?sitemap=https://lckhp.org/blog-sitemap.xml",

  // Bing
  "https://www.bing.com/ping?sitemap=https://lckhp.org/sitemap.xml",
  "https://www.bing.com/ping?sitemap=https://lckhp.org/members-sitemap.xml",
  "https://www.bing.com/ping?sitemap=https://lckhp.org/blog-sitemap.xml",

  // Yandex
  "https://webmaster.yandex.com/ping?sitemap=https://lckhp.org/sitemap.xml",

  // DuckDuckGo uses Bing's index, so no separate ping needed
];

// Function to ping search engines
async function pingSearchEngines() {
  console.log("Starting to ping search engines...");
  const results = {
    success: [],
    failed: [],
  };

  for (const pingUrl of searchEnginePings) {
    try {
      const response = await fetch(pingUrl);
      if (response.ok) {
        console.log(`✅ Successfully pinged: ${pingUrl}`);
        results.success.push(pingUrl);
      } else {
        console.error(
          `❌ Failed to ping: ${pingUrl} - Status: ${response.status}`
        );
        results.failed.push({ url: pingUrl, status: response.status });
      }
    } catch (error) {
      console.error(`❌ Error pinging: ${pingUrl} - ${error.message}`);
      results.failed.push({ url: pingUrl, error: error.message });
    }
  }

  console.log("Finished pinging search engines.");
  console.log(
    `Results: ${results.success.length} successful, ${results.failed.length} failed`
  );

  return results;
}

// Run the function when called directly with Node.js
if (typeof process !== "undefined" && process.argv[1] === import.meta.url) {
  pingSearchEngines().catch(console.error);
}

// Make function available for browser use
if (typeof window !== "undefined") {
  window.pingSearchEngines = pingSearchEngines;
}

// Export for module use
export { pingSearchEngines };

/*
 * Instructions for use:
 *
 * 1. Run this script using Node.js after updating your site:
 *    node ping-search-engines.js
 *
 * 2. Or call it from the browser console on your website:
 *    - Open your website in Chrome/Firefox
 *    - Open developer console (F12)
 *    - Type: pingSearchEngines()
 *
 * 3. For manually pinging Google Search Console:
 *    - Log into Google Search Console
 *    - Go to Sitemaps section
 *    - Submit your sitemap URL
 */
