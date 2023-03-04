const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

// token verify
const verifyToken = async (req, res, next) => {
	const { authorization } = req.headers;
	const token = authorization?.split(" ")[1];
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err) {
				res.status(401).json("token is not valid");
			} else {
				req.user = user;
				next();
			}
		});
	} else {
		res.status(401).json("sorry! you are not a login user");
	}
};

module.exports = verifyToken;
