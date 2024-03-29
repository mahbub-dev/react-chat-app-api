const { createError, errorResponse } = require("../../Utils/errorHandle");
const path = require("path");
const fs = require("fs");
const userService = require("./userService");
const axios = require("axios");
const { getRootUrl } = require("../../Utils/getRootUrl");
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
			rootUrl: getRootUrl(req),
		});
		res.status(201).json(response);
	} catch (err) {
		errorResponse(res, err);
	}
};

// update
const updateUser = async (req, res) => {
	try {
		let {
			username,
			email,
			profilePicture,
			password,
			phone,
			oldPass,
			newPass,
		} = req.body;

		// if (req?.files) {
		// const newProfilePicture = `${process.env.API_ROOT_URL}/uploads/${req.files[0].filename}`;
		// check if there is an existing file or not
		// 	fs.readdir(
		// 		`${path.dirname(require.main.filename)}/uploads`,
		// 		(err, files) => {
		// 			if (err) throw err;
		// 			if (files.includes(profilePicture?.split("/")[4])) {
		// 				fs.unlink(
		// 					`${path.dirname(require.main.filename)}/uploads/${
		// 						profilePicture?.split("/")[4]
		// 					}`,
		// 					(err, info) => {
		// 						if (err) throw err;
		// 					}
		// 				);
		// 			} else return;
		// 		}
		// 	);
		// 	data.profilePicture = newProfilePicture;
		// }
		console.log(req);
		!Object.keys(req.body).length === 0 &&
			createError("provided data is not valid", 401);
		const response = await userService.update(req.user.id, req.body);
		res.status(200).json(response);
	} catch (err) {
		errorResponse(res, err);
	}
};

// search user
const searchUser = async (req, res) => {
	try {
		const search = req.query?.search;
		const response = await userService.search(search, req?.user?.id);
		res.status(200).json(response);
	} catch (e) {
		errorResponse(res, e);
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
		const password = req.body.password;
		const code = req.body.code;
		const response = await userService.changeMail(
			id,
			email,
			password,
			code
		);
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
