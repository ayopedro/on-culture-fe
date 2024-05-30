'use client';

import Card from '@@/components/card';
import { DashboardStat } from '@@/components/dashboard-stat';
import OrdersChart from '@@/components/orders-chart';
import OrdersTable from '@@/components/orders-table';
import RevenueChart from '@@/components/revenue-chart';
import {
  useGetOrderCategoryValues,
  useGetOrders,
  useGetOrdersSummary,
  useGetRevenueValues,
} from '@@/services/queries/orders.query';
import { useAppSelector } from '@@/services/redux/hooks';
import { user } from '@@/services/redux/selectors/auth.selector';
import { SortDirection } from '@@/types';
import {
  OrderSummaryResponse,
  OrdersQueryResponse,
  ProductCategoryResponse,
  RevenueResponse,
} from '@@/types/order.types';
import { DateFilter } from '@@/utils/constant';
import { DashboardStats } from '@@/utils/dummy-data';
import moment from 'moment';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const DashboardPage = () => {
  const searchParams = useSearchParams();
  const year = searchParams.get('year');

  const router = useRouter();
  const [count, setCount] = useState<number>(0);
  const [selectedPageSize, setSelectedPageSize] = useState<number>(10);
  const [filters, setFilters] = useState<any>({});
  const [debouncedTerm] = useDebounce(filters.term, 500);

  // order summary
  const { data = {} } = useGetOrdersSummary<OrderSummaryResponse>({
    ...{ ...filters, direction: SortDirection.DESC },
  });

  // orders
  const { data: orderData, isSuccess: orderSuccess } =
    useGetOrders<OrdersQueryResponse>({
      ...(debouncedTerm && { term: debouncedTerm }),
      ...{
        ...filters,
        size: selectedPageSize,
        direction: SortDirection.DESC,
      },
    });

  // revenue
  const { data: revenueData = [], isSuccess } =
    useGetRevenueValues<RevenueResponse>({
      ...{
        ...filters,
        direction: SortDirection.ASC,
      },
    });

  // order-categories-chart
  const { data: orderCategoriesData = [], isSuccess: orderCategoriesSuccess } =
    useGetOrderCategoryValues<ProductCategoryResponse>({
      ...{
        ...filters,
        direction: SortDirection.ASC,
      },
    });

  const user_details = useAppSelector(user);

  const handleDateFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const query = e.target.value ? `?year=${e.target.value}` : '';
    router.push(`/dashboard/${query}`);
  };

  useEffect(() => {
    setFilters((prev: any) => ({ ...prev, period: year }));
  }, [year]);

  return (
    <div className='p-3 md:p-5'>
      <div className='flex flex-col-reverse md:flex-row md:justify-between items-start md:items-center gap-10'>
        <div>
          <h2 className='text-xl md:text-3xl font-medium md:font-bold'>
            Welcome, {user_details?.firstName}
          </h2>
          <p className='text-grey mt-1 text-sm md:text-base'>
            {moment().format('dddd, DD MMM YYYY')}
          </p>
        </div>
        <select
          name='dateFilter'
          className='dashboard-date-filter-select'
          onChange={handleDateFilter}
          defaultValue={year || ''}
        >
          {DateFilter.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>
      <section className='my-12'>
        <Card>
          <div className='dashboard-cards'>
            {DashboardStats.map((stat) => (
              <DashboardStat
                key={stat.id}
                title={stat.title}
                data={data}
                uKey={stat.key}
              />
            ))}
          </div>
        </Card>
      </section>

      <section className='flex flex-col md:grid md:grid-cols-3 gap-5 my-12'>
        <RevenueChart
          data={revenueData as unknown as RevenueResponse[]}
          isSuccess={isSuccess}
        />
        <OrdersChart
          data={orderCategoriesData as unknown as ProductCategoryResponse[]}
          isSuccess={orderCategoriesSuccess}
        />
      </section>

      <section>
        <OrdersTable
          count={count}
          selectedPageSize={selectedPageSize}
          setCount={setCount}
          setSelectedPageSize={setSelectedPageSize}
          setFilters={setFilters}
          data={orderData}
          isLoading={!orderSuccess}
        />
      </section>
    </div>
  );
};

export default DashboardPage;
