// Immediate and aggressive ResizeObserver error suppression
export function suppressResizeObserverErrors(): void {
  if (typeof window === 'undefined') return;

  // Immediate error suppression function
  const isResizeObserverError = (msg: any): boolean => {
    const message = String(msg || '');
    return message.includes('ResizeObserver') &&
           (message.includes('loop') || message.includes('notification') || message.includes('undelivered'));
  };

  // Override ResizeObserver completely to prevent errors at source
  if (window.ResizeObserver) {
    const OriginalResizeObserver = window.ResizeObserver;

    window.ResizeObserver = class extends OriginalResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        // Wrap callback to suppress all errors
        const safeCallback: ResizeObserverCallback = (entries, observer) => {
          try {
            // Use both RAF and timeout to prevent loops
            requestAnimationFrame(() => {
              setTimeout(() => {
                try {
                  callback(entries, observer);
                } catch (e) {
                  // Silently suppress all callback errors
                }
              }, 0);
            });
          } catch (e) {
            // Silently suppress all errors
          }
        };
        super(safeCallback);
      }
    };
  }

  // Nuclear option: catch everything
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    if (isResizeObserverError(args[0])) return;
    originalConsoleError.apply(console, args);
  };

  // Suppress all ResizeObserver-related unhandled rejections
  window.addEventListener('unhandledrejection', (event) => {
    if (isResizeObserverError(event.reason?.message || event.reason)) {
      event.preventDefault();
    }
  });

  // Global error handler override
  window.onerror = (message) => isResizeObserverError(message) ? true : false;
}

// Auto-initialize when imported
suppressResizeObserverErrors();
