<?php

namespace App\Helpers;

class ApiResponse
{
    private int $_status = 200;
    private bool $_success = true;
    private mixed $_value = null;
    private array $_errors = [];

    public function __construct(
        mixed $value,
        bool $success,
        int $status,
        array $errors
    )
    {
        $this->_value = $value;
        $this->_status = $status;
        $this->_success = $success;
        $this->_errors = $this->appendErrors($errors);
    }

    private function appendErrors(array $errors) : array
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

    public function buildResponse() : array
    {
        return [
            'value' => $this->_value,
            'status' => $this->_status,
            'success' => $this->_success,
            'errors' => $this->_errors
        ];
    }

}
