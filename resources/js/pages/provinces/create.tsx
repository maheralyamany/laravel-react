import { Head } from '@inertiajs/react';
import { ProvinceForm } from './components/province-form';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { useTranslations } from '@/hooks/use-translations';



export default function Create() {
	const { t } = useTranslations();

	return (
		<AppSidebarLayout
			breadcrumbs={[
				{ title: t('provinces.title'), href: route('provinces.index') },
				{ title: t('provinces.actions.new'), href: route('provinces.create') },
			]}
		>
			<Head title={t('provinces.actions.new')} />
			<div className="p-6">
				<h1 className="mb-6 text-2xl font-semibold">{t('provinces.actions.new_big_button')}</h1>
				<ProvinceForm action={route('provinces.store')}  />
			</div>
		</AppSidebarLayout>
	);
}
