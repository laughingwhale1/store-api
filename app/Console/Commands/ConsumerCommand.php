<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;
use PhpAmqpLib\Connection\AMQPStreamConnection;

class ConsumerCommand extends Command
{
    protected $signature = 'rabbitmq:consume';

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

        // when we have bind exchange to queue, we dont need to redeclare queue here
//        $channel->queue_declare('hello', false, true, false, false);

        echo " [*] Waiting for messages. To exit press CTRL+C\n";

        $callback = function ($msg) {
            $decodedMessage = json_decode($msg->body, true); // Convert JSON to associative array
            echo ' [x] Received ', json_encode($decodedMessage), "\n";
        };

        $channel->basic_consume('laravel', '', false, true, false, false, $callback);

        try {
            $channel->consume();
        } catch (\Throwable $exception) {
            echo $exception->getMessage();
        }
    }
}
