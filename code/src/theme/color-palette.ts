import tokenData from './transflo.tokens.json';

export type ThemeMode = 'light' | 'dark';

export interface ColorPalette {
  // Primary colors
  primary: string;
  primaryHover: string;
  primaryActive: string;
  primaryContrast: string;
  
  // Secondary colors
  secondary: string;
  secondaryHover: string;
  secondaryContrast: string;
  
  // Semantic colors
  success: string;
  successHover: string;
  info: string;
  infoHover: string;
  warning: string;
  warningHover: string;
  danger: string;
  dangerHover: string;
  
  // Surface colors
  surface: string;
  surfaceHover: string;
  surfaceActive: string;
  surfaceBorder: string;
  surfaceGround: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  
  // State colors
  focusColor: string;
  disabledBg: string;
  disabledText: string;
  errorColor: string;
}

/**
 * Load color palette from Token Studio JSON
 */
export function loadColorPalette(mode: ThemeMode = 'light'): ColorPalette {
  const themeKey = mode === 'light' ? 'lara-light' : 'lara-dark';
  const tokens = (tokenData as any)[themeKey];
  
  return {
    // Primary colors (Blue)
    primary: tokens.blue?.['500']?.value || '#2474BB',
    primaryHover: tokens.blue?.['600']?.value || '#2068A8',
    primaryActive: tokens.blue?.['700']?.value || '#1D5D96',
    primaryContrast: '#ffffff',
    
    // Secondary colors (Cyan)
    secondary: tokens.cyan?.['50']?.value || '#F1FAFE',
    secondaryHover: tokens.cyan?.['100']?.value || '#E3F5FD',
    secondaryContrast: tokens.blue?.['700']?.value || '#1D5D96',
    
    // Semantic colors
    success: tokens.green?.['500']?.value || '#00BF30',
    successHover: tokens.green?.['600']?.value || '#00AC2B',
    info: tokens.cyan?.['500']?.value || '#72CDF4',
    infoHover: tokens.cyan?.['600']?.value || '#67B8DC',
    warning: tokens.orange?.['500']?.value || '#FFA300',
    warningHover: tokens.orange?.['600']?.value || '#E59300',
    danger: tokens.red?.['500']?.value || '#DA1F2C',
    dangerHover: tokens.red?.['600']?.value || '#C41C28',
    
    // Surface colors
    surface: tokens.surface?.['0']?.value || '#ffffff',
    surfaceHover: tokens.surface?.['50']?.value || '#FBFCFC',
    surfaceActive: tokens.surface?.['100']?.value || '#F7F8F9',
    surfaceBorder: tokens.surface?.['400']?.value || '#E2E6EB',
    surfaceGround: tokens.root?.['surface-ground']?.value || '#EFF2F4',
    
    // Text colors
    textPrimary: tokens.global?.shade?.['500']?.value || '#3D3D3D',
    textSecondary: tokens.global?.shade?.['600']?.value || '#373737',
    textMuted: tokens.surface?.['500']?.value || '#C6CCD6',
    
    // State colors
    focusColor: tokens.blue?.['500']?.value || '#2474BB',
    disabledBg: tokens.surface?.['200']?.value || '#F3F5F7',
    disabledText: tokens.surface?.['500']?.value || '#C6CCD6',
    errorColor: tokens.red?.['400']?.value || '#E14C56'
  };
}

/**
 * Apply color palette to CSS custom properties
 */
export function applyColorPalette(palette: ColorPalette): void {
  const root = document.documentElement;
  
  // Apply palette colors as CSS variables
  Object.entries(palette).forEach(([key, value]) => {
    const cssVarName = `--palette-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    root.style.setProperty(cssVarName, value);
  });
  
  // Map palette to PrimeNG CSS variables
  root.style.setProperty('--p-primary-color', palette.primary);
  root.style.setProperty('--p-primary-color-hover', palette.primaryHover);
  root.style.setProperty('--p-surface-color', palette.surface);
  root.style.setProperty('--p-surface-border', palette.surfaceBorder);
  root.style.setProperty('--p-text-color', palette.textPrimary);
  root.style.setProperty('--p-text-muted-color', palette.textMuted);
  root.style.setProperty('--p-focus-ring', `0 0 0 2px ${palette.focusColor}20`);
  
  console.log('✅ Applied Color Palette:', palette);
}

/**
 * Color Palette Manager - Central control for all component colors
 */
export class ColorPaletteManager {
  private currentPalette: ColorPalette;
  private currentMode: ThemeMode = 'light';
  private subscribers: Set<() => void> = new Set();
  
  constructor() {
    this.currentPalette = loadColorPalette(this.currentMode);
    this.applyPalette();
  }
  
  /**
   * Switch to a different theme mode
   */
  setThemeMode(mode: ThemeMode): void {
    this.currentMode = mode;
    this.currentPalette = loadColorPalette(mode);
    this.applyPalette();
    this.notifySubscribers();
  }
  
  /**
   * Update a specific color in the palette
   */
  updateColor(colorKey: keyof ColorPalette, newColor: string): void {
    this.currentPalette[colorKey] = newColor;
    this.applyPalette();
    this.notifySubscribers();
  }
  
  /**
   * Update multiple colors at once
   */
  updateColors(updates: Partial<ColorPalette>): void {
    Object.assign(this.currentPalette, updates);
    this.applyPalette();
    this.notifySubscribers();
  }
  
  /**
   * Get current palette
   */
  getPalette(): ColorPalette {
    return { ...this.currentPalette };
  }
  
  /**
   * Get current theme mode
   */
  getThemeMode(): ThemeMode {
    return this.currentMode;
  }
  
  /**
   * Subscribe to palette changes
   */
  subscribe(callback: () => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }
  
  private applyPalette(): void {
    applyColorPalette(this.currentPalette);
  }
  
  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback());
  }
}

// Global instance
export const colorPaletteManager = new ColorPaletteManager();
