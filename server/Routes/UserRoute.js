const express = require("express");
const router = express.Router();

// import controller,

const { otpSender, signUp, logIn } = require("../controller/Auth")

// fixed route
// router.post("POST",")

router.post("/login", logIn)

// // Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", otpSender)

// Route for Changing the password
// router.post("/changepassword", auth, changePassword)

module.exports = router