<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\CreateUserRequest;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController
{
    public function __construct(protected UserService $userService)
    {
    }
    public function getUsers () {
        return $this->userService->getAllUsers();
    }

    public function getUser (string $id) {
        return $this->userService->getUserById($id);
    }

    public function createUser(CreateUserRequest $createUserRequest) {
        return $this->userService->createUser($createUserRequest->validated());
    }

    public function updateUser(Request $request, string $id) {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $validatedData = $validator->validated();

        return $this->userService->updateUser($validatedData, $id);
    }

    public function deleteUser(string $id) {
        return $this->userService->deleteUser($id);
    }
}
