﻿const Message = require("../Model/Message");
const Conversation = require("../Model/Conversation");

// add Message
const addMessage = async (req, res) => {
	const { conversationId, message } = req.body;
	const { images, text } = message;
	const sender = req.user.id;
	try {
		const conversation = await Conversation.findById(conversationId);
		if (conversation) {
			const newMessage = new Message({
				conversationId,
				sender,
				message: { text, images: images },
			});
			const savedMessage = await newMessage.save();
			res.status(200).json(savedMessage);
		} else {
			res.json("404 not found");
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

// get message
const getMessage = async (req, res) => {
	const { conversationId } = req.params;
	try {
		const message = await Message.find({
			conversationId,
		});
		res.status(200).json(message);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

module.exports = { addMessage, getMessage };
