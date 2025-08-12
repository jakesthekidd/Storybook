import tokenData from './transflo.tokens.json';

export type ThemeMode = 'light' | 'dark';

export interface CompleteColorPalette {
  // Root surface colors
  'surface-ground': string;
  'surface-section': string;
  'surface-card': string;
  'surface-overlay': string;
  'surface-border': string;
  'surface-hover': string;
  
  // Surface scale (0-900)
  'surface-0': string;
  'surface-50': string;
  'surface-100': string;
  'surface-200': string;
  'surface-300': string;
  'surface-400': string;
  'surface-500': string;
  'surface-600': string;
  'surface-700': string;
  'surface-800': string;
  'surface-900': string;
  
  // Blue scale (50-900)
  'blue-50': string;
  'blue-100': string;
  'blue-200': string;
  'blue-300': string;
  'blue-400': string;
  'blue-500': string;
  'blue-600': string;
  'blue-700': string;
  'blue-800': string;
  'blue-900': string;
  
  // Green scale (50-900)
  'green-50': string;
  'green-100': string;
  'green-200': string;
  'green-300': string;
  'green-400': string;
  'green-500': string;
  'green-600': string;
  'green-700': string;
  'green-800': string;
  'green-900': string;
  
  // Yellow scale (50-900)
  'yellow-50': string;
  'yellow-100': string;
  'yellow-200': string;
  'yellow-300': string;
  'yellow-400': string;
  'yellow-500': string;
  'yellow-600': string;
  'yellow-700': string;
  'yellow-800': string;
  'yellow-900': string;
  
  // Cyan scale (50-900)
  'cyan-50': string;
  'cyan-100': string;
  'cyan-200': string;
  'cyan-300': string;
  'cyan-400': string;
  'cyan-500': string;
  'cyan-600': string;
  'cyan-700': string;
  'cyan-800': string;
  'cyan-900': string;
  
  // Pink scale (50-900)
  'pink-50': string;
  'pink-100': string;
  'pink-200': string;
  'pink-300': string;
  'pink-400': string;
  'pink-500': string;
  'pink-600': string;
  'pink-700': string;
  'pink-800': string;
  'pink-900': string;
  
  // Indigo scale (50-900)
  'indigo-50': string;
  'indigo-100': string;
  'indigo-200': string;
  'indigo-300': string;
  'indigo-400': string;
  'indigo-500': string;
  'indigo-600': string;
  'indigo-700': string;
  'indigo-800': string;
  'indigo-900': string;
  
  // Teal scale (50-900)
  'teal-50': string;
  'teal-100': string;
  'teal-200': string;
  'teal-300': string;
  'teal-400': string;
  'teal-500': string;
  'teal-600': string;
  'teal-700': string;
  'teal-800': string;
  'teal-900': string;
  
  // Orange scale (50-900)
  'orange-50': string;
  'orange-100': string;
  'orange-200': string;
  'orange-300': string;
  'orange-400': string;
  'orange-500': string;
  'orange-600': string;
  'orange-700': string;
  'orange-800': string;
  'orange-900': string;
  
  // Blue Gray scale (50-900)
  'bluegray-50': string;
  'bluegray-100': string;
  'bluegray-200': string;
  'bluegray-300': string;
  'bluegray-400': string;
  'bluegray-500': string;
  'bluegray-600': string;
  'bluegray-700': string;
  'bluegray-800': string;
  'bluegray-900': string;
  
  // Purple scale (50-900)
  'purple-50': string;
  'purple-100': string;
  'purple-200': string;
  'purple-300': string;
  'purple-400': string;
  'purple-500': string;
  'purple-600': string;
  'purple-700': string;
  'purple-800': string;
  'purple-900': string;
  
  // Red scale (50-900)
  'red-50': string;
  'red-100': string;
  'red-200': string;
  'red-300': string;
  'red-400': string;
  'red-500': string;
  'red-600': string;
  'red-700': string;
  'red-800': string;
  'red-900': string;
  
