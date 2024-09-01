<?php

namespace App\Http\Requests\Auth;

use App\Helpers\ApiResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class AuthLoginRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email' => ['required', 'email'],
            'password' => ['required'],
            'remember' => ['boolean'],
        ];
    }

    protected function failedValidation(Validator $validator)
    {

        $res = new ApiResponse(null, true, 400, $validator->errors()->messages());
        $response = new JsonResponse($res->buildResponse(), 400);

        throw new ValidationException($validator, $response);
    }
}
