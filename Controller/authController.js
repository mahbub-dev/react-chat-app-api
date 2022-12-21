const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../Utils/sendMail");
const router = require("../Router/userRoute");

// login
const userLogin = async (req, res) => {
	try {
		const { loginId, password } = req.body.loginData;
		// find requested user
		const loginuser = await User.findOne({
			$or: [{ email: loginId }, { phone: loginId }],
		});

		// matching password
		if (loginuser) {
			const isMatchPassword = await bcrypt.compare(
				password,
				loginuser.password
			);
			if (isMatchPassword) {
				if (loginuser.token !== "confirmed") {
					res.status(201).json({
						msg: "not verified",
						email: loginuser.email,
					});
					const token = sendMail(loginuser.email, true);
					token && (loginuser.token = token);
					await loginuser.save();
				} else {
					const token = jwt.sign(
						{ id: loginuser._id },
						process.env.JWT_SECRET
					);
					if (token) {
						res.status(200).json({ loginuser, token });
					} else {
						res.status(500);
					}
				}
			} else {
				res.status(403).json("wrong credencial");
			}
		} else {
			res.status(404).json("user not found");
		}
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const singupConfirm = async (req, res) => {
	const code = req.params.code;
	const email = req.query?.email;
	const isReqFormClient = req.query?.client;
	if (code) {
		try {
			let user = await User.findOne({ email });
			if (user) {
				if (user.token === code) {
					// const { _doc } = user;
					// const { token, ...other } = _doc;
					// user._doc = other;

					user.token = "confirmed";
					const veryfied = await User.findOneAndUpdate(
						{ email },
						{
							$set: user,
						},
						{ new: true }
					);
					if (isReqFormClient) {
						res.status(200).json("confirmed");
					} else {
						res.status(301).redirect(
							`${process.env.CROSS_ORIGIN}/signup/confirm/?veryfied="true"`
						);
					}
				} else {
					res.status(404).json("invalid code");
				}
			} else {
				res.status(404).json("not found");
			}
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	}
};
// token verify
const verifyToken = async (req, res, next) => {
	const { authorization } = req.headers;
	const token = authorization?.split(" ")[1];
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err) {
				res.status(403).json("token is not valid");
			} else {
				req.user = user;
				next();
			}
		});
	} else {
		res.status(403).json("sorry! you are not a login user");
	}
};

const sendConfirmEmail = async (req, res) => {
	const userId = req.user.id;
	const email = req?.query?.email;
	const password = req.body.password;

	if (email && password) {
		let user = await User.findOne({ _id: userId });
		const isMatch = await bcrypt.compare(password, user.password);
		if (isMatch) {
			const token = sendMail(email, false);
			res.status(200).json({ token });
		} else {
			res.json("invalidPass");
		}
	} else {
		const user = await User.findOne({ email });
		console.log(user);
		user ? res.json(false) : res.json(true);
	}
};

const resetPassword = async (req, res) => {
	const { email, password } = req.body;
	const sendmail = req?.query?.sendmail;
	console.log(sendmail);
	try {
		if (sendmail) {
			const emailId = req?.query?.email;
			console.log(emailId);
			const user = await User.findOne({ email: emailId });
			if (user) {
				const token = sendMail(emailId, false);
				return res.status(200).json({ token });
			} else {
				return res.status(404).json({ msg: "user not found" });
			}
		}

		bcrypt.hash(password, 10, async (err, data) => {
			if (data) {
				await User.findOneAndUpdate(
					{ email },
					{ $set: { password: data } }
				);
				res.json("success");
			} else {
				res.json("failed");
			}
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

module.exports = {
	userLogin,
	verifyToken,
	singupConfirm,
	sendConfirmEmail,
	resetPassword,
};
