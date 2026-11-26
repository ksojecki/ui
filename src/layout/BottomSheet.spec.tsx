import { fireEvent, render, screen } from '@testing-library/react';
import { BottomSheet } from './BottomSheet';

describe('BottomSheet', () => {
  it('renders the title and children', () => {
    render(<BottomSheet title="Filters">Body content</BottomSheet>);

    expect(screen.getByRole('button', { name: 'Filters' })).toBeTruthy();
    expect(screen.getByText('Body content')).toBeTruthy();
  });

  it('makes the body the scroll container so tall content stays reachable', () => {
    render(<BottomSheet title="Filters">Body content</BottomSheet>);

    expect(screen.getByText('Body content').classList.contains('overflow-y-auto')).toBe(true);
  });

  it('toggles aria-expanded and hides the body on click', () => {
    render(<BottomSheet title="Filters">Body content</BottomSheet>);
    const header = screen.getByRole('button', { name: 'Filters' });
    const body = screen.getByText('Body content');

    expect(header.getAttribute('aria-expanded')).toBe('true');
    expect(body?.hidden).toBe(false);

    fireEvent.click(header);

    expect(header.getAttribute('aria-expanded')).toBe('false');
    expect(body?.hidden).toBe(true);
    expect(screen.getByText('Body content')).toBeTruthy();
  });

  it('starts collapsed when defaultOpen is false', () => {
    render(
      <BottomSheet defaultOpen={false} title="Filters">
        Body content
      </BottomSheet>,
    );
    const header = screen.getByRole('button', { name: 'Filters' });

    expect(header.getAttribute('aria-expanded')).toBe('false');
    expect(screen.getByText('Body content').hidden).toBe(true);
  });

  it('calls onOpenChange in controlled mode without changing state itself', () => {
    const onOpenChange = vi.fn<(open: boolean) => void>();
    render(
      <BottomSheet onOpenChange={onOpenChange} open={false} title="Filters">
        Body content
      </BottomSheet>,
    );
    const header = screen.getByRole('button', { name: 'Filters' });

    fireEvent.click(header);

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(header.getAttribute('aria-expanded')).toBe('false');
  });
});
