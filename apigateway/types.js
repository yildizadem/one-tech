const {
    GraphQLSchema, GraphQLList, GraphQLObjectType, GraphQLString,
    GraphQLInt, GraphQLID
} = require('graphql');
const fetch = require('node-fetch');

const USER_API_URL = 'http://localhost:3000/users';
const REWARD_API_URL = 'http://localhost:3001/rewards';

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        country: { type: GraphQLString },
        rewards: {
            type: new GraphQLList(RewardType),
            resolve: reward => {
                return { test: 1 }
                // Fetch the friends with the URLs `person.friends`
            }
        },
    }),
});

const RewardType = new GraphQLObjectType({
    name: 'Reward',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        amount: { type: GraphQLInt },
        expiryDate: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve: user => {
                return { name: 'test' }
                // Fetch the friends with the URLs `person.friends`
            }
        },
    }),
});

module.exports = new GraphQLObjectType({
    name: 'Query',
    description: 'The root of all... queries',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            resolve: root => {
                return fetch(USER_API_URL).then(response => response.json())
            }
        },
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
            },
            resolve: (root, args) => {
                // Fetch the person with ID `args.id`
            }
        },
        rewards: {
            type: new GraphQLList(RewardType),
            resolve: root => fetch(REWARD_API_URL).then(response => response.json())
        },
        reward: {
            type: RewardType,
            args: {
                id: { type: GraphQLID },
            },
            resolve: (root, args) => {
                // Fetch the person with ID `args.id`
            }
        }
    }),
});