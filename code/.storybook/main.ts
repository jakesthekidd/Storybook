// CRITICAL: Immediate ResizeObserver error suppression - must be at the very top!
if (typeof globalThis !== 'undefined') {
  // Override at the global level immediately
  const suppressResizeObserverError = (message: any) => {
    const msg = String(message || '');
    return msg.includes('ResizeObserver') &&
           (msg.includes('loop') || msg.includes('notification') || msg.includes('undelivered'));
  };

  // Override console methods immediately
  if (typeof console !== 'undefined') {
    const origError = console.error;
    const origWarn = console.warn;
    console.error = (...args: any[]) => suppressResizeObserverError(args[0]) ? void 0 : origError.apply(console, args);
    console.warn = (...args: any[]) => suppressResizeObserverError(args[0]) ? void 0 : origWarn.apply(console, args);
  }

  // Override global error handling
  if (typeof window !== 'undefined') {
    window.onerror = (message) => suppressResizeObserverError(message) ? true : false;
  }
}

import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
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
      // Enhanced ResizeObserver error suppression
      (function() {
        const isResizeObserverError = (msg) => {
          return msg && typeof msg === 'string' &&
                 msg.includes('ResizeObserver') &&
                 (msg.includes('loop completed with undelivered notifications') ||
                  msg.includes('loop limit exceeded') ||
                  msg.includes('loop') ||
                  msg.includes('notification'));
        };

        // Override console methods
        const originalError = console.error;
        const originalWarn = console.warn;

        console.error = function(...args) {
          if (isResizeObserverError(args[0])) return;
          originalError.apply(console, args);
        };

        console.warn = function(...args) {
          if (isResizeObserverError(args[0])) return;
          originalWarn.apply(console, args);
        };

        // Override window error handler
        window.addEventListener('error', function(e) {
          if (isResizeObserverError(e.message)) {
            e.preventDefault();
            e.stopPropagation();
          }
        });

        // Override unhandled promise rejections
        window.addEventListener('unhandledrejection', function(e) {
          if (isResizeObserverError(e.reason)) {
            e.preventDefault();
          }
        });
      })();
    </script>
    ${head}
    <!-- PrimeNG CSS will be loaded dynamically by theme switcher -->
    <link rel="stylesheet" href="https://unpkg.com/primeicons@7.0.0/primeicons.css">
    <link rel="stylesheet" href="https://unpkg.com/primeng@17.18.15/resources/primeng.min.css">
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
