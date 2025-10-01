(function () {
  if (typeof window === 'undefined') {
    return;
  }

  if (window.__resizeObserverPatched__) {
    return;
  }

  window.__resizeObserverPatched__ = true;

  const suppressedMessages = [
    'ResizeObserver loop completed with undelivered notifications',
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications.',
    'ResizeObserver loop completed with undelivered notifications'
  ];

  const isSuppressedMessage = (value) => {
    if (typeof value !== 'string') {
      return false;
    }
    const normalized = value.trim();
    return suppressedMessages.some((entry) => normalized.includes(entry));
  };

  const originalConsoleError = typeof console !== 'undefined' && console.error
    ? console.error.bind(console)
    : null;
  const originalConsoleWarn = typeof console !== 'undefined' && console.warn
    ? console.warn.bind(console)
    : null;

  if (originalConsoleError) {
    console.error = (...args) => {
      if (args.length > 0 && isSuppressedMessage(args[0])) {
        return;
      }
      originalConsoleError(...args);
    };
  }

  if (originalConsoleWarn) {
    console.warn = (...args) => {
      if (args.length > 0 && isSuppressedMessage(args[0])) {
        return;
      }
      originalConsoleWarn(...args);
    };
  }

  window.addEventListener('error', (event) => {
    if (event?.message && isSuppressedMessage(event.message)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    const reasonMessage = typeof event?.reason === 'string' ? event.reason : event?.reason?.message;
    if (reasonMessage && isSuppressedMessage(reasonMessage)) {
      event.preventDefault();
    }
  });

  const originalWindowOnError = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    if (isSuppressedMessage(message) || isSuppressedMessage(error?.message)) {
      return true;
    }
    if (typeof originalWindowOnError === 'function') {
      return originalWindowOnError(message, source, lineno, colno, error);
    }
    return false;
  };

  if (typeof window.ResizeObserver !== 'function') {
    return;
  }

  const NativeResizeObserver = window.ResizeObserver;

  class PatchedResizeObserver {
    constructor(callback) {
      this.__callback = typeof callback === 'function' ? callback : () => undefined;
      this.__scheduledEntries = [];
      this.__frameId = 0;

      this.__observer = new NativeResizeObserver((entries) => {
        const list = Array.isArray(entries) ? entries : Array.from(entries || []);
        if (list.length === 0) {
          return;
        }

        this.__scheduledEntries.push(...list);

        if (this.__frameId) {
          return;
        }

        this.__frameId = requestAnimationFrame(() => {
          this.__frameId = 0;
          const delivery = this.__scheduledEntries;
          this.__scheduledEntries = [];

          try {
            this.__callback(delivery, this);
          } catch (error) {
            if (originalConsoleError && error && !isSuppressedMessage(error.message || error.toString?.())) {
              originalConsoleError(error);
            }
          }
        });
      });
    }

    observe(target, options) {
      return this.__observer.observe(target, options);
    }

    unobserve(target) {
      return this.__observer.unobserve(target);
    }

    disconnect() {
      if (this.__frameId) {
        cancelAnimationFrame(this.__frameId);
        this.__frameId = 0;
      }
      return this.__observer.disconnect();
    }
  }

  PatchedResizeObserver.toString = () => NativeResizeObserver.toString();

  window.ResizeObserver = PatchedResizeObserver;
})();
