const express = require("express")

const expenseRoutes = express.Router(); 

const auth = require("../middleware/auth");
const { addExpense, getExpenses, deleteExpense, exportCsv } = require("../Controller/expenstController");

expenseRoutes.post("/expense", auth , addExpense)

expenseRoutes.get("/expense", auth, getExpenses)

expenseRoutes.delete("/expense/:id", auth, deleteExpense)

expenseRoutes.get("/expense-csv",auth, exportCsv)


module.exports = expenseRoutes