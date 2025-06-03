// This script will be loaded on the blog subdomain
// It detects 5xx errors on tag pages and redirects to the homepage
(function () {
  // Only run on the blog subdomain
  if (window.location.hostname.includes("blog.lckhp.org")) {
    // Add noindex meta tag for all tag pages
    if (window.location.pathname.startsWith("/tag/")) {
      // Add noindex meta tag dynamically
      const metaRobots = document.createElement("meta");
      metaRobots.name = "robots";
      metaRobots.content = "noindex, nofollow";
      document.head.appendChild(metaRobots);

      // If the page is accessed directly, redirect to homepage
      if (
        document.referrer === "" ||
        !document.referrer.includes("blog.lckhp.org")
      ) {
        window.location.href = "https://blog.lckhp.org/";
        return;
      }

      // If the page fails to load (5xx error), redirect to homepage
      window.addEventListener(
        "error",
        function (event) {
          if (
            event.target.tagName === "LINK" ||
            event.target.tagName === "SCRIPT"
          ) {
            window.location.href = "https://blog.lckhp.org/";
          }
        },
        true
      );

      // Set a timeout to check if the page loaded correctly
      setTimeout(function () {
        // If the main content area doesn't exist or is empty, redirect
        const mainContent =
          document.querySelector("main") || document.querySelector("#content");
        if (!mainContent || mainContent.innerHTML.trim() === "") {
          window.location.href = "https://blog.lckhp.org/";
        }

        // Set X-Robots-Tag header via service worker if possible
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker
            .register("/sw-noindex.js", { scope: "/tag/" })
            .catch(function (error) {
              console.error("Service worker registration failed:", error);
            });
        }
      }, 3000);
    }
  }
})();
