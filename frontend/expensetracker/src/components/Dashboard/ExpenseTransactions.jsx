import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {/* Transaction List */}
      <div className="mt-6">
        {transactions?.length === 0 ? (
          <p className="text-gray-400 text-sm">No expense records found</p>
        ) : (
          transactions.slice(0, 5).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category} // ← fixed typo here
              icon={expense.icon}
              date={moment(expense.date).format('Do MMM YYYY')}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
