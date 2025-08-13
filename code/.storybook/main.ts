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
    <!-- Comprehensive ResizeObserver error suppression -->
    <script>
      (function() {
        'use strict';

        // Multiple error patterns to catch
        const resizeObserverErrors = [
          'ResizeObserver loop completed with undelivered notifications',
          'ResizeObserver loop completed with undelivered notifications.',
          'ResizeObserver loop limit exceeded',
          'Non-finite floating-point result'
        ];

        const isResizeObserverError = (message) => {
          if (!message) return false;
          const msg = String(message).trim();
          return resizeObserverErrors.some(pattern =>
            msg.includes(pattern) || msg === pattern
          );
        };

        // Override console methods
        ['error', 'warn'].forEach(method => {
          const original = console[method];
          console[method] = function(...args) {
            // Check first argument (main message)
            if (isResizeObserverError(args[0])) {
              return; // Silent suppression
            }

            // Check if any argument contains ResizeObserver error
            const hasResizeObserverError = args.some(arg =>
              isResizeObserverError(arg) ||
              (arg && arg.message && isResizeObserverError(arg.message))
            );

            if (hasResizeObserverError) {
              return; // Silent suppression
            }

            return original.apply(this, args);
          };
        });

        // Global error handlers
        window.addEventListener('error', function(event) {
          if (isResizeObserverError(event.message) ||
              isResizeObserverError(event.error?.message)) {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
        }, true);

        window.addEventListener('unhandledrejection', function(event) {
          if (isResizeObserverError(event.reason) ||
              isResizeObserverError(event.reason?.message)) {
            event.preventDefault();
            return true;
          }
        });

        // Override window.onerror
        const originalOnError = window.onerror;
        window.onerror = function(message, source, lineno, colno, error) {
          if (isResizeObserverError(message) || isResizeObserverError(error?.message)) {
            return true; // Prevent default handling
          }
          return originalOnError ? originalOnError.apply(this, arguments) : false;
        };

        console.log('✅ ResizeObserver error suppression active');
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
