<?php

declare(strict_types=1);

namespace App\Exceptions;

class InValidateException  extends \Exception
{
  public function __construct($msg)
  {

    parent::__construct($msg);
  }
}
