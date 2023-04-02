const User = require("../Model/User");
const { createError, errorResponse } = require("../Utils/errorHandle");

const checkUserByEmail = async (req, res, next) => {
	try {
		const value = req.params.email;
		console.log(value);
		const user = await User.findOne({
			$or: [
				{ email: value },
				{ phone: value },
				{ username: value },
				{ _id: req.query.id },
			],
		});
		!user && createError("user not exist", 404);
		req.confirmUser = user;
		next();
	} catch (error) {
		errorResponse(res, error);
	}
};
const checkUserById = (id) => {};
module.exports = { checkUserByEmail };
