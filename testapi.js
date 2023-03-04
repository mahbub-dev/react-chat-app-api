const axios = require("axios");
const baseUrl = "http://localhost:4000";
const cloudBaseUrl = "https://chat-api-l2db.onrender.com";
const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmY3NDY3YzU5MzgwNjlmYmU5MWFjZiIsImlhdCI6MTY3Nzc0MTgwM30.HPJq8kWh3t43dKw_zKdmi_Hi7LpVjpAvaSV4X0120oc";

const ApiRequest = axios.create({
	baseURL: baseUrl,
	headers: {
		// "Access-Control-Allow-Origin": "true",

		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});
// add dual conversation api testing
const addDualConv = { loginId: "hsmahbub@gmail.com", password: "@1hsmahbub" };
const testApi = async () => {
	try {
		const res = await ApiRequest.post(
			`conversation/dual/63ff7e1fd7c091658da9405e`
		);
		console.log(res.data);
	} catch (error) {
		console.log(error.response?.data);
	}
};

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
			convId: "640050dd9badf9e6cf2e9437",
			message,
		});
		console.log(res.data);
	} catch (error) {
		console.log(error.response?.data);
	}
};

// get conv
const getConv = async () => {
	try {
		const res = await ApiRequest.get(`/conversation/`);
		console.log(res.data);
	} catch (error) {
		console.log(error.response?.data);
	}
};


// add message
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
deleteConv()