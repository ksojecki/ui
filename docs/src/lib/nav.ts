import { getCollection } from 'astro:content';
import { GROUPS } from './groups';

export interface NavItem {
  label: string;
  path: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export function guidePath(id: string) {
  return id === 'overview' ? '/' : `/${id}/`;
}

export function componentPath(id: string) {
  return `/components/${id}/`;
}

/** Sidebar: guides by `order`, then one section per component group. */
export async function navigation(): Promise<NavSection[]> {
  const guides = (await getCollection('guides')).toSorted((a, b) => a.data.order - b.data.order);
  const components = (await getCollection('components')).toSorted((a, b) =>
    a.data.title.localeCompare(b.data.title),
  );

  return [
    {
      label: 'Get started',
      items: guides.map((guide) => ({ label: guide.data.title, path: guidePath(guide.id) })),
    },
    { label: 'Components', items: [{ label: 'All components', path: '/components/' }] },
    ...GROUPS.map((group) => ({
      label: group.label,
      items: components
        .filter((component) => component.data.group === group.id)
        .map((component) => ({ label: component.data.title, path: componentPath(component.id) })),
    })).filter((section) => section.items.length > 0),
  ];
}
