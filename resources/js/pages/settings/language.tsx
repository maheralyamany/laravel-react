import { Head } from '@inertiajs/react';
import { useTranslations } from '@/hooks/use-translations';
import LanguageDropdown from '@/components/language-dropdown';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

export default function Language() {
    const { t } = useTranslations();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('settings.locale.title'),
            href: '/settings/language',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('settings.locale.title')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title={t('settings.locale.title')}
                        description={t('settings.locale.description')}
                    />
                    <LanguageDropdown />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
