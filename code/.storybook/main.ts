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
    './addons/enterprise-token-addon.ts',
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
      // NUCLEAR ResizeObserver error suppression - eliminate all instances
      (function() {
        'use strict';

        // Ultra-precise error detection for exact message
        const isResizeObserverError = (msg) => {
          if (!msg) return false;
          const str = String(msg);
          return str === 'ResizeObserver loop completed with undelivered notifications.' ||
                 str.includes('ResizeObserver loop completed with undelivered notifications') ||
                 str.includes('ResizeObserver loop limit exceeded') ||
                 (str.toLowerCase().includes('resizeobserver') && str.toLowerCase().includes('loop'));
        };

        // IMMEDIATE console hijacking - before anything else loads
        if (typeof console !== 'undefined') {
          const noop = () => {};
          const originals = {
            error: console.error,
            warn: console.warn,
            log: console.log,
            info: console.info,
            debug: console.debug,
            trace: console.trace
          };

          // Aggressive console override
          ['error', 'warn', 'log', 'info', 'debug', 'trace'].forEach(method => {
            console[method] = function(...args) {
              // Check all arguments for ResizeObserver errors
              for (let arg of args) {
                if (isResizeObserverError(arg)) {
                  return; // Complete suppression
                }
              }
              // Only call original if no ResizeObserver error detected
              try {
                originals[method].apply(console, args);
              } catch (e) {
                // Ignore any errors in logging
              }
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

        // Ultra-comprehensive error handling layers

        // Error event listeners with highest priority
        window.addEventListener('error', function(e) {
          if (isResizeObserverError(e.message) || isResizeObserverError(e.error?.message) || isResizeObserverError(e.filename)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
          }
        }, { capture: true, passive: false });

        window.addEventListener('unhandledrejection', function(e) {
          if (isResizeObserverError(e.reason) || isResizeObserverError(e.reason?.message) || isResizeObserverError(e.reason?.stack)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
          }
        }, { capture: true, passive: false });

        // Override window error handlers
        const originalOnError = window.onerror;
        window.onerror = function(message, source, lineno, colno, error) {
          if (isResizeObserverError(message) || isResizeObserverError(error?.message) || isResizeObserverError(source)) {
            return true; // Prevent default error handling
          }
          return originalOnError ? originalOnError.apply(this, arguments) : false;
        };

        const originalOnRejection = window.onunhandledrejection;
        window.onunhandledrejection = function(event) {
          if (isResizeObserverError(event.reason) || isResizeObserverError(event.reason?.message) || isResizeObserverError(event.reason?.stack)) {
            event.preventDefault();
            return true;
          }
          return originalOnRejection ? originalOnRejection.apply(this, arguments) : false;
        };

        // Override global error reporting methods
        if (typeof reportError !== 'undefined') {
          const originalReportError = reportError;
          reportError = function(error) {
            if (!isResizeObserverError(error.message) && !isResizeObserverError(error.stack)) {
              originalReportError(error);
            }
          };
        }

        // Comprehensive async function wrapping
        const wrapAsyncFunction = (fn, context) => {
          return function(...args) {
            const callback = args[0];
            if (typeof callback === 'function') {
              args[0] = function(...cbArgs) {
                try {
                  return callback.apply(this, cbArgs);
                } catch (error) {
                  if (!isResizeObserverError(error.message) && !isResizeObserverError(error.stack)) {
                    throw error;
                  }
                  // Silent suppression for ResizeObserver errors
                }
              };
            }
            return fn.apply(context, args);
          };
        };

        // Wrap all async timing functions
        if (window.setTimeout) {
          window.setTimeout = wrapAsyncFunction(window.setTimeout, window);
        }
        if (window.setInterval) {
          window.setInterval = wrapAsyncFunction(window.setInterval, window);
        }
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame = wrapAsyncFunction(window.requestAnimationFrame, window);
        }
        if (window.requestIdleCallback) {
          window.requestIdleCallback = wrapAsyncFunction(window.requestIdleCallback, window);
        }

        // Additional MutationObserver protection (often triggers ResizeObserver)
        if (window.MutationObserver) {
          const OriginalMutationObserver = window.MutationObserver;
          window.MutationObserver = class extends OriginalMutationObserver {
            constructor(callback) {
              const wrappedCallback = function(mutations, observer) {
                try {
                  callback(mutations, observer);
                } catch (error) {
                  if (!isResizeObserverError(error.message)) {
                    throw error;
                  }
                }
              };
              super(wrappedCallback);
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

    return config;
  },
};

export default config;
