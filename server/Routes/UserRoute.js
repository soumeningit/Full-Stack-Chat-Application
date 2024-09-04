const express = require("express");
const router = express.Router();

// import controller,
const { auth } = require("../Middleware/Auth")

const { otpSender, signUp, logIn } = require("../controller/Auth")
const { updateUser } = require("../controller/User")

const {
    resetPasswordToken,
    resetPassword,
} = require("../controller/ResetPassword")

// fixed route
router.post("/login", logIn)

// // Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", otpSender)


// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

router.post("/updateUser", auth, updateUser);

module.exports = router