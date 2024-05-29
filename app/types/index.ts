export interface Item {
  id: string;
}

export interface BaseParams {
  page?: number;
  cursor?: string;
  direction?: string;
  term?: string;
  paginationType?: string;
}

export interface ListProps {
  id: number;
  name: string;
  description: string;
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export type PageEdge<T> = {
  cursor: string;
  node: T;
};

export type CursorType = { cursor: string; isCurrent: boolean; page: number };

export type PageCursors = {
  around: CursorType[];
  next: CursorType;
  previous: CursorType;
};

export type DataType<T> = {
  map(
    arg0: (item: { date: string; price: number }) => {
      date: string;
      price: number;
    }
  ): import('./order.types').RevenueResponse[];
  length: number;
  pageCursors: PageCursors;
  pageEdges: PageEdge<T>[];
  totalCount: number;
  uniquePatients?: any;
};

export type QueryParamsType = {
  term?: string;
  status?: boolean;
  size?: number;
  direction?: string;
  memberNo?: string | number;
  cursor?: string;
  mode?: string;
  startDate?: string;
  endDate?: string;
  orderBy?: string;
  departmentId?: string;
  [key: string]: any;
};

export interface LoadOptionsProps<Params, T> {
  url: string;
  params: Params;
  cursorBased?: boolean;
  labelOrLabelPath: string | ((item: T) => string);
  valueOrValuePath: string | ((item: T) => string);
}

export enum Period {
  THIS_YEAR = 'P12M',
  THIS_MONTH = 'P30D',
  LAST_YEAR = 'P1Y',
  LAST_MONTH = 'P1M',
  TWO_YEARS = 'P2Y',
  THREE_YEARS = 'P3Y',
}
