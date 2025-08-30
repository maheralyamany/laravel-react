<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;

trait ItemHasMoveTrait
{

	/**
	 * Indicates if the model is currently force HasMov.
	 *
	 * @var bool
	 */
	public static $withRelatedMov = true;
	//
	/**
	 * Boot the soft deleting trait for a model.
	 *
	 * @return void
	 */
	public static function bootItemHasMoveTrait()
	{
		/* 	if (!app()->runningInConsole()) {
			if (static::$withRelatedMov) {
				static::addRawHasMoveScope();
			}
		} */
	}


	public  function initializeItemHasMoveTrait()
	{
		if (!isset($this->casts[$this->getHasMovColumn()])) {
			$this->casts[$this->getHasMovColumn()] = 'boolean';
		}
		//$this->appends[] = "has_mov";
	}
	public function getHasMovAttribute()
	{
		$has_mov = $this->getRelatedMov();
		return $has_mov;
	}
	public function getRelatedMov()
	{
		$col = $this->getHasMovColumn();
		if ($this->getWithRelatedMov()) {
			if (is_null($this->attributes[$col] ?? null)) {
				$this->attributes[$col] = $this->onCheckHasMov();
			}
		} else {
			$this->attributes[$col] = false;
		}
		//dd($this);
		return $this->attributes[$col];
	}
	protected function onCheckHasMov()
	{
		return	$this->itmHasMov();
	}
	protected function itmHasMov()
	{
		if (!$this->getWithRelatedMov()) {

			return false;
		}
		$count = 0;
		$moveRelations = $this->moveRelations;
		if (count($moveRelations) > 0) {

			foreach ($moveRelations as $relation) {
				$snake_key = Str::snake($relation);
				if (is_null($this->{$snake_key . '_count'}))
					$this->loadCount($relation);
				//dd($this);
				$count += $this->{$snake_key . '_count'};
				if ($count > 0) {
					return true;
				}
			}
		}
		return $count > 0;
	}
	/**
	 * Get the name of the "has_mov at" column.
	 *
	 * @return string
	 */
	public function getHasMovColumn()
	{
		return 'has_mov';
	}
	/**
	 * Get the fully qualified "deleted at" column.
	 *
	 * @return string
	 */
	public function getQualifiedHasMovColumn()
	{
		return $this->qualifyColumn($this->getHasMovColumn());
	}
	public function getMovScopeName()
	{
		return static::getStaticMovScopeName();
	}
	public static function getStaticMovScopeName()
	{
		return 'RawHasMoveScope';
	}
	/**
	 * Indicates if the model is currently force HasMov.
	 *
	 * @return bool
	 */
	public function getWithRelatedMov()
	{
		return static::$withRelatedMov;
	}
	/**
	 * Indicates if the model is currently force HasMov.
	 *
	 * @param bool $withRelatedMov Indicates if the model is currently force HasMov.
	 * @return self
	 */
	public function setWithRelatedMov($withRelatedMov): self
	{
		$col = $this->getHasMovColumn();
		static::$withRelatedMov = $withRelatedMov;
		$exist = key_exists($col, $this->appends);
		if (static::$withRelatedMov) {
			if (!$exist)
				$this->appends[] = $col;
		} elseif ($exist) {
			unset($this->appends[$col]);
		}
		//dd($this);
		return $this;
	}
}
