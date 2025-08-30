<?php

namespace App\Policies;

use App\Enums\PermissionsEnum;
use App\Models\Province;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProvincePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {

        return $user->hasValidPermission(PermissionsEnum::VIEW_PROVINCES);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Province $province): bool
    {
        return $user->hasValidPermission(PermissionsEnum::VIEW_PROVINCES);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasValidPermission(PermissionsEnum::CREATE_PROVINCES);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Province $province): bool
    {
        return $user->hasValidPermission(PermissionsEnum::UPDATE_PROVINCES);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Province $province): bool
    {
        return $user->hasValidPermission(PermissionsEnum::DELETE_PROVINCES);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Province $province): bool
    {
        return $user->hasValidPermission(PermissionsEnum::RESTORE_PROVINCES);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Province $province): bool
    {
        return $user->hasValidPermission(PermissionsEnum::DELETE_PROVINCES);
    }
}
