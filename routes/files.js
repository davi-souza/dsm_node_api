const express = require('express');
const multer = require('multer');
const router = express.Router();
const { CustomError, process_error } = require('../libs/error');
const { upload_file } = require('../services/storage/upload');
const { get_part_volume } = require('../services/analysis/volume');
const {	part_price_calc } = require('../services/analysis/price');
const { create_part } = require('../services/db/part');
const { get_materials } = require('../services/db/material');

const upload = multer();

router.post('/upload', upload.single('file'), async function(req, res, next) {
	try {
		if (!req.file) {
			throw new CustomError('Por favor inserir um arquivo', 400);
		}

		const { originalname, buffer } = req.file;

		if (originalname.split('.').pop() !== 'step') {
			throw new CustomError('O arquivo deve ter extensão ".step"', 400);
		}

		const part_volumes_promise = get_part_volume(originalname, buffer);

		const upload_promise = upload_file({
			filename: originalname,
			buffer,
		});

		const [part_volumes, upload_res] = await Promise.all([
			part_volumes_promise,
			upload_promise
		]);

		const {volume, raw_material_volume} = part_volumes;

		const {key} = upload_res;

		const new_part_promise = create_part(
			originalname,
			key,
			volume,
			raw_material_volume
		);

		const materials_promise = get_materials();

		const [new_part, materials] = await Promise.all([
			new_part_promise,
			materials_promise,
		]);

		const initial_price = part_price_calc(
			new_part,
			materials[0].material_types[0],
		);

		const payload = {
			id: new_part.id,
			name: new_part.name,
			material_type_id: materials[0].material_types[0].id,
			unit_price: initial_price,
			qtd: 1,
		};

		res
			.status(201)
			.json({
				message: 'Upload com sucesso',
				part: payload,
			})
			.end();

	} catch (err) {
		const error = process_error(err);

		res
			.status(error.status)
			.json(error)
			.end();

		return;
	}
});

module.exports = router;
