<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ResponseHelper
{
    public static function appendErrors(array $errors): array
    {
        if (is_array($errors)) {
            $errorsArr = [];

            if (count($errors) === 0) {
                return $errorsArr;
            }

            foreach ($errors as $key => $val) {
                if (is_array($val)) {
                    array_push($errorsArr, ['key' => $key, 'message' => $val[0]]);
                    continue;
                }
                array_push($errorsArr, ['key' => $key, 'message' => $val]);
            }

            return $errorsArr;
        }
        return [];
    }

    public static function buildResponse(
        mixed $value,
        bool  $success,
        int   $status,
        array $errors
    ): JsonResponse
    {
        return response()->json([
            'value' => $value,
            'success' => $success,
            'errors' => self::appendErrors($errors),
            'status' => $status
        ], $status);
    }
}
