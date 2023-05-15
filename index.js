const express = require("express");
const userRouter = require("./Router/userRoute");
const authRouter = require("./Router/authRoute");
const uploadRouter = require("./Router/uploadRoute");
const path = require("path");
const conversationRouter = require("./Router/conversationRoute.js");
// const uploadRoute = require("./Router/uploadRoute");
const cors = require("cors");
const env = require("dotenv");
const multer = require("multer");
const mongoose = require("mongoose");
const { createError, errorResponse } = require("./Utils/errorHandle");
const app = express();
env.config();
app.use(cors({ origin: process.env.CROSS_ORIGIN || '*'}));
app.use(
	express.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimit: 1000000,
	}),
	express.json({ limit: "50mb" })
);
// config multer
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		// restrict file types to images only
		if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4|pdf|mkv|mp3)$/)) {
			cb("file type is not allowed");
		}
		cb(null, true);
	},
});
app.use(upload.array("files", 10));
// server on
app.listen(process.env.PORT, (err) => {
	if (!err) {
		console.log("server running on port" + " " + process.env.PORT);
		// db connection
		mongoose.connect(process.env.MONGODB_URI, (err, db) => {
			if (err) throw err;
			console.log("db has connected ...");
		});
	} else {
		console.log(err);
	}
});

// App Routers
app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/welcome.html`);
});
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/conversation", conversationRouter);
app.use("/", uploadRouter);
app.get("/uploads/:fileName", (req, res) => {
	try {
		const link = path.join(`${__dirname}/uploads`, req.params.fileName);
		res.sendFile(link);
	} catch (error) {
		errorResponse(res, error);
	}
});
