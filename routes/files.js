const express = require('express');
const multer = require('multer');
const router = express.Router();
const { CustomError, process_error } = require('../libs/error');
const { upload_file } = require('../services/storage/upload');
const { get_part_volume } = require('../services/analysis/volume');
const {	part_price_calc } = require('../services/analysis/price');
const {
	create_part,
	create_auxiliary_file,
} = require('../services/db/part');
const { get_materials } = require('../services/db/material');

const upload = multer();

router.post('/upload', upload.single('file'), async function(req, res, next) {
	try {
		if (!req.file) {
			throw new CustomError('Por favor inserir um arquivo', 400);
		}

		const { originalname, buffer } = req.file;

		const extension = originalname.split('.').pop(); 

		if (!['stp', 'step'].includes(extension)) {
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

		const {
			volume,
			raw_material_volume,
			boundbox_dimensions,
		} = part_volumes.data;

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
			screw: null,
			engraving: null,
			knurled: null,
			report: null,
			amount: 1,
		}),
			material_type = {
				id: materials[0].material_types[0].id,
				name: materials[0].material_types[0].name,
			};


		res
			.status(201)
			.json({
				data: {
					id: new_part.id,
					name: new_part.name,
					material_type,
					heat_treatment: null,
					superficial_treatment: null,
					tolerance: null,
					finishing: null,
					screw: null,
					marking: null,
					knurled: null,
					report: null,
					amount: 1,
					unit_price: total,
				},
				errors: null,
			})
			.end();

	} catch (err) {
		const error = process_error(err);

		res
			.status(error.status)
			.json({
				data: null,
				errors: [error],
			})
			.end();

		return;
	}
});

router.post('/upload/auxiliary', upload.single('file'), async function(req, res, next) {
	try {
		const {part_id} = req.query;

		if (!part_id) {
			throw new CustomError('Por favor informar peça', 400);
		}

		if (!req.file) {
			throw new CustomError('Por favor inserir um arquivo', 400);
		}

		const {originalname, buffer} = req.file;

		const {key} = await upload_file({
			filename: originalname,
			buffer,
		});

		const new_auxiliary_file = await create_auxiliary_file(
			part_id,
			originalname,
			key,
		);

		res
			.status(201)
			.json({
				data: {
					name: originalname,
					key,
				},
				errors: null,
			})
			.end();

	} catch (err) {
		const error = process_error(err);

		res
			.status(error.status)
			.json({
				data: null,
				errors: [error],
			})
			.end();

		return;
	}
});

module.exports = router;
