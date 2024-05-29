'use client';

import Card from '@@/components/card';
import { DashboardStat } from '@@/components/dashboard-stat';
import OrdersChart from '@@/components/orders-chart';
import OrdersTable from '@@/components/orders-table';
import RevenueChart from '@@/components/revenue-chart';
import { useGetOrdersSummary } from '@@/services/queries/orders.query';
import { useAppSelector } from '@@/services/redux/hooks';
import { user } from '@@/services/redux/selectors/auth.selector';
import { SortDirection } from '@@/types';
import { OrderSummaryResponse } from '@@/types/order.types';
import { DashboardStats } from '@@/utils/dummy-data';
import moment from 'moment';
import { useState } from 'react';

const DashboardPage = () => {
  const [filters, setFilters] = useState<any>({});

  const {
    data = {},
    isLoading,
    isSuccess,
  } = useGetOrdersSummary<OrderSummaryResponse>({
    ...{ ...filters, direction: SortDirection.DESC },
  });
  console.log('🚀 ~ DashboardPage ~ data:', data);

  const user_details = useAppSelector(user);

  return (
    <div className='p-5'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='text-3xl font-bold'>
            Welcome, {user_details?.firstName}
          </h2>
          <p className='text-grey mt-1'>
            {moment().format('dddd, DD MMM YYYY')}
          </p>
        </div>
        <select
          name='dateFilter'
          className='border border-slate-400 bg-transparent rounded-md p-2 outline-none text-grey font-medium'
        >
          <option value=''>This Year</option>
        </select>
      </div>
      <section className='my-12'>
        <Card>
          <div className='grid grid-cols-3 divide-x-2'>
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

      <section className='grid grid-cols-3 gap-5 my-12'>
        <RevenueChart />
        <OrdersChart />
      </section>

      <section>
        <OrdersTable />
      </section>
    </div>
  );
};

export default DashboardPage;
