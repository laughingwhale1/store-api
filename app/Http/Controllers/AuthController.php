<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\AuthLoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(AuthLoginRequest $authLoginRequest) {
        $remember = $authLoginRequest['remember'] ?? false;

        $loginFormData = $authLoginRequest->validated();
        unset($loginFormData['remember']);

        if(!Auth::attempt($loginFormData, $remember)) {
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
            'value' => [
                'user' => new UserResource($user),
                'token' => $token
            ],
            'success' => true
        ], 200);
    }


    public function logout() {

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $user->currentAccessToken()->delete();

        return response([
            'value' => null,
            'success' => true
        ], 204);
    }

    public function getUser(Request $request) {
        return new UserResource($request->user());
    }
}
