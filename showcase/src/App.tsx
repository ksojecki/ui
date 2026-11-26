import { useEffect, useState } from 'react';
import { SegmentedControl } from '@ksojecki/ui/forms';
import { Heading } from '@ksojecki/ui/typography';
import { PALETTES, SCHEMES, loadThemeChoice, saveThemeChoice, themeName } from './themeChoice';
import type { Palette, Scheme } from './themeChoice';
import { ActionsSection } from './sections/ActionsSection';
import { DataSection } from './sections/DataSection';
import { FeedbackSection } from './sections/FeedbackSection';
import { FormsSection } from './sections/FormsSection';
import { GuideSection } from './sections/GuideSection';
import { IconsSection } from './sections/IconsSection';
import { LayoutSection } from './sections/LayoutSection';
import { NavigationSection } from './sections/NavigationSection';
import { OverlaysSection } from './sections/OverlaysSection';
import { TypographySection } from './sections/TypographySection';

const SECTIONS = [
  { id: 'guide', label: 'Guide', Component: GuideSection },
  { id: 'actions', label: 'Actions', Component: ActionsSection },
  { id: 'forms', label: 'Forms', Component: FormsSection },
  { id: 'feedback', label: 'Feedback', Component: FeedbackSection },
  { id: 'data', label: 'Data', Component: DataSection },
  { id: 'layout', label: 'Layout', Component: LayoutSection },
  { id: 'navigation', label: 'Navigation', Component: NavigationSection },
  { id: 'overlays', label: 'Overlays', Component: OverlaysSection },
  { id: 'typography', label: 'Typography', Component: TypographySection },
  { id: 'icons', label: 'Icons', Component: IconsSection },
];

export function App() {
  const [choice, setChoice] = useState(loadThemeChoice);

  useEffect(() => {
    document.documentElement.dataset.theme = themeName(choice);
    saveThemeChoice(choice);
  }, [choice]);

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <header className="sticky top-0 z-30">
        <div className="navbar paper-navbar flex-wrap gap-x-6 gap-y-2 px-4">
          <Heading level={1} size={4}>
            UI showcase
          </Heading>
          <nav aria-label="Sections" className="flex flex-wrap gap-3 text-sm">
            {SECTIONS.map(({ id, label }) => (
              <a className="link" href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-(--paper-border) bg-base-100 px-4 py-2">
          <SegmentedControl
            label="Palette"
            onChange={(palette) => setChoice({ ...choice, palette: palette as Palette })}
            options={PALETTES.map((value) => ({ value, label: value }))}
            size="sm"
            value={choice.palette}
          />
          <SegmentedControl
            label="Scheme"
            onChange={(scheme) => setChoice({ ...choice, scheme: scheme as Scheme })}
            options={SCHEMES.map((value) => ({ value, label: value }))}
            size="sm"
            value={choice.scheme}
          />
        </div>
      </header>
      <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4">
        {SECTIONS.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </main>
    </div>
  );
}
