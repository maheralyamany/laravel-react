<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\Province;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class ProvinceUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name_ar' => ['required', 'string', 'max:255'],
            'name_en' => ['string', 'max:255'],
            'status' => ['required'],
            'is_capital' => ['required'],

        ];
    }

    /**
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'name_ar' => __('provinces.labels.name_ar'),
            'name_en' => __('provinces.labels.name_en'),
            'status' => __('provinces.labels.status'),
            'is_capital' => __('provinces.labels.is_capital'),

        ];
    }
}
