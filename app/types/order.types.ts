import { ProductCategory } from '../utils/constant';

export type OrdersQueryParamsType = {
  term?: string;
  cursor?: string;
  size?: number;
  direction?: string;
  orderBy?: string;
  period?: string;
  category?: ProductCategory;
};

export type OrdersQueryResponse = {
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
  [key: string]: any;
};

export interface RevenueResponse {
  id?: string;
  date: string;
  price: number;
}

export interface ProductCategoryResponse {
  id?: string;
  name: ProductCategory;
  count: number;
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
  order_number?: string;
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
