const Sequelize = require('sequelize');

const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const basename = path.basename(__filename);
const db = {};

fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		const model = require(path.join(__dirname, file));

		db[model.name] = model.init(sequelize, Sequelize);
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// const Material = require('./material');
// const MaterialType = require('./material_type');
// const User = require('./user');
// const UserAddress = require('./user_address');
// const Supplier = require('./supplier');
// const Part = require('./part');
// const Order = require('./order');
// const OrderPart = require('./order_part');
//const models = {
//	Material: Material.init(sequelize, Sequelize),
//	MaterialType: MaterialType.init(sequelize, Sequelize),
//	User: User.init(sequelize, Sequelize),
//	UserAddress: UserAddress.init(sequelize, Sequelize),
//	Supplier: Supplier.init(sequelize, Sequelize),
//	Part: Part.init(sequelize, Sequelize),
//	Order: Order.init(sequelize, Sequelize),
//	OrderPart: OrderPart.init(sequelize, Sequelize),
//};
//Object.values(models)
//	.filter(model => typeof model.associate === 'function')
//	.forEach(model => model.associate(models));
//const db = {
//	...models,
//	sequelize,
//};

module.exports = db;
