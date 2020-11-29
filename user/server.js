const express = require('express');
const morgan = require('morgan');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const UserRouter = require('./routes/user');
const rabbit = require('./tasks');
const { RelUserReward } = require('./database/models')

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'))
app.use(express.json());

const options = {
    swaggerDefinition: {
        info: {
            title: 'User API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'],
};
const specs = swaggerJsdoc(options);
app.use('/users', UserRouter);
app.use('/', swaggerUi.serve, swaggerUi.setup(specs));


rabbit.then(channel => {
    channel.consume('user_reward', async function (msg) {
        console.log('new rewards')
        try {
            const data = JSON.parse(msg.content.toString());
            console.log(data);
            const relUserReward = await RelUserReward.create(data);
            channel.ack(msg);
        } catch (err) {
            console.log(err);
        }
    }, {
        noAck: false
    })
})

app.listen(port, () => {
    console.log(`user-service listening at http://localhost:${port}`)
})