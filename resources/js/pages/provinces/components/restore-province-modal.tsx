import { FormEvent } from 'react';
import { Province } from '@/types';
import { useTranslations } from '@/hooks/use-translations';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';

interface RestoreProvinceModalProps {
	province: Province | null;
	open: boolean;
	onClose: () => void;
}

export function RestoreProvinceModal({ province, open, onClose }: RestoreProvinceModalProps) {
	const { t } = useTranslations();
	const form = useForm({});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		form.put(route('provinces.restore', province?.id), {
			onSuccess: () => {
				onClose();
			},
		});
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t('provinces.restore.title')}</DialogTitle>
					<DialogDescription>
						{t('provinces.restore.description') + ': ' + province?.local_name}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={onClose} disabled={form.processing}>
						{t('common.cancel')}
					</Button>
					<Button variant="default" onClick={handleSubmit} disabled={form.processing}>
						{t('provinces.actions.restore')}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
