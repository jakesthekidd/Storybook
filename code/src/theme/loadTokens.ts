// Import token data with fallback for different environments
let tokenData: any;
try {
  // Try to import as ES module
  tokenData = require('./transflo.tokens.json');
} catch (e) {
  // Fallback to empty structure if import fails
  console.warn('Failed to load token data, using minimal fallback');
  tokenData = {
    'lara-light': {
      surface: { 0: { value: '#ffffff' } },
      theme: { primary: { color: { value: '#3b82f6' } } },
      global: { textColor: { value: '#0f172a' } }
    },
    'lara-dark': {
      surface: { 0: { value: '#0f172a' } },
      theme: { primary: { color: { value: '#3b82f6' } } },
      global: { textColor: { value: '#f1f5f9' } }
    }
  };
}

export type ThemeMode = 'light' | 'dark';

export interface TokenValue {
  value: string | number;
  type?: string;
}

export interface TokenSet {
  [key: string]: TokenValue | TokenSet;
}

export interface LoadedTokens {
  preset: any; // PrimeNG preset object
  cssVars: Record<string, string>; // CSS variables for unmapped tokens
}

// Store resolved tokens to avoid re-computation
const tokenCache = new Map<string, any>();
const warningCache = new Set<string>();

/**
 * Resolves token references recursively (e.g., {theme.primary.color})
 */
function resolveTokenReference(
  value: string,
  tokens: TokenSet,
  visited = new Set<string>()
): string {
  if (typeof value !== 'string' || !value.includes('{')) {
    return value;
  }

  return value.replace(/\{([^}]+)\}/g, (match, tokenPath) => {
    if (visited.has(tokenPath)) {
      console.warn(`Circular reference detected: ${tokenPath}`);
      return match; // Return unresolved to prevent infinite loop
    }

    visited.add(tokenPath);
    
    const resolvedValue = getNestedTokenValue(tokens, tokenPath);
    if (resolvedValue === undefined) {
      if (!warningCache.has(tokenPath)) {
        console.warn(`Token reference not found: ${tokenPath}`);
        warningCache.add(tokenPath);
      }
      return match; // Return unresolved
    }

    const result = resolveTokenReference(String(resolvedValue), tokens, visited);
    visited.delete(tokenPath);
    return result;
  });
}

/**
 * Gets nested token value by dot notation path
 */
function getNestedTokenValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

/**
 * Extracts token value, handling both direct values and Token Studio format
 */
function extractTokenValue(token: any): string {
  if (typeof token === 'string' || typeof token === 'number') {
    return String(token);
  }
  if (token && typeof token === 'object' && 'value' in token) {
    return String(token.value);
  }
  return '';
}

/**
 * Converts a nested token object to flat CSS variables
 */
function convertToCSSVars(
  tokens: TokenSet,
  prefix = '--tf',
  path: string[] = []
): Record<string, string> {
  const cssVars: Record<string, string> = {};

  for (const [key, value] of Object.entries(tokens)) {
    const currentPath = [...path, key];
    const cssVarName = `${prefix}-${currentPath.join('-')}`;

    if (value && typeof value === 'object' && !('value' in value) && !('type' in value)) {
      // Nested object - recurse
      Object.assign(cssVars, convertToCSSVars(value as TokenSet, prefix, currentPath));
    } else {
      // Leaf token - extract value and resolve references
      const rawValue = extractTokenValue(value);
      const resolvedValue = resolveTokenReference(rawValue, tokens);
      cssVars[cssVarName] = resolvedValue;
    }
  }

  return cssVars;
}

/**
 * Creates PrimeNG preset from tokens
 */
