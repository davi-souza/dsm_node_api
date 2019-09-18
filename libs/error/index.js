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
		this.extensions = {
			status,
			message,
		};
	}
}

/**
 * Handle GraphQL error and convert it to CustomError
 * @param {any} err	Error
 * @return {object}	CustomError object
 */
function handle_graphql_error(err) {
	if(err instanceof CustomError) {
		return err;
	}

	if(err instanceof Error) {
		return new CustomError(err.message, 500);
	}

	return new CustomError(err.toString(), 500);
}

/**
 * Process all errors of the server
 * It returns a structured error to send
 * to the front-end
 * @param {any} err	Error to process
 * @return {object}		Object to send as response
 */
function process_error(err) {
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

	return {
		status: 500,
		errors: [{
			message: err.toString(),
		}],
	};
}

module.exports = {
	CustomError,
	handle_graphql_error,
	process_error,
};
