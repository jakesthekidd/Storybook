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
      // Nuclear ResizeObserver Error Elimination
      (function() {
        'use strict';

        // 1. Immediate console error suppression
        const originalError = console.error;
        console.error = function() {
          const message = arguments[0];
          if (message && String(message).includes('ResizeObserver loop completed with undelivered notifications')) {
            return; // Silent discard
          }
          return originalError.apply(this, arguments);
        };

        // 2. Replace ResizeObserver entirely with silent no-op
        if (typeof window !== 'undefined') {
          window.ResizeObserver = class NoOpResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
          };

          // Also handle global errors
          window.onerror = function(msg) {
            if (String(msg).includes('ResizeObserver loop completed with undelivered notifications')) {
              return true; // Prevent default
            }
            return false;
          };

          window.addEventListener('error', function(e) {
            if (e.message && e.message.includes('ResizeObserver loop completed with undelivered notifications')) {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }
          }, true);
        }

        console.log('✅ ResizeObserver completely disabled - no more errors');
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
