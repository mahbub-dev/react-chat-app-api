const router = require("express").Router();
const { verifyToken } = require("../Controller/authController");
const {
	addConversation,
	getConversation,
	getTwoUserConversation,
	deleteConversation,
	updateConversation,
} = require("../Controller/conversationController");

// add conversation
router.post("/", verifyToken, addConversation);

//delete conversation
router.delete("/:convId", verifyToken, deleteConversation);

//get conversation
router.get("/:userId", verifyToken, getConversation);

// get two user conversation
router.get("/find/:firstUserId/:secondUserId", getTwoUserConversation);

// update conversation
router.put("/update", updateConversation);
module.exports = router;
