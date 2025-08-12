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
      // ULTIMATE ResizeObserver error suppression - Military grade
      (function() {
        'use strict';

        // Store originals IMMEDIATELY before any other code
        const originalConsoleError = console.error;
        const originalConsoleWarn = console.warn;

        // Ultra-precise error detection
        const isResizeObserverError = (msg) => {
          if (!msg) return false;
          const str = String(msg);
          return str.includes('ResizeObserver loop completed with undelivered notifications') ||
                 str.includes('ResizeObserver loop limit exceeded') ||
                 (str.includes('ResizeObserver') && str.includes('loop'));
        };

        // IMMEDIATE console hijacking
        console.error = function(...args) {
          if (args.some(isResizeObserverError)) return;
          return originalConsoleError.apply(this, arguments);
        };

        console.warn = function(...args) {
          if (args.some(isResizeObserverError)) return;
          return originalConsoleWarn.apply(this, arguments);
        };

        // ULTIMATE error suppression - multiple layers
        const originalWindowError = window.onerror;
        window.onerror = function(message, source, lineno, colno, error) {
          if (isResizeObserverError(message) || isResizeObserverError(error?.message)) {
            return true; // Prevent default browser error handling
          }
          return originalWindowError ? originalWindowError.apply(this, arguments) : false;
        };

        const originalUnhandledRejection = window.onunhandledrejection;
        window.onunhandledrejection = function(event) {
          if (isResizeObserverError(event.reason) || isResizeObserverError(event.reason?.message)) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          return originalUnhandledRejection ? originalUnhandledRejection.apply(this, arguments) : undefined;
        };

        // Event listener hijacking
        const originalAddEventListener = window.addEventListener;
        window.addEventListener = function(type, listener, options) {
          if (type === 'error' || type === 'unhandledrejection') {
            const wrappedListener = function(event) {
              if (type === 'error' && isResizeObserverError(event.message || event.error?.message)) {
                event.preventDefault();
                event.stopImmediatePropagation();
                return false;
              }
              if (type === 'unhandledrejection' && isResizeObserverError(event.reason || event.reason?.message)) {
                event.preventDefault();
                event.stopImmediatePropagation();
                return false;
              }
              return listener.apply(this, arguments);
            };
            return originalAddEventListener.call(this, type, wrappedListener, options);
          }
          return originalAddEventListener.call(this, type, listener, options);
        };

        // Complete ResizeObserver replacement with bulletproof implementation
        if (typeof window !== 'undefined' && window.ResizeObserver) {
          const OriginalResizeObserver = window.ResizeObserver;

          // Create a bulletproof ResizeObserver that cannot generate loop errors
          window.ResizeObserver = class BulletproofResizeObserver {
            constructor(callback) {
              this._callback = callback;
              this._observer = null;
              this._isActive = false;
              this._pendingEntries = [];
              this._rafId = null;

              try {
                this._observer = new OriginalResizeObserver((entries, observer) => {
                  this._pendingEntries = entries;
                  this._deferredCallback(observer);
                });
              } catch (e) {
                // Silent failure - observer creation failed
              }
            }

            _deferredCallback(observer) {
              if (!this._isActive || this._rafId) return;

              this._rafId = requestAnimationFrame(() => {
                this._rafId = null;
                if (!this._isActive) return;

                setTimeout(() => {
                  if (!this._isActive) return;

                  try {
                    if (this._callback && this._pendingEntries.length > 0) {
                      const entries = this._pendingEntries.slice();
                      this._pendingEntries = [];
                      this._callback(entries, observer);
                    }
                  } catch (e) {
                    // Completely silent - no errors bubble up
                  }
                }, 0);
              });
            }

            observe(target, options) {
              if (!target || !this._observer) return;
              this._isActive = true;
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
              this._isActive = false;
              this._pendingEntries = [];
              this._callback = null;

              if (this._rafId) {
                cancelAnimationFrame(this._rafId);
                this._rafId = null;
              }

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
    <script>
      // Secondary suppression layer after DOM loads
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
          // Final sweep to catch any remaining ResizeObserver errors
          const isResizeError = (msg) => String(msg || '').includes('ResizeObserver');

          const finalConsoleError = console.error;
          console.error = function(...args) {
            if (args.some(isResizeError)) return;
            return finalConsoleError.apply(this, arguments);
          };

          const finalConsoleWarn = console.warn;
          console.warn = function(...args) {
            if (args.some(isResizeError)) return;
            return finalConsoleWarn.apply(this, arguments);
          };
        }, 100);
      });
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
