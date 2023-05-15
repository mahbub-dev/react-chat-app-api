const nodemailer = require("nodemailer");
const ejs = require("ejs");
const sendingMail = async (email,reason, name, rootUrl) => {
	try {
		const code = Math.floor(Math.random() * 5453456)
			.toString()
			.slice(0, 4);
		const MAIL = "hackerss071@gmail.com";
		const MAILPASS = "eukiuklovkwedpgz";
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.MAIL || MAIL,
				pass: process.env.MAILPASS || MAILPASS,
			},
		});

		const link = `${rootUrl}/auth/register/confirm/${email}/${code}`;
		// dynamic data
		const data = {
			logoUrl: "https://example.com/logo.png",
			companyName: "Chat App",
			userName: name,
			verificationLink: link,
			verificationToken: code,
		};
		//  read ejs file
		const html = await ejs.renderFile(
			`${__dirname}/emailtemplate.ejs`,
			data
		);

		// set mail option
		const mailOption = {
			from: "React Chat App",
			to: email,
			subject: "Please confirm your email",
			html: html,
		};
		// send mail
		await transporter.sendMail(mailOption);
		return code;
	} catch (error) {
		throw error;
	}
};

// sendMail('hackerss071@gmail.com',true)

module.exports = sendingMail;
