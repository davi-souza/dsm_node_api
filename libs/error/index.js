class CustomError extends Error {
	/**
	 * Constructor
	 * @param {string} message	Error message
	 * @param {number} status	HTTP status code
	 */
	constructor(message, status) {
		super(message);
		this.name = 'CustomError';
		this.status = status;
	}
}

/**
 * Process all errors of the server
 * It returns a structured error to send
 * to the front-end
 * @param {any} err	Error to process
 * @return {object}		Object to send as response
 */
function process_error(err) {
	if (!(err instanceof Error)) {
		return {
			status: 500,
			errors: [{
				message: err.toString(),
			}],
		};
	}

	if(err instanceof CustomError) {
		return {
			status: err.status,
			errors: [{
				message: err.message,
			}],
		};
	}

	if(err instanceof Error) {
		return {
			status: 500,
			errors: [{
				message: err.message,
			}],
		};
	}
}

module.exports = {
	CustomError,
	process_error,
};
