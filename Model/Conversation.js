const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
	{
		participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		convType: String,
		message: [
			{
				type: Object,
				sender: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
				text: { type: String, default: "Say assalamualaikum" },
				image: Array,
				audio: Array,
				video: Array,
				createdAt: { type: String, default: Date.now() },
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
