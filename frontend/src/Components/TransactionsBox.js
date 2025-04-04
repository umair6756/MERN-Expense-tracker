import React from "react";
import {  FaArrowRight, FaShoppingBag } from "react-icons/fa";
import {  FaArrowTurnDown } from "react-icons/fa6";
const TransactionsBox = ({ heading, icon, name , data}) => {
  return (
    <div>
      <div className="transactions-box ">
        <div className="  p-3" style={{ width: "21.5rem", height: "auto", background:'var(--secondary-color)' }}>
          <div className="d-flex justify-content-between ">
            <div>
              <h5>{heading}</h5>
            </div>
            <div>
              <button
                className="border-none fw-bold py-1 "
                style={{
                  outline: "none",
                  border: "none",
                  fontSize: "10px",
                  borderRadius: "4px",
                }}
              >
                See All
                <span className="mx-2 py-0">
                  <FaArrowRight
                    className="my-0 py-0"
                    style={{ fontSize: "10px" }}
                  />
                </span>
              </button>
            </div>
          </div>


          {data && Object.values(data).length > 0 ? (
  Object.values(data).slice(0, 4).map((item, index) => (
    <div className="d-flex justify-content-between my-3" key={index}>
      <div className="d-flex">
        <div
          className="rounded-circle d-flex align-items-center justify-content-center my-1"
          style={{ height: "2.5rem", width: "2.5rem", background: "#f0f0f0" }}
        >
          <span>
            {item.icon}
          </span>
          
        </div>
        <div className="mx-3">
          <p className="my-0 py-0 fw-bold">{item?.category || "No Category"}</p>
          <p className="my-0 py-0" style={{ fontSize: '13px', opacity: '.7' }}>
            {item?.date || "No Date"}
          </p>
        </div>
      </div>

      <div>
        <button
          className="border-none fw-bold py-1 my-2"
          style={{
            outline: "none",
            border: "none",
            fontSize: "10px",
            borderRadius: "4px",
            color: "red",
          }}
        >
          {item?.amount || "0"}
          <span className="mx-2 py-0">
            <span className="my-0 py-0" style={{ fontSize: "10px" }} >
              {icon}
            </span>
          </span>
        </button>
      </div>
    </div>
  ))
) : (
  <p>No data available</p>
)}


{/* 
          <div className="d-flex justify-content-between my-2">
            <div className="d-flex">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center my-1"
                style={{ height: "2.5rem", width: "2.5rem", background: "#f0f0f0" }}
              >
                <FaShoppingBag className="fs-5" color="green"/>
              </div>
              <div className="mx-3">
              <p className="my-0 py-0 fw-bold">shopping</p>
              
              <p className="my-0 py-0  " style={{fontSize:'13px', opacity:'.7'}}>6th,Feb 2024</p>
              </div>

            </div>

            <div>
            <button
                className="border-none fw-bold py-1 my-2"
                style={{
                  outline: "none",
                  border: "none",
                  fontSize: "10px",
                  borderRadius: "4px",
                  color:"red"
                }}
              >
                See All
                <span className="mx-2 py-0">
                  <FaArrowTurnDown
                    className="my-0 py-0"
                    style={{ fontSize: "10px" }}
                  />
                </span>
              </button>
            </div>
          </div>




          <div className="d-flex justify-content-between my-2">
            <div className="d-flex">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center my-1"
                style={{ height: "2.5rem", width: "2.5rem", background: "#f0f0f0" }}
              >
                <FaShoppingBag className="fs-5" color="green"/>
              </div>
              <div className="mx-3">
              <p className="my-0 py-0 fw-bold">shopping</p>
              
              <p className="my-0 py-0  " style={{fontSize:'13px', opacity:'.7'}}>6th,Feb 2024</p>
              </div>

            </div>

            <div>
            <button
                className="border-none fw-bold py-1 my-2"
                style={{
                  outline: "none",
                  border: "none",
                  fontSize: "10px",
                  borderRadius: "4px",
                  color:"red"
                }}
              >
                See All
                <span className="mx-2 py-0">
                  <FaArrowTurnDown
                    className="my-0 py-0"
                    style={{ fontSize: "10px" }}
                  />
                </span>
              </button>
            </div>
          </div>


          <div className="d-flex justify-content-between my-2">
            <div className="d-flex">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center my-1"
                style={{ height: "2.5rem", width: "2.5rem", background: "#f0f0f0" }}
              >
                <FaShoppingBag className="fs-5" color="green"/>
              </div>
              <div className="mx-3">
              <p className="my-0 py-0 fw-bold">shopping</p>
              
              <p className="my-0 py-0  " style={{fontSize:'13px', opacity:'.7'}}>6th,Feb 2024</p>
              </div>

            </div>

            <div>
            <button
                className="border-none fw-bold py-1 my-2"
                style={{
                  outline: "none",
                  border: "none",
                  fontSize: "10px",
                  borderRadius: "4px",
                  color:"red"
                }}
              >
                See All
                <span className="mx-2 py-0">
                  <FaArrowTurnDown
                    className="my-0 py-0"
                    style={{ fontSize: "10px" }}
                  />
                </span>
              </button>
            </div>
          </div>




          <div className="d-flex justify-content-between my-2">
            <div className="d-flex">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center my-1"
                style={{ height: "2.5rem", width: "2.5rem", background: "#f0f0f0" }}
              >
                <FaShoppingBag className="fs-5" color="green"/>
              </div>
              <div className="mx-3">
              <p className="my-0 py-0 fw-bold">shopping</p>
              
              <p className="my-0 py-0  " style={{fontSize:'13px', opacity:'.7'}}>6th,Feb 2024</p>
              </div>

            </div>

            <div>
            <button
                className="border-none fw-bold py-1 my-2"
                style={{
                  outline: "none",
                  border: "none",
                  fontSize: "10px",
                  borderRadius: "4px",
                  color:"red"
                }}
              >
                See All
                <span className="mx-2 py-0">
                  <FaArrowTurnDown
                    className="my-0 py-0"
                    style={{ fontSize: "10px" }}
                  />
                </span>
              </button>
            </div>
          </div> */}




        </div>
      </div>
    </div>
  );
};

export default TransactionsBox;
