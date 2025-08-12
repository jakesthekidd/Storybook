import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loadTokens, type ThemeMode } from '../src/theme/loadTokens';

// Store current tokens globally for access across stories
let currentTokens: any = null;
let currentCSSVars: Record<string, string> = {};

// Function to apply tokens and update theme
function applyTokenTheme(theme: ThemeMode) {
  try {
    // Load tokens for the specified theme
    const { preset, cssVars } = loadTokens(theme);
    currentTokens = preset;
    currentCSSVars = cssVars;

    // Apply CSS variables to document root
    const root = document.documentElement;

    // Clear previous custom CSS variables
    Array.from(root.style).forEach(property => {
      if (property.startsWith('--tf-') || property.startsWith('--brand-')) {
        root.style.removeProperty(property);
      }
    });

    // Apply new CSS variables from tokens
    Object.entries(cssVars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Apply semantic brand variables for backward compatibility
    if (preset.semantic?.primary) {
      root.style.setProperty('--brand-primary', preset.semantic.primary[500] || '#3b82f6');
    }

    if (preset.semantic?.colorScheme?.[theme]) {
      const colorScheme = preset.semantic.colorScheme[theme];
      if (colorScheme.primary?.color) {
        root.style.setProperty('--brand-primary', colorScheme.primary.color);
      }
      if (colorScheme.text?.color) {
        root.style.setProperty('--brand-text-primary', colorScheme.text.color);
      }
      if (colorScheme.surface?.[0]) {
        root.style.setProperty('--brand-surface', colorScheme.surface[0]);
      }
      if (colorScheme.text?.mutedColor) {
        root.style.setProperty('--brand-secondary', colorScheme.text.mutedColor);
      }
    }

    console.log(`Applied ${theme} theme with ${Object.keys(cssVars).length} CSS variables`);

    // Store theme in localStorage for persistence
    localStorage.setItem('storybook-theme-mode', theme);

  } catch (error) {
    console.error(`Failed to apply ${theme} theme:`, error);

    // Fallback to basic theme variables
    const root = document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--brand-primary', '#3b82f6');
      root.style.setProperty('--brand-secondary', '#64748b');
      root.style.setProperty('--brand-surface', '#1e293b');
      root.style.setProperty('--brand-text-primary', '#f1f5f9');
    } else {
      root.style.setProperty('--brand-primary', '#007acc');
      root.style.setProperty('--brand-secondary', '#6c757d');
      root.style.setProperty('--brand-surface', '#ffffff');
      root.style.setProperty('--brand-text-primary', '#495057');
    }
  }
}

// Get stored theme or default to light
const getInitialTheme = (): ThemeMode => {
  const stored = localStorage.getItem('storybook-theme-mode');
  return (stored === 'dark' || stored === 'light') ? stored : 'light';
};

// Initialize theme immediately
applyTokenTheme(getInitialTheme());

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
    (story, context) => {
      // Apply theme based on global with proper property access
      const theme = (context.globals['theme'] as 'light' | 'dark') ?? 'light';
      applyTokenTheme(theme);

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
      description: 'Token Studio Theme',
      defaultValue: getInitialTheme(),
      toolbar: {
        title: 'Theme Mode',
        icon: 'paintbrush',
        items: [
          {
            value: 'light',
            title: 'Lara Light (Token Studio)',
            left: '🌞',
            right: '🎨'
          },
          {
            value: 'dark',
            title: 'Lara Dark (Token Studio)',
            left: '🌙',
            right: '🎨'
          }
        ],
        dynamicTitle: true,
        showName: true
      },
    },
  },
};

export default preview;
