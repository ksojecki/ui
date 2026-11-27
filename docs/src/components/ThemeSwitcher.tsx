import { useState } from 'react';
import { Select } from '@ksojecki/ui/forms';
import {
  PALETTES,
  SCHEMES,
  applyThemeChoice,
  currentThemeChoice,
  type Palette,
  type Scheme,
  type ThemeChoice,
} from '../lib/themeChoice';

/** Palette and scheme pickers for the docs header. Rendered only in the browser, since the choice lives on `<html>`. */
export default function ThemeSwitcher() {
  const [choice, setChoice] = useState<ThemeChoice>(currentThemeChoice);

  function update(next: ThemeChoice) {
    setChoice(next);
    applyThemeChoice(next);
  }

  return (
    <div className="flex items-center gap-2">
      <Select
        aria-label="Palette"
        className="w-28"
        controlSize="sm"
        fullWidth={false}
        onChange={(event) => update({ ...choice, palette: event.target.value as Palette })}
        value={choice.palette}
      >
        {PALETTES.map((palette) => (
          <option key={palette} value={palette}>
            {palette}
          </option>
        ))}
      </Select>
      <Select
        aria-label="Colour scheme"
        className="w-24"
        controlSize="sm"
        fullWidth={false}
        onChange={(event) => update({ ...choice, scheme: event.target.value as Scheme })}
        value={choice.scheme}
      >
        {SCHEMES.map((scheme) => (
          <option key={scheme} value={scheme}>
            {scheme}
          </option>
        ))}
      </Select>
    </div>
  );
}
