import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';

describe('ButtonGroup', () => {
  it('joins its children and names the group', () => {
    render(
      <ButtonGroup label="Period">
        <Button className="btn-sm">Year</Button>
        <Button>Month</Button>
      </ButtonGroup>,
    );

    const group = screen.getByRole('group', { name: 'Period' });
    expect(group.classList).toContain('join');
    expect(screen.getByRole('button', { name: 'Year' }).classList).toContain('join-item');
    expect(screen.getByRole('button', { name: 'Year' }).classList).toContain('btn-sm');
    expect(screen.getByRole('button', { name: 'Month' }).classList).toContain('join-item');
  });

  it('skips empty children and leaves the group unnamed without a label', () => {
    const { container } = render(
      <ButtonGroup>
        {null}
        <Button>Only</Button>
      </ButtonGroup>,
    );

    expect(container.firstElementChild?.getAttribute('role')).toBeNull();
    expect(screen.getByRole('button', { name: 'Only' }).classList).toContain('join-item');
  });
});
