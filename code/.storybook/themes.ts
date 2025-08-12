// Theme configuration for PrimeNG Lara Light and Dark themes
export const PRIMENG_THEMES = {
  light: {
    name: 'Lara Light',
    css: 'https://unpkg.com/primeng@17.18.15/resources/themes/lara-light-blue/theme.css',
    tokens: {
      // Base semantic tokens for simple mode
      primary: '#007acc',
      secondary: '#6c757d', 
      success: '#28a745',
      info: '#17a2b8',
      warning: '#ffc107',
      danger: '#dc3545',
      help: '#6f42c1',
      
      // Surface & background tokens
      surface: '#ffffff',
      surfaceCard: '#ffffff',
      surfaceBorder: '#e9ecef',
      surfaceHover: '#f8f9fa',
      
      // Text tokens
      textPrimary: '#495057',
      textSecondary: '#6c757d',
      textMuted: '#adb5bd',
      
      // Focus & interaction
      focusRing: '#86b7fe',
      
      // Spacing & layout
      borderRadius: '6px',
      borderRadiusSmall: '4px',
      borderRadiusLarge: '12px',
      
      // Typography
      fontFamily: '"Inter var", sans-serif',
      fontSizeBase: '14px',
      fontSizeSmall: '12px',
      fontSizeLarge: '16px',
      fontWeightNormal: '400',
      fontWeightMedium: '500',
      fontWeightBold: '600',
      lineHeight: '1.5',
      
      // Shadows
      shadowSmall: '0 1px 2px rgba(0, 0, 0, 0.05)',
      shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      shadowMedium: '0 4px 6px rgba(0, 0, 0, 0.1)',
      shadowLarge: '0 10px 15px rgba(0, 0, 0, 0.1)',
      
      // Border width
      borderWidth: '1px',
      borderWidthThick: '2px'
    }
  },
  dark: {
    name: 'Lara Dark',
    css: 'https://unpkg.com/primeng@17.18.15/resources/themes/lara-dark-blue/theme.css',
    tokens: {
      // Base semantic tokens for simple mode  
      primary: '#3b82f6',
      secondary: '#64748b',
      success: '#10b981', 
      info: '#06b6d4',
      warning: '#f59e0b',
      danger: '#ef4444',
      help: '#8b5cf6',
      
      // Surface & background tokens
      surface: '#1e293b',
      surfaceCard: '#334155',
      surfaceBorder: '#475569',
      surfaceHover: '#475569',
      
      // Text tokens  
      textPrimary: '#f1f5f9',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      
      // Focus & interaction
      focusRing: '#93c5fd',
      
      // Spacing & layout (same as light)
      borderRadius: '6px',
      borderRadiusSmall: '4px', 
      borderRadiusLarge: '12px',
      
      // Typography (same as light)
      fontFamily: '"Inter var", sans-serif',
      fontSizeBase: '14px',
      fontSizeSmall: '12px',
      fontSizeLarge: '16px',
      fontWeightNormal: '400',
      fontWeightMedium: '500',
      fontWeightBold: '600',
      lineHeight: '1.5',
      
      // Shadows (darker)
      shadowSmall: '0 1px 2px rgba(0, 0, 0, 0.3)',
      shadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
      shadowMedium: '0 4px 6px rgba(0, 0, 0, 0.4)',
      shadowLarge: '0 10px 15px rgba(0, 0, 0, 0.4)',
      
      // Border width (same)
      borderWidth: '1px',
      borderWidthThick: '2px'
    }
  }
};

// Convert tokens to CSS custom properties
export function tokensToCSSVars(tokens: Record<string, any>): Record<string, string> {
  const cssVars: Record<string, string> = {};
  
  Object.entries(tokens).forEach(([key, value]) => {
    // Convert camelCase to kebab-case
    const cssProperty = `--brand-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    cssVars[cssProperty] = String(value);
  });
  
  return cssVars;
}

// Apply CSS variables to document root
export function applyCSSVars(vars: Record<string, string>) {
  const root = document.documentElement;
  Object.entries(vars).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}

// Theme management utilities
export class ThemeManager {
  private currentTheme: 'light' | 'dark' = 'light';
  private customTokens: Record<string, any> = {};
  
  setTheme(theme: 'light' | 'dark') {
    this.currentTheme = theme;
    this.applyTheme();
  }
  
  updateTokens(tokens: Record<string, any>) {
    this.customTokens = { ...tokens };
    this.applyTheme();
  }
  
  private applyTheme() {
    const baseTokens = PRIMENG_THEMES[this.currentTheme].tokens;
    const mergedTokens = { ...baseTokens, ...this.customTokens };
    const cssVars = tokensToCSSVars(mergedTokens);
    applyCSSVars(cssVars);
  }
  
  exportTokens() {
    const baseTokens = PRIMENG_THEMES[this.currentTheme].tokens;
    const mergedTokens = { ...baseTokens, ...this.customTokens };
    
    return {
      [`theme.${this.currentTheme}`]: mergedTokens
    };
  }
  
  importTokens(importedTokens: Record<string, any>) {
    if (importedTokens[`theme.${this.currentTheme}`]) {
      this.customTokens = importedTokens[`theme.${this.currentTheme}`];
      this.applyTheme();
    }
  }
  
  reset() {
    this.customTokens = {};
    this.applyTheme();
  }
}

export const themeManager = new ThemeManager();
