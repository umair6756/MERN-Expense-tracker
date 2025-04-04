import React from 'react'
import { FaArrowDown, FaShoppingBasket, FaTrash } from 'react-icons/fa'
import { FaArrowTrendDown, FaArrowTrendUp, FaArrowTurnDown } from 'react-icons/fa6'
import { useState } from 'react'

import { useEffect } from 'react'
import { TrendingUp } from 'lucide-react'

const Sources = ({ color, icon, onDelete}) => {


  const [incomes, setIncomes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    const token = localStorage.getItem("token"); 
  
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/income`, {
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

      const data = await response.json();
      console.log("Fetched incomes:", data); // ✅ CHECK RESPONSE
      setIncomes(data.incomes || []); // ✅ Ensure 'incomes' is an array
    } catch (error) {
      console.error("Error fetching incomes:", error.message);
    }
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
    alert("Income deleted successfully");
  } catch (error) {
    // Display the error message in an alert
    alert(`Error deleting income: ${error.message}`);
    console.error("Error deleting income:", error.message);
  }
};







  return (
    <div>
        <div className=' p-3 my-4 w-100 m-4' style={{background:'var(--secondary-color)'}}>
        <div className='d-flex justify-content-between' >
             <h3>Income Sources</h3>
             <button className='py-0 px-3 rounded fw-bold ' style={{border:"none", outline:'none', fontSize:'14px'}} > Download</button>

        </div>

        <div className='source-div d-flex ' style={{flexWrap:'wrap',gap:'.5rem'}}>
          {incomes.map((income) => (
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
              <button className='delete-btn' onClick={() => onDelete(income._id)}>
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
                  color:color
                }}
              >
                {income.amount}
                <span className="mx-1 py-0">
                <span className="my-0 py-0" style={{ fontSize: "14px" }}>
  {icon} 
</span>
                </span>
              </button>
            </div>
          </div>
))}
          
          










          



          






        </div>

        </div>
    </div>
  )
}

export default Sources