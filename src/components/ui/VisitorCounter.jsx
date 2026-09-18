import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

// Free, no-signup hit-counter API - increments once per page load and
// returns the running total across every visitor. Powers the small badge
// shown in the corner of the showcase; @vercel/analytics itself has no
// public API for a live number, so this is a separate, lightweight source.
const NAMESPACE = 'conjure-ui-palakonweb';
const KEY = 'showcase-visits';
const HIT_ENDPOINT = `https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`;

export function VisitorCounter({ theme = 'light', className = '' }) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(HIT_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && typeof data?.value === 'number') {
          setCount(data.value);
        }
      })
      .catch(() => {
        // Counter API unreachable (offline, blocked, rate-limited) - fail silently.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium shadow-md backdrop-blur-md ${className}`}
      style={{
        background: theme === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(30,27,36,0.85)',
        borderColor: 'var(--border)',
        color: theme === 'light' ? '#525252' : '#d4d0da',
      }}
      title="Total visitors to this showcase"
    >
      <Users className="w-3.5 h-3.5 shrink-0" />
      {count === null ? (
        <span className="opacity-60">…</span>
      ) : (
        <span>{count.toLocaleString()} visitors</span>
      )}
    </div>
  );
}
