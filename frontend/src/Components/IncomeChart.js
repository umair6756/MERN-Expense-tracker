import React, { useContext } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import Sources from './Sources';
import { useState } from 'react';
import { useEffect } from 'react';
import AddForm from './AddForm';
import { FaArrowTrendUp } from 'react-icons/fa6';

import moment from 'moment/moment';
import { apiContext } from './apiContext';


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);








const IncomeChart = () => {


  const {showToast} = useContext(apiContext)


  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
       
        data: [],
        backgroundColor: [
          "#9C27B0", "#D1A2DC", "#9C27B0", "#D1A2DC", "#9C27B0",
          "#D1A2DC", "#9C27B0", "#D1A2DC", "#9C27B0", "#D1A2DC"
        ],
        borderRadius: 8
      }
    ]
  }) ;

 

  const [incomes, setIncomes] = useState([]);
useEffect(() => {
    fetchIncomes();
    console.log("Updated chart data:", chartData);
  }, [chartData]);

  const fetchIncomes = async () => {
    const token = localStorage.getItem("token"); 
  
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/income", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorData}`);
      }

      const allData = await response.json();
      console.log("Fetched incomes:", allData); // ✅ CHECK RESPONSE
      setIncomes(allData.incomes || []); // ✅ Ensure 'incomes' is an array


      const incom = allData.incomes || [];


      const last10Data = incom.slice(-10);

      // Extract labels (dates) and data (amounts)
      const labels = last10Data.map(item => moment(item.date).format("DD MMM"));
      const data = last10Data.map(item => item.amount);

      // Update state
      setChartData(prev => ({
        ...prev, // ✅ Preserve existing state properties
        labels: labels,
        datasets: [
          {
            ...prev.datasets[0], // ✅ Preserve existing dataset properties
            label: "Amount",
            data: data, // ✅ Ensure correct data format
          },
        ],
      }));
      
    } catch (error) {
      console.error("Error fetching incomes:", error.message);
    }
};



  const [formOpen, setFormOpen] = useState(false)
  
  const handleForm = () => {
    setFormOpen(prev => !prev)
  }





  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,

      },
      tooltip: {
        backgroundColor: "#222",
        titleFont: { size: 14 },
        bodyFont: { size: 12 }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#222",
          font: { size: 12 },
          callback: (value, index) => (index % 2 === 0 ? chartData.labels[index] : ""), // Show every 2nd date
        },
        grid: { display: false }
      },
      y: {
        ticks: { color: "#222", font: { size: 12 } },
        grid: { display: false }
      }
    },
    barThickness: "flex", // Adjusts bar width automatically
    categoryPercentage: 0.6, // Adjusts spacing between bars
    barPercentage: 0.9 // Adjusts bar width relative to available space
  };




 
  const deleteIncome = async (id) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("No token found. Please log in.");
      console.error("No token found. Please log in.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/income/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorData}`);

       
      }
  
      // After successful deletion, filter out the deleted income from the list
      setIncomes((prevIncomes) => prevIncomes.filter((income) => income._id !== id));
  
      // Optionally, show a success message
      showToast(response.message, "success");
    } catch (error) {
      // Display the error message in an alert
      showToast(error.message, "error");
      console.error("Error deleting income:", error.message);
    }
  };


  return (
    <div>
        <div className='w-100 m-4' style={{background:"var(--secondary-color)", height:"auto"}}>
            <div className='d-flex justify-content-between p-3'>
                <div>
                    <h5>Income Overview</h5>
                    <p>Hello my name umair</p>
                </div>
                <div>
                    <button onClick={handleForm} className='py-1 px-2 rounded fw-bold ' style={{border:"none", outline:'none', fontSize:'14px', background:'#9b27b033', color:'#9C27B0'}} > Add Income</button>
                </div>
            </div>
            {chartData.length === 0 ? (
    <p className="text-muted text-center w-100">No expenses found</p>
  ) : (
            <div style={{ width: "100%", height: "300px", padding: "20px"}}>
      <Bar key={chartData.labels.join(",")} data={chartData} options={options} />
    </div>)}
        </div>

        {/* <Sources icon={<FaArrowTrendUp/>} color="green" /> */}




         <div className=' p-3 my-4 w-100 m-4' style={{background:'var(--secondary-color)'}}>
                <div className='d-flex justify-content-between' >
                     <h3>Income Sources</h3>
                     <button className='py-0 px-3 rounded fw-bold ' style={{border:"none", outline:'none', fontSize:'14px'}} > Download</button>
        
                </div>
        
                <div className='source-div d-flex ' style={{flexWrap:'wrap',gap:'.5rem'}}>
                {incomes.length === 0 ? (
    <p className="text-muted text-center w-100">No expenses found</p>
  ) : (
                  incomes.map((income) => (
                <div key={income._id} className="sources-box d-flex justify-content-between my-3 " style={{gap:'2rem'}}>
                    <div className="d-flex">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center my-1"
                        style={{ height: "2.5rem", width: "2.5rem", background: "#f0f0f0" }}
                      >
                        {income.icon}
                      </div>
                      <div className="mx-3">
                      <p className="my-0 py-0 fw-bold">{income.category}</p>
                      
                      <p className="my-0 py-0  " style={{fontSize:'13px', opacity:'.7'}}>{income.date}</p>
                      </div>
                      <button className='delete-btn' onClick={() => deleteIncome(income._id)} >
                        <FaTrash/>
                      </button>
        
                    </div>
        
                    <div className='my-1 '>
        
                    <button
                        className="border-none fw-bold py-1 my-2"
                        style={{
                          outline: "none",
                          border: "none",
                          fontSize: "12px",
                          borderRadius: "4px",
                          color:"green"
                        }}
                      >
                        {income.amount}
                        <span className="mx-1 py-0">
                        <span className="my-0 py-0" style={{ fontSize: "14px" }}>
          <FaArrowTrendUp/>
        </span>
                        </span>
                      </button>
                    </div>
                  </div>
        ))
                  
                  
      )}
        
        
        
        
        
        
        
        
        
        
                  
        
        
        
                  
        
        
        
        
        
        
                </div>
        
                </div>

        {formOpen && (<AddForm button={handleForm} type="Income"/>)}


    </div>
  )
}

export default IncomeChart


