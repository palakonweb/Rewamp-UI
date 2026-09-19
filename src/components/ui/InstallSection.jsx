import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { highlightCode } from './CodeHighlight';

const SPRING = { type: 'spring', stiffness: 500, damping: 32, mass: 0.9 };

const PACKAGE_MANAGERS = [
  { id: 'npm', label: 'npm', runner: 'npx', installVerb: 'install' },
  { id: 'pnpm', label: 'pnpm', runner: 'pnpm dlx', installVerb: 'add' },
  { id: 'bun', label: 'bun', runner: 'bunx', installVerb: 'add' },
  { id: 'yarn', label: 'yarn', runner: 'yarn dlx', installVerb: 'add' },
];

// Lifted so the selected package manager persists across every component's
// Installation block as the user browses the docs site, not just per-page.
const PackageManagerContext = createContext(null);

export function PackageManagerProvider({ children }) {
  const [pm, setPm] = useState('npm');
  return (
    <PackageManagerContext.Provider value={{ pm, setPm }}>
      {children}
    </PackageManagerContext.Provider>
  );
}

function usePackageManager() {
  const ctx = useContext(PackageManagerContext);
  // Falls back to local state so InstallSection also works standalone (e.g. in Storybook/tests).
  const [localPm, setLocalPm] = useState('npm');
  return ctx || { pm: localPm, setPm: setLocalPm };
}

