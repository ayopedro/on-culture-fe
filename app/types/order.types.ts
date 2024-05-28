import { ProductCategory } from '../utils/constant';

export type OrdersQueryParamsType = {
  term?: string;
  cursor?: string;
  size?: number;
  direction?: string;
  orderBy?: string;
  period?: string; //come back to this
  category?: ProductCategory;
};

export interface TableProps {
  id: string;
  contact: {
    id: string;
    name: string;
  };
  date: string;
  product: {
    id: string;
    name: string;
    category: ProductCategory;
    price: number;
  };
}

export type ImportType = {
  customer_name: string;
  email: string;
  product_name: string;
  product_category: string;
  price: number;
  order_date: string;
  reason?: string;
};

export type ServerData = {
  validRecordCount: number;
  invalidRecordCount: number;
  invalidRecords: ImportType[];
  validRecords: {
    orders: ImportType[];
  };
};

export type OrderType = {
  customer_name: string;
  email: string;
  order_date: string;
  product_name: string;
  product_category: ProductCategory;
  price: number;
};
