const Conversation = require("../Model/Conversation");

// add conversation
const addConversation = async (req, res) => {
    const senderId = req.user.id;
	const { receiverId } = req.body;
	const newConversation = new Conversation({
		member: [senderId, receiverId]
	});
	try {
		const savedConversation = await newConversation.save();
		res.status(200).json(savedConversation);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

// get a user conversation
const getConversation = async (req, res) => {
	try {
		const conversation = await Conversation.find({
			member: { $in: [req.params.userId] },
		});
		res.status(200).json(conversation);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

// get two user conversation
const getTwoUserConversation = async (req, res) => {
	const { firstUserId, secondUserId } = req.params;
	try {
		const conversation = await Conversation.find({
			member: { $all: [firstUserId, secondUserId] },
		});
		res.status(200).json(conversation);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

module.exports = { addConversation, getConversation, getTwoUserConversation };
