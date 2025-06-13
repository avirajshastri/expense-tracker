import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import Model from '../../components/Model'
import AddIncomeForm from '../../components/Income/AddIncomeForm.jsx'
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList.jsx'
import DeleteAlert from '../../components/DeleteAlert.jsx'
import { useUserAuth } from '../../hooks/useUserAuth';

const Income = () => {

  useUserAuth();
  const [incomeData,setIncomeData] = useState([])
  const [loading,setLoading] = useState(false)
  const [openDeleteAlert,setOpenDeleteAlert] = useState({
    show:false,
    data:null,
  })

  const [openAddIncomeModel,setOpenAddIncomeModel] = useState(false)

  //get income details
  const fetchIncomeDetails = async () =>{
    if(loading) return 

    setLoading(true)

    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`)

      if(response.data){
        setIncomeData(response.data)
      }
    } catch (error) {
      console.log("Error in getting all income",error)
    }finally{
      setLoading(false)
    }
  }

  //handle add income
  const handleAddIncome = async (income) =>{
    const {source, amount, date,icon} = income;

    //validation
    if(!source.trim()){
      toast.error("Source is required")
      return 
    }

    if(!amount || isNaN(amount) || Number(amount) <=0){
      toast.error("Amount should be a positive number")
      return ;
    }

    if(!date){
      toast.error("Date is required")
      return ;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      })

      setOpenAddIncomeModel(false)
      toast.success("Income added successfully")
      fetchIncomeDetails();
    } catch (error) {
      console.log("Unable to add income",error.response?.data?.message || error.message)
    }
  }

  //delete income

  const deleteIncome = async (id) =>{
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

      setOpenDeleteAlert({show:false, data:null})
      toast.success("Income deleted successfully")
      fetchIncomeDetails();
    } catch (error) {
      console.log("Unable to delete item",error.response?.data?.message || error.message)
    }
  }

  //handle download income details

  const handleDownloadIncomeDetails = async ()=> {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME,{
        responseType: 'blob',
      });

      // create a url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a");
      link.href=url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)

    } catch (error) {
      console.log("Unable to download income report",error)
      toast.error("Failed to download income report. Please try again")
    }
  }

  useEffect(()=>{
    fetchIncomeDetails();
    return ()=>{}
  },[])
  return (
    <DashboardLayout activeMenu="Income">
    {/* {console.log("hit")}; */}
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
            transactions ={incomeData}
            onAddIncome={()=> setOpenAddIncomeModel(true)}
            show={true} />
          </div>

          <IncomeList
          transactions= {incomeData}
          onDelete={(id) => {
            setOpenDeleteAlert({show:true,data:id });
          }}
          onDownload = {handleDownloadIncomeDetails}
          show={true} />
        </div>

        <Model 
        isOpen={openAddIncomeModel}
        onClose={()=> setOpenAddIncomeModel(false)}
        title = "Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Model>

        <Model 
        isOpen={openDeleteAlert.show}
        onClose={()=> setOpenDeleteAlert({show:false, data:null})}
        title='Delete Income'  
        >
          <DeleteAlert 
          content="Are you sure you want to delete this income item?"
          onDelete={()=> deleteIncome(openDeleteAlert.data)} />
        </Model>
      </div>
    </DashboardLayout>
  )
}

export default Income