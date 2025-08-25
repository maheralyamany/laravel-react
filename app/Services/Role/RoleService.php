<?php

declare(strict_types=1);

namespace App\Services\Role;
use Spatie\Permission\Models\Role;
class RoleService
{
     // Get all roles
    public function getAllRoles()
    {
        return Role::all();
    }

    // Create a new role
    public function createRole(array $data): Role
    {
        return Role::create($data);
    }

    // Delete a role
    public function deleteRole(Role $role): bool
    {
        return $role->delete();
    }
}
