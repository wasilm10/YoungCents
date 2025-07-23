import React, { useState } from 'react'
import Input from '../Inputs/Input';
import Emojipick from '../Layouts/Emojipick';

const AddIncomeForm = ({onAddIncome}) => {
    const [income,setIncome]=useState({
        source:"",
        amount:"",
        date:"",
        icon:"",
    });
    const handleChange=(key,value)=>setIncome({...income,[key]:value});
  return (
    <div>
        <Emojipick
            icon={income.icon}
            onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}/>
        <Input 
         value={income.source}
         onChange={({target})=>handleChange("source",target.value)}
         label="Income"
         placeholder="freelancing"
         type="text"
         />
         <Input 
         value={income.amount}
         onChange={({target})=>handleChange("amount",target.value)}
         label="Amount"
         placeholder=""
         type="number"
         />
         <Input 
         value={income.date}
         onChange={({target})=>handleChange("date",target.value)}
         label="Date"
         placeholder=""
         type="date"
         />
         <div className='flex justify-end mt-6'>
            <button type='button' className='add-btn add-btn-fill' onClick={()=>onAddIncome(income)}>
            Add Income
            </button>
         </div>
         
    </div>
  )
}

export default AddIncomeForm