<?php

namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;

class UserService
{
    public function getAllUsers()
    {
        return DB::table('users')->get();
    }

    public function getUserById(string $id)
    {
        try {
            $users = User::query()->where('id', '=', $id)->get();
            return response()->json(['result' => $users]);
        } catch (Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function createUser(array $userData) {
        DB::beginTransaction();

        try {
            $user = User::query()->create($userData);

            DB::commit();

            return response()->json(['user' => $user, 'message' => 'User created'], 201);
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updateUser(array $userData, $userId) {
        try {
            $user = User::query()->where('id', '=', $userId)->update($userData);

            return response()->json(['user' => $user, 'message' => 'User updated'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function deleteUser(string $userId) {
        try {
            $user = User::query()->find($userId);

            if ($user) {
                $user->delete();
                return response()->json(['user' => $user, 'message' => 'User deleted'], 200);
            }

            return response()->json(['user' => $user, 'message' => 'User not found'], 404);

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
