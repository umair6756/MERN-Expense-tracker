const express = require("express")
const multer = require("multer");
const userRoutes = express.Router(); 

const auth = require("../middleware/auth.js")

const {Login, Signup, getUser} = require("../Controller/userController.js");


const storage = multer.memoryStorage(); // Store image in memory (no need for folder storage)
const upload = multer({ storage });


userRoutes.post("/login", Login)

userRoutes.post("/signup", upload.single("profileImage"), Signup)

userRoutes.get("/user",auth, getUser)



module.exports = userRoutes