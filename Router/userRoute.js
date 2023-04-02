const router = require("express").Router();

const verifyToken = require("../Middlewere/verifyToken");
const { checkUserByEmail } = require("../Middlewere/checkUser");
const {
	createUser,
	updateUser,
	searchUser,
	deleteUser,
	getUserById,
	resetPassword,
	changeMail,
	singupConfirm,
} = require("../Controller/user/userController");

// create user
router.post("/register", createUser);

//update user
router.put("/", verifyToken, updateUser);

//search user
router.get("/", verifyToken, searchUser);

// get by user id
router.get("/:userId", getUserById);

// delete user
router.delete("/:userId", deleteUser);

// reset password
router.post("/passreset/", verifyToken, resetPassword);
// change email
router.post("/changemail/", verifyToken, changeMail);
module.exports = router;
