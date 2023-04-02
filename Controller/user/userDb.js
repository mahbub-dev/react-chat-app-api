const User = require("../../Model/User");
const { createError } = require("../../Utils/errorHandle");
const { Login } = require("../auth/authDb");


// create
class Create {
	constructor(username, email, phone, password) {
		this.username = username;
		this.email = email;
		this.phone = phone;
		this.password = password;
	}
	// is user exist
	async getUser() {
		try {
			return await User.findOne({
				$or: [{ email: this.email }, { phone: this.phone }],
			});
		} catch (error) {
			throw error;
		}
	}

	// create new user
	async createUser() {
		try {
			return await User.create({
				username: this.username,
				email: this.email,
				phone: this.phone,
				password: this.password,
			});
		} catch (error) {
			throw error;
		}
	}
}

// update
class Update {
	constructor(id) {
		this.id = id;
	}
	async getUserById() {
		try {
			return await User.findById(this.id);
		} catch (error) {
			throw error;
		}
	}
	// update database
	async updateUser(data) {
		try {
			return await User.findByIdAndUpdate(
				this.id,
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

// search
class Search {
	constructor(search) {
		this.search = search;
	}
	async searchByAny() {
		try {
			const regex = new RegExp(this.search, "i");
			return await User.find({
				$or: [{ username: regex }, { phone: regex }, { email: regex }],
			});
		} catch (error) {
			throw error;
		}
	}
}

class GetUser extends Update {
	constructor(id) {
		super(id);
	}
}

class Delete {
	constructor(id) {
		this.id = id;
	}
	async deleteById() {
		try {
			return User.findByIdAndDelete(this.id);
		} catch (error) {
			throw error;
		}
	}
}
module.exports = { Create, Update, Search, GetUser, Delete };
