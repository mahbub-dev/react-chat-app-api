const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			min: 3,
			max: 20,
			unique: true,
		},
		email: {
			type: String,
			required: true,

			max: 50,
			unique: true,
		},
		phone: {
			type: String,
			default: "",
		},
		password: {
			type: String,
			required: true,
			min: 6,
		},
		profilePicture: {
			type: String,
			default: "https://cdn.onlinewebfonts.com/svg/img_312847.png",
		},
		blacklist: {
			type: Array,
			default:[]
		},
		chatList: {
			type: Array,
			default:[]
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
