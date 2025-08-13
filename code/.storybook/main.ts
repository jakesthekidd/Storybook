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
    <!-- IMMEDIATE ResizeObserver elimination executed before anything else -->
    <script>
      // Nuclear ResizeObserver elimination with monitoring
      window.ResizeObserver = undefined;
      delete window.ResizeObserver;

      // Immediately kill any console errors
      const origError = console.error;
      console.error = function() {
        const msg = String(arguments[0] || '');
        if (msg.includes('ResizeObserver') || msg.includes('loop completed') || msg.includes('undelivered notifications')) {
          return; // Completely silent
        }
        return origError.apply(this, arguments);
      };

      // Prevent any ResizeObserver creation
      Object.defineProperty(window, 'ResizeObserver', {
        get: () => class NoOpResizeObserver { observe(){} unobserve(){} disconnect(){} },
        set: () => {},
        configurable: false,
        enumerable: false
      });

      // Monitor for any script injections trying to create ResizeObserver
      if (window.MutationObserver) {
        const observer = new MutationObserver(() => {
          if (window.ResizeObserver && window.ResizeObserver.name !== 'NoOpResizeObserver') {
            window.ResizeObserver = class NoOpResizeObserver { observe(){} unobserve(){} disconnect(){} };
          }
        });
        observer.observe(document, { childList: true, subtree: true });
      }

      // Global error elimination
      window.onerror = (msg) => String(msg).includes('ResizeObserver');
      window.addEventListener('error', e => {
        if (String(e.message || '').includes('ResizeObserver')) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }, true);
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
