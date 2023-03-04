const router = require("express").Router();
const {
	userLogin,
	singupConfirm,
	sendConfirmEmail,
	resetPassword,
	checkUser,
} = require("..//Controller/auth/authController");
const verifyToken = require("../Middlewere/verifyToken");
const confirmEmail = require("../Middlewere/confimEmail");
const { checkUserByEmail } = require("../Middlewere/checkUser");
const sendMail = require("../Middlewere/sendMail");

router.post("/login", userLogin);
router.get("/:email", checkUser);
router.post("/confirm", confirmEmail);
router.post("/sendCode/:email", checkUserByEmail, sendMail);
router.post("/emailverification", verifyToken, sendConfirmEmail);

module.exports = router;
