class customError extends Error {
	constructor(message, status) {
		super(message);
		this.status = status;
	}
}

const createError = (message, status) => {
	throw new customError(message, status);
};

const errorResponse = (res, error) => {
	if (error instanceof customError) {
		res.status(error?.status).json(error.message);
	} else {
		console.log(error);
		res.status(500).json("internal server error");
	}
};

module.exports = { createError, errorResponse };
