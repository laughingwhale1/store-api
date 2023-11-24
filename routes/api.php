<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;



Route::prefix('users')->group(function () {
    Route::get('', [UserController::class, 'getUsers']);
    Route::get('{id}', [UserController::class, 'getUser']);
    Route::post('', [UserController::class, 'createUser']);
    Route::put('{id}', [UserController::class, 'updateUser']);
    Route::delete('{id}', [UserController::class, 'deleteUser']);
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
});
