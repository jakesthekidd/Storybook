import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Load PrimeNG CSS here so Storybook owns it
import 'primeng/resources/themes/lara-light-blue/theme.css';
import 'primeng/resources/primeng.min.css';
import 'primeicons/primeicons.css';
import '../src/styles/tokens.css';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    docs: { inlineStories: true },
    layout: 'padded',
  },
};

export default preview;
