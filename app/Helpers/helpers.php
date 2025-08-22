<?php
if (!function_exists('m_empty')) {
    /**
     * Determine whether a variable is considered to be empty. A variable is considered empty if it does not exist or if its value equals `false` . empty() does not generate a warning if the variable does not exist.
     *
     * @param mixed $var Variable to be checked No warning is generated if the variable does not exist. That means empty() is essentially the concise equivalent to !isset($var) || $var == false .
     * @return bool Returns `true` if `var` does not exist or has a value that is empty or equal to zero, aka falsey, see conversion to boolean . Otherwise returns `false` .
     */
    function m_empty($var): bool
    {
        return !isset($var) || $var === null || empty($var);
    }
}
if (!function_exists('is_not_null')) {
    /**
     * Finds whether a variable is not `null`
     * Finds whether the given variable is not `null` .
     *
     * @param mixed $value The variable being evaluated.
     * @return bool Returns `true` if `value` is not `null`, `false` otherwise.
     */
    function is_not_null($value)
    {
        return $value !== null;
    }
}
