import React, { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { apiContext } from "./apiContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {

  const {incomeChartData} = useContext(apiContext)
  // Income Categories and Amounts

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
          family: "Arial, sans-serif",
        },
        bodySpacing: 8,
        padding: 15,
        borderColor: "#fff",
        borderWidth: 2,
        cornerRadius: 12,
        callbacks: {
          title: (tooltipItem) => {
            return `${tooltipItem[0].label}`;
          },
          label: (tooltipItem) => {
            return `$${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 10,
            family: "Arial, sans-serif",
            weight: "bold",
          },
          color: "#333", // Dark text color for better readability
          padding: 20,
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true, // Animate scale for a smooth effect
    },
  };

  return (
    <div className="chart-container" style={{ width: "100%", height: "310px", margin: "0 auto", backgroundColor: "white" }}>
      <div className="chart-wrapper" style={{ width: "100%", height: "100%" }}>
        <Pie data={incomeChartData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
