const {
	part_file_upload,
	aux_file_upload,
} = require('./functions/files');

const graphql_function = require('./functions/files');

module.exports = {
	part_upload: part_file_upload,
	auxiliary_upload: ux_file_upload,
	backend_api: graphql_function,
};
