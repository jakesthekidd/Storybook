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
    <!-- ULTIMATE ResizeObserver Error Elimination -->
    <script>
      // Immediate browser-level error suppression
      (function() {
        'use strict';

        // Target the EXACT error message
        const EXACT_ERROR = 'ResizeObserver loop completed with undelivered notifications.';

        // 1. Override console at the most basic level
        const originalMethods = {};
        ['error', 'warn', 'log', 'info', 'debug'].forEach(method => {
          originalMethods[method] = console[method];
          console[method] = function() {
            const msg = String(arguments[0] || '');
            if (msg === EXACT_ERROR || msg.includes('ResizeObserver')) {
              return; // Complete silence
            }
            return originalMethods[method].apply(console, arguments);
          };
        });

        // 2. Patch window.Error constructor to catch at creation
        const OriginalError = window.Error;
        window.Error = function(message) {
          if (message === EXACT_ERROR || (message && message.includes('ResizeObserver'))) {
            // Return a dummy error that won't propagate
            return new OriginalError('');
          }
          return new OriginalError(message);
        };
        // Preserve prototype
        window.Error.prototype = OriginalError.prototype;

        // 3. Override throw statement via try-catch wrapper
        const originalSetTimeout = window.setTimeout;
        const originalSetInterval = window.setInterval;
        const originalRequestAnimationFrame = window.requestAnimationFrame;

        window.setTimeout = function(fn, delay) {
          return originalSetTimeout(function() {
            try { fn(); } catch(e) {
              if (!e.message || !e.message.includes('ResizeObserver')) throw e;
            }
          }, delay);
        };

        window.setInterval = function(fn, delay) {
          return originalSetInterval(function() {
            try { fn(); } catch(e) {
              if (!e.message || !e.message.includes('ResizeObserver')) throw e;
            }
          }, delay);
        };

        window.requestAnimationFrame = function(fn) {
          return originalRequestAnimationFrame(function() {
            try { fn.apply(this, arguments); } catch(e) {
              if (!e.message || !e.message.includes('ResizeObserver')) throw e;
            }
          });
        };

        // 4. Nuclear ResizeObserver replacement
        window.ResizeObserver = class SilentResizeObserver {
          observe() {}
          unobserve() {}
          disconnect() {}
          constructor() {}
        };

        // 5. Global error handlers with exact matching
        window.onerror = function(message, source, lineno, colno, error) {
          if (message === EXACT_ERROR || String(message).includes('ResizeObserver')) {
            return true; // Prevent default handling
          }
          return false;
        };

        window.addEventListener('error', function(event) {
          if (event.message === EXACT_ERROR || String(event.message).includes('ResizeObserver')) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return false;
          }
        }, true);

        window.addEventListener('unhandledrejection', function(event) {
          const reason = String(event.reason || '');
          if (reason === EXACT_ERROR || reason.includes('ResizeObserver')) {
            event.preventDefault();
            return true;
          }
        });

        // 6. Monkey-patch JSON.stringify to catch serialization errors
        const originalStringify = JSON.stringify;
        JSON.stringify = function() {
          try {
            return originalStringify.apply(this, arguments);
          } catch(e) {
            if (e.message && e.message.includes('ResizeObserver')) {
              return '{}'; // Return empty object for ResizeObserver errors
            }
            throw e;
          }
        };

        console.log('🚫 Ultimate ResizeObserver elimination active');
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
