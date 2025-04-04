import React from 'react'
import Sidebar from '../Components/Sidebar'
import Dashboard from '../Components/Dashboard'

const HomePage = () => {
  return (
    <div>
        <div>
            <Sidebar/>
            <div className="w-75 dashBoard">
        <Dashboard/>
      </div>
        </div>
    </div>
  )
}

export default HomePage