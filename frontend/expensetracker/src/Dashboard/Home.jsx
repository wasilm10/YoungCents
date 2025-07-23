import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/Layouts/DashboardLayout';
import { useUserAuth } from '../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';
import { LuWalletMinimal, LuHandCoins } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io';
import { addThousandSeparator } from '../utils/helper';
import InfoCard from '../components/Cards/InfoCard';
import RecentTransactions from '../components/Dashboard/RecentTransactions';
import FinanceOverview from '../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../components/Dashboard/last30DaysExpenses';
import RecentIncomeWithChart from '../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../components/Dashboard/RecentIncome';
import HomeBtn from '../components/Button/HomeBtn';


const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (

    
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto space-y-10">
          <div className="flex justify-start mb-4">
  <HomeBtn />
</div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandSeparator(dashboardData?.totalIncome || 0)}
            color="bg-green-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expenses"
            value={addThousandSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>

        {/* Transactions & Finance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions || []}
            onSeeMore={() => navigate("/dashboard/transactions")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />
        </div>

        {/* Expenses & Income Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions.slice(0, 4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />
        </div>

        {/* Recent Income List */}
        <RecentIncome
          transactions={dashboardData?.last60DaysIncome?.transactions || []}
          onSeeMore={() => navigate("/income")}
        />

        {/* Expense Transactions List */}
        <ExpenseTransactions
          transactions={dashboardData?.last30DaysExpenses?.transactions || []}
          onSeeMore={() => navigate("/expense")}
        />
      

      </div>
    </DashboardLayout>
   
    
  );
};

export default Home;
