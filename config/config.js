module.exports = {
	"development": {
		"username": "mech4u",
		"password": "123",
		"database": "mech4u_dev",
		"host": "api_db",
		"dialect": "postgres",
	},
	"test": {
		"username": "mech4u",
		"password": "123",
		"database": "mech4u_dev",
		"host": "platform_api_db",
		"dialect": "postgres",
	},
	"production": {
		"username": process.env.DATABASE_USER,
		"password": process.env.DATABASE_PASSWORD,
		"database": process.env.DATABASE_NAME,
		"host": process.env.DATABASE_HOST,
		"dialect": "postgres",
		"dialectOptions": {
			ssl: true,
		},
	}
};
