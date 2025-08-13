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
    <!-- Simple ResizeObserver error suppression -->
    <script>
      // Only suppress the specific ResizeObserver error
      const originalError = console.error;
      console.error = function(...args) {
        const message = String(args[0] || '');
        if (message === 'ResizeObserver loop completed with undelivered notifications.') {
          return; // Silent suppression of this specific error only
        }
        return originalError.apply(this, args);
      };
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
