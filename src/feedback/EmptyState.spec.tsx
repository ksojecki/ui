import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders the dashed container with children only by default', () => {
    const { container } = render(<EmptyState>Nothing here</EmptyState>);

    const box = container.firstElementChild as HTMLElement;
    expect(box.classList.contains('border-dashed')).toBe(true);
    expect(box.textContent).toBe('Nothing here');
    expect(screen.queryByRole('heading')).toBeNull();
  });

  it('renders an optional title heading and action after the message', () => {
    render(
      <EmptyState action={<button type="button">Add account</button>} title="No accounts">
        Create one to start.
      </EmptyState>,
    );

    expect(screen.getByRole('heading', { name: 'No accounts' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Add account' })).toBeTruthy();
  });
});
