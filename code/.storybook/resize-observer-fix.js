// ULTIMATE ResizeObserver error suppression
// This must be loaded before any other scripts to catch all ResizeObserver errors

(function() {
  'use strict';

  // Function to check if an error is a ResizeObserver error
  function isResizeObserverError(message) {
    if (!message) return false;
    const str = String(message).toLowerCase();
    return (
      str.includes('resizeobserver') && (
        str.includes('loop') ||
        str.includes('notification') ||
        str.includes('undelivered') ||
        str.includes('limit') ||
        str.includes('completed')
      )
    );
  }

  // 1. Suppress console errors immediately
  if (typeof console !== 'undefined') {
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalLog = console.log;

    console.error = function(...args) {
      if (isResizeObserverError(args[0])) return;
      return originalError.apply(this, args);
    };

    console.warn = function(...args) {
      if (isResizeObserverError(args[0])) return;
      return originalWarn.apply(this, args);
    };

    console.log = function(...args) {
      if (isResizeObserverError(args[0])) return;
      return originalLog.apply(this, args);
    };
  }

  // 2. Suppress window errors
  if (typeof window !== 'undefined') {
    const originalOnError = window.onerror;
    window.onerror = function(message, source, lineno, colno, error) {
      if (isResizeObserverError(message)) {
        return true; // Prevent default handling
      }
      if (originalOnError) {
        return originalOnError.call(this, message, source, lineno, colno, error);
      }
      return false;
    };

    // Suppress unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
      if (isResizeObserverError(event.reason)) {
        event.preventDefault();
      }
    });

    // 3. Override ResizeObserver constructor to add debouncing
    if (typeof ResizeObserver !== 'undefined') {
      const OriginalResizeObserver = ResizeObserver;
      
      window.ResizeObserver = function(callback) {
        let timeoutId;
        const debouncedCallback = function(entries, observer) {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            try {
              callback.call(this, entries, observer);
            } catch (error) {
              if (!isResizeObserverError(error.message)) {
                throw error;
              }
            }
          }, 16); // Debounce by one frame
        };
        
        return new OriginalResizeObserver(debouncedCallback);
      };
      
      // Copy static properties
      Object.setPrototypeOf(window.ResizeObserver, OriginalResizeObserver);
      Object.defineProperty(window.ResizeObserver, 'prototype', {
        value: OriginalResizeObserver.prototype,
        writable: false
      });
    }

    // 4. Add error event listener to document
    document.addEventListener('error', function(event) {
      if (isResizeObserverError(event.message || event.error?.message)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
    }, true);

    // 5. Monkey patch addEventListener to catch ResizeObserver errors
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      if (type === 'error' && typeof listener === 'function') {
        const wrappedListener = function(event) {
          if (isResizeObserverError(event.message || event.error?.message)) {
            return;
          }
          return listener.call(this, event);
        };
        return originalAddEventListener.call(this, type, wrappedListener, options);
      }
      return originalAddEventListener.call(this, type, listener, options);
    };

    // 6. Prevent ResizeObserver errors from bubbling up to global error handlers
    const originalDispatchEvent = EventTarget.prototype.dispatchEvent;
    EventTarget.prototype.dispatchEvent = function(event) {
      if (event.type === 'error' && isResizeObserverError(event.message)) {
        return true;
      }
      return originalDispatchEvent.call(this, event);
    };
  }

  // 7. For Node.js environments (if any)
  if (typeof global !== 'undefined' && typeof process !== 'undefined') {
    process.on('uncaughtException', function(error) {
      if (isResizeObserverError(error.message)) {
        return; // Suppress
      }
      throw error;
    });

    process.on('unhandledRejection', function(reason) {
      if (isResizeObserverError(reason)) {
        return; // Suppress
      }
      throw reason;
    });
  }

})();
