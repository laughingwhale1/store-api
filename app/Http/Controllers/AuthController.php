<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\Auth\AuthLoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function login(AuthLoginRequest $authLoginRequest)
    {
        $remember = $authLoginRequest['remember'] ?? false;

        $loginFormData = $authLoginRequest->validated();
        unset($loginFormData['remember']);

        if (!Auth::attempt($loginFormData, $remember)) {
            $res = new ApiResponse(null, false, Response::HTTP_BAD_REQUEST, ['Email or password is incorrect']);
            return response()->json($res->buildResponse(), 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$user->is_admin) {
            Auth::logout();

            $res = new ApiResponse(null, false, 403, ['You dont have permission to authenticate as admin']);
            return response()->json($res->buildResponse(), 403);

        }

        $token = $user->createToken('main')->plainTextToken;

        $res = new ApiResponse([
            'user' => new UserResource($user),
            'token' => $token
        ], true, Response::HTTP_FORBIDDEN, ['You dont have permission to authenticate as admin']);
        return response()->json($res->buildResponse(), 200);

    }


    public function logout()
    {

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $user->currentAccessToken()->delete();

        $res = new ApiResponse(null, true, 204, []);
        return response()->json($res->buildResponse(), 204);
    }

    public function getUser(Request $request)
    {
        $res = new ApiResponse(new UserResource($request->user()), true, 200, []);
        return response()->json($res->buildResponse(), 200);
    }
}
