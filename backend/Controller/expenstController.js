const Expense = require("../Models/ExpenseModel")
const fs = require("fs");
const path = require("path");
const fastcsv = require("fast-csv");


const addExpense = async (req, res) => {
    try {
        const { amount, category, icon } = req.body;
        const userId = req.user.id; // Get the userId from the validated JWT

        if (!userId) {
            return res.status(400).json({ msg: 'User ID is missing' });
        }

        const newExpense = new Expense({
            amount,
            category,
            icon,
            userId  // Make sure the userId is correctly set
        });

        await newExpense.save();
        res.json(newExpense); // Return the new income
    } catch (err) {
        console.error('Error saving expense:', err.message);
        res.status(500).send('Server error');
    }
};





const getExpenses = async (req, res) => {
    try {

        const userId = req.user.id;

        if (!req.user || !userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        const expenses = await Expense.find({ userId });

        if (!expenses || expenses.length === 0) {
            return res.status(404).json({ message: "No expenses found" });
        }

        res.json({
            expenses,
            message: "Fetched successfully"
        });

    } catch (err) {
        console.error("Error fetching expenses:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};




const deleteExpense = async (req, res) => {
    try {
        const userId = req.user.id; // Get the user ID from the authenticated user
        const { id } = req.params; // Get income ID from URL params

        // Check if user is authenticated and userId exists
        if (!userId || !req.user) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        // Check if incomeId exists in the request
        if (!id) {
            return res.status(400).json({ message: "Expense ID is required" });
        }

        // Find the income by incomeId and userId
        const expense = await Expense.findOne({ _id: id, userId });

        // If no income is found
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        // Delete the income
        await Expense.findByIdAndDelete(id);

        // Return success response
        res.json({
            message: "Income deleted successfully",
            expenseId: id
        });
    } catch (err) {
        console.error("Error deleting expense:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};


// const generateCSV = async (expenses) => {
//     // Get user's default "Downloads" folder
//     const downloadsPath = path.join(require("os").homedir(), "Downloads");
  
//     // File path to save the CSV in Downloads folder
//     const filePath = path.join(downloadsPath, "expenses.csv");
  
//     // Prepare data to be written to the CSV (with formatted date)
//     const formattedExpenses = expenses.map((expense) => ({
//       amount: expense.amount,
//       category: expense.category,
//       date: expense.date.toLocaleDateString("en-GB"), // Format as DD/MM/YYYY
//     }));
  
//     // Write the data to a CSV file
//     const ws = fs.createWriteStream(filePath);
//     return new Promise((resolve, reject) => {
//       fastcsv
//         .write(formattedExpenses, { headers: true })
//         .on("finish", () => resolve(filePath))
//         .on("error", (err) => reject(err))
//         .pipe(ws);
//     });
//   };
  



const generateCSV = async (expenses) => {
    const downloadsPath = path.join(require("os").homedir(), "Downloads");
    const filePath = path.join(downloadsPath, "expenses.csv");
  
    const formattedExpenses = expenses.map((expense) => ({
      amount: expense.amount,
      category: expense.category,
      date: expense.date.toLocaleDateString("en-GB"),
    }));
  
    const ws = fs.createWriteStream(filePath);
    return new Promise((resolve, reject) => {
      fastcsv
        .write(formattedExpenses, { headers: true })
        .on("finish", () => {
          ws.end(); // Close the stream explicitly
          resolve(filePath);
        })
        .on("error", (err) => reject(err))
        .pipe(ws);
    });
  };



  // Controller to handle CSV export
  const exportCsv = async (req, res) => {
    try {
      const expenses = await Expense.find(); // Fetch data from MongoDB
  
      // Generate CSV and save it in Downloads folder
      const filePath = await generateCSV(expenses);
  
      // Send file for download (to the default "Downloads" folder)
      res.download(filePath, "expenses.csv", (err) => {
        if (err) {
          console.error("Error sending file:", err);
          res.status(500).json({ error: "Error exporting CSV" });
        }
      });
    } catch (error) {
      console.error("Error exporting CSV:", error);
      res.status(500).json({ error: "Error exporting CSV" });
    }
  };
  

// const exportCsv = async (req, res) => {
//     try {
//       const expenses = await Expense.find(); // Fetch data from MongoDB
  
//       // Generate CSV and save it in Downloads folder
//       const filePath = await generateCSV(expenses);
  
//       // Send file for download
//       res.download(filePath, "expenses.csv", (err) => {
//         if (err) {
//           console.error("Error sending file:", err);
//           res.status(500).json({ error: "Error exporting CSV" });
//         }
//         // Optionally, delete the file after sending it
//         fs.unlink(filePath, (err) => {
//           if (err) console.error("Error deleting file:", err);
//         });
//       });
//     } catch (error) {
//       console.error("Error exporting CSV:", error);
//       res.status(500).json({ error: "Error exporting CSV" });
//     }
//   };

  
module.exports = {addExpense, getExpenses, deleteExpense, exportCsv}