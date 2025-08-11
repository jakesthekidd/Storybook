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
};

export default config;
