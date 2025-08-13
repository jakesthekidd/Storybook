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
    <!-- Surgical ResizeObserver loop prevention -->
    <script>
      (function() {
        'use strict';

        // 1. Immediate error suppression
        const originalError = console.error;
        console.error = function(...args) {
          const message = String(args[0] || '');
          if (message.includes('ResizeObserver loop completed with undelivered notifications')) {
            return; // Silent suppression
          }
          return originalError.apply(this, args);
        };

        // 2. Monkey-patch ResizeObserver to prevent loops
        if (typeof window !== 'undefined' && window.ResizeObserver) {
          const OriginalResizeObserver = window.ResizeObserver;

          window.ResizeObserver = class LoopPreventingResizeObserver {
            constructor(callback) {
              this.callback = callback;
              this.observedElements = new WeakSet();
              this.processing = false;
              this.animationFrame = null;

              this.observer = new OriginalResizeObserver((entries) => {
                // Prevent recursive calls
                if (this.processing) return;

                // Cancel any pending animation frame
                if (this.animationFrame) {
                  cancelAnimationFrame(this.animationFrame);
                }

                // Schedule callback in next animation frame to prevent loops
                this.animationFrame = requestAnimationFrame(() => {
                  this.processing = true;
                  try {
                    // Filter entries to only include elements we're actually observing
                    const validEntries = entries.filter(entry =>
                      entry.target &&
                      entry.target.isConnected &&
                      this.observedElements.has(entry.target)
                    );

                    if (validEntries.length > 0) {
                      this.callback(validEntries);
                    }
                  } catch (error) {
                    // Swallow ResizeObserver errors but log others
                    if (!error.message.includes('ResizeObserver')) {
                      console.error(error);
                    }
                  } finally {
                    this.processing = false;
                    this.animationFrame = null;
                  }
                });
              });
            }

            observe(target, options) {
              if (target && target.nodeType === 1) {
                this.observedElements.add(target);
                this.observer.observe(target, options);
              }
            }

            unobserve(target) {
              if (target) {
                this.observedElements.delete(target);
                this.observer.unobserve(target);
              }
            }

            disconnect() {
              this.observedElements = new WeakSet();
              if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
                this.animationFrame = null;
              }
              this.observer.disconnect();
            }
          };
        }

        // 3. Global error handling as backup
        window.addEventListener('error', function(event) {
          if (event.message && event.message.includes('ResizeObserver loop completed with undelivered notifications')) {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
        }, { capture: true });

        console.log('✅ ResizeObserver loop prevention active');
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
