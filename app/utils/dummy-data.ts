import { ProductCategory } from './constant';

export const DashboardStats = [
  {
    id: 1,
    title: 'Total Revenue',
    amount: 40000,
    diff: 59,
  },
  {
    id: 2,
    title: 'Orders',
    amount: 40000,
    diff: -9,
  },
  {
    id: 3,
    title: 'Customers',
    amount: 40,
    diff: -59,
  },
];

export const OrdersData = [
  {
    id: '1',
    customer: {
      name: 'Christine Hain',
    },
    product: {
      name: 'Head On',
      category: ProductCategory.Drama,
      price: 399,
    },
    date: '03/02/2020',
  },
  {
    id: '2',
    customer: {
      name: 'Mathe Struijs',
    },
    product: {
      name: 'House',
      category: ProductCategory.Documentary,
      price: 2999,
    },
    date: '04/05/2020',
  },
  {
    id: '3',
    customer: {
      name: 'Ceil Tharme',
    },
    product: {
      name: 'The Losers',
      category: ProductCategory.Comedy,
      price: 2699,
    },
    date: '05/05/2020',
  },
];
