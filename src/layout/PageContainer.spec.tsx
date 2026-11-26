import { render, screen } from '@testing-library/react';
import { PageContainer } from './PageContainer';

describe('PageContainer', () => {
  it('uses the standard width by default and forwards remaining props', () => {
    const { container } = render(
      <PageContainer className="px-4" id="page" width="wide">
        Content
      </PageContainer>,
    );

    expect(container.firstElementChild?.id).toBe('page');
    expect(container.firstElementChild?.className).toBe('mx-auto w-full max-w-6xl px-4');
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('uses max-w-5xl when no width is given', () => {
    const { container } = render(<PageContainer>Content</PageContainer>);
    expect(container.firstElementChild?.className).toBe('mx-auto w-full max-w-5xl');
  });

  it('has no max width when full', () => {
    const { container } = render(<PageContainer width="full">Content</PageContainer>);
    expect(container.firstElementChild?.className).toBe('mx-auto w-full');
  });
});
