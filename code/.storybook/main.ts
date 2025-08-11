import type { StorybookConfig } from '@storybook/angular';

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
        },
      },
    },
  },
};

export default config;
