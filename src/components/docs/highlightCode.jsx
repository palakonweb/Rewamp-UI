import React from 'react';

const KEYWORDS = new Set([
    'import', 'export', 'default', 'const', 'let', 'var', 'function', 'return',
    'if', 'else', 'for', 'while', 'class', 'extends', 'new', 'this', 'async',
    'await', 'true', 'false', 'null', 'undefined', 'as', 'from', 'typeof',
    'of', 'in', 'switch', 'case', 'break', 'continue', 'try', 'catch',
    'finally', 'throw', 'yield', 'useState', 'useEffect', 'useRef',
]);

const TOKEN_RE = /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][A-Za-z0-9_$]*)/g;

// Small regex-based JS/JSX tokenizer — not a real parser, just enough to
// approximate a syntax-highlighted code block (strings, numbers, keywords,
// comments) without pulling in a full highlighter.
export function highlightJs(code) {
    const nodes = [];
    let lastIndex = 0;
    let match;
    let key = 0;
    TOKEN_RE.lastIndex = 0;
    while ((match = TOKEN_RE.exec(code))) {
        if (match.index > lastIndex) {
            nodes.push(<span key={key++}>{code.slice(lastIndex, match.index)}</span>);
        }
        const [full, comment, string, number, word] = match;
        if (comment) {
            nodes.push(<span key={key++} className="text-stone italic">{full}</span>);
        } else if (string) {
            nodes.push(<span key={key++} className="text-emerald-700">{full}</span>);
        } else if (number) {
            nodes.push(<span key={key++} className="text-blue-600">{full}</span>);
        } else if (word && KEYWORDS.has(word)) {
            nodes.push(<span key={key++} className="text-rose-600">{full}</span>);
        } else {
            nodes.push(<span key={key++}>{full}</span>);
        }
        lastIndex = TOKEN_RE.lastIndex;
    }
    if (lastIndex < code.length) nodes.push(<span key={key++}>{code.slice(lastIndex)}</span>);
    return nodes;
}
