// ResizeObserver error handler to prevent loop completion warnings
export function suppressResizeObserverErrors(): void {
  // Override the original ResizeObserver to handle errors gracefully
  if (typeof window !== 'undefined' && window.ResizeObserver) {
    const OriginalResizeObserver = window.ResizeObserver;
    
    window.ResizeObserver = class extends OriginalResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        const wrappedCallback: ResizeObserverCallback = (entries, observer) => {
          try {
            callback(entries, observer);
          } catch (error) {
            // Suppress ResizeObserver loop errors
            if (
              error instanceof Error &&
              error.message.includes('ResizeObserver loop completed with undelivered notifications')
            ) {
              return;
            }
            throw error;
          }
        };
        super(wrappedCallback);
      }
    };
  }

  // Handle unhandled promise rejections related to ResizeObserver
  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason &&
      event.reason.message &&
      event.reason.message.includes('ResizeObserver loop completed with undelivered notifications')
    ) {
      event.preventDefault();
    }
  });
}

// Auto-initialize when imported
suppressResizeObserverErrors();
