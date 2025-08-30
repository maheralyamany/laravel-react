<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Directorate extends \App\Abstracts\BaseModel
{
     use SoftDeletes;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'directorates';

    /**
     *  Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['name_ar', 'name_en', 'prov_id', 'status', 'prov_capital', 'created_at', 'updated_at', 'deleted_at'];

    /**
     *  Attributes that should be string null.
     *
     * @var array
     */
    protected $forcedNullStrings = ['name_en', 'created_at', 'updated_at', 'deleted_at'];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = ['status' =>'boolean', 'prov_capital' =>'boolean', 'created_at' =>'datetime', 'updated_at' =>'datetime', 'deleted_at' =>'datetime'];

    /**
     * The attributes that should be date  types.
     *
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function province()
    {
        return $this->belongsTo(Province::class,'prov_id')->withoutGlobalScopes();
    }
}
