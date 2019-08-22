const express = require('express');
const multer = require('multer');
const router = express.Router();
const { error_res } = require('../libs/response');
const { upload_file } = require('../libs/storage/upload');

const upload = multer();

router.post('/upload', upload.single('file'), async function(req, res, next) {
	if (!req.file) {
		console.log(error_res({
			status: 404,
			code: 'FILE_NOTFOUND',
			msg: 'Arquivo não encontrado',
		}, res));

		return;
	}
	
	const { originalname, buffer } = req.file;

	try {
		const result = await upload_file({
			filename: originalname,
			buffer,
		});

		res
			.status(201)
			.json({
				message: 'Arquivo salvo',
			})
			.end();

	} catch (err) {
		console.log(err);
		error_res({}, res);
	}
});

module.exports = router;
