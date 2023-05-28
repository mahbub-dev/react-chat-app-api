const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const { errorResponse, createError } = require("../Utils/errorHandle");
const { getRootUrl } = require("../Utils/getRootUrl");
router.post("/uploads", (req, res) => {
	try {
		if (req.files.length > 0) {
			const arrayOflink = req.files.map((i) => {
				const link = `${getRootUrl(req)}/uploads/${i.filename}`;
				return link;
			});
			res.status(200).json(arrayOflink);
		} else createError(req.files, 400);
	} catch (error) {
		errorResponse(res, error);
	}
});

router.delete("/uploads", (req, res) => {
	try {
		const filePath = req.query.path.split("/")[4];
		if (filePath) {
			fs.unlink(
				`${path.dirname(require.main.filename)}/uploads/${filePath}`,
				(err, info) => {
					console.log(err);
				}
			);
		} else createError("file was not found", 404);
		res.status(200).json("deleted");
	} catch (error) {
		errorResponse(res, error);
	}
});

module.exports = router;
