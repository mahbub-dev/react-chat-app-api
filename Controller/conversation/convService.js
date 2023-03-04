const { create } = require("../../Model/Conversation");
const Conversation = require("../../Model/Conversation");
const { createError } = require("../../Utils/errorHandle");
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
convService.addMessage = async (myId, convId, messag) => {
	try {
		let res = await convDb.addMessage(convId, { ...messag, sender: myId });
		const { message } = res._doc;
		return message[message.length - 1];
	} catch (error) {
		throw error;
	}
};

// get conversation

convService.getConv = async (userId) => {
	try {
		const res = await convDb.getConv(userId);
		!res.length && createError("requested data was not found", 404);
		return res;
	} catch (error) {
		throw error;
	}
};

// get message
convService.getMessage = async (userId, convId) => {
	try {
		const res = await convDb.getMessag(convId,1,2);
		!res.participants.includes(userId) &&
			createError(
				"your are not valid person to get this conversation",
				401
			);
		const { message, ...rest } = res;

		return res;
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

module.exports = convService;
