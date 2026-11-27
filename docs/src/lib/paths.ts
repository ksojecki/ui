const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Site-absolute URL for a docs path such as `/components/button/`. */
export function docsHref(path: string) {
  return `${base}${path}`;
}

/** True when `path` is the page being rendered. */
export function isCurrent(path: string, pathname: string) {
  return docsHref(path) === pathname || `${docsHref(path)}/` === pathname;
}

export const REPOSITORY_URL = 'https://github.com/ksojecki/ui';
