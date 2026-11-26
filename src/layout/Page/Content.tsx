import type { ReactElement, ReactNode } from 'react';
import { Heading } from '../../typography/Heading';

export type ContentProps = { children: ReactNode | ReactNode[] };
export type TitleProps = { children: string };

export type TitleType = ReactElement<TitleProps>;
export type ContentType = ReactElement<ContentProps>;

export const Title = ({ children }: TitleProps): TitleType => (
  <Heading level={1}>{children}</Heading>
);

export const Content = ({ children }: ContentProps): ContentType => {
  return <>{children}</>;
};
