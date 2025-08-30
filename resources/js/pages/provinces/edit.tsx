import { Head } from '@inertiajs/react';
import { ProvinceForm } from './components/province-form';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { useTranslations } from '@/hooks/use-translations';
import { Province } from '@/types';

interface EditProvinceProps {
	province: Province;

}

export default function Edit({ province }: EditProvinceProps) {
	const { t } = useTranslations();

	return (
		<AppSidebarLayout
			breadcrumbs={[
				{ title: t('provinces.title'), href: route('provinces.index') },
				{ title: t('provinces.actions.edit'), href: route('provinces.edit', province.id) },
			]}
		>
			<Head title={t('provinces.actions.edit')} />
			<div className="p-6">
				<h1 className="mb-6 text-2xl font-semibold">
					{t('provinces.actions.edit_big_button')}
				</h1>
				<ProvinceForm province={province} action={route('provinces.update', province.id)}  />
			</div>
		</AppSidebarLayout>
	);
}
