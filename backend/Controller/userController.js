const bcrypt = require("bcrypt");
const User = require("../Models/userModel");
const jwt = require('jsonwebtoken');

const fs = require("fs");


const Signup = async(req,res) => {

    try {
        const { name, email, password } = req.body;

        const imageBuffer = req.file.buffer; // Use buffer directly as we're using memoryStorag
        const base64Image = imageBuffer.toString("base64"); 
    
        // Check if all required fields are provided
        if (!name || !email || !password) {
          return res.status(400).json({
            message: "Please provide all required fields: name, email, and password",
            success: false,
          });
        }
    
        // Check if user already exists
        const findUser = await User.findOne({ email });
        if (findUser) {
          return res.status(409).json({
            message: "User already exists. Please use another email.",
            success: false,
          });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 15);
    
        // Create a new user
        const userModel = new User({ name, email, password: hashedPassword, profileImage: base64Image });
        await userModel.save();
    
        // Generate JWT token
        const payload = { user: { id: userModel._id } };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: "1h" },
          (err, token) => {
            if (err) {
              console.error("Error generating JWT token:", err);
              return res.status(500).json({
                message: "Error generating JWT token",
                success: false,
              });
            }
    
            // Send response with token
            res.status(201).json({
              message: "User signed up successfully",
              success: true,
              token,
            });
          }
        );
      } catch (error) {
        console.error("Error in Signup:", error);
        res.status(500).json({
          message: "Internal server error. Unable to create user.",
          success: false,
          error: error.message, // Send only the error message (optional)
        });
      }
    };
    


const Login = async(req,res) => {
    try {
        const { email, password } = req.body;
    
        // Check if all required fields are provided
        if (!email || !password) {
          return res.status(400).json({
            message: "Please provide both email and password",
            success: false,
          });
        }
    
        // Check if user exists
        const findUser = await User.findOne({ email });
        if (!findUser) {
          return res.status(401).json({
            message: "User not found. Please check your email.",
            success: false,
          });
        }
    
        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, findUser.password);
        if (!isPasswordMatch) {
          return res.status(401).json({
            message: "Incorrect password. Please try again.",
            success: false,
          });
        }
    
        // Generate JWT token
        const payload = { user: { id: findUser._id } };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: "10h" },
          (err, token) => {
            if (err) {
              console.error("Error generating JWT token:", err);
              return res.status(500).json({
                message: "Error generating JWT token",
                success: false,
              });
            }
    
            // Send response with token
            res.status(200).json({
              message: "Login successful",
              success: true,
              token,
              user: {
                id: findUser._id,
                name: findUser.name,
                email: findUser.email,
              },
            });
          }
        );
      } catch (error) {
        console.error("Error in Login:", error);
        res.status(500).json({
          message: "Internal server error. Unable to login.",
          success: false,
          error: error.message, // Send only the error message (optional)
        });
      }
    };







    const getUser = async (req, res) => {
      try {
        const userId = req.user.id; // Assuming you are using JWT and you can get the user ID from the token
    
        // Find user by ID
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({
            message: "User not found",
            success: false,
          });
        }
    
        // Send user data along with profile image
        res.status(200).json({
          success: true,
          user: {
            name: user.name,
            email: user.email,
            profileImage: user.profileImage, // Base64 image data
          },
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({
          message: "Internal server error",
          success: false,
          error: error.message,
        });
      }
    };
    
    
module.exports = {Signup, Login, getUser}