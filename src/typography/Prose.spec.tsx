import { render, screen } from '@testing-library/react';
import { Prose } from './Prose';

describe('Prose', () => {
  it('caps the line length and keeps its children', () => {
    render(
      <Prose className="extra">
        <p>Body</p>
      </Prose>,
    );

    const column = screen.getByText('Body').parentElement;
    expect(column?.className).toContain('max-w-prose');
    expect(column?.className).toContain('extra');
  });
});
