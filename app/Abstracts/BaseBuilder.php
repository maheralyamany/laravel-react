<?php

declare(strict_types=1);

namespace App\Abstracts;

use Illuminate\Database\Eloquent\Builder;

class BaseBuilder extends Builder
{
    public  function cloneMe(): Builder
    {

        return $this->clone();
    }
    public function makeAppendsHidden(): static
    {

        $appends =    $this->getModel()->getAppends();
        if (count($appends) > 0) {
            $this->getModel()->makeHidden($appends);
        }

        return $this;
    }
    public function modelMethodExists(string $method): bool
	{
		return method_exists($this->model, $method);
	}
    public  function getHidden(): array
	{

		return $this->model->getHidden();
	}
	/**
	 * withoutGlobalScopes
	 * @return self
	 */
	public function noScopes()
	{
		return  $this->withoutGlobalScopes();
	}
}
