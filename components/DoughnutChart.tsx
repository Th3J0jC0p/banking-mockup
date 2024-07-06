"use client";

import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: 'Banks',
        data: [1250, 2500, 2750],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
      }
    ],
    labels: ['Bank 1', 'Bank 2', 'Bank 3']
  };
  return <Doughnut 
    data={data} 
    options={{
      responsive: true,
      cutout: '60%',
      plugins: {
        legend: {
          display: false,
        }
      }
    }}
  />
}

export default DoughnutChart