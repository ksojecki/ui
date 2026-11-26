export const PALETTES = ['budget', 'traffic', 'roadsign', 'generic'] as const;
export const SCHEMES = ['light', 'dark'] as const;

export type Palette = (typeof PALETTES)[number];
export type Scheme = (typeof SCHEMES)[number];

const STORAGE_KEY = 'ui-showcase-theme';

export interface ThemeChoice {
  palette: Palette;
  scheme: Scheme;
}

export function themeName({ palette, scheme }: ThemeChoice) {
  return scheme === 'dark' ? `${palette}-dark` : palette;
}

export function loadThemeChoice(): ThemeChoice {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    if (parsed && typeof parsed === 'object' && 'palette' in parsed && 'scheme' in parsed) {
      const { palette, scheme } = parsed;
      if (PALETTES.some((p) => p === palette) && SCHEMES.some((s) => s === scheme)) {
        return { palette: palette as Palette, scheme: scheme as Scheme };
      }
    }
  } catch {
    // Storage can be blocked; fall through to the default.
  }
  return { palette: 'budget', scheme: 'light' };
}

export function saveThemeChoice(choice: ThemeChoice) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
  } catch {
    // Persistence is a convenience only.
  }
}
