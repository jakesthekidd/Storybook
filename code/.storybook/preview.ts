import type { Preview } from '@storybook/angular';
import './resize-observer-polyfill';

// Import PrimeNG styles for Storybook
import 'primeng/resources/themes/lara-light-blue/theme.css';
import 'primeng/resources/primeng.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

// Comprehensive error suppression for ResizeObserver issues
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args: any[]) => {
  const message = args[0];
  if (
    typeof message === 'string' &&
    (message.includes('ResizeObserver loop completed with undelivered notifications') ||
     message.includes('ResizeObserver loop limit exceeded'))
  ) {
    return;
  }
  originalConsoleError.apply(console, args);
};

console.warn = (...args: any[]) => {
  const message = args[0];
  if (
    typeof message === 'string' &&
    (message.includes('ResizeObserver loop completed with undelivered notifications') ||
     message.includes('ResizeObserver loop limit exceeded'))
  ) {
    return;
  }
  originalConsoleWarn.apply(console, args);
};

// Handle ResizeObserver errors at the window level
window.addEventListener('error', (event) => {
  if (
    event.message &&
    (event.message.includes('ResizeObserver loop completed with undelivered notifications') ||
     event.message.includes('ResizeObserver loop limit exceeded'))
  ) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
  return true;
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
