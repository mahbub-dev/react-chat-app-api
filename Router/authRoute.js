const router = require("express").Router();
const {userLogin} = require("../Controller/authController");

// login
router.post("/login", userLogin);


module.exports = router;
