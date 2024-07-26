"use client";

import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const banks = accounts.map((account) => account.subtype);
  const balance = accounts.map((account) => account.currentBalance);
  const labels = accounts.map((account) => account.name);
  const data = {
    datasets: [
      {
        label: banks,
        data: balance,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
      }
    ],
    labels: labels
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