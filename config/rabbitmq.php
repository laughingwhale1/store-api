<?php
return [
    'host' => 'localhost',
    'port' => '5672',
    'user' => env('RABBITMQ_DEFAULT_USER'),
    'password' => env('RABBITMQ_DEFAULT_PASS')
];
