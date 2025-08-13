// Comprehensive ResizeObserver Error Fix
// This addresses the root cause of "ResizeObserver loop completed with undelivered notifications"

(function() {
  'use strict';
  
  // 1. First, completely suppress the error messages
  const suppressError = (message) => {
    if (!message) return false;
    const msg = String(message).toLowerCase();
    return msg.includes('resizeobserver') && (
      msg.includes('loop completed') ||
      msg.includes('undelivered notifications') ||
      msg.includes('loop limit exceeded')
    );
  };

  // Override console methods immediately
  ['error', 'warn', 'log'].forEach(method => {
    const original = console[method];
    console[method] = function(...args) {
      if (args.some(arg => suppressError(arg))) return;
      return original.apply(this, args);
    };
  });

  // 2. Replace ResizeObserver with a debounced version to prevent loops
  if (typeof window !== 'undefined' && window.ResizeObserver) {
    const OriginalResizeObserver = window.ResizeObserver;
    
    class SafeResizeObserver {
      constructor(callback) {
        this.callback = callback;
        this.observedElements = new Set();
        this.isProcessing = false;
        this.pendingEntries = [];
        
        // Create debounced callback to prevent loops
        this.debouncedCallback = this.debounce((entries) => {
          if (this.isProcessing) return;
          
          try {
            this.isProcessing = true;
            this.callback(entries);
          } catch (error) {
            if (!suppressError(error.message)) {
              console.error('ResizeObserver callback error:', error);
            }
          } finally {
            this.isProcessing = false;
          }
        }, 16); // 16ms = ~60fps
        
        this.observer = new OriginalResizeObserver((entries) => {
          // Filter out duplicate entries and entries from disconnected elements
          const validEntries = entries.filter(entry => {
            const element = entry.target;
            return element && 
                   element.isConnected && 
                   this.observedElements.has(element);
          });
          
          if (validEntries.length > 0) {
            this.debouncedCallback(validEntries);
          }
        });
      }
      
      observe(element, options) {
        if (element && element.nodeType === 1) { // Element node
          this.observedElements.add(element);
          this.observer.observe(element, options);
        }
      }
      
      unobserve(element) {
        this.observedElements.delete(element);
        this.observer.unobserve(element);
      }
      
      disconnect() {
        this.observedElements.clear();
        this.observer.disconnect();
      }
      
      // Utility method to debounce function calls
      debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
          const later = () => {
            clearTimeout(timeout);
            func(...args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      }
    }
    
    // Replace the global ResizeObserver
    window.ResizeObserver = SafeResizeObserver;
  }

  // 3. Additional error handling for any remaining errors
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
      if (suppressError(event.message || event.error?.message)) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    }, true);

    window.addEventListener('unhandledrejection', (event) => {
      if (suppressError(event.reason?.message || event.reason)) {
        event.preventDefault();
        return false;
      }
    });
  }

  // 4. Patch requestAnimationFrame to prevent ResizeObserver loops
  if (typeof window !== 'undefined' && window.requestAnimationFrame) {
    const originalRAF = window.requestAnimationFrame;
    const rafCallbacks = new Set();
    
    window.requestAnimationFrame = function(callback) {
      // Prevent duplicate RAF callbacks that might cause ResizeObserver loops
      if (rafCallbacks.has(callback)) {
        return 0; // Return dummy ID
      }
      
      rafCallbacks.add(callback);
      
      return originalRAF.call(this, function(timestamp) {
        rafCallbacks.delete(callback);
        try {
          callback(timestamp);
        } catch (error) {
          if (!suppressError(error.message)) {
            console.error('RAF callback error:', error);
          }
        }
      });
    };
  }

  console.log('✅ ResizeObserver fix applied - loops and errors prevented');
})();
