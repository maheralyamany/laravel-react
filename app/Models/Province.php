<?php
namespace App\Models;

use App\Models\Traits\TransNameTrait;
use Illuminate\Database\Eloquent\SoftDeletes;
class Province extends \App\Abstracts\BaseModel
{
    use SoftDeletes;
    use TransNameTrait;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'provinces';
    /**
     *  Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['name_ar', 'name_en', 'status', 'is_capital', 'created_at', 'updated_at', 'deleted_at'];
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
    protected $casts = [ 'status' => 'boolean', 'is_capital' => 'boolean', 'created_at' => 'datetime', 'updated_at' => 'datetime', 'deleted_at' => 'datetime'];
    /**
     * The attributes that should be date  types.
     *
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];
    /**
     *  Relations that added to model .
     *
     * @var array
     */
    protected $moveRelations = ['directorates'];
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function directorates()
    {
        return $this->hasMany(Directorate::class, 'prov_id')->withoutGlobalScopes();
    }
    public static function createDefaults()
    {
        if (static::newNoScopes()->count() == 0) {
            $rows = [
                ['id' => 1, 'name_ar' => 'إب', 'name_en' => 'Ibb', 'status' => '1', 'is_capital' => '0',],
                ['id' => 2, 'name_ar' => 'أبين', 'name_en' => 'Abyan', 'status' => '0', 'is_capital' => '0',],
                ['id' => 3, 'name_ar' => 'امانة العاصمه', 'name_en' => "Sana'a City", 'status' => '1', 'is_capital' => '1',],
                ['id' => 4, 'name_ar' => 'البيضاء', 'name_en' => 'Al Bayda', 'status' => '1', 'is_capital' => '0',],
                ['id' => 5, 'name_ar' => 'تعز', 'name_en' => "Ta'iz", 'status' => '1', 'is_capital' => '0',],
                ['id' => 6, 'name_ar' => 'الجوف', 'name_en' => 'Al Jawf', 'status' => '1', 'is_capital' => '0',],
                ['id' => 7, 'name_ar' => 'حجه', 'name_en' => 'Hajjah', 'status' => '1', 'is_capital' => '0',],
                ['id' => 8, 'name_ar' => 'الحديدة', 'name_en' => 'Al Hodeidah', 'status' => '1', 'is_capital' => '0',],
                ['id' => 9, 'name_ar' => 'حضرموت سيئون', 'name_en' => 'Hadramawt Seeaon', 'status' => '0', 'is_capital' => '0',],
                ['id' => 10, 'name_ar' => 'ذمار', 'name_en' => 'Dhamar', 'status' => '1', 'is_capital' => '0',],
                ['id' => 11, 'name_ar' => 'شبوه', 'name_en' => 'Shabwah', 'status' => '0', 'is_capital' => '0',],
                ['id' => 12, 'name_ar' => 'صعده', 'name_en' => "Sa'dah", 'status' => '1', 'is_capital' => '0',],
                ['id' => 13, 'name_ar' => 'صنعاء', 'name_en' => "Sana'a", 'status' => '1', 'is_capital' => '0',],
                ['id' => 14, 'name_ar' => 'عدن', 'name_en' => 'Aden', 'status' => '0', 'is_capital' => '0',],
                ['id' => 15, 'name_ar' => 'لحج', 'name_en' => 'Lahj', 'status' => '0', 'is_capital' => '0',],
                ['id' => 16, 'name_ar' => 'مأرب', 'name_en' => "Ma'rib", 'status' => '1', 'is_capital' => '0',],
                ['id' => 17, 'name_ar' => 'المحويت', 'name_en' => 'Al Mahwit', 'status' => '1', 'is_capital' => '0',],
                ['id' => 18, 'name_ar' => 'المهره', 'name_en' => 'Al Maharah', 'status' => '0', 'is_capital' => '0',],
                ['id' => 19, 'name_ar' => 'عمران', 'name_en' => 'Amran', 'status' => '1', 'is_capital' => '0',],
                ['id' => 20, 'name_ar' => 'الضالع', 'name_en' => "Ad Dalia", 'status' => '1', 'is_capital' => '0',],
                ['id' => 21, 'name_ar' => 'ريمة', 'name_en' => 'Raymah', 'status' => '1', 'is_capital' => '0',],
                ['id' => 22, 'name_ar' => 'سقطرى', 'name_en' => 'Socotra', 'status' => '0', 'is_capital' => '0',],
                ['id' => 23, 'name_ar' => 'حضرموت المكلا', 'name_en' => 'Hadramawt', 'status' => '0', 'is_capital' => '0',]
            ];
            collect($rows)->each(function ($r) {
                static::withoutEvents(function () use ($r) {
                    $it =    static::newNoScopes()->find($r['id']);
                    if (is_null($it)) {
                        static::Create($r);
                    } else {
                        $r = (object)$r;
                        $it->name_ar = $r->name_ar;
                        $it->name_en = $r->name_en;
                        $it->save();
                    }
                });
            });
        }
    }
}
