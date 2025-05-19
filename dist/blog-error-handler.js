// This script will be loaded on the blog subdomain
// It detects 5xx errors on tag pages and redirects to the homepage
(function () {
  // Only run on the blog subdomain
  if (window.location.hostname.includes("blog.lckhp.org")) {
    // Check if we're on a tag page
    if (window.location.pathname.startsWith("/tag/")) {
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
      }, 5000);
    }
  }
})();
