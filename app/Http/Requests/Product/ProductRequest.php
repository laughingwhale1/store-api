<?php

namespace App\Http\Requests\Product;

use App\Helpers\ApiResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'title' => ['required', 'max:2000'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image'],
            'price' => ['required', 'numeric'],
        ];
    }

    protected function failedValidation(Validator $validator)
    {

        $res = new ApiResponse(null, true, 400, $validator->errors()->messages());
        $response = new JsonResponse($res->buildResponse(), 400);

        throw new ValidationException($validator, $response);
    }
}
