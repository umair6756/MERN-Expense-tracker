import React, { useContext, useState } from "react";
// import "./AuthForm.css"; // Advanced styling ke liye CSS file
import {  useNavigate } from 'react-router-dom';

import "../App.css"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaE } from "react-icons/fa6";
import { apiContext } from "./apiContext";
const Login = () => {

  const {showToast} = useContext(apiContext)
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Toggle between Login and Signup forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setLoginData({ email: "", password: "" }); // Reset login data
    setSignupData({ name: "", email: "", password: "" }); // Reset signup data
  };





  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
});

const [image, setImage] = useState(null);  // ✅ Image state
const [preview, setPreview] = useState("");  // ✅ Image preview

// ✅ Handle text input changes
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

// ✅ Handle image selection
const handleImageChange = (e) => {
    const file = e.target.files[0]; // ✅ Get selected file
    setImage(file); // ✅ Save file to state
    setPreview(URL.createObjectURL(file)); // ✅ Create preview URL
};

// ✅ Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    if (image) formDataToSend.append("profileImage", image); // ✅ Append image

    try {
        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            body: formDataToSend, // ✅ Send as FormData (not JSON)
        });

        if (!response.ok) {
            const errorData = await response.json();
            showToast(errorData.message || 'Signup failed. Please try again.', "error");
        } else {
            showToast('Signup successful!', "error");
            setFormData({ name: '', email: '', password: '' });
            setImage(null);
            setPreview("");
        }
    } catch (err) {
        console.error('Signup failed:', err);
        showToast('Signup failed. Please try again.', "error");
    }
};




const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();  // ✅ Correct way to use navigate

const handleLogin = async (e) => {
  e.preventDefault();

  try {
      const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
      });

      // ✅ Check if response status is 401 BEFORE parsing JSON
      if (!response.ok) {
          showToast(response.message , "error");

      }

      // ✅ Parse JSON after status check
      const data = await response.json();
      console.log("API Response:", data);

      if (data.success) {
          localStorage.setItem("token", data.token); // ✅ Save token
          showToast("Login Successful!", "success");
          navigate("/dashboard"); // ✅ Navigate to dashboard
      } else {
          showToast(data.message || "Login failed. Please try again.", "error");
      }
  } catch (err) {
      console.error("Login failed:", err);
      showToast("Login failed. Please check your email/password.", "error");
  }
};


  return (
    // <div className="auth-container">
    //   {/* Left Side - Form */}
    //   <div className="form-container">
    //     <div className="form-wrapper">
    //       <h2 className="form-title">{isLogin ? "Login" : "Sign Up"}</h2>

    //       {/* Login Form */}
    //       {isLogin ? (
    //         <form onSubmit={handleLogin} className="auth-form">
    //           <div className="form-group">
    //             <label htmlFor="email">Email</label>
    //             <input
    //               type="email"
    //               id="email"
    //               name="email"
    //               placeholder="Enter email"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               required
    //             />
    //           </div>
    //           <div className="form-group">
    //             <label htmlFor="password">Password</label>
    //             <div className="password-input">
    //               <input
    //                 type={showPassword ? "text" : "password"}
    //                 id="password"
    //                 name="password"
    //                 placeholder="Password"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}                    required
    //               />
    //               <span
    //                 className="password-toggle"
    //                 onClick={togglePasswordVisibility}
    //               >
    //                 {showPassword ? "🙈" : "👁️"}
    //               </span>
    //             </div>
    //           </div>
    //           <button type="submit" className="submit-button">
    //             Login
    //           </button>
    //         </form>
    //       ) : (
    //         /* Signup Form */
    //         <form onSubmit={handleSubmit} className="auth-form">
    //           <div className="form-group">
    //             <label htmlFor="name">Name</label>
    //             <input
    //               type="text"
    //               id="name"
    //               name="name"
    //               placeholder="Enter your name"
    //               value={formData.name}
    //               onChange={handleInputChange}
    //               required
    //             />
    //           </div>
    //           <div className="form-group">
    //             <label htmlFor="email">Email</label>
    //             <input
    //               type="email"
    //               id="email"
    //               name="email"
    //               placeholder="Enter email"
    //               value={formData.email}
    //               onChange={handleInputChange}
    //               required
    //             />
    //           </div>
    //           <div className="form-group">
    //             <label htmlFor="password">Password</label>
    //             <div className="password-input">
    //               <input
    //                 type={showPassword ? "text" : "password"}
    //                 id="password"
    //                 name="password"
    //                 placeholder="Password"
    //                 value={formData.password}
    //                 onChange={handleInputChange}
    //                 // required
    //               />
    //               <span
    //                 className="password-toggle"
    //                 onClick={togglePasswordVisibility}
    //               >
    //                 {showPassword ? "🙈" : "👁️"}
    //               </span>
    //             </div>
    //           </div>
    //           <button type="submit" className="submit-button">
    //             Sign Up
    //           </button>
    //         </form>
    //       )}

    //       {/* Toggle Form Text */}
    //       <p className="toggle-form-text">
    //         {isLogin ? "Don't have an account? " : "Already have an account? "}
    //         <button className="toggle-form-button" onClick={toggleForm}>
    //           {isLogin ? "Sign Up" : "Login"}
    //         </button>
    //       </p>
    //     </div>
    //   </div>

    //   {/* Right Side - Design */}
    //   <div className="design-container">
    //     <div className="design-wrapper">
    //       <h1>Expense Tracker</h1>
    //       <p>
    //         {isLogin
    //           ? "Welcome back! Track your expenses effortlessly."
    //           : "Join us today and start managing your expenses."}
    //       </p>
    //       <div className="animation-container">
    //         <div className="animation-circle"></div>
    //         <div className="animation-line"></div>
    //       </div>
    //     </div>
    //   </div>
    // </div>






    <div className="auth-container">
    <div className="auth-box">
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      {isLogin ? (
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group password-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}    
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye/> : <FaEyeSlash/>}
              </span>
            </div>
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="image-upload">
            <label htmlFor="image-upload-input">
              <div className="image-preview">
                {preview ? (
                  <img src={preview} alt="Profile Preview" />
                ) : (
                  <span>+</span>
                )}
              </div>
            </label>
            <input
              id="image-upload-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="row-inputs">
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="input-group ">
            <label>Password</label>
            <br></br>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                name="password"
                onChange={handleInputChange}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>
          <button type="submit" className="auth-button">
            Signup
          </button>
        </form>
      )}
      <p className="toggle-link">
        {isLogin
          ? "Don't have an account? "
          : "Already have an account? "}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Signup" : "Login"}
        </span>
      </p>
    </div>
  </div>
  );
};

export default Login;