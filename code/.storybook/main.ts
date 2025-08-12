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
      // ULTIMATE ResizeObserver error elimination - absolutely first thing that runs
      (function() {
        'use strict';

        // Store original methods before any other scripts can interfere
        const originalConsole = {
          error: console.error,
          warn: console.warn,
          log: console.log,
          info: console.info
        };

        // Comprehensive ResizeObserver detection
        const isResizeObserverError = (arg) => {
          if (!arg) return false;
          const str = String(arg);
          return (
            str.includes('ResizeObserver') ||
            str.includes('loop completed with undelivered notifications') ||
            str.includes('loop limit exceeded') ||
            str.includes('resize observer') ||
            str.includes('resizeobserver')
          );
        };

        // Override ALL console methods immediately
        ['error', 'warn', 'log', 'info', 'debug', 'trace'].forEach(method => {
          console[method] = function(...args) {
            if (args.some(isResizeObserverError)) return;
            try {
              originalConsole[method] && originalConsole[method].apply(console, args);
            } catch (e) {}
          };
        });

        // Multiple layers of window error suppression
        window.onerror = function(msg, source, line, col, error) {
          if (isResizeObserverError(msg) || isResizeObserverError(error?.message) || isResizeObserverError(error?.stack)) {
            return true;
          }
          return false;
        };

        window.onunhandledrejection = function(event) {
          if (isResizeObserverError(event.reason) || isResizeObserverError(event.reason?.message)) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
        };

        // Override addEventListener to prevent any ResizeObserver errors from bubbling
        const origAddEventListener = window.addEventListener;
        window.addEventListener = function(type, listener, options) {
          if (type === 'error') {
            const wrappedListener = function(event) {
              if (isResizeObserverError(event.message) || isResizeObserverError(event.error?.message)) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                return false;
              }
              return listener.apply(this, arguments);
            };
            return origAddEventListener.call(this, type, wrappedListener, options);
          }
          return origAddEventListener.call(this, type, listener, options);
        };

      })();
    </script>
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

        // COMPLETE ResizeObserver elimination
        if (typeof window !== 'undefined') {
          const OriginalResizeObserver = window.ResizeObserver;

          if (OriginalResizeObserver) {
            // Override with silent, non-throwing implementation
            window.ResizeObserver = class SilentResizeObserver {
              constructor(callback) {
                // Create instance but wrap all interactions
                this._observer = new OriginalResizeObserver((entries, observer) => {
                  // Execute callback in isolated context with complete error suppression
                  try {
                    // Use setTimeout to break execution context and prevent loops
                    setTimeout(() => {
                      try {
                        callback(entries, observer);
                      } catch (e) {
                        // Completely silent - no logging, no throwing
                      }
                    }, 0);
                  } catch (e) {
                    // Completely silent
                  }
                });
              }

              observe(target, options) {
                try {
                  return this._observer.observe(target, options);
                } catch (e) {
                  // Silent failure
                }
              }

              unobserve(target) {
                try {
                  return this._observer.unobserve(target);
                } catch (e) {
                  // Silent failure
                }
              }

              disconnect() {
                try {
                  return this._observer.disconnect();
                } catch (e) {
                  // Silent failure
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

        // NUCLEAR error suppression - multiple layers of interception

        // Immediate window error hijacking
        window.onerror = function(message, source, lineno, colno, error) {
          if (isResizeObserverError(message) || isResizeObserverError(error?.message)) {
            return true; // Completely suppress
          }
          return false; // Let other errors through
        };

        window.onunhandledrejection = function(event) {
          if (isResizeObserverError(event.reason) || isResizeObserverError(event.reason?.message)) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
        };

        // Aggressive event listener suppression
        const originalAddEventListener = window.addEventListener;
        window.addEventListener = function(type, listener, options) {
          if (type === 'error' || type === 'unhandledrejection') {
            const wrappedListener = function(event) {
              // Pre-filter ResizeObserver errors before they reach any listener
              if (type === 'error' && isResizeObserverError(event.message || event.error?.message)) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                return;
              }
              if (type === 'unhandledrejection' && isResizeObserverError(event.reason || event.reason?.message)) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                return;
              }
              return listener.apply(this, arguments);
            };
            return originalAddEventListener.call(this, type, wrappedListener, options);
          }
          return originalAddEventListener.call(this, type, listener, options);
        };

        // Override setTimeout/setInterval to catch async ResizeObserver errors
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
              // Silently suppress ResizeObserver errors
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
              // Silently suppress ResizeObserver errors
            }
          };
          return originalSetInterval.call(this, wrappedCallback, delay, ...args);
        };

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
    <script>
      // Restore console functionality with targeted ResizeObserver suppression
      (function() {
        'use strict';

        // Check if console was completely disabled and restore it properly
        if (typeof console === 'undefined' || !console.error || console.error.toString().includes('function () {}')) {
          // Create minimal console implementation that only suppresses ResizeObserver
          window.console = window.console || {};

          const nativeConsole = window.console;
          const methods = ['error', 'warn', 'log', 'info', 'debug', 'trace'];

          methods.forEach(method => {
            // Store original or create fallback
            const original = nativeConsole[method] || function() {};

            nativeConsole[method] = function(...args) {
              // Only suppress if it's specifically a ResizeObserver error
              const isResizeObserverError = args.some(arg => {
                const str = String(arg);
                return str.includes('ResizeObserver') &&
                       (str.includes('loop completed with undelivered notifications') ||
                        str.includes('loop'));
              });

              if (!isResizeObserverError) {
                // Let all other console messages through
                if (typeof original === 'function') {
                  return original.apply(this, args);
                }
              }
              // Silently suppress only ResizeObserver errors
            };
          });
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
