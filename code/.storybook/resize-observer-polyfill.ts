// Enhanced ResizeObserver error handler to prevent loop completion warnings
export function suppressResizeObserverErrors(): void {
  // Check if ResizeObserver error is related to loop notifications
  function isResizeObserverLoopError(error: any): boolean {
    const message = error?.message || String(error);
    return (
      message.includes('ResizeObserver loop completed with undelivered notifications') ||
      message.includes('ResizeObserver loop limit exceeded') ||
      message.includes('ResizeObserver loop') ||
      (message.includes('ResizeObserver') && message.includes('notification'))
    );
  }

  // Override the original ResizeObserver to handle errors gracefully
  if (typeof window !== 'undefined' && window.ResizeObserver) {
    const OriginalResizeObserver = window.ResizeObserver;

    window.ResizeObserver = class extends OriginalResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        const wrappedCallback: ResizeObserverCallback = (entries, observer) => {
          // Debounce the callback to prevent rapid firing
          let timeoutId: number | undefined;
          if (timeoutId) {
            clearTimeout(timeoutId);
          }

          timeoutId = window.setTimeout(() => {
            try {
              // Use requestAnimationFrame to avoid immediate loop issues
              requestAnimationFrame(() => {
                try {
                  callback(entries, observer);
                } catch (error) {
                  if (!isResizeObserverLoopError(error)) {
                    // Only log non-ResizeObserver errors
                    console.error('ResizeObserver callback error:', error);
                  }
                  // Always suppress ResizeObserver loop errors
                }
              });
            } catch (error) {
              // Suppress all ResizeObserver-related errors at this level
              if (!isResizeObserverLoopError(error)) {
                throw error;
              }
            }
          }, 0);
        };
        super(wrappedCallback);
      }
    };
  }

  // Handle unhandled promise rejections related to ResizeObserver
  window.addEventListener('unhandledrejection', (event) => {
    if (isResizeObserverLoopError(event.reason)) {
      event.preventDefault();
    }
  });

  // Additional global error handler for ResizeObserver
  const originalOnError = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    if (isResizeObserverLoopError(message || error)) {
      return true; // Suppress the error
    }
    return originalOnError ? originalOnError.call(this, message, source, lineno, colno, error) : false;
  };
}

// Auto-initialize when imported
suppressResizeObserverErrors();
