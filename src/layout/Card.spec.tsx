import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('uses the md size class by default', () => {
    const { container } = render(<Card>Content</Card>);

    expect(container.firstElementChild?.className).toBe('card bg-base-100 shadow card-md');
  });

  it('maps each size to its daisyUI class', () => {
    const { container, rerender } = render(<Card size="sm">Content</Card>);
    expect(container.firstElementChild?.classList.contains('card-sm')).toBe(true);
    expect(container.firstElementChild?.classList.contains('card-lg')).toBe(false);

    rerender(
      <Card className="custom" size="lg">
        Content
      </Card>,
    );
    expect(container.firstElementChild?.classList.contains('card-lg')).toBe(true);
    expect(container.firstElementChild?.classList.contains('card-md')).toBe(false);
    expect(container.firstElementChild?.classList.contains('custom')).toBe(true);
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('forwards id, data and aria attributes to the section', () => {
    const { container } = render(
      <Card className="custom" data-testid="summary" id="summary-card" aria-label="Summary">
        Content
      </Card>,
    );

    const section = container.firstElementChild;
    expect(section?.tagName).toBe('SECTION');
    expect(section?.id).toBe('summary-card');
    expect(section?.getAttribute('data-testid')).toBe('summary');
    expect(section?.getAttribute('aria-label')).toBe('Summary');
    expect(section?.classList.contains('custom')).toBe(true);
  });

  it('renders an article when asked', () => {
    const { container } = render(<Card as="article">Content</Card>);

    expect(container.firstElementChild?.tagName).toBe('ARTICLE');
  });
});
