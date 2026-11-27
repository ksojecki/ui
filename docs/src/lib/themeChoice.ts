export const PALETTES = ['generic', 'budget', 'traffic', 'roadsign'] as const;
export const SCHEMES = ['light', 'dark'] as const;

export type Palette = (typeof PALETTES)[number];
export type Scheme = (typeof SCHEMES)[number];

/** Also read by the inline script in `DocsLayout.astro`, which applies the choice before first paint. */
export const STORAGE_KEY = 'ui-docs-theme';

export interface ThemeChoice {
  palette: Palette;
  scheme: Scheme;
}

export function themeName({ palette, scheme }: ThemeChoice) {
  return scheme === 'dark' ? `${palette}-dark` : palette;
}

/** The theme on `<html>`, which the inline script set from storage or the OS scheme. */
export function currentThemeChoice(): ThemeChoice {
  const theme = document.documentElement.dataset.theme ?? 'generic';
  const scheme: Scheme = theme.endsWith('-dark') ? 'dark' : 'light';
  const palette = PALETTES.find((name) => themeName({ palette: name, scheme }) === theme);
  return { palette: palette ?? 'generic', scheme };
}

export function applyThemeChoice(choice: ThemeChoice) {
  document.documentElement.dataset.theme = themeName(choice);
  document.documentElement.dataset.scheme = choice.scheme;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
  } catch {
    // Storage can be blocked; the choice then lasts for this page only.
  }
}
