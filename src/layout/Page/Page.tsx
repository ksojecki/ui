import { joinClassNames } from '../../internal/classNames';
import type { ContentType, TitleType } from './Content';

export interface PageProps {
  children: [TitleType, ContentType];
  className?: string;
}

export const Page = ({ children, className }: PageProps) => {
  const [title, content] = children;
  return (
    <main className={joinClassNames('p-4 w-full flex flex-col gap-4 animate-fade-in', className)}>
      {title}
      {content}
    </main>
  );
};
