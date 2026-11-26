import type { Key, ReactNode } from 'react';
import { joinClassNames } from '../internal/classNames';
import { Table, type TableProps } from './Table';

export interface DataTableColumn<T> {
  /** Property read from each row. Omit it for computed columns and give `id` and `render` instead. */
  key?: keyof T & string;
  /** Identifies a column without `key`. */
  id?: string;
  /** Header content. Defaults to the humanised `key`. */
  header?: ReactNode;
  /** `number` right-aligns the column with tabular, non-wrapping figures. */
  kind?: 'text' | 'number';
  /** Formats the raw property value. */
  format?: (value: T[keyof T], row: T) => ReactNode;
  /** Renders the whole cell content from the row; wins over `format`. */
  render?: (row: T) => ReactNode;
  className?: string;
  /** Hides the header visually but keeps it for screen readers, for action columns. */
  srOnlyHeader?: boolean;
  hidden?: boolean;
}

export interface DataTableProps<T extends object> extends Omit<TableProps, 'children'> {
  rows: readonly T[];
  /** One column per property of the first row when omitted. */
  columns?: ReadonlyArray<DataTableColumn<T>>;
  /** Defaults to `row.id`, then the row index. */
  getRowKey?: (row: T, index: number) => Key;
  /** Rendered instead of the table when there are no rows. */
  empty?: ReactNode;
}

const NUMBER_CELL = 'whitespace-nowrap text-right tabular-nums';

const humanise = (key: string) =>
  key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .toLowerCase()
    .replace(/^./, (first) => first.toUpperCase());

const columnId = <T,>(column: DataTableColumn<T>, index: number) =>
  column.id ?? column.key ?? String(index);

function inferColumns<T extends object>(rows: readonly T[]): Array<DataTableColumn<T>> {
  return rows[0] ? (Object.keys(rows[0]) as Array<keyof T & string>).map((key) => ({ key })) : [];
}

function cellContent<T extends object>(column: DataTableColumn<T>, row: T): ReactNode {
  if (column.render) {
    return column.render(row);
  }
  if (!column.key) {
    return null;
  }
  const value = row[column.key];
  if (column.format) {
    return column.format(value, row);
  }
  return value === null || value === undefined ? '' : String(value);
}

/** Table driven by plain objects: pass `rows` and optional `columns`, not markup. */
export function DataTable<T extends object>({
  rows,
  columns,
  getRowKey = (row, index) => (row as { id?: Key }).id ?? index,
  empty,
  ...tableProps
}: DataTableProps<T>) {
  if (rows.length === 0 && empty !== undefined) {
    return <>{empty}</>;
  }

  const visible = (columns ?? inferColumns(rows)).filter((column) => !column.hidden);

  return (
    <Table {...tableProps}>
      <thead>
        <tr>
          {visible.map((column, index) => (
            <th
              key={columnId(column, index)}
              className={joinClassNames(
                column.kind === 'number' ? 'text-right' : undefined,
                column.className,
              )}
            >
              {column.srOnlyHeader ? (
                <span className="sr-only">{column.header}</span>
              ) : (
                (column.header ?? (column.key ? humanise(column.key) : null))
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={getRowKey(row, rowIndex)}>
            {visible.map((column, index) => (
              <td
                key={columnId(column, index)}
                className={joinClassNames(
                  column.kind === 'number' ? NUMBER_CELL : undefined,
                  column.className,
                )}
              >
                {cellContent(column, row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