function createPrimeNGPreset(tokens: TokenSet, mode: ThemeMode): any {
  const getToken = (path: string, fallback?: string): string => {
    const value = getNestedTokenValue(tokens, path);
    if (value === undefined) {
      if (fallback && !warningCache.has(path)) {
        console.warn(`Token not found: ${path}, using fallback: ${fallback}`);
        warningCache.add(path);
      }
      return fallback || '';
    }
    const rawValue = extractTokenValue(value);
    return resolveTokenReference(rawValue, tokens);
  };

  const isDark = mode === 'dark';

  return {
    semantic: {
      primary: {
        50: getToken('theme.primary.lightest.color', '#eff6ff'),
        100: getToken('theme.primary.lighter.color', '#dbeafe'),
        200: getToken('theme.primary.light.color', '#bfdbfe'),
        300: getToken('blue.300', '#93c5fd'),
        400: getToken('blue.400', '#60a5fa'),
        500: getToken('theme.primary.color', '#3b82f6'),
        600: getToken('theme.primary.dark.color', '#2563eb'),
        700: getToken('theme.primary.darker.color', '#1d4ed8'),
        800: getToken('blue.800', '#1e40af'),
        900: getToken('blue.900', '#1e3a8a'),
        950: getToken('blue.950', '#172554')
      },
      colorScheme: {
        light: {
          primary: {
            color: getToken('theme.primary.color', '#3b82f6'),
            contrastColor: getToken('theme.primary.contrast.color', '#ffffff'),
            hoverColor: getToken('button.hover.background', '#2563eb'),
            activeColor: getToken('button.active.background', '#1d4ed8')
          },
          highlight: {
            background: getToken('surface.100', '#f1f5f9'),
            focusBackground: getToken('surface.200', '#e2e8f0'),
            color: getToken('global.textColor', '#0f172a'),
            focusColor: getToken('global.textColor', '#0f172a')
          },
          surface: {
            0: getToken('surface.0', '#ffffff'),
            50: getToken('surface.50', '#f8fafc'),
            100: getToken('surface.100', '#f1f5f9'),
            200: getToken('surface.200', '#e2e8f0'),
            300: getToken('surface.300', '#cbd5e1'),
            400: getToken('surface.400', '#94a3b8'),
            500: getToken('surface.500', '#64748b'),
            600: getToken('surface.600', '#475569'),
            700: getToken('surface.700', '#334155'),
            800: getToken('surface.800', '#1e293b'),
            900: getToken('surface.900', '#0f172a'),
            950: getToken('surface.950', '#020617')
          },
          content: {
            background: getToken('root.surface-section', '#ffffff'),
            hoverBackground: getToken('root.surface-hover', '#f6f9fc'),
            borderColor: getToken('root.surface-border', '#e2e8f0'),
            color: getToken('global.textColor', '#0f172a'),
            hoverColor: getToken('global.textColor', '#0f172a')
          },
          text: {
            color: getToken('global.textColor', '#0f172a'),
            hoverColor: getToken('global.textColor', '#0f172a'),
            mutedColor: getToken('global.textSecondaryColor', '#64748b'),
            hoverMutedColor: getToken('global.textSecondaryColor', '#64748b')
          },
          mask: {
            background: 'rgba(0,0,0,0.4)',
            color: getToken('global.textColor', '#0f172a')
          }
        },
        dark: {
          primary: {
            color: getToken('theme.primary.color', '#3b82f6'),
            contrastColor: getToken('theme.primary.contrast.color', '#ffffff'),
            hoverColor: getToken('button.hover.background', '#2563eb'),
            activeColor: getToken('button.active.background', '#1d4ed8')
          },
          highlight: {
            background: getToken('surface.800', '#1e293b'),
            focusBackground: getToken('surface.700', '#334155'),
            color: getToken('global.textColor', '#f1f5f9'),
            focusColor: getToken('global.textColor', '#f1f5f9')
          },
          surface: {
            0: getToken('surface.0', '#0f172a'),
            50: getToken('surface.50', '#020617'),
            100: getToken('surface.100', '#0f172a'),
            200: getToken('surface.200', '#1e293b'),
            300: getToken('surface.300', '#334155'),
            400: getToken('surface.400', '#475569'),
            500: getToken('surface.500', '#64748b'),
            600: getToken('surface.600', '#94a3b8'),
            700: getToken('surface.700', '#cbd5e1'),
            800: getToken('surface.800', '#e2e8f0'),
            900: getToken('surface.900', '#f1f5f9'),
            950: getToken('surface.950', '#f8fafc')
          },
          content: {
            background: getToken('root.surface-section', '#1e293b'),
            hoverBackground: getToken('root.surface-hover', '#334155'),
            borderColor: getToken('root.surface-border', '#475569'),
            color: getToken('global.textColor', '#f1f5f9'),
            hoverColor: getToken('global.textColor', '#f1f5f9')
          },
          text: {
            color: getToken('global.textColor', '#f1f5f9'),
            hoverColor: getToken('global.textColor', '#f1f5f9'),
            mutedColor: getToken('global.textSecondaryColor', '#94a3b8'),
            hoverMutedColor: getToken('global.textSecondaryColor', '#94a3b8')
          },
          mask: {
            background: 'rgba(0,0,0,0.6)',
            color: getToken('global.textColor', '#f1f5f9')
          }
        }
      }
    },
    components: {
      button: {
        root: {
          borderRadius: getToken('global.borderRadius', '6px'),
          paddingX: getToken('button.padding.left', '1rem'),
          paddingY: getToken('button.padding.top', '0.5rem'),
          fontSize: getToken('global.fontSize', '0.875rem'),
          gap: '0.5rem',
          fontWeight: '500',
          borderWidth: '1px',
          borderColor: 'transparent',
          focusRing: {
            width: '2px',
            style: 'solid',
            color: getToken('theme.primary.color', '#3b82f6'),
            offset: '2px',
            shadow: 'none'
          },
          transitionDuration: '200ms'
        },
        colorScheme: {
          light: {
            root: {
              primary: {
                background: getToken('button.background', getToken('theme.primary.color', '#3b82f6')),
                hoverBackground: getToken('button.hover.background', '#2563eb'),
                activeBackground: getToken('button.active.background', '#1d4ed8'),
                borderColor: getToken('button.borderColor', 'transparent'),
                hoverBorderColor: getToken('button.hover.borderColor', 'transparent'),
                activeBorderColor: getToken('button.active.borderColor', 'transparent'),
                color: getToken('button.color', getToken('theme.primary.contrast.color', '#ffffff')),
                hoverColor: getToken('button.hover.color', '#ffffff'),
                activeColor: getToken('button.active.color', '#ffffff')
              },
              secondary: {
                background: getToken('button.secondary.background', '#6b7280'),
                hoverBackground: getToken('button.secondary.hover.background', '#4b5563'),
                activeBackground: getToken('button.secondary.active.background', '#374151'),
                borderColor: getToken('button.secondary.borderColor', 'transparent'),
                hoverBorderColor: getToken('button.secondary.hover.borderColor', 'transparent'),
                activeBorderColor: getToken('button.secondary.active.borderColor', 'transparent'),
                color: getToken('button.secondary.color', '#ffffff'),
                hoverColor: getToken('button.secondary.hover.color', '#ffffff'),
                activeColor: getToken('button.secondary.active.color', '#ffffff')
              },
              info: {
                background: getToken('button.info.background', '#0ea5e9'),
                hoverBackground: getToken('button.info.hover.background', '#0284c7'),
                activeBackground: getToken('button.info.active.background', '#0369a1'),
                borderColor: getToken('button.info.borderColor', 'transparent'),
                color: getToken('button.info.color', '#ffffff')
              },
              success: {
                background: getToken('button.success.background', '#10b981'),
                hoverBackground: getToken('button.success.hover.background', '#059669'),
                activeBackground: getToken('button.success.active.background', '#047857'),
                borderColor: getToken('button.success.borderColor', 'transparent'),
                color: getToken('button.success.color', '#ffffff')
              },
              warning: {
                background: getToken('button.warning.background', '#f59e0b'),
                hoverBackground: getToken('button.warning.hover.background', '#d97706'),
                activeBackground: getToken('button.warning.active.background', '#b45309'),
                borderColor: getToken('button.warning.borderColor', 'transparent'),
                color: getToken('button.warning.color', '#ffffff')
              },
              help: {
                background: getToken('button.help.background', '#8b5cf6'),
                hoverBackground: getToken('button.help.hover.background', '#7c3aed'),
                activeBackground: getToken('button.help.active.background', '#6d28d9'),
                borderColor: getToken('button.help.borderColor', 'transparent'),
                color: getToken('button.help.color', '#ffffff')
              },
              danger: {
                background: getToken('button.danger.background', '#ef4444'),
                hoverBackground: getToken('button.danger.hover.background', '#dc2626'),
                activeBackground: getToken('button.danger.active.background', '#b91c1c'),
                borderColor: getToken('button.danger.borderColor', 'transparent'),
                color: getToken('button.danger.color', '#ffffff')
              },
              contrast: {
                background: getToken('surface.900', '#0f172a'),
                hoverBackground: getToken('surface.800', '#1e293b'),
                activeBackground: getToken('surface.700', '#334155'),
                borderColor: 'transparent',
                color: getToken('surface.0', '#ffffff')
              }
            },
            outlined: {
              primary: {
                hoverBackground: getToken('theme.primary.color', '#3b82f6') + '1a',
                activeBackground: getToken('theme.primary.color', '#3b82f6') + '26',
                borderColor: getToken('theme.primary.color', '#3b82f6'),
                color: getToken('theme.primary.color', '#3b82f6')
              },
              secondary: {
                hoverBackground: getToken('surface.100', '#f1f5f9'),
                activeBackground: getToken('surface.200', '#e2e8f0'),
                borderColor: getToken('surface.500', '#64748b'),
                color: getToken('surface.500', '#64748b')
              }
            }
          },
          dark: {
            root: {
              primary: {
                background: getToken('button.background', getToken('theme.primary.color', '#3b82f6')),
                hoverBackground: getToken('button.hover.background', '#2563eb'),
                activeBackground: getToken('button.active.background', '#1d4ed8'),
                borderColor: getToken('button.borderColor', 'transparent'),
                color: getToken('button.color', getToken('theme.primary.contrast.color', '#ffffff'))
              },
              secondary: {
                background: getToken('button.secondary.background', '#6b7280'),
                hoverBackground: getToken('button.secondary.hover.background', '#4b5563'),
                activeBackground: getToken('button.secondary.active.background', '#374151'),
                borderColor: getToken('button.secondary.borderColor', 'transparent'),
                color: getToken('button.secondary.color', '#ffffff')
              }
            }
          }
        }
      }
    }
  };
}

