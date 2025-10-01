import type { ThemeMode } from './loadTokens';

export const TOKENS = {
  text: {
    primary: 'var(--p-text-color)',
    secondary: 'var(--p-text-muted-color)',
    inverse: 'var(--p-primary-contrast-color)',
    danger: 'var(--tf-red-500)',
    success: 'var(--tf-green-500)',
    warning: 'var(--tf-yellow-600)',
    info: 'var(--tf-cyan-600)',
    disabled: 'var(--text-color-disabled, var(--p-text-muted-color))',
  },
  background: {
    surface: 'var(--p-surface-0)',
    surfaceRaised: 'var(--p-content-background)',
    surfaceHover: 'var(--p-content-hover-background)',
    overlay: 'var(--surface-overlay)',
    brand: 'var(--p-primary-color)',
    success: 'var(--p-button-success-background)',
    warning: 'var(--p-button-warning-background)',
    danger: 'var(--p-button-danger-background)',
    info: 'var(--p-button-info-background)',
    disabled: 'var(--surface-100)',
  },
  border: {
    subtle: 'var(--p-content-border-color)',
    strong: 'var(--p-surface-400)',
    focus: 'var(--focus-ring-color, var(--p-primary-color))',
    danger: 'var(--tf-red-500)',
    success: 'var(--tf-green-500)',
  },
  brand: {
    primary: 'var(--p-primary-color)',
    primaryHover: 'var(--p-primary-hover-color)',
    primaryActive: 'var(--p-primary-active-color)',
    primaryContrast: 'var(--p-primary-contrast-color)',
  },
  state: {
    success: 'var(--p-button-success-background)',
    successContrast: 'var(--text-color-success-contrast, var(--brand-text-color))',
    warning: 'var(--p-button-warning-background)',
    warningContrast: 'var(--text-color-warning-contrast, var(--brand-text-color))',
    danger: 'var(--p-button-danger-background)',
    dangerContrast: 'var(--text-color-danger-contrast, var(--brand-text-color))',
    info: 'var(--p-button-info-background)',
    infoContrast: 'var(--text-color-info-contrast, var(--brand-text-color))',
  },
  focus: {
    ring: 'var(--focus-ring-color, var(--p-primary-color))',
    width: 'var(--focus-ring-width, 2px)',
  },
  elevation: {
    raised: 'var(--brand-shadow, var(--shadow-2))',
    overlay: 'var(--brand-shadow-lg, var(--shadow-4))',
  },
} as const;

export type TokenGroup = typeof TOKENS;
export type TokenPath =
  | `text.${keyof TokenGroup['text']}`
  | `background.${keyof TokenGroup['background']}`
  | `border.${keyof TokenGroup['border']}`
  | `brand.${keyof TokenGroup['brand']}`
  | `state.${keyof TokenGroup['state']}`
  | `focus.${keyof TokenGroup['focus']}`
  | `elevation.${keyof TokenGroup['elevation']}`;

const pathToValue: Record<TokenPath, string> = Object.entries(TOKENS).reduce(
  (acc, [groupKey, groupValue]) => {
    Object.entries(groupValue as Record<string, string>).forEach(([tokenKey, tokenValue]) => {
      const path = `${groupKey}.${tokenKey}` as TokenPath;
      acc[path] = tokenValue;
    });
    return acc;
  },
  {} as Record<TokenPath, string>
);

export const isBrowser = typeof window !== 'undefined';

export function getToken(path: TokenPath): string {
  return pathToValue[path];
}

export function applyThemeDataset(mode: ThemeMode): void {
  if (!isBrowser) {
    return;
  }
  const root = document.documentElement;
  root.setAttribute('data-theme', mode);
}

export function ensureCSSVariables(variableMap: Record<string, string>): void {
  if (!isBrowser) {
    return;
  }
  const root = document.documentElement;
  Object.entries(variableMap).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });
}
