const bcrypt = require("bcrypt");
const sendMail = require("../../Utils/sendMail");
const { createError } = require("../../Utils/errorHandle");
const { Create, Update, Search, GetUser, Delete } = require("./userDb");
const axios = require("axios");

// module scaffholding
const userService = {};

// signup
userService.create = async ({ username, email, phone, password: pass }) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(pass, salt);
		const create = new Create(username, email, phone, hashPassword);
		let user = await create.getUser();
		user && createError("please provide unique email or username", 400);
		await create.createUser();
		// email verification
		await axios.post(`${process.env.API_ROOT_URL}/auth/sendCode/${email}`);
		// const { password, confirmCode, isVerydfied, ...others } = newUser._doc;
		return true;
	} catch (error) {
		throw error;
	}
};
// update
userService.update = async (id, data) => {
	try {
		const update = new Update(id);
		let user = await update.getUserById();
		let pass = user.password;
		// if there request of changing password
		const salt = await bcrypt.genSalt(10);
		if (data?.oldPass) {
			const isMatch = await bcrypt.compare(data.oldPass, user.password);
			!isMatch && createError("wrong password", 401);
			pass = await bcrypt.hash(data.newPass, salt);
			data.password = pass;
			delete data.newPass;
			delete data.oldPass;
		}
		const updatedData = await update.updateUser(data);
		const { password, ...others } = updatedData._doc;
		return others;
	} catch (error) {
		throw error;
	}
};

// search user
userService.search = async (search) => {
	try {
		const searchs = new Search(search);
		// if (loggedUser) {
		// 	let user = await searchs.searchById();
		// 	const { password, ...others } = user._doc;
		// 	return others;
		// }

		if (search) {
			const users = await searchs.searchByAny();
			return users.map((i) => {
				const { password, ...rest } = i;
				return rest;
			});
		}
	} catch (error) {
		throw error;
	}
};

// get user by id
userService.getUser = async (id) => {
	try {
		const getUser = new GetUser(id);
		const user = await getUser.getUserById();
		!user && createError("user not found", 404);
		const { password, ...rest } = user._doc;
		return rest;
	} catch (error) {
		throw error;
	}
};

// delete user from db
userService.delete = async (id) => {
	try {
		const dlt = new Delete(id);
		const user = await dlt.deleteById();
		!user && createError("user was not found", 404);
		return null;
	} catch (error) {
		throw error;
	}
};

// change email
userService.changeMail = async (id, email) => {
	try {
		const changeMail = new Update(id);
		await resetpass.updateUser({ email });
		return true;
	} catch (error) {
		throw error;
	}
};
// reset password
userService.resetPass = async (id, pass) => {
	try {
		const resetpass = new Update(id);
		const salt = await bcrypt.genSalt(10);
		const password = await bcrypt.hash(pass, salt);
		await resetpass.updateUser({ password });
		return true;
	} catch (error) {
		throw error;
	}
};

module.exports = userService;
