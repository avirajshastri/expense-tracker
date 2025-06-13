import React, { useState } from 'react'
import EmojiPickerPopup from '../EmojiPickerPopup'

const AddIncomeForm = ({onAddIncome}) => {
    const [income, setIncome] = useState({
        source:"",
        amount:"",
        date:"",
        icon:"",
    })

    const handleChange = (key,value) =>{
        setIncome({...income, [key]:value});
    }
  return (
    <div>

        <EmojiPickerPopup
        icon={income.icon}
        onSelect = {(selectedIcon) => handleChange("icon",selectedIcon)} />
        <div>
            <label className='text-[13px] text-slate-800'>Income Source</label>
            <div className='w-full flex justify-between gap-3 text-sm text-black bg-slate-100 rounded px-4 py-3 mb-4 mt-3 border border-slate-200 outline-none'>
            <input
            type='text'
            className='w-full bg-transparent outline-none'
            value = {income.source}
            onChange={({target}) => handleChange("source",target.value)}
            placeholder='Freelance, Salary etc.'
            />
            </div>
        </div>

        <div>
            <label className='text-[13px] text-slate-800'>Amount</label>
            <div className='w-full flex justify-between gap-3 text-sm text-black bg-slate-100 rounded px-4 py-3 mb-4 mt-3 border border-slate-200 outline-none'>
            <input
            type='number'
            className='w-full bg-transparent outline-none'
            value = {income.amount}
            onChange={({target}) => handleChange("amount",target.value)}
            placeholder=''
            />
            </div>
        </div>

        <div>
            <label className='text-[13px] text-slate-800'>Date</label>
            <div className='w-full flex justify-between gap-3 text-sm text-black bg-slate-100 rounded px-4 py-3 mb-4 mt-3 border border-slate-200 outline-none'>
            <input
            type='date'
            className='w-full bg-transparent outline-none'
            value = {income.date}
            onChange={({target}) => handleChange("date",target.value)}
            placeholder=''
            />
            </div>
        </div>
        
        <div className='flex justify-end mt-6'>
            <button type='button'
            className='add-btn add-btn-fill'
            onClick={()=> onAddIncome(income)}>Add Income</button>
        </div>
    </div>
  )
}

export default AddIncomeForm