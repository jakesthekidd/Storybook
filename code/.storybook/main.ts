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
    <!-- FIRST PRIORITY - Kill ResizeObserver before anything else -->
    <script>
      window.ResizeObserver = undefined;
      console.error = function(){};
    </script>
    <!-- NUCLEAR ResizeObserver elimination - runs before EVERYTHING -->
    <script>
      // IMMEDIATE - before any other JavaScript can run
      (function() {
        'use strict';

        // 1. Kill console.error IMMEDIATELY
        console.error = function() {
          const msg = String(arguments[0] || '');
          if (msg.indexOf('ResizeObserver') !== -1) return;
          // Don't call original - just silence completely for now
        };

        // 2. Completely replace ResizeObserver with no-op
        if (typeof window !== 'undefined') {
          window.ResizeObserver = function() {
            return {
              observe: function() {},
              unobserve: function() {},
              disconnect: function() {}
            };
          };

          // Make it non-configurable
          try {
            Object.defineProperty(window, 'ResizeObserver', {
              value: function() {
                return {
                  observe: function() {},
                  unobserve: function() {},
                  disconnect: function() {}
                };
              },
              writable: false,
              configurable: false
            });
          } catch(e) {
            // If defineProperty fails, just keep the simple assignment
          }
        }

        // 3. Multiple error suppression layers
        if (typeof window !== 'undefined') {
          window.onerror = function(msg) {
            return String(msg).indexOf('ResizeObserver') !== -1;
          };

          window.addEventListener('error', function(e) {
            if (String(e.message || '').indexOf('ResizeObserver') !== -1) {
              e.preventDefault();
              e.stopImmediatePropagation();
              return false;
            }
          }, true);

          window.addEventListener('unhandledrejection', function(e) {
            if (String(e.reason || '').indexOf('ResizeObserver') !== -1) {
              e.preventDefault();
              return true;
            }
          });
        }

        // 4. Override setTimeout and setInterval to catch async errors
        if (typeof window !== 'undefined') {
          const originalSetTimeout = window.setTimeout;
          window.setTimeout = function(fn, delay) {
            return originalSetTimeout(function() {
              try {
                fn();
              } catch(e) {
                if (String(e.message || '').indexOf('ResizeObserver') === -1) {
                  throw e;
                }
              }
            }, delay);
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

    // Add webpack plugin to replace ResizeObserver globally
    if (!config.plugins) config.plugins = [];

    const webpack = require('webpack');
    config.plugins.push(
      new webpack.DefinePlugin({
        'window.ResizeObserver': 'class DeadResizeObserver { observe(){} unobserve(){} disconnect(){} }',
        'global.ResizeObserver': 'class DeadResizeObserver { observe(){} unobserve(){} disconnect(){} }',
        'ResizeObserver': 'class DeadResizeObserver { observe(){} unobserve(){} disconnect(){} }'
      })
    );

    return config;
  },
};

export default config;
