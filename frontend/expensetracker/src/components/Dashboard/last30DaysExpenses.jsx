import React, { useEffect, useState } from 'react';
import { prepareExpenseBarChart } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChart(data);
    setChartData(result);
  }, [data]);

  return (
    <div className='card col-span-1 p-4 bg-white rounded-lg shadow-md'>
      <div className='flex items-center justify-between mb-2'>
        <h5 className='text-lg font-semibold text-gray-800'>Last 30 Days Expenses</h5>
      </div>
      <CustomBarChart data={chartData} />
    </div>
  );
};

export default Last30DaysExpenses;
