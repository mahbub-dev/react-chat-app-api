const User = require("../Model/User");
const sendMail = require("../Utils/sendMail");
const bcrypt = require("bcrypt");
// create
const createUser = async (req, res) => {
	const { username, email, phone, password } = req.body.signupData;
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);

	try {
		const userlist = await User.findOne({
			$or: [{ username }, { email }, { phone }],
		});
		if (userlist) {
			res.json({
				message: 'please provide unique "username","phone","email"',
			});
		} else {
			// email verification
			const token = sendMail(email, true);

			let createUser = {
				username,
				email,
				phone,
				password: hashPassword,
				token,
			};
			const user = new User(createUser);
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
	let { updateUserData } = req.body;
	const salt = await bcrypt.genSalt(10);
	let userId = req.user.id;

	// req?.body?.userId ? (userId = req.body.userId) : (userId = req.user.id);
	try {
		const user = await User.findById(userId);
		if (updateUserData?.oldPass) {
			const isMatch = await bcrypt.compare(
				updateUserData.oldPass,
				user.password
			);
			if (isMatch) {
				const hassPassword = await bcrypt.hash(
					updateUserData.newPass,
					salt
				);
				updateUserData = { password: hassPassword };
			} else {
				return res.json("wrongPass");
			}
		}
		await User.findByIdAndUpdate(userId, {
			$set: updateUserData,
		});
		const updatedUser = await User.findById(userId);
		const { password, ...others } = updatedUser._doc;
		res.status(200).json(others);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

// search user
const getUser = async (req, res) => {
	try {
		const email = req?.query?.email;
		const search = req?.query?.search;
		const usersId = req?.query?.usersId;
		const loggedUser = req?.query?.loggedUser;
		const userId = req.user.id;
		if (email) {
			const user = await User.findOne({ email });
			if (user) {
				res.status(201).json({ isEmail: true });
			} else {
				res.status(201).json({ isEmail: false });
			}
		}
		if (loggedUser !== undefined) {
			let user = await User.findById(userId);
			const { password, ...others } = user._doc;
			return res.status(200).json(others);
		}

		if (search !== undefined) {
			let users = await User.find();
			const filterUser = users.filter(
				(i) =>
					i.username.toLowerCase().includes(search.toLowerCase()) ||
					i.phone.includes(search) ||
					(i.email.toLowerCase().includes(search.toLowerCase()) &&
						i._id.toString() !== userId)
			);

			if (filterUser.length === 0) {
				return res.status(200).json(users);
			} else {
				return res.status(200).json(filterUser);
			}
		}
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

// get user
const getUserById = async (req, res) => {
	const userId = req.params.userId;
	try {
		if (userId === undefined) {
			res.status(404).json("user not found");
		} else {
			const user = await User.findById(userId);
			res.status(200).json(user);
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
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
module.exports = {
	createUser,
	updateUser,
	getUser,
	deleteUser,
	uploadFile,
	getUserById,
};
