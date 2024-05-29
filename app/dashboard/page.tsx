import Card from '@@/components/card';
import { DashboardStat } from '@@/components/dashboard-stat';
import OrdersChart from '@@/components/orders-chart';
import OrdersTable from '@@/components/orders-table';
import RevenueChart from '@@/components/revenue-chart';
import { DashboardStats } from '@@/utils/dummy-data';
import moment from 'moment';

const DashboardPage = () => {
  return (
    <div className='p-5'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='text-3xl font-bold'>Welcome, Matthew</h2>
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
                amount={stat.amount}
                diff={stat.diff}
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
