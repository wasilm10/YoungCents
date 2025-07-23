import React, { useEffect, useState } from 'react';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomIncomeBarChart from '../Charts/CustomIncomeBarChart';


const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <div>
          <h5 className="text-xl font-semibold">Income Overview</h5>
          <p className="text-sm text-gray-500">Track your earnings</p>
        </div>

        <button
          className="add-btn w-fit"
          onClick={onAddIncome}
        >
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      <div className="mt-10">
        <CustomIncomeBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
