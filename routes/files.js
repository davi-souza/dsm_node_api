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

		//const extension = originalname.split('.').pop(); 

		//if (!['stp', 'step'].includes(extension)) {
		//	throw new CustomError('O arquivo deve ter extensão ".step"', 400);
		//}

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

		const {total} = part_price_calc({
			part: new_part,
			material_type: materials[0].material_types[0],
			heat_treatment: null,
			superficial_treatment: null,
			tolerance: null,
			finishing: null,
			screw_amount: 0,
			amount: 1,
		}),
			material_type = {
				id: materials[0].material_types[0].id,
				name: materials[0].material_types[0].name,
			};


		res
			.status(201)
			.json({
				message: 'Upload com sucesso',
				part: {
					id: new_part.id,
					name: new_part.name,
					material_type,
					heat_treatment: null,
					superficial_treatment: null,
					tolerance: null,
					finishing: null,
					screw_amount: 0,
					amount: 1,
					unit_price: total,
				},
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
