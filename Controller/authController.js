const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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
				const token = jwt.sign(
					{ id: loginuser._id },
					process.env.JWT_SECRET
				);
				if (token) {
					res.status(200).json({ loginuser, token });
				} else {
					res.status(500);
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

module.exports = { userLogin, verifyToken };
