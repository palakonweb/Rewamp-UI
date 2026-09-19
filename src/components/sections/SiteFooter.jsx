import React from 'react';
import { Link } from 'react-router-dom';

const CHERRY = "#D2042D";

const NAV_LINKS = [
  {
    title: 'Product',
    links: [{ name: 'Components', href: '/components' }, { name: 'Documentation', href: '/documentation' }],
  },
  {
    title: 'Community',
    links: [{ name: 'GitHub', href: 'https://github.com/palakonweb' }, { name: 'Twitter / X', href: 'https://x.com/palakonweb' }],
  }
];

const SOCIALS = [
  {
    name: 'GitHub',
    href: 'https://github.com/palakonweb',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/palakonweb',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/palakonweb_',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
];

export function SiteFooter() {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* ── Video Background with White Overlay ── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/ascii-art.mp4"
          className="w-full h-full object-cover"
        />
        {/* Theme-aware overlay */}
        <div className="absolute inset-0 bg-[var(--bg)]/85" />
        {/* Top gradient fade - merges softly with section above */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--bg)] to-transparent z-[1] pointer-events-none" />
      </div>

      {/* ── Footer Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10">

        {/* Top: Logo + Nav + Socials */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 mb-20">

          {/* Brand */}
          <div className="lg:w-[280px] shrink-0">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.svg" alt="Rewamp UI Logo" className="h-10 w-auto object-contain" />
              <span className="font-display font-bold text-xl tracking-wide text-[var(--text)] uppercase">Rewamp UI</span>
            </div>
            <p className="text-sm text-[var(--text-2)] leading-relaxed max-w-[240px] mb-6">
              AI-powered component library. Design from a sentence, ship in seconds.
            </p>
            <Link
              to="/components"
              className="liquid-metal inline-flex items-center justify-center px-6 py-2.5 text-[11px] font-display tracking-[0.1em] text-[var(--text)] bg-white cursor-pointer hover:shadow-[0_0_24px_var(--glow)] transition-shadow duration-500 rounded-md"
            >
              BROWSE COMPONENTS
            </Link>
          </div>

          {/* Navigation Columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-8">
            {NAV_LINKS.map((group) => (
              <div key={group.title}>
                <h4 className="text-[11px] font-bold text-[var(--text)] uppercase tracking-widest mb-5">{group.title}</h4>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <Link to={link.href} className="text-sm text-[var(--text-2)] hover:text-[var(--text)] transition-colors">{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Socials */}
          <div className="lg:w-[180px] shrink-0">
            <h4 className="text-[11px] font-bold text-[var(--text)] uppercase tracking-widest mb-5">Connect</h4>
            <div className="flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full bg-[var(--elevated)] hover:bg-[var(--border)] flex items-center justify-center text-[var(--text-2)] hover:text-[var(--text)] transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[var(--border)] mb-8" />

        {/* Bottom: Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-3)]">
            © {new Date().getFullYear()} Rewamp UI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-[var(--text-3)]">
            <a href="#" className="hover:text-[var(--text-2)] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[var(--text-2)] transition-colors">Terms</a>
            <a href="#" className="hover:text-[var(--text-2)] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
