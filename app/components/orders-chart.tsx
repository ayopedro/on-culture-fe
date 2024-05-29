'use client';

import { Chart, Tooltip, Legend, ArcElement } from 'chart.js';
import Card from './card';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May'];

export const data = {
  labels,
  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const OrdersChart = () => {
  return (
    <div className='col-span-1 h-full'>
      <Card>
        <h4 className='text-grey mb-10'>Orders by categories</h4>
        <div className='py-3'>
          <Doughnut data={data} options={options} />
        </div>
      </Card>
    </div>
  );
};

export default OrdersChart;
