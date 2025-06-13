import React from 'react'
import Navbar from '../../components/layouts/Navbar'
import { recentTransactions } from '../../utils/financeData'
import { useNavigate } from 'react-router-dom'
import { incomeData } from '../../utils/financeData'
import { expenseData } from '../../utils/financeData'
import RecentTransactions from '../../components/Dashboard/RecentTransactions'
import FinanceOverview from '../../components/Dashboard/FinanceOverview'
import InfoCard from '../../components/Cards/InfoCard'
import {IoMdCard} from "react-icons/io"
import { LuHandCoins, LuWalletMinimal} from 'react-icons/lu';
import { addThousandsSeparator } from '../../utils/helper'
import IncomeOverview from '../../components/Income/IncomeOverview'
import IncomeList from '../../components/Income/IncomeList'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import ExpenseList from '../../components/Expense/ExpenseList'
const HomePage = () => {
    const Tb = 16000;
    const Ti = 40500;
    const Te = 24500;
    console.log(recentTransactions)
    const navigate = useNavigate();
  return (
    <div>
        <div className='flex justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 '>
            <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
            <div className='flex gap-5 mr-4'>
                <button className='font-medium text-white bg-violet-500 shadow-lg shadow-purple-600/5 p-[10px] rounded-md my-1 hover:bg-purple-600/15 hover:text-purple-600'
                onClick={()=> navigate('/login')}>Login</button>
                <button className='font-medium text-white bg-violet-500 shadow-lg shadow-purple-600/5 p-[10px] rounded-md my-1 hover:bg-purple-600/15 hover:text-purple-600'
                onClick={()=> navigate('/register')}>Register</button>
            </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 p-5'>
            <div className='flex flex-col justify-center ml-5'>
                <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4'>Track your expenses effortlessly.</h1>
                <p className='text-md lg:text-lg mb-4'>Visualize. Monitor. Grow.</p>
                <button className='w-[180px] font-medium text-white bg-violet-500 shadow-lg shadow-purple-600/5 p-[10px] rounded-md my-1 hover:bg-purple-600/15 hover:text-purple-600'
                onClick={()=> navigate('/register')}>Get Started</button>
            </div>
            <div>
                <RecentTransactions
                transactions = {recentTransactions}
                onSeeMore={() => {}}
                show={false} />
            </div>
             <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <InfoCard
                icon={<IoMdCard />}
                label="Total Balance"
                value = {addThousandsSeparator(16000)}
                color = "bg-primary"/>
                <InfoCard
                icon={<LuWalletMinimal />}
                label="Total Income"
                value = {addThousandsSeparator(40500)}
                color = "bg-orange-500"/>
                <InfoCard
                icon={<LuHandCoins />}
                label="Total Expense"
                value = {addThousandsSeparator(24500)}
                color = "bg-red-500"/>
            </div>
            <div>
                <FinanceOverview
                totalBalance={Tb}
                totalIncome={Ti}
                totalExpense={Te} />
            </div>
            <div>
                <IncomeOverview
                transactions={incomeData}
                onAddIncome={() => {}}
                show={false} />
            </div>
            <div>
                <IncomeList
                transactions={incomeData}
                onDelete={() => {}}
                show={false} />
            </div>
            <div>
                <ExpenseOverview
                transactions={expenseData}
                onAddExpense={()=>{}}
                show={false} />
            </div>
            <div>
                <ExpenseList
                transactions={expenseData}
                onDelete={()=>{}}
                show={false} />
            </div>
        </div>
    </div>
  )
}

export default HomePage