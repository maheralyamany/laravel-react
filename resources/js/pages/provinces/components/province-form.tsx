import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useTranslations } from '@/hooks/use-translations';

interface ProvinceFormProps {
    province?: {
        id: number;
        name_ar: string;
        name_en: string;
        is_capital: boolean;
        status: boolean;
    };
    action: string;

}

export function ProvinceForm({ province, action }: ProvinceFormProps) {
    const { t } = useTranslations();
    const { data, setData, post, put, processing, errors } = useForm({
        name_ar: province?.name_ar ?? '',
        name_en: province?.name_en ?? '',
        is_capital: province?.is_capital ?? false,
        status: province?.status ?? false,

    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const options = {
            preserveState: true,
            preserveScroll: true,
            preserveSearchParams: true,
        };

        if (province) {
            put(action, options);
        } else {
            post(action, options);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name_ar">{t('provinces.labels.name_ar')}</Label>
                <Input
                    id="name_ar"
                    value={data.name_ar}
                    onChange={(e) => setData('name_ar', e.target.value)}
                    autoComplete="name_ar"
                />
                {errors.name_ar && <p className="mt-1 text-sm text-red-600">{errors.name_ar}</p>}
            </div>
            <div>
                <Label htmlFor="name_en">{t('provinces.labels.name_en')}</Label>
                <Input
                    id="name_en"
                    value={data.name_en}
                    onChange={(e) => setData('name_en', e.target.value)}
                    autoComplete="name_en"
                />
                {errors.name_en && <p className="mt-1 text-sm text-red-600">{errors.name_en}</p>}
            </div>

            <div className="flex items-center space-x-3">
                <Checkbox
                    id="is_capital"
                    name="is_capital"
                    checked={data.is_capital}
                    onClick={() => setData('is_capital', !data.is_capital)}
                />
                <Label htmlFor="is_capital">{t('provinces.labels.is_capital')}</Label>
            </div>
            <div className="flex items-center space-x-3">
                <Checkbox
                    id="status"
                    name="status"
                    checked={data.status}
                    onClick={() => setData('status', !data.status)}
                />
                <Label htmlFor="status">{t('provinces.labels.status')}</Label>
            </div>




            <Button type="submit" disabled={processing}>
                {province ? t('provinces.actions.update') : t('provinces.actions.create')}
            </Button>
        </form>
    );
}
