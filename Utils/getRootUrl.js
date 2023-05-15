const getRootUrl = (req) => {
	return `${req.protocol}://${req.hostname}${
		req.hostname === "localhost" ? ":" + 4000 : ""
	}`;
};
module.exports = { getRootUrl };
