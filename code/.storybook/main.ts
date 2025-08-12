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
      // IMMEDIATE ResizeObserver error suppression - before any other scripts
      (function() {
        'use strict';

        // More comprehensive error detection
        const isResizeObserverError = (msg) => {
          if (!msg) return false;
          const str = String(msg).toLowerCase();
          return (str.includes('resizeobserver') || str.includes('resize observer')) && (
            str.includes('loop completed with undelivered notifications') ||
            str.includes('loop limit exceeded') ||
            str.includes('loop') ||
            str.includes('notification') ||
            str.includes('undelivered') ||
            str.includes('exceeded') ||
            str.includes('complete')
          );
        };

        // Immediate console suppression
        if (typeof console !== 'undefined') {
          const originals = {
            error: console.error,
            warn: console.warn,
            log: console.log,
            info: console.info,
            debug: console.debug
          };

          ['error', 'warn', 'log', 'info', 'debug'].forEach(method => {
            console[method] = function(...args) {
              if (args.some(arg => isResizeObserverError(arg))) {
                return; // Silently suppress
              }
              originals[method].apply(console, args);
            };
          });
        }

        // Complete ResizeObserver override
        if (typeof window !== 'undefined') {
          // Store original before any modification
          const OriginalResizeObserver = window.ResizeObserver;

          if (OriginalResizeObserver) {
            window.ResizeObserver = class extends OriginalResizeObserver {
              constructor(callback) {
                const silentCallback = (entries, observer) => {
                  // Wrap in try-catch and requestIdleCallback for better timing
                  const safeExecution = () => {
                    try {
                      callback(entries, observer);
                    } catch (error) {
                      // Completely silent - don't even log ResizeObserver errors
                      if (!isResizeObserverError(error.message)) {
                        throw error;
                      }
                    }
                  };

                  if (typeof requestIdleCallback !== 'undefined') {
                    requestIdleCallback(safeExecution, { timeout: 100 });
                  } else {
                    setTimeout(safeExecution, 0);
                  }
                };
                super(silentCallback);
              }
            };

            // Also override the prototype methods
            window.ResizeObserver.prototype.observe = function(target, options) {
              try {
                return OriginalResizeObserver.prototype.observe.call(this, target, options);
              } catch (error) {
                if (!isResizeObserverError(error.message)) {
                  throw error;
                }
              }
            };

            window.ResizeObserver.prototype.unobserve = function(target) {
              try {
                return OriginalResizeObserver.prototype.unobserve.call(this, target);
              } catch (error) {
                if (!isResizeObserverError(error.message)) {
                  throw error;
                }
              }
            };

            window.ResizeObserver.prototype.disconnect = function() {
              try {
                return OriginalResizeObserver.prototype.disconnect.call(this);
              } catch (error) {
                if (!isResizeObserverError(error.message)) {
                  throw error;
                }
              }
            };
          }
        }

        // Override all console methods
        const originalConsole = {
          error: console.error,
          warn: console.warn,
          log: console.log,
          info: console.info
        };

        ['error', 'warn'].forEach(method => {
          (console as any)[method] = function(...args: any[]) {
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
