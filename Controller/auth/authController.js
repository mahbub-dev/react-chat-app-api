const { errorResponse, createError } = require("../../Utils/errorHandle");
const { Login } = require("./authDb");
const authService = require("./authService");

// login
const userLogin = async (req, res) => {
	try {
		const { loginId, password } = req.body;
		// find requested user
		const response = await authService.login(loginId, password);
		res.status(200).json(response);
	} catch (e) {
		errorResponse(res, e);
	}
};

const singupConfirm = async (req, res) => {
	try {
		const id = req.id;
		const redirect = req.query?.redirect;
		// get res from inner layer
		const response = await authService.signupConfirm(id, isReqFormClient);
		// send Response
		!response &&
			console.log(response) &&
			createError("something went wrong", 500);
		redirect
			? res
					.status(301)
					.redirect(
						`${process.env.CROSS_ORIGIN}/signup/confirm/?veryfied="true"`
					)
			: res.status(200).json("confirmed");
	} catch (err) {
		errorResponse(res, err);
	}
};

// checking user
const checkUser = async (req, res) => {
	try {
		const checkUser = new Login(req?.params?.email);
		const user = await checkUser.getUser();
		user && createError("user is already exist", 400);
		res.status(200).json(true);
	} catch (error) {
		errorResponse(res, error);
	}
};
const sendConfirmEmail = async (req, res) => {
	try {
		const userId = req.user.id;
		const email = req?.query?.email;
		const password = req.body.password;
		(!userId || !email || !password) && createError("400 bad request", 400);
		const response = await authService.sendConfirmEmail(
			userId,
			email,
			password
		);
		// send response
		res.status(200).json(response);
	} catch (error) {
		errorResponse(res, error);
	}
};


module.exports = {
	userLogin,
	singupConfirm,
	sendConfirmEmail,
	checkUser,
};
