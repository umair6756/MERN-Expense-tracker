const express = require("express")

const incomeRoutes = express.Router(); 

const auth = require("../middleware/auth");
const { addIncome, getIncomes, deleteIncome } = require("../Controller/incomeController");

incomeRoutes.post("/income", auth , addIncome)

incomeRoutes.get("/income", auth, getIncomes)

incomeRoutes.delete("/income/:id", auth, deleteIncome)

module.exports = incomeRoutes