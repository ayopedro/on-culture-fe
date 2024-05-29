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

export interface OrdersQueryResponse {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
  };
  date: string;
}

export interface OrderSummaryResponse {
  totalRevenue: Record<string, any> | number;
  totalOrders: Record<string, any> | number;
  uniqueCustomers: Record<string, any> | number;
}

export interface TableProps {
  id: string;
  customer: {
    id?: string;
    name: string;
    email: string;
  };
  date: string;
  product: {
    id?: string;
    name: string;
    category: string | ProductCategory;
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
  product_category: string;
  price: string;
};
