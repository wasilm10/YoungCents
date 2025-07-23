import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart'; // adjust the path if needed

const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0"];

const RecentIncomeWithChart = ({ data = [], totalIncome = 0 }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Prepare the chart data
    const preparedData = data.map(item => ({
      name: item.source || 'Unknown',
      amount: item.amount || 0,
    }));
    setChartData(preparedData);
  }, [data]);

  return (
    <div className='card p-4 rounded-lg shadow-md bg-white'>
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-lg font-semibold text-gray-800'>Last 60 Days Income</h5>
      </div>
      <CustomPieChart
        data={chartData}
        label="Income Breakdown"
        totalAmount={`₹${totalIncome}`}
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
