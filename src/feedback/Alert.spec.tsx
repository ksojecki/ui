import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders no role when announce is false', () => {
    const { container } = render(
      <Alert announce={false} purpose="error">
        Static notice
      </Alert>,
    );

    expect(container.querySelector('[role]')).toBeNull();
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByText('Static notice').classList.contains('alert-error')).toBe(true);
  });

  it('keeps the purpose role when announce is omitted or true', () => {
    const { unmount } = render(<Alert purpose="warning">Problem</Alert>);
    expect(screen.getByRole('alert').textContent).toBe('Problem');
    unmount();

    render(
      <Alert announce purpose="success">
        Done
      </Alert>,
    );
    expect(screen.getByRole('status').textContent).toBe('Done');
  });
});
