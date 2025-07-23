import React from 'react';
import { LuDownload } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-lg font-semibold'>Income Timeline</h5>
        <button className='card-btn flex items-center gap-2 text-sm px-3 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700' onClick={onDownload}>
          <LuDownload className='text-base' /> Download
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {transactions && transactions.length > 0 ? (
          transactions.map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income._id)}
            />
          ))
        ) : (
          <p className='text-gray-500 text-sm'>No income records found.</p>
        )}
      </div>
    </div>
  );
};

export default IncomeList;
