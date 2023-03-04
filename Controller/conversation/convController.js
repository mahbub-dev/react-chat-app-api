const Conversation = require("../../Model/Conversation");
const Message = require("../../Model/Message");
const convService = require("./convService");
const { createError, errorResponse } = require("../../Utils/errorHandle");

// add dual conversation
const addDualConv = async (req, res) => {
	try {
		const myId = req.user.id;
		const { otherId } = req.params;
		(!myId || !otherId) && createError("required data is missing", 401);
		const response = await convService.addDualConv(myId, otherId);
		res.status(201).json(response);
	} catch (error) {
		errorResponse(res, error);
	}
};

// add group conversation
const addGroupConv = async (req, res) => {
	try {
		const myId = req.user.id;
		const { othersId } = req.body;
		(!myId || othersId.length === 0) &&
			createError("required data is missing", 401);
		const response = await convService.addGroupConv(myId, othersId);
		res.status(201).json(response);
	} catch (error) {
		errorResponse(res, error);
	}
};

const addMessage = async (req, res) => {
	try {
		const { convId, message } = req.body;
		(!convId || Object.keys(message).length > 4) &&
			createError("required data is not valid", 401);
		const response = await convService.addMessage(
			req.user.id,
			convId,
			message
		);
		res.status(201).json(response);
	} catch (error) {
		errorResponse(res, error);
	}

};

// get a user conversations
const getConversation = async (req, res) => {
	try {
		const response = await convService.getConv(req.user.id);
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

// get message
const getMessage = async (req, res) => {
	try {
		const response = await convService.getMessage(
			req.user.id,
			req.params.convId
		);
		res.status(200).json(response);
	} catch (error) {
		errorResponse(res, error);
	}
};

// delete conversation
const deleteConversation = async (req, res) => {
	try {
		const response = await convService.deleteConv(
			req.user.id,
			req.params.convId
		);
		res.status(200).json(response);
	} catch (err) {
		errorResponse(res, err);
	}
};

module.exports = {
	addDualConv,
	addMessage,
	addGroupConv,
	getConversation,
	deleteConversation,
	getMessage,
};
