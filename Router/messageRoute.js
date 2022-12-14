const router = require("express").Router();
const { addMessage, getMessage } = require("../Controller/messageController");
const { verifyToken } = require("../Controller/authController");

// add message
router.post("/", verifyToken, addMessage);

// get message
router.get("/:conversationId", verifyToken, getMessage);

module.exports = router;
