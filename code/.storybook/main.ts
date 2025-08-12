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
      // Comprehensive ResizeObserver error suppression
      (function() {
        const isResizeObserverError = (msg) => {
          if (!msg) return false;
          const str = String(msg);
          return str.includes('ResizeObserver') && (
            str.includes('loop completed with undelivered notifications') ||
            str.includes('loop limit exceeded') ||
            str.includes('loop') ||
            str.includes('notification') ||
            str.includes('undelivered')
          );
        };

        // Override native ResizeObserver constructor
        if (typeof window !== 'undefined' && window.ResizeObserver) {
          const OriginalResizeObserver = window.ResizeObserver;
          window.ResizeObserver = class extends OriginalResizeObserver {
            constructor(callback) {
              const wrappedCallback = (entries, observer) => {
                try {
                  callback(entries, observer);
                } catch (e) {
                  if (!isResizeObserverError(e.message)) {
                    throw e;
                  }
                  // Silently ignore ResizeObserver errors
                }
              };
              super(wrappedCallback);
            }
          };
        }

        // Override all console methods
        const originalConsole = {
          error: console.error,
          warn: console.warn,
          log: console.log,
          info: console.info
        };

        ['error', 'warn', 'log', 'info'].forEach(method => {
          console[method] = function(...args) {
            if (args.some(arg => isResizeObserverError(arg))) return;
            originalConsole[method].apply(console, args);
          };
        });

        // Multiple layers of error handling
        const errorHandlers = [
          // Window error handler
          window.addEventListener('error', function(e) {
            if (isResizeObserverError(e.message) || isResizeObserverError(e.error?.message)) {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              return false;
            }
          }, true),

          // Unhandled promise rejections
          window.addEventListener('unhandledrejection', function(e) {
            if (isResizeObserverError(e.reason) || isResizeObserverError(e.reason?.message)) {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
              return false;
            }
          }, true),

          // Override window.onerror
          (() => {
            const originalOnError = window.onerror;
            window.onerror = function(message, source, lineno, colno, error) {
              if (isResizeObserverError(message) || isResizeObserverError(error?.message)) {
                return true; // Prevent default browser error handling
              }
              return originalOnError ? originalOnError.apply(this, arguments) : false;
            };
          })(),

          // Override window.onunhandledrejection
          (() => {
            const originalOnRejection = window.onunhandledrejection;
            window.onunhandledrejection = function(event) {
              if (isResizeObserverError(event.reason) || isResizeObserverError(event.reason?.message)) {
                event.preventDefault();
                return true;
              }
              return originalOnRejection ? originalOnRejection.apply(this, arguments) : false;
            };
          })()
        ];

        // Monkey patch setTimeout and setInterval to catch async errors
        const originalSetTimeout = window.setTimeout;
        const originalSetInterval = window.setInterval;

        window.setTimeout = function(callback, delay, ...args) {
          const wrappedCallback = function() {
            try {
              return callback.apply(this, arguments);
            } catch (e) {
              if (!isResizeObserverError(e.message)) {
                throw e;
              }
            }
          };
          return originalSetTimeout.call(this, wrappedCallback, delay, ...args);
        };

        window.setInterval = function(callback, delay, ...args) {
          const wrappedCallback = function() {
            try {
              return callback.apply(this, arguments);
            } catch (e) {
              if (!isResizeObserverError(e.message)) {
                throw e;
              }
            }
          };
          return originalSetInterval.call(this, wrappedCallback, delay, ...args);
        };

        // Additional protection for requestAnimationFrame
        const originalRAF = window.requestAnimationFrame;
        window.requestAnimationFrame = function(callback) {
          const wrappedCallback = function(timestamp) {
            try {
              return callback(timestamp);
            } catch (e) {
              if (!isResizeObserverError(e.message)) {
                throw e;
              }
            }
          };
          return originalRAF.call(this, wrappedCallback);
        };

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
