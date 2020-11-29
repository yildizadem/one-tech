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
        country: { type: GraphQLString }
    }),
});


const UserWithRewardsType = new GraphQLObjectType({
    name: 'UserWithRewards',
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

const RewardType = new GraphQLObjectType({
    name: 'Reward',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        amount: { type: GraphQLInt },
        expiryDate: { type: GraphQLString }
    }),
});

const RewardWithUsersType = new GraphQLObjectType({
    name: 'RewardWithUsers',
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

const RelUserRewardType = new GraphQLObjectType({
    name: 'RelUserReward',
    fields: () => ({
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
        rewardId: { type: GraphQLID }
    }),
});

const QueryType = new GraphQLObjectType({
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
            type: UserWithRewardsType,
            args: {
                id: {
                    type: GraphQLID,

                },
            },
            resolve: (root, args) => fetch(`${USER_API_URL}/${args.id}`).then(response => response.json())
        },
        rewards: {
            type: new GraphQLList(RewardType),
            resolve: root => fetch(REWARD_API_URL).then(response => response.json())
        },
        reward: {
            type: RewardWithUsersType,
            args: {
                id: { type: GraphQLID },
            },
            resolve: (root, args) => fetch(`${REWARD_API_URL}/${args.id}`).then(response => response.json())
        }
    }),
});

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root of all... mutations',
    fields: () => ({
        user: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
                country: { type: GraphQLString }
            },
            resolve: (root, args) => {
                return fetch(USER_API_URL, {
                    method: 'post',
                    body: JSON.stringify(args),
                    headers: { 'Content-Type': 'application/json' }
                }).then(response => response.json())
            }
        },
        reward: {
            type: RewardType,
            args: {
                name: { type: GraphQLString },
                amount: { type: GraphQLInt },
                expiryDate: { type: GraphQLString }
            },
            resolve: (root, args) => {
                return fetch(REWARD_API_URL, {
                    method: 'post',
                    body: JSON.stringify(args),
                    headers: { 'Content-Type': 'application/json' }
                }).then(response => response.json())
            }
        },
        assignReward: {
            type: RelUserRewardType,
            args: {
                userId: { type: GraphQLID },
                rewardId: { type: GraphQLID }
            },
            resolve: (root, { rewardId, userId }) => {
                return fetch(`${REWARD_API_URL}/${rewardId}/user/${userId}`, {
                    method: 'post'
                }).then(response => response.json())
            }
        }
    })
});

module.exports = {
    QueryType, MutationType
}