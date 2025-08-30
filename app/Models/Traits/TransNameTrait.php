<?php

declare(strict_types=1);

namespace App\Models\Traits;

trait TransNameTrait
{
    public  function initializeTransNameTrait()
    {
        if (!isset($this->casts['local_name'])) {
            $this->casts['local_name'] = 'string';
        }
        $this->appends[] = "local_name";
    }
    public function getLocalNameAttribute()
    {

        $local_name = $this->getTransName();
        return $local_name;
    }
    public function getTransName($locale = null): string
    {
        if ($locale == null) {
            $locale = get_local();
        }
        try {
            $tame = $this->{'name_' . $locale};
            if (empty($tame)) {
                $tame = $this->{'name_ar'};
            }
            return $tame;
        } catch (\Throwable $th) {
            report($th);


            return '';
        }
    }
}
