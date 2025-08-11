// ResizeObserver fix is now loaded via previewHead in main.ts

import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// CSS will be loaded via previewHead in main.ts

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      inlineStories: true,
    },
  },
  decorators: [
    (story) => ({
      template: `
        <div class="storybook-wrapper">
          <story></story>
        </div>
      `,
      providers: [
        importProvidersFrom(BrowserAnimationsModule)
      ]
    })
  ]
};

export default preview;
