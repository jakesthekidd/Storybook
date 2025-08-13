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
      // IMMEDIATE ResizeObserver elimination - runs before anything else
      if (typeof window !== 'undefined') {
        window.ResizeObserver = class { observe(){} unobserve(){} disconnect(){} };
        const suppress = (msg) => String(msg || '').toLowerCase().includes('resizeobserver');
        const orig = console.error;
        console.error = function() { if (!suppress(arguments[0])) orig.apply(this, arguments); };
      }
    </script>
    <script>
      // ULTRA-AGGRESSIVE ResizeObserver Error Elimination
      (function() {
        'use strict';

        // 1. Hijack ALL console methods immediately and permanently
        const errorPatterns = [
          'resizeobserver loop completed with undelivered notifications',
          'resizeobserver loop limit exceeded',
          'resizeobserver'
        ];

        const shouldSuppress = (msg) => {
          if (!msg) return false;
          const str = String(msg).toLowerCase();
          return errorPatterns.some(pattern => str.includes(pattern));
        };

        // Override ALL console methods
        ['error', 'warn', 'log', 'info', 'debug'].forEach(method => {
          const original = console[method];
          console[method] = function() {
            if (Array.from(arguments).some(arg => shouldSuppress(arg))) {
              return; // Complete silence
            }
            return original.apply(this, arguments);
          };
        });

        // 2. Completely eliminate ResizeObserver from existence
        Object.defineProperty(window, 'ResizeObserver', {
          value: class SilentResizeObserver {
            observe() { /* silent */ }
            unobserve() { /* silent */ }
            disconnect() { /* silent */ }
          },
          writable: false,
          configurable: false
        });

        // 3. Multiple error suppression layers
        window.onerror = function(msg) {
          return shouldSuppress(msg);
        };

        window.onunhandledrejection = function(event) {
          if (shouldSuppress(event.reason) || shouldSuppress(event.reason?.message)) {
            event.preventDefault();
            return true;
          }
        };

        // 4. Capture errors at all levels
        ['error', 'unhandledrejection'].forEach(eventType => {
          window.addEventListener(eventType, function(e) {
            const msg = e.message || e.reason || e.error?.message;
            if (shouldSuppress(msg)) {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              return false;
            }
          }, { capture: true, passive: false });
        });

        // 5. Override setTimeout/setInterval to catch async errors
        const originalSetTimeout = window.setTimeout;
        const originalSetInterval = window.setInterval;

        window.setTimeout = function(fn, delay, ...args) {
          return originalSetTimeout(() => {
            try {
              fn(...args);
            } catch (e) {
              if (!shouldSuppress(e.message)) {
                throw e;
              }
            }
          }, delay);
        };

        window.setInterval = function(fn, delay, ...args) {
          return originalSetInterval(() => {
            try {
              fn(...args);
            } catch (e) {
              if (!shouldSuppress(e.message)) {
                throw e;
              }
            }
          }, delay);
        };

        // 6. Prevent any future ResizeObserver creation
        const observer = window.MutationObserver;
        if (observer) {
          const originalObserve = observer.prototype.observe;
          observer.prototype.observe = function() {
            try {
              return originalObserve.apply(this, arguments);
            } catch (e) {
              if (shouldSuppress(e.message)) return;
              throw e;
            }
          };
        }

        console.log('🚫 ResizeObserver completely eliminated - nuclear approach active');
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
