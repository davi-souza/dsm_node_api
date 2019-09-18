const fs = require('fs');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

const private_key = 'BG7dn8E20suSrvrfkN';
const jwt_options = { expiresIn: '30d' };


/**
 * Gets a payload, generate a jwt and encrypt it
 * @param {object} payload	The payload to be signed
 * @return {string}			The encrypted jwt from payload
 */
function jwt_sign(payload) {
	return jwt.sign(payload, private_key, jwt_options);
}

/**
 * Gets a jwt and verifies if it's ok
 * @param {string} jwt	The jwt to be verified
 * @return {object}		Object that originally was the jwt payload
 */
function jwt_verify(token) {
	return jwt.verify(token, private_key);
}

/**
 * Hashes the given password (and a generated salt) with argon2
 * @param {string} password		The password to hash
 * @return {Promise<string>}	Hashed password
 */
function password_hash(password) {
	return argon2.hash(password);
}


/**
 * Verifies if the given password match the hashed_password
 * @param {string} hashed_password	The hashed password
 * @param {string} password			The password to verify
 * @return {Promise<boolean>}		If it's verified
 */
function password_verify(hashed_password, password) {
	return argon2.verify(hashed_password, password);
}

module.exports = {
	jwt_sign,
	jwt_verify,
	password_hash,
	password_verify,
};
