// ResizeObserver fix will be loaded via previewHead script

import fs from 'node:fs';
import path from 'node:path';
import type { StorybookConfig } from '@storybook/angular';

let resizeObserverPatch = '(()=>{})();';
try {
  resizeObserverPatch = fs.readFileSync(
    path.resolve(__dirname, 'resize-observer-fix.js'),
    'utf-8'
  );
} catch (error) {
  // eslint-disable-next-line no-console
  console.warn('[storybook] resize-observer-fix.js missing, continuing without patch', error);
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
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
    <script>${resizeObserverPatch}</script>
    ${head}
    <!-- Only load PrimeIcons, PrimeNG theme will be token-driven -->
    <link rel="stylesheet" href="https://unpkg.com/primeicons@7.0.0/primeicons.css">
  `,
  managerHead: (head) => `
    <script>${resizeObserverPatch}</script>
    ${head}
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
