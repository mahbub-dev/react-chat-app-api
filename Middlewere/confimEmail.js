const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const { createError, errorResponse } = require("../Utils/errorHandle");
// token verify
const confirmEmail = async (req, res, next) => {
	try {
		const { email, code } = req.query;
		let user = await User.findOne({
			$or: [{ email }, { _id: req?.query?.id }],
		});
		!user && createError("user not exist", 404);
		req.id = user._id.toString();
		const condition = user?.confirmCode?.expiersAt > Date.now();
		const condition2 = user?.confirmCode?.value !== code;
		const update = async () => {
			return await User.findByIdAndUpdate(
				user._id.toString(),
				{ $unset: { confirmCode: 1 }, $set: { isVerydfied: true } },
				{ new: true }
			);
		};
		!condition && createError("expired", 400);
		condition2 && createError("invalid code", 401);
		update();
		const token = jwt.sign(
			{ id: user._id.toString() },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);
		!token && createError("somthing went wrong with jwt", 500);
		res.status(200).json(token);
	} catch (error) {
		errorResponse(res, error);
	}
};

module.exports = confirmEmail;
