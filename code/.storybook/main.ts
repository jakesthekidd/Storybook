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
      // Aggressive ResizeObserver error suppression
      (function() {
        'use strict';

        // Comprehensive ResizeObserver error detection
        const isResizeObserverError = (message) => {
          if (!message) return false;
          const str = String(message);
          return str.includes('ResizeObserver') && (
            str.includes('loop completed with undelivered notifications') ||
            str.includes('loop limit exceeded') ||
            str.includes('loop') ||
            str.includes('notification')
          );
        };

        // Store original methods immediately
        const originals = {
          error: console.error,
          warn: console.warn,
          log: console.log
        };

        // Override all console methods
        ['error', 'warn', 'log'].forEach(method => {
          console[method] = function(...args) {
            if (args.some(isResizeObserverError)) return;
            return originals[method].apply(console, args);
          };
        });

        // Multiple error capture layers
        window.onerror = function(msg, source, line, col, error) {
          return isResizeObserverError(msg) || isResizeObserverError(error?.message);
        };

        window.onunhandledrejection = function(event) {
          if (isResizeObserverError(event.reason) || isResizeObserverError(event.reason?.message)) {
            event.preventDefault();
            return true;
          }
        };

        // Event listener suppression
        const origAddEventListener = window.addEventListener;
        window.addEventListener = function(type, listener, options) {
          if (type === 'error') {
            const wrapped = function(event) {
              if (isResizeObserverError(event.message || event.error?.message)) {
                event.preventDefault();
                event.stopImmediatePropagation();
                return false;
              }
              return listener.apply(this, arguments);
            };
            return origAddEventListener.call(this, type, wrapped, options);
          }
          return origAddEventListener.call(this, type, listener, options);
        };

        // Override ResizeObserver constructor to prevent loops
        if (window.ResizeObserver) {
          const OriginalResizeObserver = window.ResizeObserver;
          window.ResizeObserver = class extends OriginalResizeObserver {
            constructor(callback) {
              const wrappedCallback = (...args) => {
                try {
                  // Defer execution to prevent loops
                  requestAnimationFrame(() => {
                    try {
                      callback(...args);
                    } catch (e) {
                      if (!isResizeObserverError(e.message)) throw e;
                    }
                  });
                } catch (e) {
                  if (!isResizeObserverError(e.message)) throw e;
                }
              };
              super(wrappedCallback);
            }
          };
        }

      })();
    </script>
    <script>
      // Final cleanup layer after DOM loads
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
          const isResizeObserverError = (msg) => {
            return String(msg || '').includes('ResizeObserver') &&
                   String(msg || '').includes('loop completed with undelivered notifications');
          };

          // Final console override
          const finalOriginals = {
            error: console.error,
            warn: console.warn
          };

          console.error = function(...args) {
            if (args.some(isResizeObserverError)) return;
            return finalOriginals.error.apply(console, args);
          };

          console.warn = function(...args) {
            if (args.some(isResizeObserverError)) return;
            return finalOriginals.warn.apply(console, args);
          };
        }, 50);
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
