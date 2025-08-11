// IMMEDIATE ResizeObserver error suppression - must be first!
if (typeof window !== 'undefined') {
  // Override console methods immediately
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalLog = console.log;

  const suppressError = (args: any[]) => {
    const message = String(args[0] || '');
    return message.includes('ResizeObserver') &&
           (message.includes('loop') || message.includes('notification') || message.includes('undelivered'));
  };

  console.error = (...args: any[]) => suppressError(args) ? void 0 : originalError.apply(console, args);
  console.warn = (...args: any[]) => suppressError(args) ? void 0 : originalWarn.apply(console, args);
  console.log = (...args: any[]) => suppressError(args) ? void 0 : originalLog.apply(console, args);

  // Immediate window.onerror override
  window.onerror = (message) => {
    const msg = String(message || '');
    return msg.includes('ResizeObserver') && (msg.includes('loop') || msg.includes('notification'));
  };
}

import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
      message.includes('ResizeObserver') && message.includes('notification') ||
      message.includes('ResizeObserver') && message.includes('undelivered') ||
      message.toLowerCase().includes('resizeobserver') && message.toLowerCase().includes('loop') ||
      message.toLowerCase().includes('resizeobserver') && message.toLowerCase().includes('notification')
    );
  }
  return false;
}

// Global error suppression at the earliest possible point
if (typeof window !== 'undefined') {
  // Catch errors immediately when they occur
  const originalAddEventListener = window.addEventListener;
  window.addEventListener = function(type: string, listener: any, options?: any): void {
    if (type === 'error') {
      const self = this;
      const wrappedListener = function(event: any) {
        if (event.message && isResizeObserverError(event.message)) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          return false;
        }
        return typeof listener === 'function' ? listener.call(self, event) : listener.handleEvent(event);
      };
      return originalAddEventListener.call(this, type, wrappedListener, options);
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
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

// Immediate window.onerror override - highest priority
const originalWindowOnError = window.onerror;
window.onerror = function(message, source, lineno, colno, error) {
  if (typeof message === 'string' && isResizeObserverError(message)) {
    return true; // Suppress the error
  }
  if (error && isResizeObserverError(error.message || String(error))) {
    return true; // Suppress the error
  }
  return originalWindowOnError ? originalWindowOnError.call(this, message, source, lineno, colno, error) : false;
};

// Handle ResizeObserver errors at the window level
window.addEventListener('error', (event) => {
  if (event.message && isResizeObserverError(event.message)) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
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

// Additional DOM error catching
document.addEventListener('error', (event) => {
  if (event.message && isResizeObserverError(event.message)) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
}, true); // Use capture phase

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
