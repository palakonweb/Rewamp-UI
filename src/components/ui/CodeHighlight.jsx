import React from 'react';

// Lightweight, dependency-free JS/JSX/CSS syntax highlighter. Colors use the
// app's own lilac brand ramp (different shades/weights) instead of the usual
// vscode blue/orange/green palette, so code blocks stay on-brand.
const KEYWORDS = new Set([
  'import', 'export', 'default', 'from', 'const', 'let', 'var', 'function',
  'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue',
  'new', 'class', 'extends', 'super', 'this', 'typeof', 'instanceof', 'in', 'of',
  'async', 'await', 'try', 'catch', 'finally', 'throw', 'yield', 'static',
  'get', 'set', 'true', 'false', 'null', 'undefined', 'void', 'delete',
]);

// Token colors — every hue stays inside the brand's lilac/violet/magenta
// family (varying lightness/saturation to tell tokens apart), the way a
// vscode theme differentiates tokens by shade rather than switching hue.
const COLORS = {
  dark: {
    keyword: '#C9BBE8',   // bright lilac
    string: '#E0AFD6',    // warm rose-lilac
    comment: '#8A8296',   // muted gray-lilac
    tag: '#D98CC4',       // deep magenta-lilac (JSX tags)
    attr: '#B8A8D4',      // mid lilac (JSX attributes)
    number: '#9B7FC7',    // deep violet
    punct: '#D6D0E0',     // near-white lilac-tinted
    plain: '#E8E4F0',
  },
  light: {
    keyword: '#6B4F94',   // deep violet
    string: '#96447F',    // muted rose-magenta
    comment: '#9A93A8',   // muted gray-lilac
    tag: '#7A3F8A',       // deep magenta-violet
    attr: '#5D4A8A',      // mid violet
    number: '#8A3FA0',    // rich violet
    punct: '#463D5C',     // near-black lilac-tinted
    plain: '#2A2438',
  },
};

const TOKEN_RE = /(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)|(`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(<\/?[A-Za-z][\w.]*)|([A-Za-z_$][\w$]*(?=\s*=(?!=)))|(\b\d+\.?\d*\b)|(\b[A-Za-z_$][\w$]*\b)|([{}()[\];:,.<>/=+\-*&|!?%~])/g;

export function highlightCode(code, theme = 'dark') {
  if (!code) return null;
  const c = COLORS[theme] || COLORS.dark;
  const nodes = [];
  let lastIndex = 0;
  let m;
  let key = 0;

  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(code)) !== null) {
    if (m.index > lastIndex) {
      nodes.push(<span key={key++} style={{ color: c.plain }}>{code.slice(lastIndex, m.index)}</span>);
    }
    const [full, comment1, comment2, string, tag, attr, number, word, punct] = m;
    let color = c.plain;
    let style;
    if (comment1 || comment2) {
      color = c.comment;
      style = 'italic';
    } else if (string) {
      color = c.string;
    } else if (tag) {
      color = c.tag;
    } else if (attr) {
      color = c.attr;
    } else if (number) {
      color = c.number;
    } else if (word) {
      color = KEYWORDS.has(word) ? c.keyword : c.plain;
    } else if (punct) {
      color = c.punct;
    }
    nodes.push(
      <span key={key++} style={{ color, fontStyle: style }}>{full}</span>
    );
    lastIndex = TOKEN_RE.lastIndex;
  }
  if (lastIndex < code.length) {
    nodes.push(<span key={key++} style={{ color: c.plain }}>{code.slice(lastIndex)}</span>);
  }
  return nodes;
}

export function CodeHighlight({ code, theme = 'dark', className = '' }) {
  return <pre className={className}>{highlightCode(code, theme)}</pre>;
}
