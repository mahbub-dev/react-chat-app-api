const { createError, errorResponse } = require("../../Utils/errorHandle");
const userService = require("./userService");
// create
const createUser = async (req, res) => {
	try {
		const { username, email, phone, password } = req.body;
		(!username || !email || !phone || !password) &&
			createError("please fillup the requred fields", 400);
		const response = await userService.create({
			username,
			email,
			phone,
			password,
		});
		res.status(201).json(response);
	} catch (err) {
		errorResponse(res, err);
	}
};

// update
const updateUser = async (req, res) => {
	try {
		let { updateUserData } = req.body;
		!updateUserData && createError("provided data is not valid", 401);
		const response = await userService.update(req.user.id, updateUserData);
		res.status(200).json(response);
	} catch (err) {
		errorResponse(res, err);
	}
};

// search user
const searchUser = async (req, res) => {
	try {
		const search = req.query?.search;
		const response = await userService.search(search);
		res.status(200).json(response);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

// get user
const getUserById = async (req, res) => {
	try {
		const userId = req.params.userId;
		!userId && createError("required data missing", 401);
		const response = await userService.getUser(userId);
		res.status(200).json(response);
	} catch (err) {
		errorResponse(res, err);
	}
};

// deleteUser
const deleteUser = async (req, res) => {
	try {
		const { userId } = req.params;
		!userId && createError("required feild missing", 400);
		await userService.delete(userId);
		res.status(200).json("user delete successfuly");
	} catch (e) {
		errorResponse(res, e);
	}
};

// change mail
const changeMail = async (req, res) => {
	try {
		const id = req.user.id;
		const email = req.body.email;
		const response = await userService.resetPass(id, email);
		res.status(200).json(response);
	} catch (error) {
		errorResponse(res, error);
	}
};

// reset password
const resetPassword = async (req, res) => {
	try {
		const id = req.user.id;
		const password = req.body.password;
		const response = await userService.resetPass(id, password);
		res.status(200).json(response);
	} catch (err) {
		errorResponse(res, err);
	}
};
// upload file
module.exports = {
	createUser,
	updateUser,
	searchUser,
	deleteUser,
	getUserById,
	changeMail,
	resetPassword,
};
