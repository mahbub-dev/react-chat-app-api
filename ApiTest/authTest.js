const ApiRequest = require("./testConfig");

// router.post("/login", userLogin);
// router.get("/:email", checkUser);
// router.post("/confirm", confirmEmail);
// router.post("/sendCode/:email", checkUserByEmail, sendMail);
// router.post("/emailverification", verifyToken, sendConfirmEmail);

// login
const login = async () => {
	try {
		const data = { loginId: "hsmahbub@gmail.com", password: "@1hsmahbub" };
		const res = await ApiRequest.post("/auth/login", data);
		console.log(res.data);
	} catch (error) {
		console.log(error.response.data);
	}
};
// login();

// user check by email
const checkByEmail = async (email) => {
	try {
		const res = await ApiRequest.get(`/auth/${email}`);
		console.log(res.data);
	} catch (error) {
		console.log(error.response.data);
	}
};
// checkByEmail('hsmahbub@gmail.co')

// confirm email
const confirmEmail = async (email, code) => {
	try {
		const res = await ApiRequest.post(
			`/auth/confirm/?email=${email}&code=${code}`
		);
		console.log(res.data);
	} catch (error) {
		console.log(error.response.data);
	}
};
confirmEmail("mahfuj@gmail.com", 1044);

// send confirm code
const sendConfirmCode = async (email) => {
	try {
		const res = await ApiRequest.post(`/auth/sendCode/${email}`);
		console.log(res.data);
	} catch (error) {
		console.log(error.response.data);
	}
};
// sendConfirmCode('hsmahbub@gmail.com');
