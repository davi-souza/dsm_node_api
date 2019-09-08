module.exports = {
	"development": {
		"username": "mech4u",
		"password": "123",
		"database": "mech4u_dev",
		"host": "platform_api_db",
		"dialect": "postgres",
	},
	"test": {
		"username": "root",
		"password": null,
		"database": "database_test",
		"host": "127.0.0.1",
		"dialect": "postgres",
	},
	"production": {
		"username": "root",
		"password": null,
		"database": "database_production",
		"host": "127.0.0.1",
		"dialect": "postgres",
	}
};
