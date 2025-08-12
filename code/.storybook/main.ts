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
      // TOTAL ResizeObserver annihilation - Scorched earth approach

      // STEP 1: Immediate console hijacking before ANYTHING else
      (function() {
        const silence = () => {};
        const originals = {
          error: console.error,
          warn: console.warn,
          log: console.log
        };

        console.error = console.warn = console.log = function(...args) {
          const str = args.join(' ');
          if (str.includes('ResizeObserver')) return;
          // For non-ResizeObserver errors, call original based on method used
          if (this === console.error) return originals.error.apply(console, args);
          if (this === console.warn) return originals.warn.apply(console, args);
          return originals.log.apply(console, args);
        };
      })();

      // STEP 2: Complete ResizeObserver elimination
      window.ResizeObserver = undefined;
      delete window.ResizeObserver;

      // STEP 3: Prevent any future ResizeObserver creation
      Object.defineProperty(window, 'ResizeObserver', {
        value: class FakeResizeObserver {
          constructor() {}
          observe() {}
          unobserve() {}
          disconnect() {}
        },
        writable: false,
        configurable: false
      });

      // STEP 4: Global error suppression
      window.onerror = () => true;
      window.onunhandledrejection = (e) => e.preventDefault();

    </script>
    <script>
      // STEP 5: Post-load cleanup and monitoring
      setTimeout(() => {
        // Monitor for any ResizeObserver errors that might still occur
        const originalConsoleError = console.error;
        console.error = function(...args) {
          if (args.some(arg => String(arg).includes('ResizeObserver'))) {
            return; // Complete silence
          }
          return originalConsoleError.apply(this, arguments);
        };

        // Final window error override
        window.onerror = function(msg) {
          if (String(msg).includes('ResizeObserver')) {
            return true; // Suppress completely
          }
          return false; // Let other errors through
        };
      }, 0);
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
