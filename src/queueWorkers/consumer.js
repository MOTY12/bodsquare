var amqp = require('amqplib/callback_api');

function consumer(queue){
  amqp.connect(process.env.RABBITMQ_URL, function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      channel.assertQueue(queue, {
        durable: false
      });
      // console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
      channel.consume(queue, function(msg) {
        msg.content.toString()
        // console.log(" [x] Received %s", msg.content.toString());
      }
      , {
        noAck: true
      });
    })
  });
}

module.exports = consumer;

