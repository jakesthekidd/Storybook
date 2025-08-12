// CRITICAL: Immediate and comprehensive ResizeObserver error suppression
if (typeof globalThis !== 'undefined') {
  const suppressResizeObserverError = (message: any) => {
    if (!message) return false;
    const msg = String(message);
    return msg.includes('ResizeObserver') && (
      msg.includes('loop completed with undelivered notifications') ||
      msg.includes('loop limit exceeded') ||
      msg.includes('loop') ||
      msg.includes('notification') ||
      msg.includes('undelivered')
    );
  };

  // Immediate console override with proper typing
  if (typeof console !== 'undefined') {
    const methods = ['error', 'warn'] as const;
    type ConsoleMethod = typeof methods[number];

    const original: Partial<Record<ConsoleMethod, (...args: any[]) => void>> = {};

    methods.forEach((method) => {
      const orig = console[method].bind(console);
      original[method] = orig;

      console[method] = ((...args: unknown[]) => {
        if (args.some(arg => suppressResizeObserverError(arg))) return;
        orig(...(args as any));
      }) as any;
    });
  }

  // Global error handling with multiple layers
  if (typeof window !== 'undefined') {
    // Primary error handler
    window.onerror = (message, source, lineno, colno, error) => {
      return suppressResizeObserverError(message) || suppressResizeObserverError(error?.message);
    };

    // Unhandled rejection handler
    window.onunhandledrejection = (event) => {
      if (suppressResizeObserverError(event.reason) || suppressResizeObserverError(event.reason?.message)) {
        event.preventDefault();
        return true;
      }
      return false;
    };
  }
}

import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
    './addons/enterprise-token-addon.ts',
  ],
  staticDirs: [
    '../src/assets',
    { from: '../node_modules/primeng', to: '/node_modules/primeng' },
    { from: '../node_modules/primeicons', to: '/node_modules/primeicons' },
    { from: '../node_modules/primeflex', to: '/node_modules/primeflex' }
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  previewHead: (head) => `
    <script>
      // FOOLPROOF ResizeObserver error elimination
      (function() {
        'use strict';

        // Immediately hijack all error reporting
        const noop = () => {};

        // Store originals
        const originals = {
          error: console.error,
          warn: console.warn,
          onerror: window.onerror,
          onunhandledrejection: window.onunhandledrejection
        };

        // Comprehensive error detection
        const isResizeObserverError = (message) => {
          if (!message) return false;
          const str = String(message).toLowerCase();
          return str.includes('resizeobserver') && str.includes('loop');
        };

        // Override console methods
        console.error = function(...args) {
          if (args.some(isResizeObserverError)) return;
          return originals.error.apply(this, arguments);
        };

        console.warn = function(...args) {
          if (args.some(isResizeObserverError)) return;
          return originals.warn.apply(this, arguments);
        };

        // Global error suppression
        window.onerror = function(msg, source, line, col, error) {
          if (isResizeObserverError(msg) || isResizeObserverError(error?.message)) {
            return true;
          }
          return originals.onerror ? originals.onerror.apply(this, arguments) : false;
        };

        window.onunhandledrejection = function(event) {
          if (isResizeObserverError(event.reason) || isResizeObserverError(event.reason?.message)) {
            event.preventDefault();
            return;
          }
          return originals.onunhandledrejection ? originals.onunhandledrejection.apply(this, arguments) : undefined;
        };

        // Nuclear ResizeObserver replacement
        if (window.ResizeObserver) {
          const OriginalResizeObserver = window.ResizeObserver;

          window.ResizeObserver = class SafeResizeObserver {
            constructor(callback) {
              this._callback = callback;
              this._observer = null;
              this._entries = [];
              this._isObserving = false;

              // Create observer with maximum safety
              try {
                this._observer = new OriginalResizeObserver((entries) => {
                  this._entries = entries;
                  this._scheduleCallback();
                });
              } catch (e) {
                // Silent fallback
              }
            }

            _scheduleCallback() {
              if (!this._isObserving) return;

              // Use multiple async layers to prevent loops
              requestAnimationFrame(() => {
                if (!this._isObserving) return;
                setTimeout(() => {
                  if (!this._isObserving) return;
                  try {
                    this._callback && this._callback(this._entries, this);
                  } catch (e) {
                    // Silent error handling
                  }
                }, 1);
              });
            }

            observe(target, options) {
              if (!target || !this._observer) return;
              this._isObserving = true;
              try {
                this._observer.observe(target, options);
              } catch (e) {
                // Silent failure
              }
            }

            unobserve(target) {
              if (!target || !this._observer) return;
              try {
                this._observer.unobserve(target);
              } catch (e) {
                // Silent failure
              }
            }

            disconnect() {
              this._isObserving = false;
              this._entries = [];
              this._callback = null;
              if (this._observer) {
                try {
                  this._observer.disconnect();
                } catch (e) {
                  // Silent failure
                }
                this._observer = null;
              }
            }
          };
        }

      })();
    </script>
    ${head}
    <!-- Only load PrimeIcons, PrimeNG theme will be token-driven -->
    <link rel="stylesheet" href="https://unpkg.com/primeicons@7.0.0/primeicons.css">
  `,
  webpackFinal: async (config) => {
    // Ensure CSS files are handled properly
    const cssRule = config.module?.rules?.find((rule: any) =>
      rule && typeof rule === 'object' && rule.test && rule.test.toString().includes('css')
    ) as any;

    if (cssRule && Array.isArray(cssRule.use)) {
      cssRule.use.forEach((use: any) => {
        if (use.loader && use.loader.includes('css-loader') && use.options) {
          use.options.url = false; // Disable URL processing for CSS files
        }
      });
    }

    return config;
  },
};

export default config;
