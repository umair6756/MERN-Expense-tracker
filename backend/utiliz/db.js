
const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect("mongodb://localhost:27017/Expense-tracker").
    then(() => console.log("Connected successfully ...")).
    catch(error => console.log(error))
}

module.exports = connectDB