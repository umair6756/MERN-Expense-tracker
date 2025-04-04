import React from "react";
import DoughnutChart from "./DoughnutChart";

const FinincialBox = ({ heading, chartComponent: ChartComponent }) => {
  return (
    <div>
      <div>
        <div
          className="  p-3"
          style={{
            width: "21.5rem",
            height: "23rem",
            background: "var(--secondary-color)",
          }}
        >
          <h5>{heading}</h5>
          <div className="d-flex justify-content-center">
          <ChartComponent/>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FinincialBox;
