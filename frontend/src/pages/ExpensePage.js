import React from 'react'
import Sidebar from '../Components/Sidebar'
import ExpenseChart from '../Components/ExpenseChart'

const ExpensePage = () => {
  return (
    <div>
                <Sidebar/>
        <div className="income dashBoard " style={{width:'75%'}}>
        <ExpenseChart/>
      </div>
    </div>
  )
}

export default ExpensePage







