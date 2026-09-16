// perf: isolated error boundary with retry to prevent single-component crash from breaking showcase/grid
import React, { Component } from 'react';
import { AlertCircle, RotateCw } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('[RewampUI ErrorBoundary caught component load failure]:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback({
          retry: this.handleRetry,
          error: this.state.error,
        });
      }

      return (
        <div
          className={`flex flex-col items-center justify-center p-6 text-center rounded-2xl border border-red-500/20 bg-red-500/5 text-neutral-800 dark:text-neutral-200 select-none ${
            this.props.className || 'w-full max-w-md min-h-[220px]'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-3 shadow-sm">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Couldn't load this component
          </h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-xs">
            There was an issue fetching the component bundle.
          </p>
          <button
            onClick={this.handleRetry}
            className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-[var(--surface)] hover:bg-[var(--elevated)] border border-[var(--border)] text-[var(--text-primary)] shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
