import React from 'react';
import { LuTrash2, LuTrendingDown, LuTrendingUp, LuUtensils } from 'react-icons/lu';

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete
}) => {
  return (
    <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60'>
      <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
        {icon ? (
          typeof icon === 'string' ? (
            <img src={icon} alt={title} className="w-6 h-6" />
          ) : (
            icon
          )
        ) : (
          <LuUtensils/>
        )}
      </div>

      <div className='flex-1 flex items-center justify-between'>
        <div>
          <p className='text-sm text-gray-700 font-medium'>{title}</p>
          <p className='text-xs text-gray-400 mt-1'>{date}</p>
        </div>

        <div className='flex items-center gap-2'>
          {!hideDeleteBtn && (
            <button
              className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100'
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div className={'flex items-center gap-2 px-3 py-1.5 rounded-md'}>
            <h6 className={type === 'income' ? 'text-green-600' : 'text-red-500'}>
              {type === 'income' ? '+' : '-'}${amount}
            </h6>
            {type === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
