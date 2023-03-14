const ApiRequest = require("./testConfig");

// create user
const createUser = async (data) => {
	try {
		const res = await ApiRequest.post("/user/register", data);
		console.log(res.data);
	} catch (error) {
		console.log(error.response.data);
	}
};
const data = {
	username: "Md Mahfuj",
	phone: "01759061474",
	email: "mahfuj@gmail.com",
	password: "@1hsmahbub",
};
createUser(data);

// update user 
const updataUser = async (data) => {
	try {
		const res = await ApiRequest.put("/user/", data);
		console.log(res.data);
	} catch (error) {
		console.log(error.response.data);
	}
};
// updataUser()

const searchUser = async (searchStr) => {
	try {
		const res = await ApiRequest.get(`/user/?search=${searchStr}`);
		console.log(res.data);
	} catch (error) {
		console.log(error.response.data);
	}
};
// searchUser('@')

// get single user by id
const getUserById = async (id) => {
	try {
		const res = await ApiRequest.get(`/user/${id}`);
		console.log(res.data);
	} catch (error) {
		console.log(error.response.data);
	}
};
// getUserById()

// delete user by id
const deleletuser = async (id) => {
	try {
		const res = await ApiRequest.delete(`/user/${id}`);
		console.log(res.data);
	} catch (error) {
		console.log(error.response.data);
	}
};
// deleletuser()

// reset password
const passReset = async () => {
	try {
		const res = await ApiRequest.post(`/user/passreset`);
		console.log(res.data);
	} catch (error) {
		console.log(error.response.data);
	}
};

// passReset()

const changeEmail = async (password) => {
	try {
		const res = await ApiRequest.post(`/user/changemail`, { password });
		console.log(res.data);
	} catch (error) {
		console.log(error.response.data);
	}
};
// changeEmail()
// router.post("/register", createUser);//create user //okay
// router.put("/", verifyToken, updateUser); //update user
// router.get("/", verifyToken, searchUser); //search user//okay
// router.get("/:userId", getUserById);// get by user id
// router.delete("/:userId", deleteUser);// delete user
// router.post("/passreset/", verifyToken, resetPassword); // reset password
// router.post("/changemail/", verifyToken);// change email
