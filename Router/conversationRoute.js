const router = require("express").Router();
const {verifyToken}  = require('../Controller/authController')
const {
	addConversation,
	getConversation,
	getTwoUserConversation,
} = require("../Controller/conversationController");

// add conversation
router.post("/",verifyToken, addConversation);

//get conversation
router.get("/:userId",verifyToken, getConversation);

// get two user conversation
router.get("/find/:firstUserId/:secondUserId", getTwoUserConversation);

module.exports = router;
