const express = require("express");
const userRouter = require("./Router/userRoute");
const authRouter = require("./Router/authRoute");
const messageRouter = require("./Router/messageRoute");
const cors = require("cors");
const conversationRouter = require("./Router/conversationRoute.js");
const env = require("dotenv");
const mongoose = require("mongoose");
const app = express();
env.config();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: true }), express.json({limit:'100000000'}));
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
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/message", messageRouter);
app.use("/conversation", conversationRouter);
