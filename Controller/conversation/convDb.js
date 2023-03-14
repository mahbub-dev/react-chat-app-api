const { Conversation, Message } = require("../../Model/Conversation");
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
		const res = await Conversation.findByIdAndUpdate(
			_id,
			{
				$push: {
					message,
				},
			},
			{ new: true }
		).populate("message.sender", "_id username profilePicture");
		return res;
	} catch (error) {
		throw error;
	}
};

// get conv
convDb.getConv = async (userId, otherId) => {
	try {
		return await Conversation.find({
			participants: {
				$in: [userId],
			},
		})
			.populate({
				path: "participants",
				select: "username profilePicture",
				model: "User",
			})
			.sort({ createdAt: 1 });
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
			{
				_id: convId,
			},
			{
				$pull: {
					participants: index,
				},
			},
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
				path: "message.sender participants",
				select: "_id username profilePicture text",
				model: "User",
			})
			.slice("message", -(page * perPage));
		return conversation;
	} catch (error) {
		throw error;
	}
};

// delete single message
convDb.deleteSingleMessage = async (userId, convId, messageId) => {
	try {
		return await Conversation.findByIdAndUpdate(
			convId,
			{
				$pull: {
					message: {
						$and: [
							{
								sender: userId,
								_id: messageId,
							},
						],
					},
				},
			},
			{ new: true }
		);
	} catch (error) {
		throw error;
	}
};

// send react
convDb.sendReact = async ({ _id, convId, img }) => {
	try {
		const res = Conversation.updateOne(
			{ _id: convId, message: { $elemMatch: { _id } } },
			{
				$set: { "message.$.react": img },
			},
			{ new: true }
		);
		return res;
	} catch (error) {
		throw error;
	}
};

// update seen status
convDb.updateSeen = async (convId, userId) => {
	try {
		const res = await Conversation.findOneAndUpdate(
			{
				_id: convId,
				message: { $elemMatch: { seenBy: { $ne: userId } } },
			},
			{ $push: { "message.$[elem].seenBy": userId } },
			{
				new: true,
				arrayFilters: [
					{
						"elem.seenBy": { $ne: userId },
					},
				],
			}
		);
		return res;
	} catch (error) {
		throw error;
	}
};

convDb.getParticapantsArray = async (userId) => {
	try {
		return await Conversation.find({
			convType: 'dual',
			participants: { $in: [userId] }
		  }, 'participants').lean();
	} catch (error) {
		throw error;
	}
};

module.exports = convDb;