/**
 * Main function to load and process tokens
 */
export function loadTokens(mode: ThemeMode = 'light'): LoadedTokens {
  const cacheKey = `${mode}`;
  
  if (tokenCache.has(cacheKey)) {
    return tokenCache.get(cacheKey);
  }

  try {
    const themeKey = mode === 'light' ? 'lara-light' : 'lara-dark';
    const tokens = (tokenData as any)[themeKey];

    if (!tokens) {
      throw new Error(`Theme "${themeKey}" not found in token data`);
    }

    // Create PrimeNG preset
    const preset = createPrimeNGPreset(tokens, mode);

    // Convert all tokens to CSS variables
    const allCSSVars = convertToCSSVars(tokens);

    // Filter out tokens that are already handled by the preset
    const handledPaths = new Set([
      'theme.primary', 'surface', 'root.surface', 'global.textColor', 
      'global.textSecondaryColor', 'global.borderRadius', 'global.fontSize',
      'button.background', 'button.color', 'button.borderColor',
      'button.hover', 'button.active', 'button.secondary', 'button.info',
      'button.success', 'button.warning', 'button.help', 'button.danger'
    ]);

    const cssVars: Record<string, string> = {};
    for (const [varName, value] of Object.entries(allCSSVars)) {
      const path = varName.replace('--tf-', '').replace(/-/g, '.');
      const isHandled = Array.from(handledPaths).some(handledPath => 
        path.startsWith(handledPath)
      );
      
      if (!isHandled) {
        cssVars[varName] = value;
      }
    }

    const result = { preset, cssVars };
    tokenCache.set(cacheKey, result);
    
    return result;
  } catch (error) {
    console.error('Error loading tokens:', error);
    
    // Return minimal fallback
    const fallback = {
      preset: {
        semantic: {
          primary: { 500: '#3b82f6' },
          colorScheme: {
            [mode]: {
              primary: { color: '#3b82f6', contrastColor: '#ffffff' },
              surface: { 0: mode === 'light' ? '#ffffff' : '#0f172a' },
              text: { color: mode === 'light' ? '#0f172a' : '#f1f5f9' }
            }
          }
        }
      },
      cssVars: {}
    };
    
    tokenCache.set(cacheKey, fallback);
    return fallback;
  }
}

