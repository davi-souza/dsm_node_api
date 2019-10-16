const {get_material_types} = require('../services/db/material');

get_material_types().then(console.log);
