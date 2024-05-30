'use client';

import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import Card from './card';
import { ProductCategory, ProductCategoryColorMap } from '@@/utils/constant';
import { ProductCategoryResponse } from '@@/types/order.types';
import Spinner from './spinner';

type Props = {
  data: ProductCategoryResponse[];
  isSuccess: boolean;
};

const OrdersChart = ({ data, isSuccess }: Props) => {
  const total = data.reduce((acc, { count }) => (acc += count), 0);
  return (
    <div className='col-span-1 h-full'>
      <Card>
        <h4 className='text-grey mb-10'>Orders by categories</h4>
        <div className='h-[20rem] overflow-x-auto'>
          {isSuccess ? (
            <ResponsiveContainer
              minWidth={(data || []).length * 65}
              minHeight={164}
              maxHeight={300}
              width='100%'
              height='100%'
            >
              <PieChart width={730} height={250}>
                <text
                  x={'50%'}
                  y={'38%'}
                  dy={8}
                  textAnchor='middle'
                  fill={'#64748B'}
                >
                  Total
                </text>
                <text
                  x={'50%'}
                  y={'50%'}
                  dy={8}
                  textAnchor='middle'
                  fill={'#64748B'}
                  className='text-3xl font-bold'
                >
                  {total}
                </text>
                <Pie
                  data={data}
                  dataKey='count'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  paddingAngle={2}
                  innerRadius={75}
                  outerRadius={100}
                  fill='#8884d8'
                >
                  {data.map(({ name }, index) => {
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={ProductCategoryColorMap[name]}
                      />
                    );
                  })}
                </Pie>
                <Tooltip />
                <Legend
                  layout='horizontal'
                  align='center'
                  className='text-sm'
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className='flex items-center justify-center h-full'>
              <Spinner />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default OrdersChart;
