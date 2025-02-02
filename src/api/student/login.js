// login.js
const express = require("express");
const router = express.Router();

// Define a login route
router.post("/", (req, res) => {
   const { username, password } = req.body;

   // Check if username and password are provided
   if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
   }

   // Simulate a user check (replace with your actual logic)
   if (username === "admin" && password === "password") {
      return res.status(200).json({ message: "Login successful" });
   }

   // If credentials are invalid
   return res.status(401).json({ message: "Invalid username or password" });
});


// Export the router
module.exports = router;