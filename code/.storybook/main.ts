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
  staticDirs: ['../src/assets'],
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
    </style>
  `,
};

export default config;
