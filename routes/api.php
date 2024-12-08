<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('user', [AuthController::class, 'getUser']);
    Route::prefix('auth')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
    });

    Route::apiResource('/product', \App\Http\Controllers\Api\ProductController::class);
});

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
});
