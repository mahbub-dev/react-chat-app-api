const Conversation = require("../../Model/Conversation");
const { createError } = require("../../Utils/errorHandle");

// module scaffholding
const convDb = {};

// add conve
convDb.addConv = async (myId, othersId, convType) => {
	try {
		const res = await Conversation.create({
			participants: [myId, ...othersId],
			convType,
			message: [],
		});
		return res;
	} catch (error) {
		throw error;
	}
};

// add message
convDb.addMessage = async (_id, message) => {
	try {
		const res = await Conversation.findOneAndUpdate(
			{ _id },
			{
				$push: { message },
			},
			{ new: true }
		);
		return res;
	} catch (error) {
		throw error;
	}
};

// get conv
convDb.getConv = async (userId) => {
	try {
		return await Conversation.find({
			participants: { $in: [userId] },
		});
	} catch (error) {
		throw error;
	}
};

// delete conversation
convDb.getSingleConv = async (id) => {
	try {
		return await Conversation.findById(id);
	} catch (error) {
		throw error;
	}
};
convDb.deleteUserFronConv = async (convId, index) => {
	try {
		return await Conversation.updateOne(
			{ _id: convId },
			{ $pull: { participants: index } },
			{ new: true }
		);
	} catch (error) {
		throw error;
	}
};
convDb.deleteWholeConv = async (convId) => {
	try {
		const res = await Conversation.deleteOne({ _id: convId });
		return res;
	} catch (error) {
		throw error;
	}
};

convDb.getMessag = async (id, page, perPage) => {
	try {
		const conversation = await Conversation.findById(id)
			.populate({
				path: "message.sender",
				select: "_id username email",
			})
			.slice("message", -(page * perPage));
		return conversation;
	} catch (error) {
		throw error;
	}
};

module.exports = convDb;
