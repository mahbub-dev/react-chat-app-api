const Message = require("../Model/Message");

// add Message
const addMessage = async (req, res) => {
	const { conversationId, text } = req.body;
	const sender = req.user.id;
	const newMessage = new Message({
		conversationId,
		sender,
		text,
	});

	try {
		const savedMessage = await newMessage.save();
		res.status(200).json(savedMessage);
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
