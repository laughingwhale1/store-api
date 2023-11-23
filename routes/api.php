<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;



Route::prefix('users')->group(function () {
    Route::get('', [UserController::class, 'getUsers']);
    Route::get('{id}', [UserController::class, 'getUser']);
    Route::post('', [UserController::class, 'createUser']);
    Route::put('{id}', [UserController::class, 'updateUser']);
    Route::delete('{id}', [UserController::class, 'deleteUser']);
});
