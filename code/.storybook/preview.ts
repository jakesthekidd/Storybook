import type { Preview } from '@storybook/angular';
import './resize-observer-polyfill';

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
