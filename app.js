const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const graphql_function = require('./functions/graphql');
const filesRouter = require('./routes/files');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/file', filesRouter);

app.use('/api/graphql', graphql_function);

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
