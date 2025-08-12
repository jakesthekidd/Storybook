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
      // Targeted ResizeObserver error suppression (Storybook-compatible)
      (function() {
        'use strict';

        // Store originals before any interference
        const originalError = console.error;
        const originalWarn = console.warn;

        // Precise ResizeObserver error detection
        function isResizeObserverError(message) {
          const str = String(message || '');
          return str === 'ResizeObserver loop completed with undelivered notifications.' ||
                 str.includes('ResizeObserver loop completed with undelivered notifications');
        }

        // Only override console for ResizeObserver errors, leave everything else intact
        console.error = function(...args) {
          // Don't interfere with Storybook manager messages
          if (args.length > 0 && isResizeObserverError(args[0])) {
            return; // Silent suppression only for exact ResizeObserver error
          }
          return originalError.apply(this, arguments);
        };

        console.warn = function(...args) {
          if (args.length > 0 && isResizeObserverError(args[0])) {
            return; // Silent suppression only for exact ResizeObserver error
          }
          return originalWarn.apply(this, arguments);
        };

        // Targeted error event suppression
        window.addEventListener('error', function(event) {
          if (isResizeObserverError(event.message)) {
            event.preventDefault();
            event.stopPropagation();
          }
        }, true);

        // Targeted promise rejection suppression
        window.addEventListener('unhandledrejection', function(event) {
          if (isResizeObserverError(event.reason)) {
            event.preventDefault();
          }
        });

        // Gentle ResizeObserver wrapping (doesn't break functionality)
        if (window.ResizeObserver) {
          const OriginalResizeObserver = window.ResizeObserver;
          window.ResizeObserver = class WrappedResizeObserver extends OriginalResizeObserver {
            constructor(callback) {
              // Wrap callback to catch and suppress only the specific error
              const wrappedCallback = (entries, observer) => {
                try {
                  callback(entries, observer);
                } catch (error) {
                  if (!isResizeObserverError(error.message)) {
                    throw error; // Re-throw non-ResizeObserver errors
                  }
                  // Silently ignore ResizeObserver loop errors
                }
              };
              super(wrappedCallback);
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
