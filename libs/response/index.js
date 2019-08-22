function error_res(payload, res) {
	/**
	 * Sends and structured error and returns it
	 * Params:
	 * - payload: object with the following keys
	 *   - status: number (http status code)
	 *   - code: enum of internal code for errors
	 *   - message: string
	 *     a message of the error (to display on the platform)
	 * - res: express Response object
	 *
	 * Return:
	 * - object with a "error"
	 *   the "error" key has the "status", "code" and "message" keys.
	 */
	const status = payload.status || 500;

	const code = payload.code || 'INTERNAL_ERROR';

	const message = payload.message || 'An internal error occurred';

	const structured_error = {
		error: {
			status,
			code,
			message,
		},
	};

	res
		.status(status)
		.json(structured_error)
		.end();

	return structured_error;
}

module.exports = {
	error_res,
};
