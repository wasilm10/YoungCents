// components/Expense/ExpenseList.jsx

import React from 'react';
import moment from 'moment';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Expense Timeline</h5>
        <button
          className="card-btn flex items-center gap-2 text-sm px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={onDownload}
        >
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactions && transactions.length > 0 ? (
          transactions.map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense._id)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No expense records found.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
