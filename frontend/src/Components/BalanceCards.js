import React from "react";
import './styles.css'

const BalanceCards = ({ icon: Icon, heading, balance, bgColor }) => {
  return (
    <div>
      <div
        className="box d-flex flex-row px-3 py-3"
        style={{ background: "var(--secondary-color)", width: '14rem', boxShadow:'var(--box-shadow)' }}
      >
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{ height: "2.6rem", width: "2.6rem", background: bgColor }}
        >
          <Icon className=" fs-5 text-white" />
        </div>
        <div className="mx-3">
          <p className="my-0 py-0 opacity-75">{heading}</p>
          <span className="my-0 py-0 fw-bold">{balance}</span>
        </div>
      </div>
    </div>
  );
};

export default BalanceCards;
