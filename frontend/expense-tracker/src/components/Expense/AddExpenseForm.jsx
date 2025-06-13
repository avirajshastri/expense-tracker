import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import EmojiPickerPopup from '../EmojiPickerPopup'

const AddExpenseForm = ({onAddExpense}) => {
    const [expense,setExpense] = useState({
        category:"",
        amount:"",
        date:"",
        icon:"",
    })

    const handleChange= (key,value) => setExpense({...expense,[key]:value})
  return (
    <div>
        <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon",selectedIcon)} />
        <div>
            <label className='text-[13px] text-slate-800'>Expense Category</label>
            <div className='w-full flex justify-between gap-3 text-sm text-black bg-slate-100 rounded px-4 py-3 mb-4 mt-3 border border-slate-200 outline-none'>
            <input
            type='text'
            className='w-full bg-transparent outline-none'
            value = {expense.category}
            onChange={({target}) => handleChange("category",target.value)}
            placeholder='Shopping, Rent etc.'
            />
            </div>
        </div>

        <div>
            <label className='text-[13px] text-slate-800'>Amount</label>
            <div className='w-full flex justify-between gap-3 text-sm text-black bg-slate-100 rounded px-4 py-3 mb-4 mt-3 border border-slate-200 outline-none'>
            <input
            type='number'
            className='w-full bg-transparent outline-none'
            value = {expense.amount}
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
            value = {expense.date}
            onChange={({target}) => handleChange("date",target.value)}
            placeholder=''
            />
            </div>
        </div>

        <div className='flex justify-end mt-6'>
            <button
            type='button'
            className='add-btn add-btn-fill'
            onClick={()=> onAddExpense(expense)}>
                Add Expense
            </button>
        </div>
    </div>
  )
}

export default AddExpenseForm