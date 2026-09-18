// Shared site-wide light/dark theme helper.
// Lets any component (toggles, navbars, the dashboard shell) read and write
// the same theme, kept in sync via `document.documentElement` + a custom event.
const STORAGE_KEY = 'rewamp-theme';
export const SITE_THEME_EVENT = 'rewampui:themechange';

export function getSiteTheme() {
  if (typeof document === 'undefined') return 'light';
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'dark' || attr === 'light') return attr;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    // ignore
  }
  return 'light';
}

export function setSiteTheme(theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent(SITE_THEME_EVENT, { detail: { theme } }));
}

export function toggleSiteTheme() {
  const next = getSiteTheme() === 'dark' ? 'light' : 'dark';
  setSiteTheme(next);
  return next;
}
