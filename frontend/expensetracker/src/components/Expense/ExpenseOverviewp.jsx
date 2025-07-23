// components/Expense/ExpenseOverview.jsx

import React, { useEffect, useState } from 'react';
import { prepareIncomeBarChartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomIncomeBarChart from '../Charts/CustomIncomeBarChart';

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const formatted = prepareIncomeBarChartData(transactions); // If you want to prepare new one: create prepareExpenseBarChartData()
    setChartData(formatted);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-xl font-semibold">Expense Overview</h5>
          <p className="text-sm text-gray-500">Track your spending over time</p>
        </div>
       
      </div>

      <div className="mt-10">
        <CustomIncomeBarChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
