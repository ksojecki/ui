import { render, screen } from '@testing-library/react';
import { Metric } from './Metric';

describe('Metric', () => {
  it('renders without a frame by default', () => {
    const { container } = render(<Metric label="Balance" value="120 PLN" />);

    const stat = container.firstElementChild as HTMLElement;
    expect(stat.classList.contains('stat')).toBe(true);
    expect(stat.classList.contains('border')).toBe(false);
    expect(screen.getByText('120 PLN').classList.contains('stat-value')).toBe(true);
  });

  it('adds a bordered card for the boxed appearance', () => {
    const { container } = render(
      <Metric appearance="boxed" className="p-4" label="Due" value="3" />,
    );

    const stat = container.firstElementChild as HTMLElement;
    expect(stat.classList.contains('stat')).toBe(true);
    expect(stat.classList.contains('rounded-box')).toBe(true);
    expect(stat.classList.contains('border')).toBe(true);
    expect(stat.classList.contains('border-base-300')).toBe(true);
    expect(stat.classList.contains('bg-base-100')).toBe(true);
    expect(stat.classList.contains('p-4')).toBe(true);
  });
});
