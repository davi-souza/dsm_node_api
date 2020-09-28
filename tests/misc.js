const {get_material_types} = require('../services/db/material');
const {get_parts} = require('../services/db/part');

//get_material_types().then(console.log);
get_parts().then(x => console.log(JSON.stringify(x))).catch(console.error);
