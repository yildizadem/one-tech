## Description

An example app created for showing implementation microservices. App has two services that called user and reward. Each services has own databases. Users and Rewards has 'many to many' relationship. And also there is apigateway is created with graphql. 

Because of separated database each service has own relation table. Reward service is used to assign a reward to user, it also has enpoints that create and list rewards.

When 'assign reward' service called, it saves record then throw message to rabbitmq. User service catch this message then save own database same record. In this way relation table is syncrounus.

```
DATABASE : User DB
    TABLE: User
        id   -- Primary Key
        ...
    
    TABLE RelUserReward
        userId      -- Foreign Key (User.id)
        rewardId
      
DATABASE: Reward DB          
    TABLE: Reward
        id  -- Primary Key
        ...

    TABLE RelUserReward
        userId       
        rewardId    -- Foreign Key (Reward.id)
```

## Stack

- [ExpressJS](https://expressjs.com/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [@apollo](https://www.apollographql.com/)

## Start

```
// clone repo
// path to repo
docker-compose up
```

You can see GraphQL Playground at http://localhost:4000

> http://localhost:3000 -> swagger user service

> http://localhost:3001 -> swagger reward service