export function CopyButton({ text, theme, highlighted = false }) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  if (highlighted) {
    // Solid pill button (like the reference's "Send" action) so Copy reads
    // as the primary action in the footer, not a quiet icon-only button.
    return (
      <button
        onClick={onCopy}
        title="Copy"
        className="flex items-center gap-1.5 pl-3 pr-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors text-white"
        style={{ background: '#9B7FC7' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#8A6BB8')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#9B7FC7')}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span key="check" className="flex items-center gap-1.5" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}>
              <Check className="w-3.5 h-3.5" />
              <span>Copied</span>
            </motion.span>
          ) : (
            <motion.span key="copy" className="flex items-center gap-1.5" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    );
  }

  return (
    <button
      onClick={onCopy}
      title="Copy"
      className={`flex items-center justify-center w-7 h-7 rounded-lg cursor-pointer transition-colors ${
        theme === 'light' ? 'hover:bg-black/5 text-neutral-500' : 'hover:bg-white/10 text-neutral-400'
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span key="check" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}>
            <Check className="w-3.5 h-3.5" style={{ color: 'var(--brand-strong)' }} />
          </motion.span>
        ) : (
          <motion.span key="copy" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}>
            <Copy className="w-3.5 h-3.5" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

/** Pill-shaped switch with a spring-animated sliding active background, matching ThemeToggle's physics. */
function SlidingPillTabs({ options, value, onChange, theme, size = 'md', accent = 'default' }) {
  const padding = size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3.5 py-1.5 text-xs';
  const isPurple = accent === 'purple';
  return (
    <div
      className={`relative inline-flex items-center rounded-full p-1 gap-0.5 ${
        theme === 'light' ? 'bg-neutral-100' : 'bg-[#1c1922]'
      }`}
    >
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`relative z-10 rounded-full font-medium cursor-pointer transition-colors ${padding} ${
              active
                ? 'text-white'
                : (theme === 'light' ? 'text-neutral-500 hover:text-neutral-700' : 'text-neutral-400 hover:text-neutral-200')
            }`}
          >
            {active && (
              <motion.span
                layoutId={`pill-${theme}-${options.map((o) => o.id).join('-')}`}
                transition={SPRING}
                className="absolute inset-0 rounded-full"
                style={{ background: isPurple ? '#9B7FC7' : (theme === 'light' ? '#171717' : '#ffffff') }}
              />
            )}
            <span className="relative" style={active && !isPurple && theme !== 'light' ? { color: '#171717' } : undefined}>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// "Dip" card: a grey rounded shell sits behind everything; the white code
// pane is inset with an even margin on top/left/right but no margin at the
// bottom, so the grey shell peeks out only below as a thick rounded footer
// reveal — like a card resting inside a deeper tray, not a bordered header.
function CodeBlock({ lines, theme, copyText }) {
  const isLight = theme === 'light';
  return (
    <div className={`rounded-[26px] p-2 pb-0 shadow-sm ${isLight ? 'bg-neutral-200' : 'bg-[#0D0B12]'}`}>
      <div className={`rounded-2xl px-4 py-3 overflow-x-auto no-scrollbar ${isLight ? 'bg-white' : 'bg-[#1A1720]'}`}>
        <pre className="text-[12.5px] leading-[1.8]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className={`select-none w-6 shrink-0 text-right pr-3 ${isLight ? 'text-neutral-400' : 'text-neutral-600'}`}>{i + 1}</span>
              <span>{highlightCode(line, isLight ? 'light' : 'dark')}</span>
            </div>
          ))}
        </pre>
      </div>
      <div className="flex items-center justify-between px-3 py-3">
        <span className={`text-[11px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>Terminal</span>
        <CopyButton text={copyText} highlighted />
      </div>
    </div>
  );
}

/**
 * Installation section for a component's docs page: CLI / Manual tab switch,
 * each rendering a copyable command matched to the user's persisted package manager.
 */
export default function InstallSection({
  componentName,
  npmDependencies = [],
  sourceCode = '',
  usageSnippet = '',
  theme = 'dark',
  registryDependencies = [],
}) {
  const [mode, setMode] = useState('cli');
  const { pm, setPm } = usePackageManager();
  const active = PACKAGE_MANAGERS.find((p) => p.id === pm) || PACKAGE_MANAGERS[0];

  const addCommand = `${active.runner} rewampui@latest add ${componentName}`;
  const depsInstallCommand =
    npmDependencies.length > 0 ? `${active.runner === 'npx' ? 'npm' : active.runner.split(' ')[0]} ${active.installVerb} ${npmDependencies.join(' ')}` : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className={`text-sm font-semibold ${theme === 'light' ? 'text-neutral-900' : 'text-white'}`}>Installation</h3>
        <SlidingPillTabs
          options={[{ id: 'cli', label: 'CLI' }, { id: 'manual', label: 'Manual' }]}
          value={mode}
          onChange={setMode}
          theme={theme}
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {mode === 'cli' ? (
          <motion.div
            key="cli"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className={`text-xs ${theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'}`}>Run the following command</p>
              <SlidingPillTabs
                options={PACKAGE_MANAGERS.map((p) => ({ id: p.id, label: p.label }))}
                value={pm}
                onChange={setPm}
                theme={theme}
                accent="purple"
                size="sm"
              />
            </div>
            <CodeBlock lines={[addCommand]} theme={theme} copyText={addCommand} />
          </motion.div>
        ) : (
          <motion.div
            key="manual"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16 }}
            className="space-y-4"
          >
            {depsInstallCommand && (
              <div className="space-y-2">
                <p className={`text-xs font-medium ${theme === 'light' ? 'text-neutral-600' : 'text-neutral-300'}`}>1. Install dependencies</p>
                <CodeBlock lines={[depsInstallCommand]} theme={theme} copyText={depsInstallCommand} />
              </div>
            )}
            <div className="space-y-2">
              <p className={`text-xs font-medium ${theme === 'light' ? 'text-neutral-600' : 'text-neutral-300'}`}>
                {depsInstallCommand ? '2. ' : '1. '}Copy the source file
              </p>
              <CodeBlock lines={(sourceCode || '// source unavailable').split('\n')} theme={theme} copyText={sourceCode} />
            </div>
            {registryDependencies.length > 0 && (
              <div className="space-y-2">
                <p className={`text-xs font-medium ${theme === 'light' ? 'text-neutral-600' : 'text-neutral-300'}`}>
                  {depsInstallCommand ? '3. ' : '2. '}Also copy these shared files
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {registryDependencies.map((dep) => (
                    <code
                      key={dep}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border ${
                        theme === 'light' ? 'bg-neutral-50 text-neutral-700 border-neutral-200' : 'bg-[#1c1922] text-neutral-300 border-white/10'
                      }`}
                    >
                      {dep}
                    </code>
                  ))}
                </div>
              </div>
            )}
            {usageSnippet && (
              <div className="space-y-2">
                <p className={`text-xs font-medium ${theme === 'light' ? 'text-neutral-600' : 'text-neutral-300'}`}>
                  {depsInstallCommand ? '4. ' : '3. '}Usage
                </p>
                <CodeBlock lines={usageSnippet.split('\n')} theme={theme} copyText={usageSnippet} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
