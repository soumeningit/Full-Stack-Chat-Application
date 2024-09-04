const express = require("express");
const router = express.Router();

const { auth } = require("../Middleware/Auth")

const { sendMessage, allMessages } = require("../controller/Message");

router.post("/send-message", auth, sendMessage);
router.post("/allMessages", auth, allMessages);


module.exports = router;