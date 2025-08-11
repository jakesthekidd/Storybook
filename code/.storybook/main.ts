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
    options: {
      builder: {
        name: '@angular-devkit/build-angular:browser',
        options: {
          projectRoot: '',
          sourceRoot: 'src',
          tsConfig: '.storybook/tsconfig.json',
        },
      },
    },
  },
  previewHead: (head) => `
    ${head}
    <style>
      /* Debug: Check if CSS is loading */
      body::before {
        content: "Storybook CSS is loaded!";
        position: fixed;
        top: 0;
        right: 0;
        background: #007acc;
        color: white;
        padding: 4px 8px;
        font-size: 12px;
        z-index: 999999;
        pointer-events: none;
      }

      /* Basic Design Tokens */
      :root {
        --brand-primary: #007acc;
        --brand-secondary: #6c757d;
        --brand-success: #28a745;
        --brand-warning: #ffc107;
        --brand-danger: #dc3545;
        --brand-info: #17a2b8;
      }

      /* Basic CSS to prevent ResizeObserver loops */
      html, body {
        overflow-x: hidden;
        margin: 0;
        padding: 0;
      }

      .sb-show-main,
      .sb-main-padded {
        box-sizing: border-box;
      }

      .docs-story,
      .sb-story {
        box-sizing: border-box;
      }

      #storybook-root {
        min-height: 100vh;
        box-sizing: border-box;
      }

      .storybook-wrapper {
        box-sizing: border-box;
        padding: 1rem;
      }

      /* Basic PrimeNG component styling */
      .p-component {
        box-sizing: border-box;
      }

      .p-button {
        cursor: pointer;
      }

      .p-card {
        box-sizing: border-box;
      }

      * {
        box-sizing: border-box;
      }

      body {
        contain: layout style;
        overflow-x: hidden;
      }

      /* Utility Classes Using Brand Tokens */
      .brand-text-primary { color: var(--brand-primary); }
      .brand-text-secondary { color: var(--brand-secondary); }
      .brand-text-success { color: var(--brand-success); }
      .brand-text-warning { color: var(--brand-warning); }
      .brand-text-danger { color: var(--brand-danger); }
      .brand-text-info { color: var(--brand-info); }

      .brand-bg-primary { background-color: var(--brand-primary); }
      .brand-bg-secondary { background-color: var(--brand-secondary); }
      .brand-bg-success { background-color: var(--brand-success); }
      .brand-bg-warning { background-color: var(--brand-warning); }
      .brand-bg-danger { background-color: var(--brand-danger); }
      .brand-bg-info { background-color: var(--brand-info); }

      .brand-border-primary { border-color: var(--brand-primary); }
      .brand-border-secondary { border-color: var(--brand-secondary); }

      .brand-shadow-sm { box-shadow: var(--brand-shadow-sm); }
      .brand-shadow { box-shadow: var(--brand-shadow); }
      .brand-shadow-md { box-shadow: var(--brand-shadow-md); }
      .brand-shadow-lg { box-shadow: var(--brand-shadow-lg); }
    </style>
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
