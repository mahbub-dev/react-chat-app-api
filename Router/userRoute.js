const router = require("express").Router();

const { verifyToken } = require("../Controller/authController");
const {
	createUser,
	updateUser,
	getUser,
	deleteUser,
} = require("../Controller/userController");

// create user
router.post("/register", createUser);

//update user

router.put("/", verifyToken, updateUser);

//get user
router.get("/", verifyToken, getUser);

// delete user
router.delete("/:userId", deleteUser);



module.exports = router;