  // Semantic mappings for components
  'primary': string;
  'primary-hover': string;
  'primary-active': string;
  'secondary': string;
  'secondary-hover': string;
  'success': string;
  'success-hover': string;
  'info': string;
  'info-hover': string;
  'warning': string;
  'warning-hover': string;
  'danger': string;
  'danger-hover': string;
  'text-primary': string;
  'text-secondary': string;
  'text-muted': string;
}

/**
 * Load complete color palette from Token Studio JSON
 */
export function loadCompleteColorPalette(mode: ThemeMode = 'light'): CompleteColorPalette {
  const themeKey = mode === 'light' ? 'lara-light' : 'lara-dark';
  const tokens = (tokenData as any)[themeKey];
  
  return {
    // Root surface colors
    'surface-ground': tokens.root?.['surface-ground']?.value || '#EFF2F4',
    'surface-section': tokens.root?.['surface-section']?.value || '#ffffff',
    'surface-card': tokens.root?.['surface-card']?.value || '#ffffff',
    'surface-overlay': tokens.root?.['surface-overlay']?.value || '#ffffff',
    'surface-border': tokens.root?.['surface-border']?.value || '#E2E6EB',
    'surface-hover': tokens.root?.['surface-hover']?.value || '#f6f9fc',
    
    // Surface scale
    'surface-0': tokens.surface?.['0']?.value || '#ffffff',
    'surface-50': tokens.surface?.['50']?.value || '#FBFCFC',
    'surface-100': tokens.surface?.['100']?.value || '#F7F8F9',
    'surface-200': tokens.surface?.['200']?.value || '#F3F5F7',
    'surface-300': tokens.surface?.['300']?.value || '#EFF2F4',
    'surface-400': tokens.surface?.['400']?.value || '#E2E6EB',
    'surface-500': tokens.surface?.['500']?.value || '#C6CCD6',
    'surface-600': tokens.surface?.['600']?.value || '#A9B3C2',
    'surface-700': tokens.surface?.['700']?.value || '#8D9AAE',
    'surface-800': tokens.surface?.['800']?.value || '#717B8B',
    'surface-900': tokens.surface?.['900']?.value || '#5A626F',
    
    // Blue scale
    'blue-50': tokens.blue?.['50']?.value || '#E9F1F8',
    'blue-100': tokens.blue?.['100']?.value || '#D3E3F1',
    'blue-200': tokens.blue?.['200']?.value || '#A7C7E4',
    'blue-300': tokens.blue?.['300']?.value || '#7CACD6',
    'blue-400': tokens.blue?.['400']?.value || '#5090C9',
    'blue-500': tokens.blue?.['500']?.value || '#2474BB',
    'blue-600': tokens.blue?.['600']?.value || '#2068A8',
    'blue-700': tokens.blue?.['700']?.value || '#1D5D96',
    'blue-800': tokens.blue?.['800']?.value || '#164670',
    'blue-900': tokens.blue?.['900']?.value || '#0E2E4B',
    
    // Green scale
    'green-50': tokens.green?.['50']?.value || '#E5F9EA',
    'green-100': tokens.green?.['100']?.value || '#CCF2D6',
    'green-200': tokens.green?.['200']?.value || '#99E5AC',
    'green-300': tokens.green?.['300']?.value || '#66D983',
    'green-400': tokens.green?.['400']?.value || '#33CC59',
    'green-500': tokens.green?.['500']?.value || '#00BF30',
    'green-600': tokens.green?.['600']?.value || '#00AC2B',
    'green-700': tokens.green?.['700']?.value || '#009926',
    'green-800': tokens.green?.['800']?.value || '#00731D',
    'green-900': tokens.green?.['900']?.value || '#004C13',
    
    // Yellow scale
    'yellow-50': tokens.yellow?.['50']?.value || '#FEFDE8',
    'yellow-100': tokens.yellow?.['100']?.value || '#FEFAD2',
    'yellow-200': tokens.yellow?.['200']?.value || '#FCF5A4',
    'yellow-300': tokens.yellow?.['300']?.value || '#FBF177',
    'yellow-400': tokens.yellow?.['400']?.value || '#F9EC49',
    'yellow-500': tokens.yellow?.['500']?.value || '#F8E71C',
    'yellow-600': tokens.yellow?.['600']?.value || '#DFD019',
    'yellow-700': tokens.yellow?.['700']?.value || '#C6B916',
    'yellow-800': tokens.yellow?.['800']?.value || '#958B11',
    'yellow-900': tokens.yellow?.['900']?.value || '#635C0B',
    
    // Cyan scale
    'cyan-50': tokens.cyan?.['50']?.value || '#F1FAFE',
    'cyan-100': tokens.cyan?.['100']?.value || '#E3F5FD',
    'cyan-200': tokens.cyan?.['200']?.value || '#C7EBFB',
    'cyan-300': tokens.cyan?.['300']?.value || '#AAE1F8',
    'cyan-400': tokens.cyan?.['400']?.value || '#8ED7F6',
    'cyan-500': tokens.cyan?.['500']?.value || '#72CDF4',
    'cyan-600': tokens.cyan?.['600']?.value || '#67B8DC',
    'cyan-700': tokens.cyan?.['700']?.value || '#5BA4C3',
    'cyan-800': tokens.cyan?.['800']?.value || '#447B92',
    'cyan-900': tokens.cyan?.['900']?.value || '#2E5262',
    
    // Pink scale
    'pink-50': tokens.pink?.['50']?.value || '#fef6fa',
    'pink-100': tokens.pink?.['100']?.value || '#fad3e7',
    'pink-200': tokens.pink?.['200']?.value || '#f7b0d3',
    'pink-300': tokens.pink?.['300']?.value || '#f38ec0',
    'pink-400': tokens.pink?.['400']?.value || '#f06bac',
    'pink-500': tokens.pink?.['500']?.value || '#ec4899',
    'pink-600': tokens.pink?.['600']?.value || '#c93d82',
    'pink-700': tokens.pink?.['700']?.value || '#a5326b',
    'pink-800': tokens.pink?.['800']?.value || '#822854',
    'pink-900': tokens.pink?.['900']?.value || '#5e1d3d',
    
    // Indigo scale
    'indigo-50': tokens.indigo?.['50']?.value || '#f7f7fe',
    'indigo-100': tokens.indigo?.['100']?.value || '#dadafc',
    'indigo-200': tokens.indigo?.['200']?.value || '#bcbdf9',
    'indigo-300': tokens.indigo?.['300']?.value || '#9ea0f6',
    'indigo-400': tokens.indigo?.['400']?.value || '#8183f4',
    'indigo-500': tokens.indigo?.['500']?.value || '#6366f1',
    'indigo-600': tokens.indigo?.['600']?.value || '#5457cd',
    'indigo-700': tokens.indigo?.['700']?.value || '#4547a9',
    'indigo-800': tokens.indigo?.['800']?.value || '#363885',
    'indigo-900': tokens.indigo?.['900']?.value || '#282960',
    
    // Teal scale
    'teal-50': tokens.teal?.['50']?.value || '#f3fbfb',
    'teal-100': tokens.teal?.['100']?.value || '#c7eeea',
    'teal-200': tokens.teal?.['200']?.value || '#9ae0d9',
    'teal-300': tokens.teal?.['300']?.value || '#6dd3c8',
    'teal-400': tokens.teal?.['400']?.value || '#41c5b7',
    'teal-500': tokens.teal?.['500']?.value || '#14b8a6',
    'teal-600': tokens.teal?.['600']?.value || '#119c8d',
    'teal-700': tokens.teal?.['700']?.value || '#0e8174',
    'teal-800': tokens.teal?.['800']?.value || '#0b655b',
    'teal-900': tokens.teal?.['900']?.value || '#084a42',
    
    // Orange scale
    'orange-50': tokens.orange?.['50']?.value || '#FFF6E5',
    'orange-100': tokens.orange?.['100']?.value || '#FFEDCC',
    'orange-200': tokens.orange?.['200']?.value || '#FFDA99',
    'orange-300': tokens.orange?.['300']?.value || '#FFC866',
    'orange-400': tokens.orange?.['400']?.value || '#FFB533',
    'orange-500': tokens.orange?.['500']?.value || '#FFA300',
    'orange-600': tokens.orange?.['600']?.value || '#E59300',
    'orange-700': tokens.orange?.['700']?.value || '#CC8200',
    'orange-800': tokens.orange?.['800']?.value || '#996200',
    'orange-900': tokens.orange?.['900']?.value || '#664100',
    
    // Blue Gray scale
    'bluegray-50': tokens.bluegray?.['50']?.value || '#f7f8f9',
    'bluegray-100': tokens.bluegray?.['100']?.value || '#dadee3',
    'bluegray-200': tokens.bluegray?.['200']?.value || '#bcc3cd',
    'bluegray-300': tokens.bluegray?.['300']?.value || '#9fa9b7',
    'bluegray-400': tokens.bluegray?.['400']?.value || '#818ea1',
    'bluegray-500': tokens.bluegray?.['500']?.value || '#64748b',
    'bluegray-600': tokens.bluegray?.['600']?.value || '#556376',
    'bluegray-700': tokens.bluegray?.['700']?.value || '#465161',
    'bluegray-800': tokens.bluegray?.['800']?.value || '#37404c',
    'bluegray-900': tokens.bluegray?.['900']?.value || '#282e38',
    
    // Purple scale
    'purple-50': tokens.purple?.['50']?.value || '#fbf7ff',
    'purple-100': tokens.purple?.['100']?.value || '#ead6fd',
    'purple-200': tokens.purple?.['200']?.value || '#dab6fc',
    'purple-300': tokens.purple?.['300']?.value || '#c996fa',
    'purple-400': tokens.purple?.['400']?.value || '#b975f9',
    'purple-500': tokens.purple?.['500']?.value || '#a855f7',
    'purple-600': tokens.purple?.['600']?.value || '#8f48d2',
    'purple-700': tokens.purple?.['700']?.value || '#763cad',
    'purple-800': tokens.purple?.['800']?.value || '#5c2f88',
    'purple-900': tokens.purple?.['900']?.value || '#432263',
    
    // Red scale
    'red-50': tokens.red?.['50']?.value || '#FBE9EA',
    'red-100': tokens.red?.['100']?.value || '#F8D2D5',
    'red-200': tokens.red?.['200']?.value || '#F0A5AB',
    'red-300': tokens.red?.['300']?.value || '#E97980',
    'red-400': tokens.red?.['400']?.value || '#E14C56',
    'red-500': tokens.red?.['500']?.value || '#DA1F2C',
    'red-600': tokens.red?.['600']?.value || '#C41C28',
    'red-700': tokens.red?.['700']?.value || '#AE1923',
    'red-800': tokens.red?.['800']?.value || '#83131A',
    'red-900': tokens.red?.['900']?.value || '#570C12',
    
    // Semantic mappings for components
    'primary': tokens.blue?.['500']?.value || '#2474BB',
    'primary-hover': tokens.blue?.['600']?.value || '#2068A8',
    'primary-active': tokens.blue?.['700']?.value || '#1D5D96',
    'secondary': tokens.cyan?.['50']?.value || '#F1FAFE',
    'secondary-hover': tokens.cyan?.['100']?.value || '#E3F5FD',
    'success': tokens.green?.['500']?.value || '#00BF30',
    'success-hover': tokens.green?.['600']?.value || '#00AC2B',
    'info': tokens.cyan?.['500']?.value || '#72CDF4',
    'info-hover': tokens.cyan?.['600']?.value || '#67B8DC',
    'warning': tokens.orange?.['500']?.value || '#FFA300',
    'warning-hover': tokens.orange?.['600']?.value || '#E59300',
    'danger': tokens.red?.['500']?.value || '#DA1F2C',
    'danger-hover': tokens.red?.['600']?.value || '#C41C28',
    'text-primary': tokens.global?.shade?.['500']?.value || '#3D3D3D',
    'text-secondary': tokens.global?.shade?.['600']?.value || '#373737',
    'text-muted': tokens.surface?.['500']?.value || '#C6CCD6',
  };
}

