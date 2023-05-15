const nodemailer = require("nodemailer");
const sendingMail = require("../Utils/sendMail");
const User = require("../Model/User");
const { createError, errorResponse } = require("../Utils/errorHandle");
const { getRootUrl } = require("../Utils/getRootUrl");
const sendMail = async (req, res) => {
	try {
		const code = await sendingMail(
			req.params.email,
			false,
			req?.confirmUser.username,
			getRootUrl(req)
		);
		await User.findOneAndUpdate(
			{ $or: [{ email: req.params.email }, { _id: req.query.id }] },
			{
				$set: {
					confirmCode: {
						value: code,
						expiersAt: Date.now() + 1800000,
					},
				},
			},
			{ new: true }
		);
		res.status(200).json("sent");
	} catch (error) {
		errorResponse(res, error);
	}
};
module.exports = sendMail;
