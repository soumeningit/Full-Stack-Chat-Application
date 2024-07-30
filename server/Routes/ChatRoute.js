const express = require("express");
const router = express.Router();

const { searchUser, createChat, getChat, createGroupChat, renameGroup, addToGroup, removeFromGroup, searchUserToCreateGroup } = require("../controller/Chat")

const { auth } = require("../Middleware/Auth");

router.post("/search-user", auth, searchUser);
router.post("/create-chat", auth, createChat);
router.get("/get-chat", auth, getChat);
router.post("/create-group-chat", auth, createGroupChat);
router.post("/rename-group", auth, renameGroup);
router.post("/add-to-group", auth, addToGroup);
router.post("/remove-from-group", auth, removeFromGroup);
router.get("/search-for-create-group", auth, searchUserToCreateGroup);



module.exports = router