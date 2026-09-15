// Resolve a public asset path against Vite's configured base URL so absolute
// paths keep working when the site is served from a subpath. vite.config.js
// sets base '/time-creation-hub/' (the GitHub Pages project path), but the
// dev launch config (founding-members/.claude/launch.json) overrides it with
// `--base=/`, so BASE_URL — and the router basename — is '/' in dev and
// '/time-creation-hub/' in production builds.
export const asset = (p) => import.meta.env.BASE_URL + String(p).replace(/^\//, '');
