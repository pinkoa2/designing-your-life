// The whole site is static: every page is rendered to HTML at build time.
export const prerender = true;

// Each page builds to its own folder (start-where-you-are/index.html), so its
// address works on any static host.
export const trailingSlash = "always";
