// Native popovers toggle `display` and the top layer, so the fade needs discrete transitions and a starting style.
export const POPOVER_FADE =
  'opacity-0 transition-[opacity,scale,translate,display,overlay] transition-discrete duration-(--motion-base) motion-reduce:transition-none [&:popover-open]:opacity-100 starting:[&:popover-open]:opacity-0';

export const POPOVER_BACKDROP =
  'backdrop:bg-base-content/0 backdrop:transition-[background-color,display,overlay] backdrop:transition-discrete backdrop:duration-(--motion-base) motion-reduce:backdrop:transition-none [&:popover-open]:backdrop:bg-(--overlay-backdrop) starting:[&:popover-open]:backdrop:bg-base-content/0';

// The megamenu root is an inline bar from `md`, so only the mobile popover fades.
export const POPOVER_FADE_MOBILE =
  'max-md:opacity-0 max-md:transition-[opacity,scale,translate,display,overlay] max-md:transition-discrete max-md:duration-(--motion-base) max-md:motion-reduce:transition-none max-md:[&:popover-open]:opacity-100 max-md:starting:[&:popover-open]:opacity-0';

export const POPOVER_BACKDROP_MOBILE =
  'max-md:backdrop:bg-base-content/0 max-md:backdrop:transition-[background-color,display,overlay] max-md:backdrop:transition-discrete max-md:backdrop:duration-(--motion-base) max-md:motion-reduce:backdrop:transition-none max-md:[&:popover-open]:backdrop:bg-(--overlay-backdrop) max-md:starting:[&:popover-open]:backdrop:bg-base-content/0';

// Below `md` daisyUI lists megamenu item panels inline without opening them, so they must stay visible.
export const POPOVER_FADE_DESKTOP =
  'md:opacity-0 md:transition-[opacity,scale,translate,display,overlay] md:transition-discrete md:duration-(--motion-base) md:motion-reduce:transition-none md:[&:popover-open]:opacity-100 md:starting:[&:popover-open]:opacity-0';
