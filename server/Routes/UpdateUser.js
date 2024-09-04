const express = require("express");
const router = express.Router();

// import controller,
const { auth } = require("../Middleware/Auth")

const { updateUser, contactUs } = require("../controller/User")

router.post("/updateUser", auth, updateUser);
router.post("/contactUs", auth, contactUs);

module.exports = router