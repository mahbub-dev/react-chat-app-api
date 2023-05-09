const { createError } = require("../../Utils/errorHandle");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Login, ConfirmEmailSend } = require("./authDb");
const sendMail = require("../../Utils/sendMail");
const { getRootUrl } = require("../../Utils/getRootUrl");
const sendingMail = require("../../Utils/sendMail");
// const { singupConfirm } = require("./authController");
// module.scaffholding
const authService = {};

// login
authService.login = async (req,username, password) => {
	try {
		// create login instacne
		const loginUser = new Login(username);

		// find user from db
		const user = await loginUser.getUser();
		!user && createError("wrong credencials", 400);

		// checking user credintials
		const isMatchPassword = await bcrypt.compare(password, user.password);
		!isMatchPassword && createError("wrong credencials", 400);

		if (!user?.isVerydfied) {
			const response = await axios.post(
				`${getRootUrl(req)}/auth//sendCode/${user?.email}`
			);
			createError("The email is not verified", 403);
		} else {
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
			!token && createError("somthing went wrong with jwt", 500);

			const { password, isVerydfied, confirmCode, ...rest } = user._doc;
			return { ...rest, token };
		}
	} catch (error) {
		throw error;
	}
};

// change email
authService.sendConfirmEmail = async (req,userId, email, password) => {
	try {
		const confirmEmailSend = new ConfirmEmailSend(userId);
		let user = await confirmEmailSend.getUserById();
		const isMatch = await bcrypt.compare(password, user.password);
		!isMatch && createError("invalid password", 403);
		return await sendingMail(
			email,
			"email change",
			user.username,
			getRootUrl(req)
		);
	} catch (error) {
		throw error;
	}
};

module.exports = authService;
