const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
	{
		member: {
			type: Array,
		},
		lastSms: {
			sender: { type: String },
			sms: { type: String, default: "Say assalamualaikum" },
			timestamps: { type: String, default: Date.now() },
		},
		totalUnseen: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
