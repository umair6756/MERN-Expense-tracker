import React, { useEffect, useState } from "react";
import AddForm from "./AddForm";
import { Line } from "react-chartjs-2";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Sources from "./Sources";
import { FaTrash } from "react-icons/fa";
import { FaArrowTrendDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [formOpen, setFormOpen] = useState(false);

  const handleForm = () => {
    setFormOpen((prev) => !prev);
  };

  const navigate = useNavigate();

  // Update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sample data for the last 15 days
  // const labels = Array.from({ length: 10 }, (_, i) => `Day ${i + 1}`);
  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Expenses',
  //       data: [65, 59, 80, 81, 56, 55, 70, 70, 90, 85, 75, 60, 50, 45, 55], // Replace with your data
  //       borderColor: '#4CAF50', // Line color
  //       backgroundColor: 'rgba(76, 175, 80, 0.1)', // Light shadow color
  //       borderWidth: 2,
  //       pointRadius: 3,
  //       pointBackgroundColor: '#4CAF50',
  //       tension: 0.3, // Smooth line
  //       fill: true, // Fill the area under the line
  //     },
  //   ],
  // };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Expenses",
        data: [], // Replace with your data
        borderColor: "#4CAF50", // Line color
        backgroundColor: "rgba(76, 175, 80, 0.1)", // Light shadow color
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: "#4CAF50",
        tension: 0.3, // Smooth line
        fill: true, // Fill the area under the line
      },
    ],
  });

  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    fetchIncomes();
    // console.log("Updated chart data:", chartData);
  }, [chartData]);

  const fetchIncomes = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please log in.");
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
      // console.log("Fetched incomes:", allData); // ✅ CHECK RESPONSE
      setExpenses(allData.expenses || []); // ✅ Ensure 'incomes' is an array

      const incom = allData.expenses || [];

      const last10Data = incom.slice(-10);

      // Extract labels (dates) and data (amounts)
      const labels = last10Data.map((item) =>
        moment(item.date).format("DD MMM")
      );
      const data = last10Data.map((item) => item.amount);

      // Update state
      setChartData((prev) => ({
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

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to adjust height and width
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#4CAF50",
        borderWidth: 1,
        cornerRadius: 5,
        padding: 10,
        callbacks: {
          title: (context) => `Day ${context[0].label}`,
          label: (context) => `Expense: $${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid
        },
        ticks: {
          color: "#666", // X-axis text color
          autoSkip: true,
          maxTicksLimit: screenWidth < 600 ? 5 : 10, // Adjust ticks based on screen size
          callback: (value, index) => {
            if (screenWidth < 600 && index % 2 !== 0) return ""; // Show every 2nd tick on small screens
            return chartData.labels[index];
          },
        },
      },
      y: {
        grid: {
          display: false, // Hide y-axis grid
        },
        ticks: {
          color: "#666", // Y-axis text color
        },
      },
    },
  };

  const deleteExpense = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found. Please log in.");
      console.error("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/expense/${id}`, {
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
      setExpenses((prevIncomes) =>
        prevIncomes.filter((expense) => expense._id !== id)
      );

      // Optionally, show a success message
      alert("Expense deleted successfully");
    } catch (error) {
      // Display the error message in an alert
      alert(`Error deleting expense: ${error.message}`);
      console.error("Error deleting expense:", error.message);
    }
  };





  const handleExpenseCSV = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/expense-csv", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
  
      if (!response.ok) throw new Error("Failed to download CSV");
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "expenses.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download error:", error);
    }
  };




  return (
    <div>
      <div
        className="w-100 m-4"
        style={{ background: "var(--secondary-color)", height: "auto" }}
      >
        <div className="d-flex justify-content-between p-3">
          <div>
            <h5>Expense Overview</h5>
            <p>Hello my name umair</p>
          </div>
          <div>
            <button
              onClick={handleForm}
              className="py-1 px-2 rounded fw-bold "
              style={{
                border: "none",
                outline: "none",
                fontSize: "14px",
                background: "#9b27b033",
                color: "#9C27B0",
              }}
            >
              {" "}
              Add Income
            </button>
          </div>
        </div>
        {chartData.length === 0 ? (
          <p className="text-muted text-center w-100">No expenses found</p>
        ) : (
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
              height: "300px",
            }}
          >
            <Line data={chartData} options={options} />
          </div>
        )}
      </div>

      {/* <Sources/> */}

      <div
        className=" p-3 my-4 w-100 m-4"
        style={{ background: "var(--secondary-color)" }}
      >
        <div className="d-flex justify-content-between">
          <h3>Expense Sources</h3>
          <button
            className="py-0 px-3 rounded fw-bold "
            style={{ border: "none", outline: "none", fontSize: "14px" }}
            onClick={handleExpenseCSV}
          >
            {" "}
            Download
          </button>
        </div>

        <div
          className="source-div d-flex "
          style={{ flexWrap: "wrap", gap: ".5rem" }}
        >
          {expenses.length === 0 ? (
            <p className=" text-center w-100">No expenses found</p>
          ) : (
            expenses.map((expense) => (
              <div
                key={expense._id}
                className="sources-box d-flex justify-content-between my-3"
                style={{ gap: "2rem" }}
              >
                <div className="d-flex">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center my-1"
                    style={{
                      height: "2.5rem",
                      width: "2.5rem",
                      background: "#f0f0f0",
                    }}
                  >
                    {expense.icon}
                  </div>
                  <div className="mx-3">
                    <p className="my-0 py-0 fw-bold">{expense.category}</p>
                    <p
                      className="my-0 py-0"
                      style={{ fontSize: "13px", opacity: ".7" }}
                    >
                      {expense.date}
                    </p>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => deleteExpense(expense._id)}
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="my-1 ">
                  <button
                    className="border-none fw-bold py-1 my-2"
                    style={{
                      outline: "none",
                      border: "none",
                      fontSize: "12px",
                      borderRadius: "4px",
                      color: "red",
                    }}
                  >
                    {expense.amount}
                    <span className="mx-1 py-0">
                      <span className="my-0 py-0" style={{ fontSize: "14px" }}>
                        <FaArrowTrendDown />
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {formOpen && <AddForm button={handleForm} type="Expense" />}
    </div>
  );
};

export default ExpenseChart;
