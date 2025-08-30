<?php

namespace App\Exceptions;

class InValidateDateFormatException extends InValidateException
{


    public function __construct($date_value)
    {
        $msg =trans('validation.invalid_date_format', ['date_value' => $date_value]);
        parent::__construct($msg);
    }
}
