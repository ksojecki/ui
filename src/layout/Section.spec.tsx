import { render, screen } from '@testing-library/react';
import { Section } from './Section';

describe('Section', () => {
  it('merges className and forwards remaining HTML props to the section', () => {
    const { container } = render(
      <Section className="custom" data-testid="accounts" id="accounts" title="Accounts">
        Content
      </Section>,
    );

    const section = container.firstElementChild;
    expect(section?.tagName).toBe('SECTION');
    expect(section?.id).toBe('accounts');
    expect(section?.getAttribute('data-testid')).toBe('accounts');
    expect(section?.classList.contains('custom')).toBe(true);
    expect(screen.getByRole('heading', { name: 'Accounts' })).toBeTruthy();
  });
});
