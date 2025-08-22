<?php

declare(strict_types=1);

namespace App\Http\ViewComposers;

use Illuminate\View\View;

class BaseComposer
{
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $appLocale = getCurrentLocale();
        $view->with('language', $appLocale);
        $view->with('pageDir', getPageDirection($appLocale));
    }
}
