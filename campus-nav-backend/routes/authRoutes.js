// const express = require('express');
// const { signup, login } = require('../controllers/authController');
// const { check, validationResult } = require('express-validator');

// const router = express.Router();



// router.post(
//   "/signup",
//   [
//     check("name", "Name is required").not().isEmpty(),
//     check("email", "Please include a valid email").isEmail(),
//     check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
//   ],
//   signup
// );



// // Login Route
// // router.post('/login', [
// //     check('email', 'Enter a valid email').isEmail(),
// //     check('password', 'Password is required').exists()
// // ], async (req, res) => {
// //     const errors = validationResult(req);
// //     if (!errors.isEmpty()) {
// //         return res.status(400).json({ errors: errors.array() });
// //     }
// //     login(req, res);
// // });
// // Login Route
// router.post(
//     "/login",
//     [
//       check("email", "Please include a valid email").isEmail(),
//       check("password", "Password is required").exists(),
//     ],
//     login
//   );
// module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protected routes
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;