import { render, screen } from '@testing-library/react';
import { Content, Title } from './Content';
import { Page } from './Page';

describe('Page', () => {
  it('renders the title heading and the content inside a main landmark', () => {
    render(
      <Page>
        <Title>Accounts</Title>
        <Content>
          <p>Body text</p>
        </Content>
      </Page>,
    );

    expect(screen.getByRole('main')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 1, name: 'Accounts' })).toBeTruthy();
    expect(screen.getByText('Body text')).toBeTruthy();
  });

  it('appends className without a trailing space when none is given', () => {
    const { rerender } = render(
      <Page>
        <Title>Accounts</Title>
        <Content>Body</Content>
      </Page>,
    );
    expect(screen.getByRole('main').className).toBe(
      'p-4 w-full flex flex-col gap-4 animate-fade-in',
    );

    rerender(
      <Page className="bg-base-200">
        <Title>Accounts</Title>
        <Content>Body</Content>
      </Page>,
    );
    expect(screen.getByRole('main').className).toBe(
      'p-4 w-full flex flex-col gap-4 animate-fade-in bg-base-200',
    );
  });
});
