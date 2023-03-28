const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		text: {
			type: String,
			default: "Say assalamualaikum",
		},
		attachment: { links: Array, fileType: String },
		react: String,
		createdAt: {
			type: Date,
			default: Date.now,
		},
		replyRef: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
		},
		seenBy: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

const conversationSchema = new mongoose.Schema(
	{
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		convType: String,
		message: [messageSchema],
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = { Conversation, Message };
