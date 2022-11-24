const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
	{
		conversationId: {
			type: String,
		},
		sender: {
			type: String,
		},
		message: {
			text: {
				type: String,
			},
			image: {
				type: Array,
				default:[]
			},
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
