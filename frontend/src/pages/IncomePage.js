import React from 'react'
import Sidebar from '../Components/Sidebar'
import IncomeChart from '../Components/IncomeChart'

const IncomePage = () => {
  return (
    <div>
        <Sidebar/>
        <div className="income dashBoard" style={{width:'75%'}}>
        <IncomeChart/>
      </div>
    </div>
  )
}

export default IncomePage