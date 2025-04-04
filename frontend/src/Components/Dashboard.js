import React, { useContext } from 'react'
import { FaCreditCard } from 'react-icons/fa'
import './styles.css'
import BalanceCards from './BalanceCards'
import TransactionsBox from './TransactionsBox'
import FinincialBox from './FinincialBox'
import Chart from './DoughnutChart'
import BarChart from './BarChart'
import DoughnutChart from './DoughnutChart'
import PieChart from './PieChart'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaArrowTrendDown, FaArrowTrendUp, FaArrowTurnUp } from 'react-icons/fa6'
import { apiContext } from './apiContext'

const Dashboard = () => {

  const {totalBalance, totalIncome, totalExpense, incomeData, expenseData, combinedData} = useContext(apiContext)

  // const [incomeData, setIncomeData] = useState([]);
  // const [expenseData, setExpenseData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // // Fetching both incomes and expenses on component mount
  // useEffect(() => {
  //   fetchIncomes();
  //   fetchExpenses();
  // }, []);

  // const fetchIncomes = async () => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     console.error("No token found. Please log in.");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://localhost:5000/income", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-auth-token": token,
  //       },
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.text();
  //       throw new Error(`HTTP ${response.status}: ${errorData}`);
  //     }

  //     const allData = await response.json();
  //     console.log("Fetched incomes:", allData); // ✅ CHECK RESPONSE
  //     setIncomeData(allData.incomes || []); // ✅ Ensure 'incomes' is an array
  //   } catch (error) {
  //     console.error("Error fetching incomes:", error.message);
  //     setError(error.message);
  //   } finally {
  //     setLoading(false); // Set loading to false after the fetch is done
  //   }
  // };

  // // Fetching expenses
  // const fetchExpenses = async () => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     console.error("No token found. Please log in.");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://localhost:5000/expense", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-auth-token": token,
  //       },
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.text();
  //       throw new Error(`HTTP ${response.status}: ${errorData}`);
  //     }

  //     const allData = await response.json();
  //     console.log("Fetched expenses:", allData); // ✅ CHECK RESPONSE
  //     setExpenseData(allData.expenses || []); // ✅ Ensure 'expenses' is an array
  //   } catch (error) {
  //     console.error("Error fetching expenses:", error.message);
  //     setError(error.message);
  //   } finally {
  //     setLoading(false); // Set loading to false after the fetch is done
  //   }
  // };

  // // If loading is true, display loading message
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // // If there's an error, display the error message
  // if (error) {
  //   return <div>Error: {error}</div>;
  // }



  // const combinedData = [
  //   ...incomeData.map(item => ({ ...item, type: 'income' })),
  //   ...expenseData.map(item => ({ ...item, type: 'expense' }))
  // ]
  //   .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by most recent date
  //   .slice(0, 4); // Show only the first 4 (most recent) transactions




  //   const totalIncome = incomeData.reduce((sum, income) => sum + income.amount, 0);

  //   const totalExpense = expenseData.reduce((sum, expense) => sum + expense.amount, 0);

  //   const totalBalance =  totalIncome - totalExpense 


    // {"#4CAF50", "#FF5733", "#3498DB"}



  
  return (
    <div className='p-4 '>
        <div className='top-boxes d-flex flex-wrap gap-3'>
         <BalanceCards icon={FaCreditCard} heading="Total Balance" balance={totalBalance} bgColor="#B02A12"/>
         <BalanceCards icon={FaCreditCard} heading="Total Income" balance={totalIncome} bgColor="#1E7D32"/>
         <BalanceCards icon={FaCreditCard} heading="Total Expense" balance={totalExpense} bgColor="rgb(32, 110, 170)"/>

        
        </div>

        <div className='d-flex flex-wrap gap-3 my-4'>
            <div>
                <TransactionsBox heading="Recent Transactions" data={combinedData} />
            </div>
            <div>
              <FinincialBox heading="Finicial Overview" chartComponent={DoughnutChart}/>
            </div>
        </div>

        <div className='d-flex flex-wrap gap-3 my-4'>
            <div>
            <TransactionsBox heading="Expenses" data={expenseData} icon={<FaArrowTrendDown/>}/>
                
            </div>
            <div>
              <FinincialBox heading="Last 30 Day Expense" chartComponent={BarChart}/>
            </div>
        </div>

        <div className='d-flex flex-wrap gap-3 my-4'>

            <div>
              <FinincialBox heading="Last 30 Day Expense" chartComponent={PieChart}/>
            </div>

            <div>
            <TransactionsBox heading="Incomes" data={incomeData} icon={<FaArrowTrendUp/>}/>

            </div>
        </div>




 
    </div>
  )
}

export default Dashboard