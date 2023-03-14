const axios = require("axios");
const baseUrl = "http://localhost:4000";
const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDMwZDU5YjBjMWEwOTNjM2MwNGM3MCIsImlhdCI6MTY3NzkyNDUzMX0.g2onjm5djZ6KMbkEQLYAFniR5q5ab1wLDG9Bp_yJid0";

const ApiRequest = axios.create({
	baseURL: baseUrl,
	headers: {
		// "Access-Control-Allow-Origin": "true",

		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

module.exports = ApiRequest;
