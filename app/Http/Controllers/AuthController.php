<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\AuthLoginRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(AuthLoginRequest $authLoginRequest) {
        $remember = $authLoginRequest['remember'] ?? false;
        unset($authLoginRequest['remember']);

        if(!Auth::attempt($authLoginRequest->validated(), $remember)) {
            return response([
                'message' => 'Email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$user->is_admin) {
            Auth::logout();

            return response([
                'message' => 'You dont have permission to authenticate as admin'
            ], 403);
        }

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }


    public function logout() {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
