import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../axios';
import { URLS } from '../urls';
import { OrderType } from '@@/types/order.types';

const createOrder = async (data: OrderType) => {
  const res = await axios.post(URLS.orders, data);
  return res.data;
};

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createOrders'],
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getOrders', 'getOrdersSummary'],
      });
    },
  });
};

export const useValidateBulkUploadOrdersMutation = () => {
  return useMutation({
    mutationKey: ['validateBulkUploadOrders'],
    mutationFn: async (data: any) => {
      const res = await axios.post(URLS.validateBulkOrders, data);
      return res;
    },
  });
};

export const useBulkUploadOrdersMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['bulkUploadOrders'],
    mutationFn: async (data: any) => {
      const res = await axios.post(URLS.createBulkOrder, data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getOrders'] });
    },
  });
};
