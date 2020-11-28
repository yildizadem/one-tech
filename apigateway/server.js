const { ApolloServer } = require('apollo-server');
const { GraphQLSchema } = require('graphql')
const QueryType = require('./types');

const server = new ApolloServer({
    schema: new GraphQLSchema({
        query: QueryType
    })
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

