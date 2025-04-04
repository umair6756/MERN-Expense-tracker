import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { apiContext } from "./apiContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {

  const {totalBalance, totalIncome, totalExpense} = useContext(apiContext)
  const data = {
    labels: ["Incomes", "Balance", "Expenses"],
    datasets: [
      {
        data: [ totalIncome, totalBalance, totalExpense],
        backgroundColor: ["#4CAF50", "#FF5733", "#3498DB"],
        hoverBackgroundColor: ["#45A049", "#E74C3C", "#2980B9"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "80%", // Smaller center space
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "center",
        labels: {
          usePointStyle: true, // Use small circles instead of lines
          pointStyle: "circle",
          font: {
            size: 10, // Increase font size
            family: "Arial, sans-serif", // Custom font
            weight: "bold", // Make text bold
     
          },
          
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        bodySpacing: 4,
        padding: 10,
        borderColor: "#fff",
        borderWidth: 1,
        cornerRadius: 6,
      },
    },
  };

  return (
  
      <div className="chart-wrapper my-3" style={{ width: "250px", height: "250px" }}>
        <Doughnut data={data} options={options} />
        <div className="chart-center">
          <h6>Total Balance</h6>
          <p>{totalBalance}</p>
        </div>
      </div>

  );
};

export default DoughnutChart;