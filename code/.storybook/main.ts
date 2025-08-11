import type { StorybookConfig } from '@storybook/angular';

// Suppress ResizeObserver errors globally
if (typeof window !== 'undefined') {
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    if (
      args[0] &&
      typeof args[0] === 'string' &&
      args[0].includes('ResizeObserver loop completed with undelivered notifications')
    ) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
}

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
      .sb-show-main,
      .sb-main-padded {
        contain: layout style;
      }

      .docs-story,
      .sb-story {
        contain: layout;
        overflow: hidden;
      }

      #storybook-root {
        contain: layout style;
        min-height: 100vh;
        box-sizing: border-box;
      }

      .p-component {
        contain: layout;
      }

      .p-dialog,
      .p-sidebar,
      .p-menu,
      .p-dropdown-panel,
      .p-calendar-panel {
        contain: layout;
      }

      .p-datatable {
        contain: layout;
      }

      .p-toast {
        contain: layout;
        position: fixed;
      }

      .p-tabview-panels {
        contain: layout;
      }

      .p-card {
        contain: layout;
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
