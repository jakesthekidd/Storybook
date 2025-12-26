/**
 * Enterprise Design System Orchestrator
 * Ensures token changes propagate throughout the entire system
 */

import { BehaviorSubject, Observable } from 'rxjs';
import { loadTokens, type ThemeMode } from './loadTokens';

interface DesignSystemState {
  theme: ThemeMode;
  tokens: Record<string, string>;
  components: Set<string>;
  lastUpdated: Date;
}

class EnterpriseDesignSystem {
  private state$ = new BehaviorSubject<DesignSystemState>({
    theme: 'light',
    tokens: {},
    components: new Set(),
    lastUpdated: new Date()
  });

  private subscribers = new Set<(state: DesignSystemState) => void>();
  private componentRegistry = new Map<string, HTMLElement[]>();

  /**
   * Initialize the design system with proper CSS variable mapping
   */
  initialize(initialTheme: ThemeMode = 'light') {
    this.updateTheme(initialTheme);
    this.setupGlobalStyleObserver();
    this.setupStorybookIntegration();
    console.log('🎯 Enterprise Design System initialized');
  }

  /**
   * Update theme and propagate changes
   */
  updateTheme(theme: ThemeMode, forceRefresh = false) {
    try {
      const { preset, cssVars } = loadTokens(theme);
      
      // Apply actual PrimeNG CSS variables
      const primeNGVars = this.mapToPrimeNGVariables(cssVars, theme);
      this.injectCSSVariables(primeNGVars);
      
      // Update state
      const newState: DesignSystemState = {
        theme,
        tokens: { ...cssVars, ...primeNGVars },
        components: this.state$.value.components,
        lastUpdated: new Date()
      };
      
      this.state$.next(newState);
      
      // Notify all subscribers
      this.notifySubscribers(newState);
      
      // Force Storybook re-render if needed
      if (forceRefresh) {
        this.forceStorybookRefresh();
      }
      
      console.log(`✅ Theme updated to ${theme} with ${Object.keys(primeNGVars).length} variables`);
      
    } catch (error) {
      console.error('❌ Failed to update theme:', error);
    }
  }

  /**
   * Map our tokens to actual PrimeNG CSS variables
   */
  private mapToPrimeNGVariables(tokens: Record<string, string>, theme: ThemeMode): Record<string, string> {
    const vars: Record<string, string> = {};
    
    // PrimeNG uses these actual CSS variables (inspected from PrimeNG source)
    
    // Primary color system
    const primary = tokens['--p-primary-color'] || '#3b82f6';
    vars['--primary-color'] = primary;
    vars['--primary-color-text'] = tokens['--p-primary-contrast-color'] || '#ffffff';
    
    // Surface colors
    vars['--surface-ground'] = tokens['--p-surface-0'] || (theme === 'light' ? '#ffffff' : '#0f172a');
    vars['--surface-section'] = tokens['--p-surface-0'] || (theme === 'light' ? '#ffffff' : '#0f172a');
    vars['--surface-card'] = tokens['--p-surface-0'] || (theme === 'light' ? '#ffffff' : '#0f172a');
    vars['--surface-overlay'] = tokens['--p-surface-100'] || (theme === 'light' ? '#f1f5f9' : '#1e293b');
    vars['--surface-border'] = tokens['--p-surface-300'] || (theme === 'light' ? '#cbd5e1' : '#475569');
    vars['--surface-hover'] = tokens['--p-surface-100'] || (theme === 'light' ? '#f1f5f9' : '#1e293b');
    
    // Text colors
    vars['--text-color'] = tokens['--p-text-color'] || (theme === 'light' ? '#0f172a' : '#f1f5f9');
    vars['--text-color-secondary'] = tokens['--p-text-muted-color'] || (theme === 'light' ? '#64748b' : '#94a3b8');
    
    // Button specific variables (PrimeNG's actual button CSS variables)
    vars['--p-button-primary-background'] = primary;
    vars['--p-button-primary-border-color'] = primary;
    vars['--p-button-primary-color'] = tokens['--p-primary-contrast-color'] || '#ffffff';
    vars['--p-button-primary-hover-background'] = this.darkenColor(primary, 10);
    vars['--p-button-primary-active-background'] = this.darkenColor(primary, 20);
    
    // Secondary button
    const secondary = tokens['--p-surface-500'] || '#64748b';
    vars['--p-button-secondary-background'] = secondary;
    vars['--p-button-secondary-border-color'] = secondary;
    vars['--p-button-secondary-color'] = '#ffffff';
    vars['--p-button-secondary-hover-background'] = this.darkenColor(secondary, 10);
    
    // Success, warning, danger
    vars['--p-button-success-background'] = tokens['--tf-green-500'] || '#10b981';
    vars['--p-button-info-background'] = tokens['--tf-blue-500'] || '#3b82f6';
    vars['--p-button-warning-background'] = tokens['--tf-yellow-500'] || '#f59e0b';
    vars['--p-button-danger-background'] = tokens['--tf-red-500'] || '#ef4444';
    
    // Typography
    vars['--font-family'] = tokens['--p-font-family'] || '"Inter", system-ui, sans-serif';
    vars['--font-size'] = tokens['--p-font-size'] || '14px';
    vars['--border-radius'] = tokens['--p-border-radius'] || '6px';
    
    return vars;
  }

