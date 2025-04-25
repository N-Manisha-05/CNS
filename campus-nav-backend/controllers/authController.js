// const User = require('../models/User');

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// require('dotenv').config(); // Load environment variables

// const { validationResult } = require("express-validator");


// exports.signup = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         console.log("\n🔹 Received Signup Request:", { name, email, password });

//         let user = await User.findOne({ email });
//         if (user) {
//             console.log("❌ User already exists!");
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // ✅ Ensure password is hashed once
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         console.log("✅ Hashed Password Before Storing:", hashedPassword);

//         // ✅ Save correctly into the database
//         user = new User({
//             name,
//             email,
//             password: hashedPassword, // Store only hashed password
//         });

//         await user.save();
//         console.log("✅ User successfully registered!");

//         res.status(201).json({ message: "Signup successful!" });
//     } catch (error) {
//         console.error("❌ Signup Error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         console.log("\n🔹 Received Login Request:", { email, password });

//         const user = await User.findOne({ email });
//         if (!user) {
//             console.log("❌ User not found!");
//             return res.status(400).json({ message: "Invalid email or password." });
//         }

//         console.log("✅ User Found:", user.email);
//         console.log("Stored Hashed Password:", user.password);

//         // ✅ Ensure password comparison is done correctly
//         const isMatch = await bcrypt.compare(password, user.password);
//         console.log("🔍 Password Match:", isMatch);

//         if (!isMatch) {
//             console.log("❌ Incorrect Password!");
//             return res.status(400).json({ message: "Invalid email or password." });
//         }

//         // ✅ Generate token upon successful login
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//         console.log("✅ Login Successful! Sending Token...");
//         res.status(200).json({ message: "Login successful", token });
//     } catch (error) {
//         console.error("❌ Login Error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config();

// Helper function for error responses
const handleErrorResponse = (res, statusCode, message, error = null) => {
  if (error) console.error('❌ Error:', error);
  return res.status(statusCode).json({ success: false, message });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    // 1. Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleErrorResponse(res, 400, 'Validation failed', errors.array());
    }

    const { name, email, password } = req.body;

    // 2. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return handleErrorResponse(res, 409, 'Email already in use');
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    // 5. Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 6. Send response (excluding password hash)
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: userResponse
    });

  } catch (error) {
    handleErrorResponse(res, 500, 'Registration failed', error);
  }
};

// @desc    Login user
// // @route   POST /api/auth/login

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("\n🔹 Received Login Request:", { email, password });

        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ User not found!");
            return res.status(400).json({ message: "Invalid email or password." });
        }

        console.log("✅ User Found:", user.email);
        console.log("📌 Stored Hashed Password in DB:", user.password);

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔍 Password Match Result:", isMatch);

        if (!isMatch) {
            console.log("❌ Password does NOT match!");
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // If password matches, generate a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("✅ Login Successful! Sending Token...");
        return res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};




// exports.login = async (req, res) => {
//     try {
//       const { email, password } = req.body;
      
//       // Trim and log inputs
//       const cleanEmail = email.trim();
//       const cleanPassword = password.trim();
//       console.log('Login attempt with:', { cleanEmail, cleanPassword });
  
//       // Case-insensitive email search
//       const user = await User.findOne({ 
//         email: { $regex: new RegExp(`^${cleanEmail}$`, 'i') }
//       }).select('+password');
  
//       if (!user) {
//         console.log('User not found for email:', cleanEmail);
//         return handleErrorResponse(res, 401, 'Invalid credentials');
//       }
  
//       // Debug password comparison
//       console.log('Stored hash:', user.password);
//       const isMatch = await bcrypt.compare(cleanPassword, user.password);
//       console.log('Password match result:', isMatch);
  
//       if (!isMatch) {
//         console.log('Password mismatch for user:', user.email);
//         return handleErrorResponse(res, 401, 'Invalid credentials');
//       }
  
//       // Rest of your login logic...
//     } catch (error) {
//       console.error('Login error:', error);
//       handleErrorResponse(res, 500, 'Login failed', error);
//     }
//   };
// exports.login = async (req, res) => {
//   try {
//     // 1. Validate request body
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return handleErrorResponse(res, 400, 'Validation failed', errors.array());
//     }

//     const { email, password } = req.body;

//     // 2. Find user
//     const user = await User.findOne({ email }).select('+password');
//     if (!user) {
//       return handleErrorResponse(res, 401, 'Invalid credentials');
//     }

//     // 3. Verify password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return handleErrorResponse(res, 401, 'Invalid credentials');
//     }

//     // 4. Generate JWT
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     // 5. Prepare user data (excluding password)
//     const userResponse = user.toObject();
//     delete userResponse.password;

//     // 6. Send response
//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       token,
//       user: userResponse
//     });

//   } catch (error) {
//     handleErrorResponse(res, 500, 'Login failed', error);
//   }
// };

// @desc    Get current user (protected route)
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return handleErrorResponse(res, 404, 'User not found');
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    handleErrorResponse(res, 500, 'Server error', error);
  }
};