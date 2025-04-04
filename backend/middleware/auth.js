// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const token = req.header("Authorization"); // Token ko headers se lo

//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
//     req.user = decoded.user; // Store user in request
//     next(); // Proceed to next middleware
//   } catch (err) {
//     console.log(err)
//     res.status(401).json({ message: "Invalid token", });
//   }
// };





const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');  // or req.header('Authorization')

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

        req.user = decoded.user; // Store user information in req.user
        next(); // Continue to the next middleware or route
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Token has expired. Please log in again.' }); // Custom message for expired token
        }

        console.error('JWT Error:', err);
        return res.status(401).json({ msg: 'Invalid token' }); // Handle invalid token
    }
};

module.exports = auth;
