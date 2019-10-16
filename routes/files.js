const express = require('express');
const {
	part_file_upload,
	aux_file_upload,
} = require('../functions/files');

const router = express.Router();

router.post('/upload', part_file_upload);

router.post('/upload/auxiliary', aux_file_upload);

module.exports = router;
