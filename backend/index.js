const express = require("express")
const app = express()

const connectDB = require("./utiliz/db")
const cors = require("cors")
require('dotenv').config();
const port = 5000;

const userRoutes  = require("./Routes/userRoutes.js");
const incomeRoutes = require("./Routes/incomeRoutes.js");
const auth = require("./middleware/auth.js");
const expenseRoutes = require("./Routes/expenseRoutes.js");
app.use(cors())

app.use(express.json());

app.use("/", userRoutes)

app.use("/", incomeRoutes)

app.use("/", expenseRoutes)

app.use('/auth', auth);

connectDB()

app.listen(port, () => {
    console.log("App is listened successfully")
})