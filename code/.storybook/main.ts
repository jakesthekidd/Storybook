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
      // ULTIMATE ResizeObserver error elimination
      (function() {
        'use strict';

        // Instantly hijack console before any other scripts
        const noop = () => {};
        const originalMethods = {};

        ['error', 'warn', 'log', 'info', 'debug', 'trace'].forEach(method => {
          originalMethods[method] = console[method];
          console[method] = function(...args) {
            const message = args.join(' ');
            if (message.includes('ResizeObserver')) return;
            return originalMethods[method].apply(console, args);
          };
        });

        // Nuclear error suppression
        window.onerror = () => true;
        window.onunhandledrejection = (e) => e.preventDefault();

        // Completely disable ResizeObserver
        if (window.ResizeObserver) {
          window.ResizeObserver = class {
            constructor() {}
            observe() {}
            unobserve() {}
            disconnect() {}
          };
        }

      })();
    </script>
    <script>
      // Restore console with selective suppression after page loads
      window.addEventListener('load', () => {
        setTimeout(() => {
          // Restore original console but with ResizeObserver filtering
          const originals = {
            error: Function.prototype.call.bind(console.error.__proto__.constructor.prototype.error || console.error),
            warn: Function.prototype.call.bind(console.warn.__proto__.constructor.prototype.warn || console.warn)
          };

          console.error = function(...args) {
            if (args.some(arg => String(arg).includes('ResizeObserver'))) return;
            return originals.error(console, ...args);
          };

          console.warn = function(...args) {
            if (args.some(arg => String(arg).includes('ResizeObserver'))) return;
            return originals.warn(console, ...args);
          };

          // Restore selective error handling
          window.onerror = function(msg) {
            return String(msg).includes('ResizeObserver');
          };

          window.onunhandledrejection = function(event) {
            if (String(event.reason).includes('ResizeObserver')) {
              event.preventDefault();
              return;
            }
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
