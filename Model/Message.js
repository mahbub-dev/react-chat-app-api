const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
	{
		conversationId: {
			type: String,
			required: true,
		},
		sender: {
			type: String,
		},
		message: {
			text: {
				type: String,
			},
			images: {
				type: Array,
				default: [],
			},
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
