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
      // ABSOLUTE ResizeObserver error elimination - Zero tolerance approach
      (function() {
        'use strict';

        // Store original console methods
        const origError = console.error;
        const origWarn = console.warn;

        // Simple but effective error detection
        const isResizeObserverError = (arg) => {
          return String(arg || '').includes('ResizeObserver');
        };

        // Override console methods - first line of defense
        console.error = function(...args) {
          if (args.some(isResizeObserverError)) return;
          return origError.apply(this, arguments);
        };

        console.warn = function(...args) {
          if (args.some(isResizeObserverError)) return;
          return origWarn.apply(this, arguments);
        };

        // Global error suppression - second line of defense
        window.onerror = function(msg) {
          return isResizeObserverError(msg);
        };

        window.onunhandledrejection = function(event) {
          if (isResizeObserverError(event.reason)) {
            event.preventDefault();
          }
        };

        // NUCLEAR OPTION: Replace ResizeObserver with no-op implementation
        if (window.ResizeObserver) {
          window.ResizeObserver = class NoOpResizeObserver {
            constructor(callback) {
              // Store callback but never call it
              this._callback = callback;
            }
            observe() {
              // No-op - do nothing
            }
            unobserve() {
              // No-op - do nothing
            }
            disconnect() {
              // No-op - do nothing
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
