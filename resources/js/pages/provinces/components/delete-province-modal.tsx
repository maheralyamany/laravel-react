import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Province } from '@/types';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface DeleteProvinceModalProps {
	province: Province | null;
	open: boolean;
	onClose: () => void;
}

export function DeleteProvinceModal({ province, open, onClose }: DeleteProvinceModalProps) {
	const [isDeleting, setIsDeleting] = useState(false);
	const { t } = useTranslations();

	if (!province) return null;

	const handleDelete = () => {
		setIsDeleting(true);
		router.delete(route('provinces.destroy', province.id), {
			preserveScroll: true,
			preserveState: true,
			onSuccess: () => {
				onClose();
			},
			onError: () => {
				setIsDeleting(false);
			},
			onFinish: () => {
				setIsDeleting(false);
			},
		});
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t('provinces.delete.title')}</DialogTitle>
					<DialogDescription>{t('provinces.delete.description')}</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<div>
						<p className="text-muted-foreground text-sm font-medium">
							{t('provinces.labels.name')}
						</p>
						<p>{province.local_name}</p>
					</div>
					
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						{t('common.cancel')}
					</Button>
					<Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
						{t('provinces.actions.delete')}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
