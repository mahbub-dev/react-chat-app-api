const { create } = require("../../Model/Conversation");
const Conversation = require("../../Model/Conversation");
const { createError } = require("../../Utils/errorHandle");
const axios = require("axios");
const convDb = require("./convDb");
// moudule scaffholding
const convService = {};

// add dual conv
convService.addDualConv = async (myId, otherId) => {
	try {
		return await convDb.addConv(myId, [otherId], "dual");
	} catch (error) {
		throw error;
	}
};

// add dual conv
convService.addGroupConv = async (myId, othersId) => {
	try {
		return await convDb.addConv(myId, othersId, "group");
	} catch (error) {
		throw error;
	}
};

// add message
convService.addMessage = async (myId, convId, sms) => {
	try {
		let res = await convDb.addMessage(convId, {
			...sms,
			sender: myId,
			seenBy: myId,
		});
		const { message } = res._doc;
		return message[message.length - 1];
	} catch (error) {
		throw error;
	}
};

// get conversation

convService.getConv = async (userId, searchQuery) => {
	try {
		const res = await convDb.getConv(userId);
		!res && createError("requested data was not found", 404);
		const filterConv = res
			.map((item) => {
				const { convType, message, _id, participants } = item?._doc;
				let user = {};
				if (convType === "dual") {
					user = participants.find(
						(i) => i._id.toString() !== userId
					);
				}
				return {
					...user?._doc,
					convId: _id,
					convType,
					lastSms: message[message.length - 1],
				};
			})
			.filter((i) =>
				i.username?.toLowerCase()?.includes(searchQuery?.toLowerCase())
			);
		filterConv.length === 0 && createError("not found", 404);
		return filterConv;
	} catch (error) {
		throw error;
	}
};

// get message
convService.getMessage = async (userId, convId,page) => {
	try {
		let res = await convDb.getMessag(convId, page);
		let messageStatus = 200;
		res.message.length === 0 && (messageStatus = 404);

		// !participants.includes(userId) && createError("your are not valid person to get this conversation", 401);
		let { participants, ...rest } = res?._doc;
		const arrayOfRef = [];
		rest.message?.forEach((i, ind, arr) => {
			if (!i.replyRef) {
				arrayOfRef.push(i);
			} else {
				const replyRef = arr.find(
					(msg) => msg._id.toString() === i?.replyRef.toString()
				);
				arrayOfRef.push({ ...i._doc, replyRef });
			}
		});
		rest.message = arrayOfRef;

		return {
			participants: participants?.filter(
				(u) => !u.toString().includes(userId)
			),
			...rest,
			messageStatus,
		};
	} catch (error) {
		throw error;
	}
};
// delete conversation
convService.deleteConv = async (userId, convId) => {
	try {
		const conv = await convDb.getSingleConv(convId);
		const index = conv.participants.indexOf(userId);
		index === -1 && createError("already deleted", 400);
		if (conv.participants.length === 1) {
			return await convDb.deleteWholeConv(convId);
		}
		const response = await convDb.deleteUserFronConv(convId, userId);
		return response;
	} catch (error) {
		throw error;
	}
};

// delete single message
convService.deleteSingleMessage = async (userId, convId, messageId) => {
	try {
		await convDb.deleteSingleMessage(userId, convId, messageId);
		return "deleted";
	} catch (error) {
		throw error;
	}
};

// send react
convService.sendReact = async (data) => {
	try {
		return await convDb.sendReact(data);
	} catch (error) {
		throw error;
	}
};
//  update seen status
convService.updateSeen = async (convId, userId) => {
	try {
		const res = await convDb.updateSeen(convId, userId);
		if (res) {
			return res;
		}
		createError("already udated", 203);
	} catch (error) {
		throw error;
	}
};
module.exports = convService;
