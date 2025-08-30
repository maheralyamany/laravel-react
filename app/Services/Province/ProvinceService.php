<?php

declare(strict_types=1);

namespace App\Services\Province;

use App\Models\Province;
use Illuminate\Support\Collection;

class ProvinceService
{

    /**
     * Get users based on filters
     *
     * @return Collection<int, Province>
     */
    public function getProvinces(
        ?string $search = null,
    ): Collection {
        return Province::query()
            ->when($search, function ($query, $search): void {
                $query->where(function ($query) use ($search): void {
                    $query->where('name_ar', 'like', sprintf('%%%s%%', $search))
                        ->orWhere('name_en', 'like', sprintf('%%%s%%', $search));
                });
            })->withTrashed()

            ->get();
    }
    // Get all Provinces
    public function getAll()
    {
        return Province::all();
    }

    // Create a new Province
    public function create(array $data): Province
    {
        $this->updateCapital(null, $data);

        return Province::create($data);
    }
    /**
     * @param  array<string, mixed>  $data
     */
    public function update(Province $province, array $data): bool
    {
        $this->updateCapital($province, $data);


        // dd($province, $data);
        return  $province->update($data);
    }
    public function updateCapital(Province|null $province, array $data)
    {
        $is_capital = $data['is_capital']  ?? '0';
        if ($is_capital == true || $is_capital == '1') {
            $query =    Province::newNoScopes()->where('is_capital', '1');
            if (!is_null($province)) {
                $query->whereNot('id', $province->id);
            }
            $dirs = $query->get();
            foreach ($dirs as $dir) {
                $dir->update(['is_capital' => '0']);
            }
        }
    }
    // Delete a Province
    public function delete(Province $province): bool
    {
        return $province->delete();
    }
    public function restore(Province $province): Province
    {
        $province->restore();

        return $province;
    }
}
