const amqp = require('amqplib/callback_api');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

module.exports = new Promise((resolve, reject) => {
    amqp.connect(RABBITMQ_URL, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            console.log('rabbitmq connection established');
            const QUEUE = 'user_reward'
            channel.assertQueue(QUEUE, {
                durable: true
            });
            resolve(channel);
        });
        process.on('exit', () => {
            console.log('rabbitmq connection closed')
            connection.close()
        })
    });
});