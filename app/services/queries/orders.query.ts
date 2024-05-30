import { OrdersQueryParamsType } from '@@/types/order.types';
import { URLS } from '../urls';
import axios from '../axios';
import { useQuery } from '@tanstack/react-query';
import { DataType } from '@@/types';

export const useGetOrders = <T>(ordersQueryParams?: OrdersQueryParamsType) =>
  useQuery({
    queryKey: ['getOrders', ordersQueryParams],
    queryFn: async () => {
      const { data } = await axios.get(URLS.orders, {
        params: {
          term: ordersQueryParams?.term || null,
          direction: ordersQueryParams?.direction || 'desc',
          cursor: ordersQueryParams?.cursor,
          size: ordersQueryParams?.size || 10,
          orderBy: ordersQueryParams?.orderBy,
          period: ordersQueryParams?.period,
        },
      });
      return data.data as DataType<T>;
    },
  });

export const useGetOrdersSummary = <T>(
  ordersQueryParams?: OrdersQueryParamsType
) =>
  useQuery({
    queryKey: ['getOrdersSummary', ordersQueryParams],
    queryFn: async () => {
      const { data } = await axios.get(URLS.getOrdersSummary, {
        params: {
          term: ordersQueryParams?.term || null,
          direction: ordersQueryParams?.direction || 'desc',
          cursor: ordersQueryParams?.cursor,
          size: ordersQueryParams?.size || 10,
          orderBy: ordersQueryParams?.orderBy,
          period: ordersQueryParams?.period,
        },
      });
      return data.data as DataType<T>;
    },
  });

export const useGetRevenueValues = <T>(
  ordersQueryParams?: OrdersQueryParamsType
) =>
  useQuery({
    queryKey: ['getRevenue', ordersQueryParams],
    queryFn: async () => {
      const { data } = await axios.get(URLS.getRevenueValues, {
        params: {
          term: ordersQueryParams?.term || null,
          direction: ordersQueryParams?.direction || 'desc',
          cursor: ordersQueryParams?.cursor,
          size: ordersQueryParams?.size || 10,
          orderBy: ordersQueryParams?.orderBy,
          period: ordersQueryParams?.period,
        },
      });
      return data.data as DataType<T>;
    },
  });

export const useGetOrderCategoryValues = <T>(
  ordersQueryParams?: OrdersQueryParamsType
) =>
  useQuery({
    queryKey: ['getOrderCategories', ordersQueryParams],
    queryFn: async () => {
      const { data } = await axios.get(URLS.getOrderCategories, {
        params: {
          term: ordersQueryParams?.term || null,
          direction: ordersQueryParams?.direction || 'desc',
          cursor: ordersQueryParams?.cursor,
          size: ordersQueryParams?.size || 10,
          orderBy: ordersQueryParams?.orderBy,
          period: ordersQueryParams?.period,
        },
      });
      return data.data as DataType<T>;
    },
  });
