import tokenData from './transflo.tokens.json';

export type ThemeMode = 'light' | 'dark';

export interface TokenValues {
  [key: string]: string;
}

/**
 * Simple, direct token mapping from Token Studio JSON to CSS variables
 * No complex enterprise system - just clean token → CSS variable mapping
 */
export function loadSimpleTokens(mode: ThemeMode = 'light'): TokenValues {
  const themeKey = mode === 'light' ? 'lara-light' : 'lara-dark';
  const tokens = (tokenData as any)[themeKey];
  
  const cssVariables: TokenValues = {};
  
  // Direct mapping of token values to CSS variables
  if (tokens.blue) {
    cssVariables['--blue-50'] = tokens.blue['50']?.value || '#E9F1F8';
    cssVariables['--blue-100'] = tokens.blue['100']?.value || '#D3E3F1';
    cssVariables['--blue-500'] = tokens.blue['500']?.value || '#2474BB';
    cssVariables['--blue-600'] = tokens.blue['600']?.value || '#2068A8';
    cssVariables['--blue-700'] = tokens.blue['700']?.value || '#1D5D96';
  }
  
  if (tokens.cyan) {
    cssVariables['--cyan-50'] = tokens.cyan['50']?.value || '#F1FAFE';
    cssVariables['--cyan-100'] = tokens.cyan['100']?.value || '#E3F5FD';
    cssVariables['--cyan-500'] = tokens.cyan['500']?.value || '#72CDF4';
    cssVariables['--cyan-600'] = tokens.cyan['600']?.value || '#67B8DC';
  }
  
  if (tokens.green) {
    cssVariables['--green-50'] = tokens.green['50']?.value || '#E5F9EA';
    cssVariables['--green-500'] = tokens.green['500']?.value || '#00BF30';
    cssVariables['--green-600'] = tokens.green['600']?.value || '#00AC2B';
  }
  
  if (tokens.orange) {
    cssVariables['--orange-50'] = tokens.orange['50']?.value || '#FFF6E5';
    cssVariables['--orange-500'] = tokens.orange['500']?.value || '#FFA300';
    cssVariables['--orange-600'] = tokens.orange['600']?.value || '#E59300';
  }
  
  if (tokens.red) {
    cssVariables['--red-50'] = tokens.red['50']?.value || '#FBE9EA';
    cssVariables['--red-500'] = tokens.red['500']?.value || '#DA1F2C';
    cssVariables['--red-600'] = tokens.red['600']?.value || '#C41C28';
  }
  
  if (tokens.surface) {
    cssVariables['--surface-50'] = tokens.surface['50']?.value || '#FBFCFC';
    cssVariables['--surface-100'] = tokens.surface['100']?.value || '#F7F8F9';
    cssVariables['--surface-200'] = tokens.surface['200']?.value || '#F3F5F7';
    cssVariables['--surface-400'] = tokens.surface['400']?.value || '#E2E6EB';
    cssVariables['--surface-500'] = tokens.surface['500']?.value || '#C6CCD6';
  }
  
  if (tokens.root) {
    cssVariables['--surface-ground'] = tokens.root['surface-ground']?.value || '#EFF2F4';
  }
  
  // Map to PrimeNG specific variables for buttons
  cssVariables['--p-primary-color'] = cssVariables['--blue-500'];
  cssVariables['--p-primary-color-hover'] = cssVariables['--blue-600'];
  
  return cssVariables;
}

/**
 * Apply token CSS variables to the document
 */
export function applyTokens(mode: ThemeMode = 'light'): void {
  const tokens = loadSimpleTokens(mode);
  const root = document.documentElement;
  
  Object.entries(tokens).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  console.log(`✅ Applied ${Object.keys(tokens).length} token CSS variables for ${mode} theme`);
}
