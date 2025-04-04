// import React from 'react'
// import './styles.css'

// const Sidebar = () => {
//   return (
//     <div className='my-0 py-0'>
//         <div>
//             {/* <div className='w-100 my-0 py-0 d-flex align-items-center' style={{backgroundColor:"var(--secondary-color)", height:'4rem', boxShadow:'var(--box-shadow)'}}>
//                 <h1 className='fs-4 fw-bolder mx-4'>Expense Tracker</h1>
//             </div> */}

            
//         </div>
//     </div>
//   )
// }

// export default Sidebar




import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { FaBars, FaTimes, FaHome, FaMoneyBill, FaChartPie, FaSignOutAlt } from "react-icons/fa";
import Dashboard from "./Dashboard";

import { useEffect } from "react";

import { Link } from "react-router-dom";

const Sidebar = () => {

  const [profileImage, setProfileImage] = useState('');
  const [userName, setUserName] = useState('');

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
  
      // Fetch user data
      const response = await fetch('http://localhost:5000/user', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
  
      const data = await response.json();
      const user = data.user;
  
      // Set the state variables with user data
      setProfileImage(`data:image/jpeg;base64,${user.profileImage}`);
      setUserName(user.name);


    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    }
  };

  // Call the fetchUserProfile function on page load
  useEffect(() => {
    fetchUserProfile();
  }, []);

  console.log(userName)


  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-container">
      {/* Top Bar */}
      <div className="top-bar">
        <h3 className="brand-name">Expense Tracker</h3>
        <button className="menu-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div className="d-flex flex-row">
      <div className={`sidebar ${isOpen ? "show" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          <FaTimes />
        </button>
        <div className="user-info" style={{marginTop:'5rem'}}>
          <img src={profileImage} alt="User" className="user-img" />
          <h4>{userName}</h4>
        </div>
        <ul className="nav-links">
          <Link to='/dashboard'>
          <li><FaHome /> Dashboard</li>
          </Link>
          <Link to='/income'>
          <li><FaMoneyBill /> Income</li>
          </Link>
          <Link to='/expense'>
          <li><FaChartPie /> Expenses</li>
          </Link>
          <Link to='/'>
          <li><FaSignOutAlt /> Logout</li>
          </Link>

        </ul>
      </div>
 
      </div>
    </div>
  );
};

export default Sidebar;