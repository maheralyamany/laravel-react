<?php

declare(strict_types=1);

namespace App\Abstracts;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as Eloquent;

abstract class BaseModel extends Eloquent
{
    use HasFactory;

    use \App\Models\Traits\ItemHasMoveTrait;

    protected $moveRelations = [];
    protected $forcedNullStrings = [];
    protected $forcedNullNumbers = [];
    protected $execluedDateFormat = [];

    // protected $dateFormat = 'Y-m-d H:i:s';



    /**
     * Create a new  instance for the model.
     *
     * @return BaseBuilder
     */
    protected static function newNoScopes()
    {
        return static::query()->withoutGlobalScopes();
    }


    /**
     * Create a new Eloquent query builder for the model.
     *
     * @param  \Illuminate\Database\Query\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder|static
     */
    public function newEloquentBuilder($query)
    {
        return new BaseBuilder($query);
    }

    private  function getValidBoolSqlEnumVal($value, $def = '0')
    {

        if ($value === null)
            return $def;
        return match ($value) {
            'on', 'ON', '1', 1, true, 'true', 'TRUE' => "1",
            'off', 'OFF', '0', 0, false, 'FALSE', 'false' => '0',
            default => $def
        };
    }
    public function setAttribute($key, $value)
    {
        if (is_array($this->forcedNullStrings) && in_array($key, $this->forcedNullStrings) && $value === null) {
            $value = "";
        } else if (is_array($this->forcedNullNumbers) && in_array($key, $this->forcedNullNumbers) && $value === null) {
            $value = 0;
        } else if ($this->hasCast($key, ['boolean'])) {
            $value = $this->getValidBoolSqlEnumVal($value);
        } else {
            $value = $this->validateDateFormat($key, $value);
        }

        return parent::setAttribute($key, $value);
    }

    protected function validateDateFormat($key, &$value): mixed
    {
        if ($value !== null && ($this->isDateAttribute($key))) {
            if (!in_array($key, $this->execluedDateFormat)) {
                if (is_string($value))
                    $value = str_replace(" -", '-', $value);
                if (!validateDateFormat($value)) {
                    $value = getValidStrDate($value, $value);
                    if (!validateDateFormat($value))
                        throw new \App\Exceptions\InValidateDateFormatException($value);
                }
            }
            //$value = $this->castAttribute($key, $value);
        }
        return $value;
    }
}
