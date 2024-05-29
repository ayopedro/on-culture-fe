'use client';

import Card from './card';
import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  PointElement,
  Tooltip,
  LineElement,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
  },
};
const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const data = {
  labels,
  datasets: [
    {
      labels: '',
      data: [299, 399, 340, 590, 930, 180, 490, 580, 850, 300, 750, 1240],
      borderColor: '#2563EB',
      borderWidth: 1,
      background: 'linear-gradient(#F8FAFC 0%, #F8FAFC 12%)',
      fill: true,
      radius: 0,
      lineTension: 0.4,
    },
  ],
};

const RevenueChart = () => {
  return (
    <div className='col-span-2 h-full'>
      <Card>
        <h4 className='text-grey mb-10'>Revenue over time</h4>
        <div>
          <Line data={data} options={options} />
        </div>
      </Card>
    </div>
  );
};

export default RevenueChart;
