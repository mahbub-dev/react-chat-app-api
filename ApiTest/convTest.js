const ApiRequest = require('./testConfig')

// add dual conversation api testing
const addDualConv = { loginId: "hsmahbub@gmail.com", password: "@1hsmahbub" };
// create private conv 
const addPrivateConv = async () => {
	try {
		const res = await ApiRequest.post(
			`conversation/dual/6403272add1988607f8435db`
		);
		console.log(res.data);
	} catch (error) {
		console.log(error.response?.data);
	}
};
// addPrivateConv()

// add add group conv
const addGroupConv = async () => {
	try {
		const res = await ApiRequest.post(`/conversation/group/`, {
			othersId: ["640046522ef0dbd40e4fea08", "63ff7e1fd7c091658da9405e"],
		});
		console.log(res);
	} catch (error) {
		console.log(error.response?.data);
	}
};

// add message
const addMessage = async () => {
	try {
		const message = {
			text: "here is some of the image that you want",
			image: ["a.jpg", "b.jpg"],
		};
		const res = await ApiRequest.post(`conversation/message/`, {
			convId: "640616271cdb475f27b326fc",
			message,
		});
		console.log(res.data);
	} catch (error) {
		console.log(error.response?.data);
	}
};
// addMessage()
// get conv
const getConv = async () => {
	try {
		const res = await ApiRequest.get(`/conversation/`);
		console.log(res.data);
	} catch (error) {
		console.log(error.response?.data);
	}
};

// getConv()
// get message
const getMessage = async () => {
	try {
		const res = await ApiRequest.get(
			`/conversation/message/640050dd9badf9e6cf2e9437`
		);
		console.log(res.data.message);
	} catch (error) {
		console.log(error.response?.data);
	}
};
// getMessage();

// delet conversation 
const deleteConv = async () => {
	try {
		const res = await ApiRequest.delete(
			`/conversation/640050dd9badf9e6cf2e9437`
		);
		console.log(res.data);
	} catch (error) {
		console.log(error.response?.data);
	}
};
// deleteConv()