const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  icon:{type:String},
  amount: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., Salary, Freelance, Business
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Income", IncomeSchema);
