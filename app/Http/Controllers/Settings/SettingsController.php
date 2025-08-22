<?php

declare(strict_types=1);

namespace App\Http\Controllers\Settings;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\LanguageUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{


    /**
     * Update the user's profile settings.
     */
    public function changeLang(Request $request): RedirectResponse
    {
        $lang = $request->get("lang");
        if (is_not_null($lang)) {
            $prev_local = get_local();
            Session::put(LANGUAGE_TAG, $lang);

			app()->setLocale($lang);
			app('translator')->setLocale($lang);
           // dd($prev_local,get_local(),app()->getLocale());
        }
         return redirect('settings/language');

    }
}
