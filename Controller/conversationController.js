const Conversation = require("../Model/Conversation");
const Message = require("../Model/Message");

// add conversation
const addConversation = async (req, res) => {
	const senderId = req.user.id;
	const { receiverId } = req.body;
	
	try {
		const pattern1 = [senderId, receiverId];
		const pattern2 = [receiverId, senderId];
		const conversation = await Conversation.find();
		const targetedConv = conversation.find((i) =>
			pattern1.every((ev) => i.member.includes(ev))
		);
		if (targetedConv) {

			res.status(200).json(targetedConv);
		} else {
			const newConversation = new Conversation({
				member: [senderId, receiverId],
			});
			const savedConversation = await newConversation.save();
			res.status(200).json(savedConversation);
		}
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
		if (conversation.length >= 1) {
			res.status(200).json(conversation);
		} else {
			res.status(404).json("not found");
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

const deleteConversation = async (req, res) => {
	try {
		const convId = req.params.convId;
		const deleteMessage = await Message.deleteMany({
			conversationId: convId,
		});
		const deleteConv = await Conversation.findByIdAndDelete(convId);
		res.status(200).json(deleteConv);
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

const getAllConversation = async (req, res) => {
	try {
		const conversation = await Conversation.find();
		let userLastMessage = [];
		conversation.forEach((i) => {});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};
module.exports = {
	addConversation,
	getConversation,
	getTwoUserConversation,
	deleteConversation,
};
