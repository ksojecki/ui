import { render, screen } from '@testing-library/react';
import { Heading } from './Heading';

describe('Heading', () => {
  it('renders a small bold label heading at the level tag', () => {
    render(
      <Heading level={3} size="label">
        Accounts
      </Heading>,
    );

    const heading = screen.getByRole('heading', { name: 'Accounts', level: 3 });
    expect(heading.className).toContain('text-sm');
    expect(heading.className).toContain('font-semibold');
    expect(heading.className).not.toContain('text-xl');
  });
});
