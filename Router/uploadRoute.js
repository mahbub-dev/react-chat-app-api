const router = require("express").Router();
const path = require("path");
const { errorResponse, createError } = require("../Utils/errorHandle");

router.post("/uploads", (req, res) => {
	try {
		if (req.files.length > 0) {
			const arrayOflink = req.files.map((i) => {
				const link = `${process.env.API_ROOT_URL}/uploads/${i.filename}`;
				return link;
			});
			res.status(200).json(arrayOflink);
		} else createError(req.files, 400);
	} catch (error) {
		errorResponse(res, error);
	}
});

module.exports = router;
