/* import { useForm } from '@inertiajs/react';

import { useTranslations } from '@/hooks/use-translations';

import { useDebouncedCallback } from 'use-debounce';
import { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
interface LangFormProps {

    lang: string;
    action: string;

}




export function LangForm({ lang }: LangFormProps) {

    const langs: { name: string; label: string }[] = [
        { name: 'ar', label: 'عربي' },
        { name: 'en', label: 'English' },
        { name: 'el', label: 'Romani' },
    ];

    const { t } = useTranslations();
    const action = 'language.update';
    const { data, setData, post, processing, errors } = useForm({
        lang: lang ?? 'en'
    });

    const updateLang = useDebouncedCallback<(value: string) => void>((value: string) => {
        const options = {
            preserveState: true,
            preserveScroll: true,
            preserveSearchParams: true,
        };

        post(route(action, {
            lang: value || undefined,
        } as const), options);

    }, 300);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const options = {
            preserveState: true,
            preserveScroll: true,
            preserveSearchParams: true,
        };

        post(route(action), options);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <Label htmlFor="lang">{t('settings.locale.labels.lang')}</Label>
                <Select value={data.lang} onValueChange={(value) => {
                    setData('lang', value);
                    updateLang(value);
                }} >
                    <SelectTrigger id="lang">
                        <SelectValue placeholder={t('settings.locale.placeholders.select_lang')} />
                    </SelectTrigger>
                    <SelectContent>
                        {langs.map((lang) => (
                            <SelectItem key={lang.name} value={lang.name}>
                                {t(lang.label)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.lang && <p className="mt-1 text-sm text-red-600">{errors.lang}</p>}
            </div>

            <div>
                <Label htmlFor="password">{t('users.labels.password')}</Label>
                <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    autoComplete="new-password"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
                <Label htmlFor="password_confirmation">
                    {t('users.labels.password_confirmation')}
                </Label>
                <Input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    autoComplete="new-password"
                />
            </div>

            <Button type="submit" disabled={processing}>
                {user ? t('users.actions.update') : t('users.actions.create')}
            </Button>
        </form>
    );
}

 */
