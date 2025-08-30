<?php

declare(strict_types=1);

namespace App\Enums;

enum PermissionsEnum: string
{
    case VIEW_USERS = 'view users';

    case CREATE_USERS = 'create users';

    case UPDATE_USERS = 'update users';

    case DELETE_USERS = 'delete users';

    case RESTORE_USERS = 'restore users';
    case VIEW_PROVINCES = 'view provinces';

    case CREATE_PROVINCES = 'create provinces';

    case UPDATE_PROVINCES = 'update provinces';

    case DELETE_PROVINCES = 'delete provinces';

    case RESTORE_PROVINCES = 'restore provinces';

    public function label(): string
    {
        return match ($this) {
            self::VIEW_USERS => 'View Users',
            self::CREATE_USERS => 'Create Users',
            self::UPDATE_USERS => 'Update Users',
            self::DELETE_USERS => 'Delete Users',
            self::RESTORE_USERS => 'Restore Users',

            self::VIEW_PROVINCES => 'View Provinces',
            self::CREATE_PROVINCES => 'Create Provinces',
            self::UPDATE_PROVINCES => 'Update Provinces',
            self::DELETE_PROVINCES => 'Delete Provinces',
            self::RESTORE_PROVINCES => 'Restore Provinces',
        };
    }
}
