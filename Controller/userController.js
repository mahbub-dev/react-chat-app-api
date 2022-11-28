const User = require("../Model/User");
const bcrypt = require("bcrypt");
// create
const createUser = async (req, res) => {
	const { username, email, phone, password } = req.body.signupData;
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);
	const user = new User({
		username,
		email,
		phone,
		password: hashPassword,
	});
	try {
		const userlist = await User.findOne({
			$or: [{ username }, { email }, { phone }],
		});
		if (userlist) {
			res.json({
				message: 'please provide unique "username","phone","email"',
			});
		} else {
			const newUser = await user.save();
			const { password, ...others } = newUser._doc;
			res.status(200).json(others);
		}
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

// update
const updateUser = async (req, res) => {
	const { updateUserData } = req.body;
	const salt = await bcrypt.genSalt(10);

	if (updateUserData?.password) {
		const hassPassword = await bcrypt.hash(updateUserData.password, salt);
		updateUserData.password = hassPassword;
	}
	const userId = req.user.id;
	try {
		await User.findByIdAndUpdate(userId, {
			$set: updateUserData,
		});
		const user = await User.findById(userId);
		const { password, ...others } = user._doc;
		res.status(200).json(others);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

// get
const getUser = async (req, res) => {
	const search = req.query?.search;
	const userId = req.user.id;
	try {
		const user = await User.find();
		if (search) {
			if (search === userId) {
				let user = await User.findById(userId);
				const { password, ...others } = user._doc;
				res.status(200).json(others);
			} else {
				const filterUser = user.filter(
					(i) =>
						i.username
							.toLowerCase()
							.includes(search.toLowerCase()) ||
						i.phone.includes(search) ||
						i._id.toString().includes(search.toString()) ||
						(i.email.toLowerCase().includes(search.toLowerCase()) &&
							i._id.toString() !== userId)
				);
				res.status(200).json(filterUser);
			}
		} else {
			res.status(200).json(
				user.filter((i) => i._id.toString() !== userId)
			);
		}
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

// deleteUser
const deleteUser = async (req, res) => {
	const { userId } = req.params;
	try {
		const deletedUser = await User.findByIdAndDelete(userId);
		res.status(200).json({ deletedUser: deleteUser });
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

// upload file

const uploadFile = async (req, res, next) => {
	console.log(req.file);
};
module.exports = { createUser, updateUser, getUser, deleteUser, uploadFile };
