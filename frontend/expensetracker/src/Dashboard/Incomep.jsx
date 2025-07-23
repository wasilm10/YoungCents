import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/Layouts/DashboardLayout';
import IncomeOverviewp from '../components/Income/IncomeOverview';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';
import Modal from '../components/Layouts/Modal';
import AddIncomeForm from '../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../components/Income/IncomeList';
import DeleteAlert from '../components/Layouts/DeleteAlert';
import { useUserAuth } from '../hooks/useUserAuth';

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Error fetching income data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    // implement this later
    const {source,amount,date,icon}=income;
    //validation checks
    if(!source.trim()){
      toast.error("Source is required");
      return;
    }
    if(!amount ||isNaN(amount)|| Number(amount)<=0){
      toast.error("Amount is Invalid");
      return;
    }
    if(!date){
      toast.error("Date is required");
      return;
    }
    try{
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income Added");
      fetchIncomeDetails();
    }
    catch(error){
      console.error("error adding income:",
      error.response?.data?.message || error.message);
    }
  };

  const deleteIncome = async (id) => {
    // implement this later
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      setOpenDeleteAlert({show:false,data:null});
      toast.success("succesfully deleted !!");
      fetchIncomeDetails();
    }
    catch (error) {
      console.error("Error Deleting income data:", error);
    } 
  };

  const handleDownloadIncome = async () => {
    // implement this later
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto space-y-10 px-4">
        <div className="grid grid-cols-1 gap-6">
          <div className=''>
          <IncomeOverviewp
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />
        </div>
        <IncomeList
          transactions={incomeData}
          onDelete={(id)=>{
            setOpenDeleteAlert({show:true,data:id});
          }}
          onDownload={handleDownloadIncome}/>
      </div>
      <Modal 
       isOpen={openAddIncomeModal}
       onClose={()=>setOpenAddIncomeModal(false)}
       title="Add Income"
       >

        <AddIncomeForm onAddIncome={handleAddIncome}/>
       </Modal>
        <Modal 
       isOpen={openDeleteAlert.show}
       onClose={()=>setOpenDeleteAlert({show:false,data:null})}
       title="Delete Income"
       >
        <DeleteAlert 
          content="Are you sure you want to delete this"
          onDelete={()=>deleteIncome(openDeleteAlert.data)}
          />
       </Modal>
      </div>

    </DashboardLayout>
  );
};

export default Income;
