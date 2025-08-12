import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loadTokens, type ThemeMode } from '../src/theme/loadTokens';

// Store current tokens globally for access across stories
let currentTokens: any = null;
let currentCSSVars: Record<string, string> = {};

// Inject base PrimeNG CSS dynamically
function injectBasePrimeNGCSS() {
  if (document.querySelector('#primeng-base-css')) return;

  const style = document.createElement('style');
  style.id = 'primeng-base-css';
  style.textContent = `
    /* PrimeNG Base Styles - Token Driven */
    :root {
      font-family: var(--p-font-family, "Inter", system-ui, sans-serif);
      font-size: var(--p-font-size, 14px);
    }

    .p-component {
      font-family: var(--p-font-family, "Inter", system-ui, sans-serif);
      font-size: var(--p-font-size, 14px);
    }

    .p-button {
      border-radius: var(--p-border-radius, 6px);
      font-family: var(--p-font-family, "Inter", system-ui, sans-serif);
      font-weight: 500;
      padding: 0.5rem 1rem;
      border: 1px solid transparent;
      transition: all 0.2s;
    }

    .p-button.p-button-primary {
      background-color: var(--p-button-primary-background, var(--p-primary-color, #3b82f6));
      border-color: var(--p-button-primary-border-color, var(--p-primary-color, #3b82f6));
      color: var(--p-button-primary-color, var(--p-primary-contrast-color, #ffffff));
    }

    .p-button.p-button-primary:not(:disabled):hover {
      background-color: var(--p-button-primary-hover-background, var(--p-primary-hover-color, #2563eb));
      border-color: var(--p-button-primary-hover-border-color, var(--p-primary-hover-color, #2563eb));
      color: var(--p-button-primary-hover-color, #ffffff);
    }

    .p-button.p-button-primary:not(:disabled):active {
      background-color: var(--p-button-primary-active-background, var(--p-primary-active-color, #1d4ed8));
      border-color: var(--p-button-primary-active-border-color, var(--p-primary-active-color, #1d4ed8));
      color: var(--p-button-primary-active-color, #ffffff);
    }

    .p-button.p-button-secondary {
      background-color: var(--p-button-secondary-background, var(--p-surface-500, #64748b));
      border-color: var(--p-button-secondary-border-color, var(--p-surface-500, #64748b));
      color: var(--p-button-secondary-color, #ffffff);
    }

    .p-button.p-button-secondary:not(:disabled):hover {
      background-color: var(--p-button-secondary-hover-background, var(--p-surface-600, #475569));
    }

    .p-button.p-button-success {
      background-color: var(--p-button-success-background, #10b981);
      border-color: var(--p-button-success-background, #10b981);
      color: #ffffff;
    }

    .p-button.p-button-info {
      background-color: var(--p-button-info-background, #3b82f6);
      border-color: var(--p-button-info-background, #3b82f6);
      color: #ffffff;
    }

    .p-button.p-button-warning {
      background-color: var(--p-button-warning-background, #f59e0b);
      border-color: var(--p-button-warning-background, #f59e0b);
      color: #ffffff;
    }

    .p-button.p-button-danger {
      background-color: var(--p-button-danger-background, #ef4444);
      border-color: var(--p-button-danger-background, #ef4444);
      color: #ffffff;
    }

    .p-button.p-button-outlined.p-button-primary {
      background-color: transparent;
      border-color: var(--p-primary-color, #3b82f6);
      color: var(--p-primary-color, #3b82f6);
    }

    .p-button.p-button-outlined.p-button-primary:not(:disabled):hover {
      background-color: var(--p-primary-color, #3b82f6);
      color: var(--p-primary-contrast-color, #ffffff);
    }

    /* Surface and content styling */
    body {
      background-color: var(--p-surface-0, #ffffff);
      color: var(--p-text-color, #0f172a);
      font-family: var(--p-font-family, "Inter", system-ui, sans-serif);
    }
  `;
  document.head.appendChild(style);
}

// Function to apply tokens and update theme
function applyTokenTheme(theme: ThemeMode) {
  try {
    // Inject base PrimeNG CSS first
    injectBasePrimeNGCSS();

    // Load tokens for the specified theme
    const { preset, cssVars } = loadTokens(theme);
    currentTokens = preset;
    currentCSSVars = cssVars;

    // Apply CSS variables to document root
    const root = document.documentElement;

    // Clear previous token CSS variables
    Array.from(root.style).forEach(property => {
      if (property.startsWith('--tf-') || property.startsWith('--brand-') || property.startsWith('--p-')) {
        root.style.removeProperty(property);
      }
    });

    // Apply new CSS variables from tokens
    Object.entries(cssVars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Apply semantic brand variables for backward compatibility
    const primaryColor = cssVars['--p-primary-color'] || '#3b82f6';
    const textColor = cssVars['--p-text-color'] || (theme === 'light' ? '#0f172a' : '#f1f5f9');
    const surfaceColor = cssVars['--p-surface-0'] || (theme === 'light' ? '#ffffff' : '#0f172a');

    root.style.setProperty('--brand-primary', primaryColor);
    root.style.setProperty('--brand-text-primary', textColor);
    root.style.setProperty('--brand-surface', surfaceColor);
    root.style.setProperty('--brand-secondary', cssVars['--p-text-muted-color'] || '#64748b');

    console.log(`✅ Applied ${theme} theme with ${Object.keys(cssVars).length} CSS variables`);
    console.log(`🎨 PrimeNG variables applied: ${Object.keys(cssVars).filter(k => k.startsWith('--p-')).length}`);

    // Store theme in localStorage for persistence
    localStorage.setItem('storybook-theme-mode', theme);

  } catch (error) {
    console.error(`❌ Failed to apply ${theme} theme:`, error);

    // Fallback to basic theme variables
    const root = document.documentElement;
    const fallbackVars = {
      '--p-primary-color': '#3b82f6',
      '--p-primary-contrast-color': '#ffffff',
      '--p-surface-0': theme === 'dark' ? '#0f172a' : '#ffffff',
      '--p-text-color': theme === 'dark' ? '#f1f5f9' : '#0f172a',
      '--p-font-family': '"Inter", system-ui, sans-serif',
      '--p-font-size': '14px',
      '--p-border-radius': '6px',
      '--brand-primary': '#3b82f6',
      '--brand-surface': theme === 'dark' ? '#0f172a' : '#ffffff',
      '--brand-text-primary': theme === 'dark' ? '#f1f5f9' : '#0f172a'
    };

    Object.entries(fallbackVars).forEach(([prop, value]) => {
      root.style.setProperty(prop, value);
    });
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
