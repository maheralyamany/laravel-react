<?php
use Illuminate\Support\Facades\Session;
const LANGUAGE_TAG='LANGUAGE';

if (!function_exists('hasSession')) {
	function hasSession()
	{
		try {
			return	request()->hasSession();
		} catch (\Exception $th) {
			report($th);

			return false;
		}
	}
}
if (!function_exists('get_local')) {
	function get_local()
	{
		// return str_replace('_', '-', getCurrentLocale());
		return  getCurrentLocale();
	}
}
if (!function_exists('getPageDirection')) {
	function getPageDirection($appLocale=null)
	{
		return in_array($appLocale??getCurrentLocale(), ['ar', 'he', 'fa', 'ur']) ? 'rtl' : 'ltr';
	}
}
if (!function_exists('getCurrentLocale')) {
	function getCurrentLocale()
	{

		//$locale = request()->cookie('m_locale', false);
		$currentLocale =    Session::get(LANGUAGE_TAG);

		if ($currentLocale===null) {
            $currentLocale = app()->getLocale();

			if (hasSession()) {


				Session::put(LANGUAGE_TAG, $currentLocale);
			}
		}

		return  $currentLocale;
	}
}

