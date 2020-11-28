const express = require('express');
const morgan = require('morgan');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const UserRouter = require('./routes/user');

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


app.listen(port, () => {
    console.log(`user-service listening at http://localhost:${port}`)
})