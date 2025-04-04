import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Create the Context
export const apiContext = createContext();

// Create the Context Provider Component
export const ThemeProvider = ({ children }) => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const [topCategories, setTopCategories] = useState([]);

  const [incomeChartData, setIncomeChartData] = useState({ labels: [], datasets: [] });

  const [incomeTopCategories, setIncomeTopCategories] = useState([]);


  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  // Fetch both incomes and expenses on component mount
  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchIncomes(token);
      fetchExpenses(token);
    }
  }, []);
// Empty array ensures this effect runs only once when the component mounts

  // Fetching incomes
  const fetchIncomes = async (token) => {
    // const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please log in.");
      setLoading(false);
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

      if (response.status === 401) {
        alert("Session expired! Redirecting to login...");
        localStorage.removeItem("token"); // Remove expired token
        navigate("/"); // Redirect to login page
        return; // Stop further execution
      }

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorData}`);
      }

      const allData = await response.json();
      setIncomeData(allData.incomes || []); // Ensure 'incomes' is an array
      processIncomeData(allData.incomes || []);





      
    } catch (error) {
      console.error("Error fetching incomes:", error.message);
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after the fetch is done
    }



  };

  // Fetching expenses
  const fetchExpenses = async (token) => {
    // const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/expense", {
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
      setExpenseData(allData.expenses || []);
      processExpenseData(allData.expenses || []); // Process data for chart
    } catch (error) {
      console.error("Error fetching expenses:", error.message);
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after the fetch is done
    }
  };

  // Process expense data for chart display
  const processExpenseData = (expenseData) => {
    if (!Array.isArray(expenseData)) {
      console.log("Invalid expense data structure.");
      return;
    }

    // Group by category and sum amounts
    const categoryTotals = {};
    expenseData.forEach(({ category, amount }) => {
      categoryTotals[category] = (categoryTotals[category] || 0) + amount;
    });

    // Convert to array & sort by highest amount
    const sortedCategories = Object.entries(categoryTotals)
      .map(([category, totalAmount]) => ({ category, totalAmount }))
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 4); // Get top 4 categories

    setTopCategories(sortedCategories);

    // Prepare data for Chart.js
    const barColors = ["#388E3C", "#81C784", "#388E3C", "#81C784"];
    setChartData({
      labels: sortedCategories.map(item => item.category),
      datasets: [
        {
          label: "Expenses by Category",
          data: sortedCategories.map(item => item.totalAmount),
          backgroundColor: barColors,
          hoverBackgroundColor: barColors.map(color => `${color}`), // Lighten color on hover
          barThickness: 25, // Adjust bar thickness for better look
        },
      ],
    });
  };



  const categoryColors = ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0"]; // Green, Orange, Blue, Purple


  const processIncomeData = (incomeData) => {
    if (!Array.isArray(incomeData)) {
      console.log("Invalid income data structure.");
      return;
    }

    // Group by category and sum amounts
    const categoryTotals = {};
    incomeData.forEach(({ category, amount }) => {
      categoryTotals[category] = (categoryTotals[category] || 0) + amount;
    });

    // Convert to array & sort by highest amount
    const sortedCategories = Object.entries(categoryTotals)
      .map(([category, totalAmount]) => ({ category, totalAmount }))
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 4); // Get top 4 categories

    setIncomeTopCategories(sortedCategories);

    // Prepare data for Chart.js

    setIncomeChartData({
      labels: sortedCategories.map(item => item.category),


      datasets: [
        {
          data: sortedCategories.map(item => item.totalAmount),
          backgroundColor: categoryColors, // Assign distinct colors to each slice
          hoverBackgroundColor: categoryColors.map((color) => `${color}80`), // Lighter shade on hover
          borderWidth: 2,
          borderColor: "#fff", // White border for better contrast
        },
      ],
    });

  }

  // If loading is true, display loading message


  // If there's an error, display the error message


  // Combined data (incomes + expenses)
  const combinedData = [
    ...incomeData.map(item => ({ ...item, type: 'income' })),
    ...expenseData.map(item => ({ ...item, type: 'expense' }))
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by most recent date
    .slice(0, 4); // Show only the first 4 (most recent) transactions

  const totalIncome = incomeData.reduce((sum, income) => sum + income.amount, 0);
  const totalExpense = expenseData.reduce((sum, expense) => sum + expense.amount, 0);
  const totalBalance = totalIncome - totalExpense;






  const showToast = (message, type = "success") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };




  return (
    <apiContext.Provider value={{showToast,incomeChartData,chartData, incomeData, expenseData, combinedData, totalBalance, totalExpense, totalIncome }}>
      {children}
      <ToastContainer/>
    </apiContext.Provider>
  );
};
