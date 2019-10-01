const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const graphqlHTTP = require('express-graphql');
const filesRouter = require('./routes/files');

const app = express();
const graphiql = true;
const schema = require('./graphql/schemas');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/file', filesRouter);

app.use('/api/graphql', graphqlHTTP({
	schema,
	graphiql,
}));

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