  /**
   * Inject CSS variables into document with proper specificity
   */
  private injectCSSVariables(variables: Record<string, string>) {
    const root = document.documentElement;
    
    // Clear previous variables
    Array.from(root.style).forEach(prop => {
      if (prop.startsWith('--p-') || 
          prop.startsWith('--primary-') || 
          prop.startsWith('--surface-') || 
          prop.startsWith('--text-') ||
          prop.startsWith('--font-') ||
          prop.startsWith('--border-')) {
        root.style.removeProperty(prop);
      }
    });
    
    // Apply new variables
    Object.entries(variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    // Inject runtime CSS for PrimeNG components
    this.injectPrimeNGRuntimeCSS();
  }

  /**
   * Inject comprehensive runtime CSS for PrimeNG components
   */
  private injectPrimeNGRuntimeCSS() {
    const existingStyle = document.getElementById('enterprise-primeng-css');
    if (existingStyle) existingStyle.remove();
    
    const style = document.createElement('style');
    style.id = 'enterprise-primeng-css';
    style.textContent = `
      /* Enterprise PrimeNG Token-Driven Styles */
      :root {
        font-family: var(--font-family, "Inter", system-ui, sans-serif);
        font-size: var(--font-size, 14px);
      }
      
      body {
        background-color: var(--surface-ground, #ffffff);
        color: var(--text-color, #0f172a);
        font-family: var(--font-family, "Inter", system-ui, sans-serif);
      }
      
      /* Button styles with token variables */
      .p-button {
        border-radius: var(--border-radius, 6px) !important;
        font-family: var(--font-family, "Inter", system-ui, sans-serif) !important;
        font-weight: 500 !important;
        transition: all 0.2s ease !important;
        border: 1px solid transparent !important;
      }
      
      .p-button.p-button-primary {
        background-color: var(--p-button-primary-background, var(--primary-color, #3b82f6)) !important;
        border-color: var(--p-button-primary-border-color, var(--primary-color, #3b82f6)) !important;
        color: var(--p-button-primary-color, var(--primary-color-text, #ffffff)) !important;
      }
      
      .p-button.p-button-primary:not(:disabled):hover {
        background-color: var(--p-button-primary-hover-background, #2563eb) !important;
        border-color: var(--p-button-primary-hover-background, #2563eb) !important;
      }
      
      .p-button.p-button-primary:not(:disabled):active {
        background-color: var(--p-button-primary-active-background, #1d4ed8) !important;
        border-color: var(--p-button-primary-active-background, #1d4ed8) !important;
      }
      
      .p-button.p-button-secondary {
        background-color: var(--p-button-secondary-background, #64748b) !important;
        border-color: var(--p-button-secondary-border-color, #64748b) !important;
        color: var(--p-button-secondary-color, #ffffff) !important;
      }
      
      .p-button.p-button-secondary:not(:disabled):hover {
        background-color: var(--p-button-secondary-hover-background, #475569) !important;
      }
      
      .p-button.p-button-success {
        background-color: var(--p-button-success-background, #10b981) !important;
        border-color: var(--p-button-success-background, #10b981) !important;
        color: #ffffff !important;
      }
      
      .p-button.p-button-info {
        background-color: var(--p-button-info-background, #3b82f6) !important;
        border-color: var(--p-button-info-background, #3b82f6) !important;
        color: #ffffff !important;
      }
      
      .p-button.p-button-warning {
        background-color: var(--p-button-warning-background, #f59e0b) !important;
        border-color: var(--p-button-warning-background, #f59e0b) !important;
        color: #ffffff !important;
      }
      
      .p-button.p-button-danger {
        background-color: var(--p-button-danger-background, #ef4444) !important;
        border-color: var(--p-button-danger-background, #ef4444) !important;
        color: #ffffff !important;
      }
      
      .p-button.p-button-help {
        background-color: #8b5cf6 !important;
        border-color: #8b5cf6 !important;
        color: #ffffff !important;
      }
      
      /* Outlined button styles */
      .p-button.p-button-outlined.p-button-primary {
        background-color: transparent !important;
        border-color: var(--primary-color, #3b82f6) !important;
        color: var(--primary-color, #3b82f6) !important;
      }
      
      .p-button.p-button-outlined.p-button-primary:not(:disabled):hover {
        background-color: var(--primary-color, #3b82f6) !important;
        color: var(--primary-color-text, #ffffff) !important;
      }
      
      /* Text button styles */
      .p-button.p-button-text {
        background-color: transparent !important;
        border-color: transparent !important;
      }
      
      .p-button.p-button-text.p-button-primary {
        color: var(--primary-color, #3b82f6) !important;
      }
      
      /* Input styles */
      .p-inputtext {
        font-family: var(--font-family, "Inter", system-ui, sans-serif) !important;
        border-radius: var(--border-radius, 6px) !important;
        border-color: var(--surface-border, #cbd5e1) !important;
        background-color: var(--surface-ground, #ffffff) !important;
        color: var(--text-color, #0f172a) !important;
      }
      
      .p-inputtext:focus {
        border-color: var(--primary-color, #3b82f6) !important;
        box-shadow: 0 0 0 1px var(--primary-color, #3b82f6) !important;
      }
      
      /* Force re-render trigger */
      .enterprise-design-system-updated {
        animation: enterprise-token-update 0.01s ease-in-out;
      }
      
      @keyframes enterprise-token-update {
        0% { opacity: 0.999; }
        100% { opacity: 1; }
      }
    `;
    
    document.head.appendChild(style);
  }

  /**
   * Force Storybook to refresh all components
   */
  private forceStorybookRefresh() {
    // Add update class to trigger re-render
    document.body.classList.add('enterprise-design-system-updated');
    
    setTimeout(() => {
      document.body.classList.remove('enterprise-design-system-updated');
      
      // Trigger Storybook re-render
      if (typeof window !== 'undefined' && (window as any).__STORYBOOK_ADDONS_CHANNEL__) {
        (window as any).__STORYBOOK_ADDONS_CHANNEL__.emit('forceRender');
      }
      
      // Force component re-evaluation
      this.componentRegistry.forEach((elements) => {
        elements.forEach(el => {
          if (el && el.style) {
            el.style.display = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.display = '';
          }
        });
      });
    }, 10);
  }

  /**
   * Setup global style observer for enterprise monitoring
   */
  private setupGlobalStyleObserver() {
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && 
              mutation.attributeName === 'style' &&
              mutation.target instanceof HTMLElement) {
            this.trackComponentUpdate(mutation.target);
          }
        });
      });
      
      observer.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ['style', 'class']
      });
    }
  }

  /**
   * Setup Storybook-specific integration
   */
  private setupStorybookIntegration() {
    // Listen for Storybook story changes
    if (typeof window !== 'undefined') {
      window.addEventListener('storybook-story-rendered', () => {
        this.updateTheme(this.state$.value.theme, true);
      });
      
      // Listen for control changes
      window.addEventListener('storybook-controls-changed', () => {
        setTimeout(() => this.forceStorybookRefresh(), 100);
      });
    }
  }

  /**
   * Track component updates for enterprise monitoring
   */
  private trackComponentUpdate(element: HTMLElement) {
    const tagName = element.tagName.toLowerCase();
    if (tagName.includes('p-') || element.classList.contains('p-button')) {
      const componentName = element.className || tagName;
      
      if (!this.componentRegistry.has(componentName)) {
        this.componentRegistry.set(componentName, []);
      }
      
      const components = this.componentRegistry.get(componentName)!;
      if (!components.includes(element)) {
        components.push(element);
      }
      
      this.state$.next({
        ...this.state$.value,
        components: new Set([...this.state$.value.components, componentName])
      });
    }
  }

  /**
   * Subscribe to design system state changes
   */
  subscribe(callback: (state: DesignSystemState) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  /**
   * Notify all subscribers of state changes
   */
  private notifySubscribers(state: DesignSystemState) {
    this.subscribers.forEach(callback => {
      try {
        callback(state);
      } catch (error) {
        console.error('Error in design system subscriber:', error);
      }
    });
  }

  /**
   * Get current design system state
   */
  getState(): DesignSystemState {
    return this.state$.value;
  }

  /**
   * Get state as observable
   */
  getState$(): Observable<DesignSystemState> {
    return this.state$.asObservable();
  }

  /**
   * Utility to darken a color by a percentage
   */
  private darkenColor(color: string, percent: number): string {
    // Simple color darkening - in production, use a proper color library
    if (color.startsWith('#')) {
      const num = parseInt(color.slice(1), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) - amt;
      const G = (num >> 8 & 0x00FF) - amt;
      const B = (num & 0x0000FF) - amt;
      return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
    return color;
  }

  /**
   * Force update all registered components
   */
  forceUpdateAllComponents() {
    this.updateTheme(this.state$.value.theme, true);
  }

  /**
   * Export current theme for sharing/backup
   */
  exportTheme(): string {
    return JSON.stringify({
      theme: this.state$.value.theme,
      tokens: this.state$.value.tokens,
      timestamp: this.state$.value.lastUpdated.toISOString()
    }, null, 2);
  }
}

// Singleton instance for enterprise use
export const enterpriseDesignSystem = new EnterpriseDesignSystem();

// Auto-initialize
if (typeof window !== 'undefined') {
  enterpriseDesignSystem.initialize();
}
