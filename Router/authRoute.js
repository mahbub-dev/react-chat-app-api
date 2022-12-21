const router = require("express").Router();
const {
	userLogin,
	singupConfirm,
	sendConfirmEmail,
	verifyToken,
	resetPassword,
} = require("../Controller/authController");

// login
router.post("/login", userLogin);
router.get("/signup/confirm/:code", singupConfirm);
router.post("/emailverification", verifyToken, sendConfirmEmail);
router.post("/resetpassword", resetPassword);
module.exports = router;
