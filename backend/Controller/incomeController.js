const Income = require("../Models/IncomeModel")

// const addIncome = async (req, res) => {
//     const { amount, category, icon } = req.body;

//     // Check if the required fields are provided
//     if (!amount || !category || !icon) {
//         return res.status(400).json({ message: 'Please provide all required fields.' });
//     }

//     try {
//         // Make sure req.user.id is available after JWT validation
//         if (!req.user || !req.user.id) {
//             return res.status(401).json({ message: 'Unauthorized: No user found' });
//         }

//         // Create a new income record with the user ID from req.user.id
//         const newIncome = new Income({
//             amount,
//             category,
//             icon,
//             user: req.user.id, // Use authenticated user's ID
//         });

//         // Save the new income record
//         await newIncome.save();

//         // Send success response with the new income data
//         res.status(201).json({
//             message: 'Income added successfully',
//             success: true,
//             data: newIncome,
//         });
//     } catch (err) {
//         console.error('Error adding income:', err.message);
//         res.status(500).json({
//             message: 'Server error while adding income',
//             success: false,
//             error: err.message,
//         });
//     }
// };



const addIncome = async (req, res) => {
    try {
        const { amount, category, icon } = req.body;
        const userId = req.user.id; // Get the userId from the validated JWT

        if (!userId) {
            return res.status(400).json({ message: 'User ID is missing' });
        }

        const newIncome = new Income({
            amount,
            category,
            icon,
            userId  // Make sure the userId is correctly set
        });

        await newIncome.save();
        res.json(newIncome); // Return the new income
    } catch (err) {
        console.error('Error saving income:', err.message);
        res.status(500).send('Server error');
    }
};





const getIncomes = async (req, res) => {
    try {

        const userId = req.user.id;

        if (!req.user || !userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        const incomes = await Income.find({ userId });

        if (!incomes || incomes.length === 0) {
            return res.status(404).json({ message: "No incomes found" });
        }

        res.json({
            incomes,
            message: "Fetched successfully"
        });

    } catch (err) {
        console.error("Error fetching incomes:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};




const deleteIncome = async (req, res) => {
    try {
        const userId = req.user.id; // Get the user ID from the authenticated user
        const { id } = req.params; // Get income ID from URL params

        // Check if user is authenticated and userId exists
        if (!userId || !req.user) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        // Check if incomeId exists in the request
        if (!id) {
            return res.status(400).json({ message: "Income ID is required" });
        }

        // Find the income by incomeId and userId
        const income = await Income.findOne({ _id: id, userId });

        // If no income is found
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }

        // Delete the income
        await Income.findByIdAndDelete(id);

        // Return success response
        res.json({
            message: "Income deleted successfully",
            incomeId: id
        });
    } catch (err) {
        console.error("Error deleting income:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = {addIncome, getIncomes, deleteIncome}