/**
 * Apply complete color palette to CSS custom properties
 */
export function applyCompleteColorPalette(palette: CompleteColorPalette): void {
  const root = document.documentElement;
  
  // Apply ALL palette colors as CSS variables with --palette- prefix
  Object.entries(palette).forEach(([key, value]) => {
    const cssVarName = `--palette-${key}`;
    root.style.setProperty(cssVarName, value);
  });
  
  // Also apply with original names for direct reference
  Object.entries(palette).forEach(([key, value]) => {
    const cssVarName = `--${key}`;
    root.style.setProperty(cssVarName, value);
  });
  
  console.log(`✅ Applied Complete Color Palette: ${Object.keys(palette).length} colors available`);
}

/**
 * Enhanced Color Palette Manager with ALL Token Studio colors
 */
export class CompleteColorPaletteManager {
  private currentPalette: CompleteColorPalette;
  private currentMode: ThemeMode = 'light';
  private subscribers: Set<() => void> = new Set();
  
  constructor() {
    this.currentPalette = loadCompleteColorPalette(this.currentMode);
    this.applyPalette();
  }
  
  setThemeMode(mode: ThemeMode): void {
    this.currentMode = mode;
    this.currentPalette = loadCompleteColorPalette(mode);
    this.applyPalette();
    this.notifySubscribers();
  }
  