/**
 * Clear token cache (useful for development/hot reload)
 */
export function clearTokenCache(): void {
  tokenCache.clear();
  warningCache.clear();
}

/**
 * Export current tokens as JSON (for Theme Editor)
 */
export function exportTokensAsJSON(mode: ThemeMode = 'light'): string {
  const themeKey = mode === 'light' ? 'lara-light' : 'lara-dark';
  const tokens = (tokenData as any)[themeKey];
  
  if (!tokens) {
    throw new Error(`Theme "${themeKey}" not found`);
  }
  
  return JSON.stringify({ [themeKey]: tokens }, null, 2);
}

/**
 * Import tokens from JSON string (for Theme Editor)
 */
export function importTokensFromJSON(jsonString: string): void {
  try {
    const imported = JSON.parse(jsonString);
    
    // Validate structure
    if (!imported['lara-light'] && !imported['lara-dark']) {
      throw new Error('Invalid token structure: missing lara-light or lara-dark');
    }
    
    // Update tokenData (this would need to be more sophisticated in a real app)
    Object.assign(tokenData as any, imported);
    
    // Clear cache to force reload
    clearTokenCache();
    
    console.log('Tokens imported successfully');
  } catch (error) {
    console.error('Failed to import tokens:', error);
    throw error;
  }
}
