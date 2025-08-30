import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { PageProps, Province } from '@/types';
import { Head } from '@inertiajs/react';
import { useTranslations } from '@/hooks/use-translations';

interface ShowProvinceProps extends PageProps {
	province: Province;
}

export default function Show({ province }: ShowProvinceProps) {
	const { t } = useTranslations();

	return (
		<AppSidebarLayout
			breadcrumbs={[
				{ title: t('provinces.title'), href: route('provinces.index') },
				{ title: province.local_name, href: route('provinces.show', province.id) },
			]}
		>
			<Head title={province.local_name} />
			<div className="p-6">
				<h1 className="mb-6 text-2xl font-semibold">{province.name_ar}</h1>
				<div className="space-y-4">
					<div>
						<p className="text-muted-foreground text-sm font-medium">
							{t('provinces.labels.name_en')}
						</p>
						<p>{province.name_en}</p>
					</div>

				</div>
			</div>
		</AppSidebarLayout>
	);
}
