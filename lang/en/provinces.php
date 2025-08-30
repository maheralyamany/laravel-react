<?php

declare(strict_types=1);

return [
    'title' => 'Governorates',
    'index_page_title' => 'All Governorates',
    'actions' => [
        'new' => 'New Governorate',
        'new_big_button' => 'Create Governorate',
        'create' => 'Create Governorate',
        'edit' => 'Edit Governorate',
        'edit_big_button' => 'Edit Governorate',
        'update' => 'Update Governorate',
        'delete' => 'Delete Governorate',
        'show' => 'Show Governorate',
        'restore' => 'Restore Governorate',
    ],
    'labels' => [
        'name' => 'Name',
        'name_ar' => 'Arabic Name',
        'name_en' => 'English Name',
       "is_capital" => "Is Capital",
        'actions' => 'Actions',
        'status' => 'Status',
        'created_at' => 'Created At',
    ],
    'placeholders' => [

        'search' => 'Search by name ...',
    ],
    'messages' => [
      'created' => 'Governorate created successfully',
        'updated' => 'Governorate updated successfully',
        'deleted' => 'Governorate deleted successfully',
        'restored' => 'Governorate restored successfully',
    ],
    'delete' => [
         'title' => 'Delete Governorate',
        'description' => 'Are you sure you want to delete this governorate?',
    ],
    'status' => [
        'active' => 'Active',
        'inactive' => 'Inactive',
    ],
    'restore' => [
        'title' => 'Restore Governorate',
        'description' => 'Are you sure you want to restore this governorate?',
    ],
];
