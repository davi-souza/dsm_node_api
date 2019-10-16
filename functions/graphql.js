const graphqlHTTP = require('express-graphql');

const graphiql = process.env.NODE_ENV === 'production' ? false : true;
const schema = require('../graphql/schemas');

module.exports = graphqlHTTP({schema, graphiql});
