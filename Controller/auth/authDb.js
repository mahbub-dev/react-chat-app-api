const User = require("../../Model/User");
const { createError } = require("../../Utils/errorHandle");

// module scaffholding

// login
class Login {
	constructor(username) {
		this.username = username;
	}
	// getUser
	async getUser() {
		try {
			return await User.findOne({
				$or: [
					{ email: this.username },
					{ phone: this.username },
					// { _id: this.username },
				],
			});
		} catch (error) {
			throw error;
		}
	}

	async update(id, data) {
		try {
			return await User.findOneAndUpdate(
				{ _id: id },
				{
					$set: data,
				},
				{ new: true }
			);
		} catch (error) {
			throw error;
		}
	}
}

class ConfirmEmailSend {
	constructor(userid) {
		this._id = userid;
	}
	async getUserById() {
		try {
			return await User.findById(this._id);
		} catch (error) {
			throw error;
		}
	}
}
module.exports = { Login, ConfirmEmailSend };
