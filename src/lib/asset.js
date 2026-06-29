// Resolve a public asset path against Vite's configured base URL so absolute
// paths keep working when the site is served from a subpath (e.g. GitHub Pages
// project page at /time-creation-hub/). `import.meta.env.BASE_URL` is '/' in dev
// and the configured `base` (with trailing slash) in production builds.
export const asset = (p) => import.meta.env.BASE_URL + String(p).replace(/^\//, '');
