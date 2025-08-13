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
      // Comprehensive ResizeObserver Error Fix - Executed immediately
      (function() {
        'use strict';

        // 1. Suppress error messages first
        const suppressError = (message) => {
          if (!message) return false;
          const msg = String(message).toLowerCase();
          return msg.includes('resizeobserver') && (
            msg.includes('loop completed') ||
            msg.includes('undelivered notifications') ||
            msg.includes('loop limit exceeded')
          );
        };

        // Override console methods immediately
        ['error', 'warn'].forEach(method => {
          const original = console[method];
          console[method] = function(...args) {
            if (args.some(arg => suppressError(arg))) return;
            return original.apply(this, args);
          };
        });

        // 2. Replace ResizeObserver with debounced version
        if (typeof window !== 'undefined' && window.ResizeObserver) {
          const OriginalResizeObserver = window.ResizeObserver;

          class SafeResizeObserver {
            constructor(callback) {
              this.callback = callback;
              this.observedElements = new Set();
              this.isProcessing = false;

              // Debounced callback to prevent loops
              this.debouncedCallback = this.debounce((entries) => {
                if (this.isProcessing) return;

                try {
                  this.isProcessing = true;
                  this.callback(entries);
                } catch (error) {
                  if (!suppressError(error.message)) {
                    console.error('ResizeObserver callback error:', error);
                  }
                } finally {
                  this.isProcessing = false;
                }
              }, 16);

              this.observer = new OriginalResizeObserver((entries) => {
                const validEntries = entries.filter(entry => {
                  const element = entry.target;
                  return element &&
                         element.isConnected &&
                         this.observedElements.has(element);
                });

                if (validEntries.length > 0) {
                  this.debouncedCallback(validEntries);
                }
              });
            }

            observe(element, options) {
              if (element && element.nodeType === 1) {
                this.observedElements.add(element);
                this.observer.observe(element, options);
              }
            }

            unobserve(element) {
              this.observedElements.delete(element);
              this.observer.unobserve(element);
            }

            disconnect() {
              this.observedElements.clear();
              this.observer.disconnect();
            }

            debounce(func, wait) {
              let timeout;
              return function executedFunction(...args) {
                const later = () => {
                  clearTimeout(timeout);
                  func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
              };
            }
          }

          window.ResizeObserver = SafeResizeObserver;
        }

        // 3. Global error handling
        if (typeof window !== 'undefined') {
          window.addEventListener('error', (event) => {
            if (suppressError(event.message || event.error?.message)) {
              event.preventDefault();
              event.stopPropagation();
              return false;
            }
          }, true);

          window.addEventListener('unhandledrejection', (event) => {
            if (suppressError(event.reason?.message || event.reason)) {
              event.preventDefault();
              return false;
            }
          });
        }

        console.log('✅ ResizeObserver fix applied - loops and errors prevented');
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
