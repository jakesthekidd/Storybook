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
    <!-- PrimeNG Theme CSS -->
    <link rel="stylesheet" href="/node_modules/primeng/resources/themes/lara-light-blue/theme.css">
    <!-- PrimeNG Core CSS -->
    <link rel="stylesheet" href="/node_modules/primeng/resources/primeng.min.css">
    <!-- PrimeIcons CSS -->
    <link rel="stylesheet" href="/node_modules/primeicons/primeicons.css">
    <!-- PrimeFlex CSS -->
    <link rel="stylesheet" href="/node_modules/primeflex/primeflex.css">
    <style>
      /* Design Tokens for Brand Theming */
      :root {
        /* Primary Brand Colors */
        --brand-primary: var(--blue-500);
        --brand-primary-light: var(--blue-100);
        --brand-primary-dark: var(--blue-700);

        /* Secondary Brand Colors */
        --brand-secondary: var(--gray-500);
        --brand-secondary-light: var(--gray-100);
        --brand-secondary-dark: var(--gray-700);

        /* Success Colors */
        --brand-success: var(--green-500);
        --brand-success-light: var(--green-100);
        --brand-success-dark: var(--green-700);

        /* Warning Colors */
        --brand-warning: var(--yellow-500);
        --brand-warning-light: var(--yellow-100);
        --brand-warning-dark: var(--yellow-700);

        /* Danger Colors */
        --brand-danger: var(--red-500);
        --brand-danger-light: var(--red-100);
        --brand-danger-dark: var(--red-700);

        /* Info Colors */
        --brand-info: var(--cyan-500);
        --brand-info-light: var(--cyan-100);
        --brand-info-dark: var(--cyan-700);

        /* Surface Colors */
        --brand-surface-ground: var(--surface-ground);
        --brand-surface-section: var(--surface-section);
        --brand-surface-card: var(--surface-card);
        --brand-surface-overlay: var(--surface-overlay);
        --brand-surface-border: var(--surface-border);
        --brand-surface-hover: var(--surface-hover);

        /* Text Colors */
        --brand-text-color: var(--text-color);
        --brand-text-color-secondary: var(--text-color-secondary);

        /* Spacing */
        --brand-spacing-xs: 0.25rem;
        --brand-spacing-sm: 0.5rem;
        --brand-spacing-md: 0.75rem;
        --brand-spacing-lg: 1rem;
        --brand-spacing-xl: 1.5rem;
        --brand-spacing-2xl: 2rem;

        /* Border Radius */
        --brand-border-radius: var(--border-radius);
        --brand-border-radius-sm: calc(var(--border-radius) / 2);
        --brand-border-radius-lg: calc(var(--border-radius) * 2);

        /* Shadows */
        --brand-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        --brand-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        --brand-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --brand-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }

      /* CSS to help prevent ResizeObserver loops */
      html, body {
        contain: layout style;
        overflow-x: hidden;
      }

      .sb-show-main,
      .sb-main-padded {
        contain: layout style paint;
        will-change: auto;
      }

      .docs-story,
      .sb-story {
        contain: layout style paint;
        overflow: hidden;
        will-change: auto;
      }

      #storybook-root {
        contain: layout style paint;
        min-height: 100vh;
        box-sizing: border-box;
        will-change: auto;
      }

      .storybook-wrapper {
        contain: layout style;
        will-change: auto;
      }

      .p-component {
        contain: layout style;
        will-change: auto;
      }

      .p-dialog,
      .p-sidebar,
      .p-menu,
      .p-dropdown-panel,
      .p-calendar-panel,
      .p-overlay,
      .p-overlaypanel {
        contain: layout style;
        will-change: auto;
      }

      .p-datatable,
      .p-datatable-wrapper {
        contain: layout style;
        will-change: auto;
      }

      .p-toast,
      .p-toast-message {
        contain: layout style;
        position: fixed;
        will-change: auto;
      }

      .p-tabview-panels,
      .p-tabview-nav {
        contain: layout style;
        will-change: auto;
      }

      .p-card,
      .p-panel {
        contain: layout style;
        will-change: auto;
      }

      /* Additional PrimeNG components */
      .p-accordion,
      .p-fieldset,
      .p-splitter,
      .p-scrollpanel {
        contain: layout style;
        will-change: auto;
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
