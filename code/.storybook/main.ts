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
      // ULTIMATE ResizeObserver elimination - absolute earliest execution
      (function(){
        'use strict';

        // 1. Complete nuclear elimination of ResizeObserver
        try {
          if (typeof window !== 'undefined') {
            // Lock ResizeObserver to prevent any redefinition
            Object.defineProperty(window, 'ResizeObserver', {
              value: class DeadResizeObserver {
                observe(){}
                unobserve(){}
                disconnect(){}
                constructor(){}
              },
              writable: false,
              configurable: false,
              enumerable: true
            });
          }
        } catch(e) {
          // If property already exists, just replace it
          if (typeof window !== 'undefined') {
            window.ResizeObserver = class DeadResizeObserver {
              observe(){}
              unobserve(){}
              disconnect(){}
              constructor(){}
            };
          }
        }

        // 2. Immediate console suppression
        if (typeof console !== 'undefined') {
          const suppress = (msg) => {
            const str = String(msg || '').toLowerCase();
            return str.includes('resizeobserver') ||
                   str.includes('loop completed') ||
                   str.includes('undelivered notifications');
          };

          ['error', 'warn', 'log'].forEach(method => {
            const orig = console[method];
            console[method] = function() {
              if (!Array.from(arguments).some(suppress)) {
                return orig.apply(this, arguments);
              }
            };
          });
        }

        // 3. Global error suppression
        if (typeof window !== 'undefined') {
          const handleError = (msg) => {
            const str = String(msg || '').toLowerCase();
            return str.includes('resizeobserver');
          };

          window.onerror = (msg) => handleError(msg);
          window.onunhandledrejection = (e) => {
            if (handleError(e.reason) || handleError(e.reason?.message)) {
              e.preventDefault();
              return true;
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
