import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart'; // make sure the path is correct

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expense", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className='card p-4 rounded-lg shadow-md'>
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-lg font-bold'>Finance Overview</h5>
      </div>
      <CustomPieChart
        data={balanceData}
        label="Your Finance Summary"
        totalAmount={`₹${totalBalance}`}
        colors={COLORS}
      />
    </div>
  );
};

export default FinanceOverview;