  updateColor(colorKey: keyof CompleteColorPalette, newColor: string): void {
    this.currentPalette[colorKey] = newColor;
    this.applyPalette();
    this.notifySubscribers();
  }
  
  updateColors(updates: Partial<CompleteColorPalette>): void {
    Object.assign(this.currentPalette, updates);
    this.applyPalette();
    this.notifySubscribers();
  }
  
  getPalette(): CompleteColorPalette {
    return { ...this.currentPalette };
  }
  
  getThemeMode(): ThemeMode {
    return this.currentMode;
  }
  
  /**
   * Get all available color references for documentation
   */
  getAllColorReferences(): { [key: string]: string } {
    const references: { [key: string]: string } = {};
    Object.entries(this.currentPalette).forEach(([key, value]) => {
      references[`--palette-${key}`] = value;
      references[`--${key}`] = value;
    });
    return references;
  }
  
  subscribe(callback: () => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }
  
  private applyPalette(): void {
    applyCompleteColorPalette(this.currentPalette);
  }
  
  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback());
  }
}

// Global instance with ALL colors
export const colorPaletteManager = new CompleteColorPaletteManager();

// Export for Storybook ColorPalette addon integration
export const storybookColorPalette = {
  // Surface colors for Storybook ColorPalette addon
  'Surface Ground': '#EFF2F4',
  'Surface Section': '#ffffff',
  'Surface Card': '#ffffff',
  'Surface Border': '#E2E6EB',
  
  // Blue scale
  'Blue 50': '#E9F1F8',
  'Blue 100': '#D3E3F1',
  'Blue 200': '#A7C7E4',
  'Blue 300': '#7CACD6',
  'Blue 400': '#5090C9',
  'Blue 500 (Primary)': '#2474BB',
  'Blue 600': '#2068A8',
  'Blue 700': '#1D5D96',
  'Blue 800': '#164670',
  'Blue 900': '#0E2E4B',
  
  // Other key colors
  'Green 500 (Success)': '#00BF30',
  'Cyan 500 (Info)': '#72CDF4',
  'Orange 500 (Warning)': '#FFA300',
  'Red 500 (Danger)': '#DA1F2C',
};
