import { Page as PageComponent } from './Page';
import { Content, Title } from './Content';

/**
 * Page shell: a `main` element with a `Page.Title` heading and a `Page.Content` body, in that order.
 *
 * @example
 * ```tsx
 * <Page>
 *   <Page.Title>Invoices</Page.Title>
 *   <Page.Content>
 *     <InvoiceList />
 *   </Page.Content>
 * </Page>
 * ```
 */
export const Page = Object.assign(PageComponent, {
  Title,
  Content,
});
