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

const data = [
  { name: ProductCategory.COMEDY, value: 400 },
  { name: ProductCategory.DOCUMENTARY, value: 300 },
  { name: ProductCategory.DRAMA, value: 300 },
  { name: ProductCategory.HORROR, value: 200 },
  { name: ProductCategory.SCIFI, value: 500 },
];

const OrdersChart = () => {
  return (
    <div className='col-span-1 h-full'>
      <Card>
        <h4 className='text-grey mb-10'>Orders by categories</h4>
        <div className='h-[20rem]'>
          <ResponsiveContainer
            minWidth={(data || []).length * 65}
            minHeight={164}
            maxHeight={300}
            width='100%'
            height='100%'
          >
            <PieChart width={730} height={250}>
              <text
                x={'35%'}
                y={'40%'}
                dy={8}
                textAnchor='middle'
                fill={'#64748B'}
              >
                Total
              </text>
              <text
                x={'35%'}
                y={'55%'}
                dy={8}
                textAnchor='middle'
                fill={'#64748B'}
                className='text-3xl font-bold'
              >
                0
              </text>
              <Pie
                data={data}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                paddingAngle={2}
                innerRadius={75}
                outerRadius={100}
                fill='#8884d8'
              >
                {data.map(({ name }, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={ProductCategoryColorMap[name]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout='vertical' align='right' />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default OrdersChart;
