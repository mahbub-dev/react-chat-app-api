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
	singupConfirm,
} = require("../Controller/user/userController");

// create user
router.post("/register", createUser);

//update user
router.put("/", verifyToken, updateUser);

//get user
router.get("/", verifyToken, searchUser);

// get by user id
router.get("/:userId", getUserById);

// delete user
router.delete("/:userId", deleteUser);

// reset password
router.post("/passreset/", verifyToken, resetPassword);
// change email
router.post("/changemail/", verifyToken);
module.exports = router;
