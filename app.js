const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const graphqlHTTP = require('express-graphql');

const filesRouter = require('./routes/files');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/file', filesRouter);

const schema = require('./graphql/schemas');
const graphiql = true;

app.use('/api/graphql', graphqlHTTP({
	schema,
	graphiql,
}));

module.exports = app;
