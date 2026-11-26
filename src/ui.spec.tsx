import { render, screen } from '@testing-library/react';
import { Alert } from './feedback/Alert';
import { Badge, type BadgePurpose } from './feedback/Badge';
import { Button } from './actions/Button';
import { ACTION_PURPOSES, type ActionPurpose } from './internal/purpose';
import { Card } from './layout/Card';
import { FilterBar } from './forms/FilterBar';
import { FilterRow } from './forms/FilterRow';
import { Heading } from './typography/Heading/Heading';
import { IconButton } from './actions/IconButton';
import { TbPlus } from './icons';
import { PageHeader } from './layout/PageHeader';
import { Paragraph } from './typography/Paragraph';
import { Section } from './layout/Section';

describe('@ksojecki/ui', () => {
  it('passes a title to the heading for hover text on truncated labels', () => {
    render(
      <Heading level={5} title="Full account name">
        Short
      </Heading>,
    );

    expect(screen.getByRole('heading', { name: 'Short' }).getAttribute('title')).toBe(
      'Full account name',
    );
  });

  it('keeps the tag from the level and takes the visual size from `size`', () => {
    render(
      <Heading level={2} size={5} className="font-semibold">
        Card name
      </Heading>,
    );

    const heading = screen.getByRole('heading', { name: 'Card name', level: 2 });
    expect(heading.className).toContain('text-base');
    expect(heading.className).toContain('font-semibold');
    expect(heading.className).not.toContain('text-2xl');
  });

  it('renders heading levels with their styles and falls back to h6', () => {
    const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const classes = [
      'text-3xl',
      'text-2xl',
      'text-xl',
      'text-lg',
      'text-base',
      'text-base font-light',
    ];
    const { rerender } = render(
      <Heading id="heading" className="custom" level={1}>
        Title
      </Heading>,
    );

    for (const [index, tag] of tags.entries()) {
      rerender(
        <Heading id="heading" className="custom" level={(index + 1) as 1 | 2 | 3 | 4 | 5 | 6}>
          Title
        </Heading>,
      );
      const heading = screen.getByRole('heading', { name: 'Title' });
      expect(heading.tagName.toLowerCase()).toBe(tag);
      expect(heading.className).toContain(classes[index]);
      expect(heading.className).toContain('custom');
      expect(heading.id).toBe('heading');
    }

    rerender(
      <Heading id="heading" className="custom" level={0 as 1}>
        Title
      </Heading>,
    );
    const fallback = screen.getByRole('heading', { name: 'Title', level: 6 });
    expect(fallback.className).toContain('text-3xl');
    expect(fallback.className).toContain('custom');
    expect(fallback.id).toBe('heading');

    rerender(
      <Heading id="heading" className="custom" level={1.5 as 1}>
        Title
      </Heading>,
    );
    expect(screen.getByRole('heading', { name: 'Title', level: 6 }).className).toContain(
      'text-3xl',
    );
  });

  it('renders a shared card title and content', () => {
    render(<Card title="Shared card">Reusable content</Card>);

    expect(screen.getByText('Shared card')).toBeTruthy();
    expect(screen.getByText('Reusable content')).toBeTruthy();
  });

  it('renders a shared button in loading state', () => {
    render(
      <Button isLoading tone="secondary">
        Save changes
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save changes' });

    expect(button.hasAttribute('disabled')).toBe(true);
  });

  it('renders an accessible icon-only button with its tone', () => {
    const { getByRole } = render(<IconButton icon={<TbPlus />} label="Add item" tone="success" />);
    const button = getByRole('button', { name: 'Add item' });

    expect(button.getAttribute('title')).toBe('Add item');
    expect(button.className).toContain('btn-success');
    expect(button.textContent).toBe('');
  });

  it('renders each action purpose with its daisyUI tone and variant', () => {
    const expected: Record<ActionPurpose, string[]> = {
      save: ['btn-primary'],
      confirm: ['btn-primary'],
      create: ['btn-primary', 'btn-soft'],
      edit: ['btn-neutral', 'btn-soft'],
      delete: ['btn-error', 'btn-soft'],
      cancel: ['btn-default'],
      neutral: ['btn-default'],
    };

    for (const purpose of Object.keys(expected) as ActionPurpose[]) {
      const { unmount } = render(<Button purpose={purpose}>Action</Button>);
      const button = screen.getByRole('button', { name: 'Action' });

      for (const className of expected[purpose]) {
        expect(button.classList.contains(className)).toBe(true);
      }
      expect(button.classList.contains('btn-soft')).toBe(expected[purpose].includes('btn-soft'));
      expect(ACTION_PURPOSES[purpose].tone).toBeTruthy();
      unmount();
    }
  });

  it('renders an outline variant with the default tone class', () => {
    render(
      <Button tone="default" variant="outline" fullWidth>
        Continue with Google
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Continue with Google' });

    expect(button.className).toBe('btn btn-default btn-outline w-full');
  });

  it('lets explicit tone and variant override the purpose', () => {
    render(
      <Button purpose="delete" tone="success" variant="solid">
        Remove
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Remove' });

    expect(button.classList.contains('btn-success')).toBe(true);
    expect(button.classList.contains('btn-error')).toBe(false);
    expect(button.classList.contains('btn-soft')).toBe(false);
  });

  it('maps button sizes to daisyUI classes and adds no class for md', () => {
    const { unmount } = render(<Button size="xs">Small</Button>);
    expect(screen.getByRole('button', { name: 'Small' }).classList.contains('btn-xs')).toBe(true);
    unmount();

    render(
      <>
        <Button size="sm">Compact</Button>
        <Button size="lg">Large</Button>
        <Button size="md">Default</Button>
      </>,
    );
    expect(screen.getByRole('button', { name: 'Compact' }).classList.contains('btn-sm')).toBe(true);
    expect(screen.getByRole('button', { name: 'Large' }).classList.contains('btn-lg')).toBe(true);

    const medium = screen.getByRole('button', { name: 'Default' });
    expect(medium.classList.contains('btn-xs')).toBe(false);
    expect(medium.classList.contains('btn-sm')).toBe(false);
    expect(medium.classList.contains('btn-lg')).toBe(false);
  });

  it('keeps loading buttons disabled when a purpose is set', () => {
    render(
      <Button isLoading purpose="save">
        Saving
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Saving' }).hasAttribute('disabled')).toBe(true);
  });

  it('renders a small square icon button with the size class', () => {
    render(<IconButton icon={<TbPlus />} label="Add row" size="sm" />);
    const button = screen.getByRole('button', { name: 'Add row' });

    expect(button.classList.contains('btn-sm')).toBe(true);
    expect(button.classList.contains('btn-square')).toBe(true);
    expect(button.classList.contains('btn-ghost')).toBe(true);
  });

  it('maps every badge purpose, variant and size to daisyUI classes', () => {
    const purposes: Record<BadgePurpose, string> = {
      neutral: 'badge-neutral',
      info: 'badge-info',
      success: 'badge-success',
      warning: 'badge-warning',
      error: 'badge-error',
    };
    for (const [purpose, className] of Object.entries(purposes)) {
      const { unmount } = render(<Badge purpose={purpose as BadgePurpose}>Label</Badge>);
      const badge = screen.getByText('Label');
      expect(badge.tagName.toLowerCase()).toBe('span');
      expect(badge.classList.contains('badge')).toBe(true);
      expect(badge.classList.contains(className)).toBe(true);
      unmount();
    }

    const variants = { solid: null, soft: 'badge-soft', outline: 'badge-outline' } as const;
    for (const [variant, className] of Object.entries(variants)) {
      const { unmount } = render(<Badge variant={variant as keyof typeof variants}>Variant</Badge>);
      const badge = screen.getByText('Variant');
      expect(badge.classList.contains('badge-soft')).toBe(className === 'badge-soft');
      expect(badge.classList.contains('badge-outline')).toBe(className === 'badge-outline');
      unmount();
    }

    const sizes = { xs: 'badge-xs', sm: 'badge-sm', md: null, lg: 'badge-lg' } as const;
    for (const [size, className] of Object.entries(sizes)) {
      const { unmount } = render(<Badge size={size as keyof typeof sizes}>Size</Badge>);
      const badge = screen.getByText('Size');
      for (const other of ['badge-xs', 'badge-sm', 'badge-lg']) {
        expect(badge.classList.contains(other)).toBe(other === className);
      }
      unmount();
    }
  });

  it('defaults badges to neutral, soft and md with the caller className appended', () => {
    render(<Badge className="custom-badge">Default</Badge>);
    const badge = screen.getByText('Default');

    expect(badge.className).toBe('badge badge-neutral badge-soft custom-badge');
  });

  it('maps every alert purpose and variant to daisyUI classes and the right role', () => {
    const roles = { info: 'status', success: 'status', warning: 'alert', error: 'alert' } as const;
    for (const [purpose, role] of Object.entries(roles)) {
      const { unmount } = render(
        <Alert purpose={purpose as keyof typeof roles}>Message {purpose}</Alert>,
      );
      const alert = screen.getByRole(role);
      expect(alert.classList.contains('alert')).toBe(true);
      expect(alert.classList.contains(`alert-${purpose}`)).toBe(true);
      unmount();
    }

    const { unmount } = render(<Alert variant="soft">Soft</Alert>);
    const soft = screen.getByText('Soft');
    expect(soft.classList.contains('alert-soft')).toBe(true);
    expect(soft.classList.contains('alert-info')).toBe(true);
    unmount();

    render(<Alert>Solid</Alert>);
    expect(screen.getByText('Solid').classList.contains('alert-soft')).toBe(false);
  });

  it('lets alert callers override the role and append className', () => {
    render(
      <Alert className="custom-alert" purpose="error" role="log">
        Overridden
      </Alert>,
    );
    const alert = screen.getByRole('log');

    expect(alert.textContent).toBe('Overridden');
    expect(alert.className).toBe('alert animate-fade-in alert-error custom-alert');
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('renders structural content primitives', () => {
    render(
      <>
        <PageHeader
          description="Header description"
          eyebrow="Recipe"
          meta={<span>Yield 400 g</span>}
          title="Vanilla cupcakes"
        />
        <Section description="Section description" title="Ingredients">
          <Paragraph tone="muted">Flour, sugar, butter</Paragraph>
        </Section>
      </>,
    );

    expect(screen.getByText('Vanilla cupcakes')).toBeTruthy();
    expect(screen.getByText('Header description')).toBeTruthy();
    expect(screen.getByText('Ingredients')).toBeTruthy();
    expect(screen.getByText('Flour, sugar, butter')).toBeTruthy();
  });

  it('renders compact filter controls and right aligned actions', () => {
    const { container } = render(
      <FilterBar actions={<button className="btn">Reset</button>} className="custom-class">
        <input className="input" aria-label="Search" />
        <select className="select" aria-label="Type">
          <option>All</option>
        </select>
      </FilterBar>,
    );

    const bar = container.firstElementChild;
    expect(bar?.className).toContain('flex-wrap');
    expect(bar?.className).toContain('items-end');
    expect(bar?.className).toContain('gap-3');
    expect(bar?.className).toContain('[&_.input]:input-sm');
    expect(bar?.className).toContain('[&_.select]:select-sm');
    expect(bar?.className).toContain('[&_.btn]:btn-sm');
    expect(bar?.className).toContain('custom-class');
    expect(bar?.lastElementChild?.className).toBe('ml-auto self-end');
  });

  it('renders the shared removable filter row', () => {
    render(
      <FilterRow onRemove={() => undefined} removeLabel="Remove amount filter">
        <input aria-label="Amount" />
      </FilterRow>,
    );

    expect(screen.getByRole('textbox', { name: 'Amount' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Remove amount filter' })).toBeTruthy();
  });
});
