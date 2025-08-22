<?php

declare(strict_types=1);

return [
    'title' => 'الإعدادات',
    'description' => 'إدارة ملفك الشخصي وإعدادات الحساب',
    'appearance' => [
        'title' => 'إعدادات مظهر لوحة القيادة',
        'description' => 'تحديث إعدادات مظهر لوحة القيادة لحسابك',
    ],
    'locale' => [
        'title' =>  'إعدادات لغة لوحة القيادة',
        'description' => 'تحديث إعدادات لغة لوحة القيادة لحسابك',
        'labels' => [
            'lang' => 'اللغة',
        ],
        'placeholders' => [
            'select_lang' => 'اختر اللغة',
        ],
    ],
    'password' => [
        'title' => 'إعدادات كلمة المرور',
        'description' => 'تأكد من أن حسابك يستخدم كلمة مرور طويلة وعشوائية للحفاظ على أمانه',
        'current_password' => 'كلمة المرور الحالية',
        'current_password_placeholder' => 'كلمة المرور الحالية',
        'new_password' => 'كلمة المرور الجديدة',
        'new_password_placeholder' => 'كلمة المرور الجديدة',
        'confirm_password' => 'تأكيد كلمة المرور',
        'confirm_password_placeholder' => 'تأكيد كلمة المرور',
        'save_button' => 'حفظ كلمة المرور',
        'saved' => 'تم الحفظ',
    ],
    'profile' => [
        'title' => 'إعدادات الملف الشخصي',
        'description' => 'تحديث اسمك وعنوان بريدك الإلكتروني',
        'name' => 'الاسم',
        'name_placeholder' => 'الاسم الكامل',
        'email' => 'عنوان البريد الإلكتروني',
        'email_placeholder' => 'عنوان البريد الإلكتروني',
        'email_unverified' => 'عنوان بريدك الإلكتروني غير مؤكد.',
        'resend_verification' => 'انقر هنا لإعادة إرسال بريد التحقق.',
        'verification_link_sent' => 'تم إرسال رابط تحقق جديد إلى عنوان بريدك الإلكتروني.',
        'save_button' => 'حفظ',
        'saved' => 'تم الحفظ',
        'delete_account' => [
            'title' => 'حذف الحساب',
            'description' => 'حذف حسابك وجميع موارده',
            'warning' => 'تحذير',
            'warning_description' => 'الرجاء المتابعة بحذر، لا يمكن التراجع عن هذا الإجراء.',
            'button' => 'حذف الحساب',
            'confirm_title' => 'هل أنت متأكد أنك تريد حذف حسابك؟',
            'confirm_description' => 'بمجرد حذف حسابك، سيتم حذف جميع موارده وبياناته بشكل دائم. الرجاء إدخال كلمة المرور الخاصة بك لتأكيد رغبتك في حذف حسابك بشكل دائم.',
            'password' => 'كلمة المرور',
            'password_placeholder' => 'كلمة المرور',
            'cancel' => 'إلغاء',
            'confirm_button' => 'حذف الحساب',
        ],
    ],
];
