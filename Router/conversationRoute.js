const router = require("express").Router();
const verifyToken = require("../Middlewere/verifyToken");
const {
	addDualConv,
	addMessage,
	addGroupConv,
	getConversation,
	deleteConversation,
	getMessage,
	deleteSingleMessage,
	sendReact,
	updateSeen,
} = require("../Controller/conversation/convController");

// add dual conversation
router.post("/dual/:otherId", verifyToken, addDualConv);

// add group conversation
router.post("/group/", verifyToken, addGroupConv);

// add message
router.post("/message/", verifyToken, addMessage);

// get conversation
router.get("/", verifyToken, getConversation);

// get message
router.get("/message/:convId", verifyToken, getMessage);

// delete conversation
router.delete("/:convId", verifyToken, deleteConversation);

// delete single message
router.delete("/message/:messageId", verifyToken, deleteSingleMessage);

//send react
router.post("/message/sendreact", verifyToken, sendReact);

// update seen status
router.put("/message/updateseen/:convId", verifyToken, updateSeen);
module.exports = router;
