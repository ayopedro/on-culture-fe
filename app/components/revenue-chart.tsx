'use client';

import { DataType } from '@@/types';
import { RevenueResponse } from '@@/types/order.types';
import Card from './card';
import {
  ResponsiveContainer,
  XAxis,
  Tooltip,
  AreaChart,
  Area,
  YAxis,
} from 'recharts';
import Spinner from './spinner';
import moment from 'moment';
import { MdDataObject } from 'react-icons/md';

type Props = {
  data: DataType<RevenueResponse> | undefined;
  isSuccess: boolean;
};

const RevenueChart = ({ data, isSuccess }: Props) => {
  let reformedRevenueData: RevenueResponse[] = [];

  if (isSuccess) {
    reformedRevenueData = (data || []).map(
      (item: { date: string; price: number }) => {
        return {
          date: moment(item.date).format('MMM YYYY'),
          price: item.price,
        };
      }
    );
  }

  return (
    <div className='col-span-2 h-full'>
      <Card>
        <h4 className='text-grey mb-10'>Revenue over time</h4>
        <div className='h-[20rem]'>
          {isSuccess ? (
            <ResponsiveContainer
              minWidth={(data || []).length * 65}
              minHeight={164}
              maxHeight={275}
              width='100%'
              height='100%'
            >
              {reformedRevenueData.length ? (
                <AreaChart
                  width={420}
                  height={300}
                  data={reformedRevenueData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis
                    dataKey='date'
                    style={{
                      fontSize: '12px',
                      lineHeight: '12px',
                      color: '#898989',
                      fontFamily: 'Inter',
                      marginTop: '30px',
                    }}
                  />
                  <YAxis
                    dataKey='price'
                    style={{
                      fontSize: '12px',
                      lineHeight: '12px',
                      color: '#898989',
                      fontFamily: 'Inter',
                      marginTop: '30px',
                    }}
                  />
                  <Tooltip />
                  <Area
                    type='monotone'
                    dataKey='price'
                    stroke={'#2563EB'}
                    activeDot={{ r: 8 }}
                    fill={'#F8FAFC'}
                  />
                </AreaChart>
              ) : (
                <div className='flex flex-col items-center justify-center h-full'>
                  <MdDataObject className='text-grey text-4xl' />
                  <p className='text-grey'>No data</p>
                </div>
              )}
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

export default RevenueChart;
