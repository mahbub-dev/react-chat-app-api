const nodemailer = require("nodemailer");
const User = require("../Model/User");
const { createError, errorResponse } = require("../Utils/errorHandle");
const sendMail = async (req, res, next) => {
	try {
		const code = mailSend(req.params.email, false);
		console.log(code)
		await User.findOneAndUpdate(
			{ email: req.params.email },
			{
				$set: {
					confirmCode: {
						value: code,
						expiersAt: Date.now() + 1800000,
					},
				},
			},
			{ new: true }
		);
		res.status(200).json("sent");
	} catch (error) {
		errorResponse(res, error);
	}
};

const mailSend = (email, why) => {
	const token = Math.floor(Math.random() * 5453456)
		.toString()
		.slice(0, 4);
	const MAIL = "hackerss071@gmail.com";
	const MAILPASS = "eukiuklovkwedpgz";
	const API_ROOT_URL = "http://localhost:4000";
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.MAIL || MAIL,
			pass: process.env.MAILPASS || MAILPASS,
		},
	});
	const confirmLink = `${
		process.env.API_ROOT_URL || API_ROOT_URL
	}/auth/register/confirm/${email}/${token}`;
	const mailOption = {
		from: "React Chat App",
		to: email,
		subject: "Please confirm your email",
		html: `<!DOCTYPE html>
		<html lang="en">
			<head>
				<style>
					* {
						color:white;
						padding: 0;
						margin: 0;
						box-sizing: border-box;
					}
					body {
						
						height: 100vh;
						position: relative;
					}
					.mailBox {
						border:1px solid grey;
						text-align: center;
						width: 100%;
						background-image: radial-gradient( circle 976px at 51.2% 51%,  rgba(11,27,103,1) 0%, rgba(16,66,157,1) 0%, rgba(11,27,103,1) 17.3%, rgba(11,27,103,1) 58.8%, rgba(11,27,103,1) 71.4%, rgba(16,66,157,1) 100.2%, rgba(187,187,187,1) 100.2% );
						margin: 2rem auto; 
						border-radius:10px;
						max-width: 500px;
						box-shadow: 0 0 10px #e9c0c0;
						min-height: 300px;
						padding: 1rem;
					}
					.codeBox {
						color:white;
						width: fit-content;
						height: fit-content;
						border-radius: 20px 0 20px 0px;
						border:1px dotted white;
						margin: auto;
						font-size: 25px;
						box-shadow: 0 0 10px #e9c0c0;
						padding: 1rem;
						margin-top: 1rem;
						margin-bottom: 1rem;
					}
					p {
						font-size: 20px;
						color:white;
						margin-top: 1rem;
					}
					h2{
						
					}
				</style>
			</head>
			<body>
				<div class="mailBox">
					<h2>Chat App</h2>
					<p>${why === "reset" ? "Reset Password" : "Please confirm your email"}</p>
					<p>
						Thanks for being with us.Your confirmation code is given bellow
							<a href=${confirmLink}>click here</a> to confirm your registration on our
							app
					</p>
					<div class="codeBox">${token}</div>
					<h3>
						This App is developed by
						<a href="https://www.facebook.com/hsmahbub" target="_blank"
							>Md Mahbub Alom</a
						>
					</h3>
				</div>
			</body>
		</html>`,
	};

	transporter.sendMail(mailOption, (err, info) => {
		if (err) {
			console.log("err:" + err);
		} else {
			console.log(info);
		}
	});
	return token;
};

// sendMail('hackerss071@gmail.com',true)

module.exports = sendMail;
