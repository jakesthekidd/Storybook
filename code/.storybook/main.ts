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
    '@storybook/addon-toolbars',
    './.storybook/theme-controls-addon/manager.tsx',
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
      // Suppress harmless ResizeObserver warnings
      const originalError = console.error;
      console.error = function(msg) {
        if (msg && msg.includes && msg.includes('ResizeObserver loop')) return;
        originalError.apply(console, arguments);
      };
    </script>
    ${head}
    <!-- PrimeNG CSS from CDN for reliable loading -->
    <link rel="stylesheet" href="https://unpkg.com/primeng@17.18.15/resources/themes/lara-light-blue/theme.css">
    <link rel="stylesheet" href="https://unpkg.com/primeng@17.18.15/resources/primeng.min.css">
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
