const {
    GraphQLSchema, GraphQLList, GraphQLObjectType, GraphQLString,
    GraphQLInt, GraphQLID
} = require('graphql');
const fetch = require('node-fetch');

const USER_API_URL = 'http://localhost:3000/users';
const REWARD_API_URL = 'http://localhost:3001/rewards';

const UsersType = new GraphQLObjectType({
    name: 'Users',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        country: { type: GraphQLString }
    }),
});


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        country: { type: GraphQLString },
        rewards: {
            type: new GraphQLList(GraphQLID),
            resolve: ({ rewards }) => {
                return rewards.map(reward => reward.rewardId)
            }
        },
    }),
});

const RewardsType = new GraphQLObjectType({
    name: 'Rewards',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        amount: { type: GraphQLInt },
        expiryDate: { type: GraphQLString }
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
            type: new GraphQLList(GraphQLID),
            resolve: ({ users }) => {
                return users.map(user => user.userId)
            }
        },
    }),
});

module.exports = new GraphQLObjectType({
    name: 'Query',
    description: 'The root of all... queries',
    fields: () => ({
        users: {
            type: new GraphQLList(UsersType),
            resolve: root => {
                return fetch(USER_API_URL).then(response => response.json())
            }
        },
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLID,

                },
            },
            resolve: (root, args) => fetch(`${USER_API_URL}/${args.id}`).then(response => response.json())
        },
        rewards: {
            type: new GraphQLList(RewardsType),
            resolve: root => fetch(REWARD_API_URL).then(response => response.json())
        },
        reward: {
            type: RewardType,
            args: {
                id: { type: GraphQLID },
            },
            resolve: (root, args) => fetch(`${REWARD_API_URL}/${args.id}`).then(response => response.json())
        }
    }),
});