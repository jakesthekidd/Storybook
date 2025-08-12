import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Simple theme configuration
const THEMES = {
  light: 'https://unpkg.com/primeng@17.18.15/resources/themes/lara-light-blue/theme.css',
  dark: 'https://unpkg.com/primeng@17.18.15/resources/themes/lara-dark-blue/theme.css'
};

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
    (story, context) => {
      // Apply theme based on global
      const theme = context.globals.theme || 'light';
      updateThemeCSS(theme);
      return story();
    }
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    docs: { inlineStories: true },
    layout: 'padded',
  },
  globalTypes: {
    theme: {
      description: 'PrimeNG Theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Lara Light', left: '🌞' },
          { value: 'dark', title: 'Lara Dark', left: '🌙' }
        ],
        dynamicTitle: true,
      },
    },
  },
};

// Function to dynamically update theme CSS
function updateThemeCSS(theme: 'light' | 'dark') {
  // Remove existing theme link
  const existingLink = document.querySelector('link[data-theme-css]');
  if (existingLink) {
    existingLink.remove();
  }

  // Add new theme link
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = THEMES[theme];
  link.setAttribute('data-theme-css', 'true');
  document.head.appendChild(link);
}

export default preview;
