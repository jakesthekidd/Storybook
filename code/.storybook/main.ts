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
      // Simple and effective ResizeObserver error suppression
      (function() {
        'use strict';

        // Store original console methods
        const originalError = console.error;

        // Simple error detection
        const isResizeObserverError = (msg) => {
          return String(msg).includes('ResizeObserver loop completed with undelivered notifications');
        };

        // Override console.error to suppress ResizeObserver errors
        console.error = function(...args) {
          if (args.some(isResizeObserverError)) {
            return; // Silent suppression
          }
          return originalError.apply(console, args);
        };

        // Catch window errors
        const originalOnError = window.onerror;
        window.onerror = function(message, source, lineno, colno, error) {
          if (isResizeObserverError(message)) {
            return true; // Suppress
          }
          return originalOnError ? originalOnError.apply(this, arguments) : false;
        };

      })();
    </script>
    <script>
      // Debounced ResizeObserver to prevent loops
      (function() {
        if (!window.ResizeObserver) return;

        const OriginalResizeObserver = window.ResizeObserver;
        const debounce = (func, wait) => {
          let timeout;
          return function executedFunction(...args) {
            const later = () => {
              clearTimeout(timeout);
              func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
          };
        };

        window.ResizeObserver = class extends OriginalResizeObserver {
          constructor(callback) {
            const debouncedCallback = debounce((entries, observer) => {
              try {
                callback(entries, observer);
              } catch (e) {
                // Silent error handling
              }
            }, 16); // ~60fps

            super(debouncedCallback);
          }
        };
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
