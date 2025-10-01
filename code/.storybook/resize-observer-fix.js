(function () {
  if (typeof window === 'undefined') {
    return;
  }

  const suppressedMessages = [
    'ResizeObserver loop completed with undelivered notifications.',
    'ResizeObserver loop completed with undelivered notifications'
  ];

  const originalConsoleError = typeof console !== 'undefined' && console.error
    ? console.error.bind(console)
    : null;

  if (originalConsoleError) {
    console.error = (...args) => {
      const message = typeof args[0] === 'string' ? args[0] : '';
      if (suppressedMessages.some((entry) => message.includes(entry))) {
        return;
      }
      originalConsoleError(...args);
    };
  }

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
            if (originalConsoleError) {
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
      return this.__observer.disconnect();
    }
  }

  PatchedResizeObserver.toString = () => NativeResizeObserver.toString();

  window.ResizeObserver = PatchedResizeObserver;
})();
