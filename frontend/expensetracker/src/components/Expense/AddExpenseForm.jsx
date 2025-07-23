// components/Expense/AddExpenseForm.jsx

import React, { useState } from 'react';
import Input from '../Inputs/Input';
import Emojipick from '../Layouts/Emojipick';

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    date: '',
    icon: '',
  });

  const handleChange = (key, value) =>
    setExpense((prev) => ({ ...prev, [key]: value }));

  return (
    <div>
      <Emojipick
        icon={expense.icon}
        onSelect={(icon) => handleChange('icon', icon)}
      />
      <Input
        label="Category"
        value={expense.category}
        onChange={({ target }) => handleChange('category', target.value)}
        placeholder="e.g. Rent, Food, Bills"
        type="text"
      />
      <Input
        label="Amount"
        value={expense.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        type="number"
        placeholder="e.g. 3500"
      />
      <Input
        label="Date"
        value={expense.date}
        onChange={({ target }) => handleChange('date', target.value)}
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
