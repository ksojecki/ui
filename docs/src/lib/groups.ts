/** Component groups, in sidebar order. Each id is a public subpath: `@ksojecki/ui/<id>`. */
export const GROUPS = [
  {
    id: 'actions',
    label: 'Actions',
    description: 'Buttons and button groups that start an action.',
  },
  {
    id: 'forms',
    label: 'Forms',
    description: 'Labelled controls, pickers, filters and form actions.',
  },
  {
    id: 'feedback',
    label: 'Feedback',
    description: 'Status messages, badges, progress and loading states.',
  },
  { id: 'data', label: 'Data', description: 'Tables and key figures.' },
  { id: 'layout', label: 'Layout', description: 'Pages, sections, cards and other containers.' },
  { id: 'navigation', label: 'Navigation', description: 'Links, menus and dropdowns.' },
  { id: 'overlays', label: 'Overlays', description: 'Dialogs and consent prompts above the page.' },
  {
    id: 'typography',
    label: 'Typography',
    description: 'Headings, paragraphs and long-form text.',
  },
] as const;

export type GroupId = (typeof GROUPS)[number]['id'];

export const GROUP_IDS = GROUPS.map((group) => group.id) as [GroupId, ...GroupId[]];
