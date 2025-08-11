import type { Preview } from '@storybook/angular';
import './resize-observer-polyfill';

// Comprehensive error suppression for ResizeObserver issues
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const originalConsoleLog = console.log;

// Enhanced error suppression function
function isResizeObserverError(message: any): boolean {
  if (typeof message === 'string') {
    return (
      message.includes('ResizeObserver loop completed with undelivered notifications') ||
      message.includes('ResizeObserver loop limit exceeded') ||
      message.includes('ResizeObserver loop') ||
      message.includes('ResizeObserver') && message.includes('loop') ||
      message.includes('ResizeObserver') && message.includes('notification')
    );
  }
  return false;
}

console.error = (...args: any[]) => {
  if (isResizeObserverError(args[0])) {
    return;
  }
  originalConsoleError.apply(console, args);
};

console.warn = (...args: any[]) => {
  if (isResizeObserverError(args[0])) {
    return;
  }
  originalConsoleWarn.apply(console, args);
};

console.log = (...args: any[]) => {
  if (isResizeObserverError(args[0])) {
    return;
  }
  originalConsoleLog.apply(console, args);
};

// Handle ResizeObserver errors at the window level
window.addEventListener('error', (event) => {
  if (event.message && isResizeObserverError(event.message)) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
  return true;
});

// Handle unhandled rejections
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && isResizeObserverError(event.reason.message || String(event.reason))) {
    event.preventDefault();
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
