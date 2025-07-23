// pages/Expense.jsx

import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/Layouts/DashboardLayout';
import ExpenseOverviewp from '../components/Expense/ExpenseOverview';
import ExpenseList from '../components/Expense/ExpenseList';
import Modal from '../components/Layouts/Modal';
import DeleteAlert from '../components/Layouts/DeleteAlert';
import AddExpenseForm from '../components/Expense/AddExpenseForm';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';
import toast from 'react-hot-toast';
import { useUserAuth } from '../hooks/useUserAuth';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      setExpenseData(res.data || []);
    } catch (error) {
      console.error("Error fetching expense data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Category is required");
      return;
    }

    if (!amount || isNaN(amount) || +amount <= 0) {
      toast.error("Amount must be a positive number");
      return;
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category, amount, date, icon,
      });
      toast.success("Expense added successfully");
      fetchExpenseDetails();
      setOpenAddModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      toast.success("Expense deleted");
      setOpenDeleteAlert({ show: false, data: null });
      fetchExpenseDetails();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto space-y-10 px-4">
        <ExpenseOverviewp
          transactions={expenseData}
          onAddExpense={() => setOpenAddModal(true)}
        />
        <ExpenseList
          transactions={expenseData}
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          onDownload={() => {}} // optional
        />
      </div>

      <Modal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        title="Add Expense"
      >
        <AddExpenseForm onAddExpense={handleAddExpense} />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Expense"
      >
        <DeleteAlert
          content="Are you sure you want to delete this expense?"
          onDelete={() => deleteExpense(openDeleteAlert.data)}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Expense;
