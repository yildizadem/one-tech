const { ApolloServer } = require('apollo-server');
const { GraphQLSchema } = require('graphql')
const { QueryType, MutationType } = require('./types');

const server = new ApolloServer({
    schema: new GraphQLSchema({
        query: QueryType,
        mutation: MutationType
    })
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

