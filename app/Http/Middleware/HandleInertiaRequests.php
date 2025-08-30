<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Enums\PermissionsEnum;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use Illuminate\Support\Facades\View;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $appLocale = getCurrentLocale();
        View::share('appearance', $request->cookie('appearance') ?? 'system');



        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'appName' => config('app.name'),
            'locale' => $appLocale,
            'pageDir' => getPageDirection($appLocale),
            'quote' => ['message' => trim($message ?? ''), 'author' => trim($author ?? '')],
            'translations' => fn(): array => [
                'auth' => trans('auth', locale: $appLocale),
                'pagination' => trans('pagination', locale: $appLocale),
                'passwords' => trans('passwords', locale: $appLocale),
                'users' => trans('users', locale: $appLocale),
                'provinces' => trans('provinces', locale: $appLocale),
                'base' => trans('base', locale: $appLocale),
                'roles' => trans('roles', locale: $appLocale),
                'validation' => trans('validation', locale: $appLocale),
                'common' => trans('common', locale: $appLocale),
                'dashboard' => trans('dashboard', locale: $appLocale),
                'client-applications' => trans('client-applications', locale: $appLocale),
                'navbar' => trans('navbar', locale: $appLocale),
                'settings' => trans('settings', locale: $appLocale),
                // add other translation files as needed
            ],
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'created_at' => $request->user()->created_at,
                    'updated_at' => $request->user()->updated_at,
                    'deleted_at' => $request->user()->deleted_at,
                    'can' => collect(PermissionsEnum::cases())
                        ->mapWithKeys(fn(PermissionsEnum $permissionsEnum) => [
                            str_replace(' ', '_', $permissionsEnum->value) => $request->user()->can($permissionsEnum->value),
                            str_replace('-', '_', $permissionsEnum->value) => $request->user()->can($permissionsEnum->value),
                        ])
                        ->all(),
                ] : null,
            ],
            'ziggy' => fn(): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
                'warning' => session('warning'),
                'info' => session('info'),
            ],
        ];
    }
}
