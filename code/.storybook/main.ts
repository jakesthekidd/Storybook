// ResizeObserver fix will be loaded via previewHead script

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
    { from: '../node_modules/primeflex', to: '/node_modules/primeflex' },
    { from: '.', to: '/' } // Serve .storybook files
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  previewHead: (head) => `
    <script>
      // IMMEDIATE ResizeObserver suppression - runs first
      (function() {
        'use strict';

        // Store original console.error
        const originalError = console.error;

        // Override console.error immediately
        console.error = function() {
          const message = String(arguments[0] || '');

          // Exact matches for the ResizeObserver error
          if (message === 'ResizeObserver loop completed with undelivered notifications.' ||
              message === 'ResizeObserver loop completed with undelivered notifications' ||
              message.indexOf('ResizeObserver loop completed') !== -1 ||
              message.indexOf('ResizeObserver') !== -1) {
            return; // Completely silent
          }

          // Call original for all other errors
          return originalError.apply(this, arguments);
        };

        // Also override warn just in case
        const originalWarn = console.warn;
        console.warn = function() {
          const message = String(arguments[0] || '');
          if (message.indexOf('ResizeObserver') !== -1) {
            return; // Silent
          }
          return originalWarn.apply(this, arguments);
        };

        // Catch any global errors
        window.addEventListener('error', function(e) {
          if (e.message && e.message.indexOf('ResizeObserver') !== -1) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
          }
        }, true);

        // Handle promises
        window.addEventListener('unhandledrejection', function(e) {
          if (e.reason && String(e.reason).indexOf('ResizeObserver') !== -1) {
            e.preventDefault();
            return true;
          }
        });

        // Nuclear option - override window.onerror completely
        window.onerror = function(msg) {
          if (String(msg).indexOf('ResizeObserver') !== -1) {
            return true;
          }
          return false;
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

    // Webpack optimizations removed to prevent interference

    return config;
  },
};

export default config;
