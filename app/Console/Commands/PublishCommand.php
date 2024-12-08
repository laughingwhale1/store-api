<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class PublishCommand extends Command
{
    protected $signature = 'rabbitmq:publish';

    protected $description = 'Command description';

    public function handle()
    {
        $connection = new AMQPStreamConnection(
            Config::get('rabbitmq.host'),
            Config::get('rabbitmq.port'),
            Config::get('rabbitmq.user'),
            Config::get('rabbitmq.password'),
        );
        $channel = $connection->channel();

        // declare exchanger
        $channel->exchange_declare('laravel', 'fanout', false, true, false);
        // declare queue
        $channel->queue_declare('laravel', false, true, false, false);
        // bind exchanger to queue
        $channel->queue_bind('laravel', 'laravel');

        $message = ['title' => 'random'];
        $encodedMessage = json_encode($message);

        $msg = new AMQPMessage($encodedMessage);
        $channel->basic_publish($msg, 'laravel');

        echo " [x] Sent 'Hello World!'\n";

        $connection->close();
        $channel->close();
    }
}
