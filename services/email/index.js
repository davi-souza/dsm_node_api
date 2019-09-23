const nodemailer = require('nodemailer');
const { CustomError } = require('../../libs/error');
const {
	new_order_supplier_message,
	new_order_user_message,
} = require('./messages');

/**
 * Service to send email to suppliers and user
 * @param {object} user			User model
 * @param {object[]} suppliers	Supplier model
 */
function new_order_email(user, suppliers, order) {
	const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'daviduartealvesdesouza@gmail.com',
			pass: 'ita01103068',
		},
	});

	const user_message = {
		from: '[MECH4U] Pedido criado <daviduartealvesdesouza@gmail.com>',
		to: user.email,
		subject: 'Detalhes do seu novo pedido',
		text: new_order_user_message(order),
	};

	const supplier_message = {
		from: '[MECH4U] Novo pedido <daviduartealvesdesouza@gmail.com>',
		to: suppliers.map(s => s.email),
		subject: 'Novo pedido disponível',
		text: new_order_supplier_message(order),
	}

	const suppliers_email_promise = new Promise((resolve, reject) => {
		transport.sendMail(supplier_message, (err, info) => {
			if (err) {
				console.warn(err);

				reject(new CustomError('Não foi possível enviar e-mail', 500));
			}

			console.log('E-mail enviados');
			resolve();
		});
	});

	const user_email_promise = new Promise((resolve, reject) => {
		transport.sendMail(user_message, (err, info) => {
			if (err) {
				console.warn(err);

				reject(new CustomError('Não foi possível enviar e-mail', 500));
			}

			console.log('E-mail enviados');
			resolve();
		});
	});

	return Promise.all([
		suppliers_email_promise,
		user_email_promise,
	]);
}

module.exports = {
	new_order_email,
};
