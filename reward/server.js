const express = require('express');
const morgan = require('morgan');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const RewardRouter = require('./routes/reward');

const app = express();
const port = process.env.PORT || 3001;

app.use(logger('dev'))
app.use(express.json());

const options = {
    swaggerDefinition: {
        info: {
            title: 'Reward API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'],
};
const specs = swaggerJsdoc(options);
app.use('/rewards', RewardRouter);
app.use('/', swaggerUi.serve, swaggerUi.setup(specs));


app.listen(port, () => {
    console.log(`reward-service listening at http://localhost:${port}`)
})