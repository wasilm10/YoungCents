import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.label), // e.g. ['Jan', 'Feb']
    datasets: [
      {
        label: 'Expenses',
        data: data.map(item => item.value),
        borderColor: 'rgb(239,68,68)', // Tailwind red-500
        backgroundColor: 'rgba(239,68,68,0.2)',
        tension: 0.4,
        pointRadius: 4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: { title: { display: true, text: 'Month' } },
      y: { title: { display: true, text: 'Amount (₹)' } },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;
