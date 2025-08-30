import AppLayout from '@/layouts/app-layout';
import { PageProps, Province, Auth } from '@/types/index.d';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Plus, Pencil, Trash, MoreHorizontal, Eye, ArrowUpCircle } from 'lucide-react';
import { useTranslations } from '@/hooks/use-translations';
import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { DeleteProvinceModal } from './components/delete-province-modal';
import { RestoreProvinceModal } from './components/restore-province-modal';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { useDebouncedCallback } from 'use-debounce';
import { formatDate } from '@/utils/format';
interface ProvincesIndexProps extends PageProps {
    provinces: Province[];
    filters: {
        search: string;
    };
}

export default function ProvincesIndex({ provinces, filters }: ProvincesIndexProps) {
    const { t } = useTranslations();
    const { auth } = usePage().props as unknown as { auth: Auth };
    const [provinceToDelete, setProvinceToDelete] = useState<Province | null>(null);
    const [provinceToRestore, setProvinceToRestore] = useState<Province | null>(null);

    const { data, setData, get } = useForm<{ search: string }>({
        search: filters.search ?? '',
    });

    const debouncedSearch = useDebouncedCallback<(value: string) => void>((value: string) => {
        void get(
            route('provinces.index', {
                search: value || undefined,
            } as const),
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    }, 300);


    const canCreateProvince = auth.user?.can.create_provinces ?? false;
    const canUpdateProvince = auth.user?.can.update_provinces ?? false;
    const canDeleteProvince = auth.user?.can.delete_provinces ?? false;


    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: t('provinces.title'),
                    href: route('provinces.index'),
                },
            ]}
        >
            <Head title={t('provinces.index_page_title')} />
            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">{t('provinces.title')}</h1>
                    {canCreateProvince && (
                        <Button asChild>
                            <Link href={route('provinces.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                {t('provinces.actions.new_big_button')}
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="mb-4">
                    <Input
                        type="search"
                        placeholder={t('provinces.placeholders.search')}
                        value={data.search}
                        onChange={(e) => {
                            setData('search', e.target.value);
                            debouncedSearch(e.target.value);
                        }}
                        className="max-w-sm"
                    />
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('provinces.labels.name_ar')}</TableHead>
                            <TableHead>{t('provinces.labels.name_en')}</TableHead>

                            <TableHead>{t('provinces.labels.created_at')}</TableHead>
                            <TableHead>{t('provinces.labels.is_capital')}</TableHead>
                            <TableHead>{t('provinces.labels.status')}</TableHead>
                            {(canUpdateProvince || canDeleteProvince) && (
                                <TableHead className="w-[100px]">
                                    {t('provinces.labels.actions')}
                                </TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {provinces.map((province) => (
                            <TableRow key={province.id}>
                                <TableCell>{province.name_ar}</TableCell>
                                <TableCell>{province.name_en}</TableCell>

                                <TableCell>{formatDate(province.created_at)}</TableCell>
                                <TableCell>
                                    <span
                                        className={cn(
                                            'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                                            !province.is_capital
                                                ? 'bg-red-50 text-red-700'
                                                : 'bg-green-50 text-green-700'
                                        )}
                                    >
                                        {!province.is_capital
                                            ? t('base.no')
                                            : t('base.yes')}
                                    </span>
                                </TableCell>

                                <TableCell>
                                    <span
                                        className={cn(
                                            'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                                            province.deleted_at || !province.status
                                                ? 'bg-red-50 text-red-700'
                                                : 'bg-green-50 text-green-700'
                                        )}
                                    >
                                        {province.deleted_at || !province.status
                                            ? t('provinces.status.inactive')
                                            : t('provinces.status.active')}
                                    </span>
                                </TableCell>
                                {(canUpdateProvince || canDeleteProvince) && (
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        {t('common.actions')}
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('provinces.show', province.id)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        {t('provinces.actions.show')}
                                                    </Link>
                                                </DropdownMenuItem>
                                                {canUpdateProvince && (
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('provinces.edit', province.id)}>
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            {t('provinces.actions.edit')}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                )}
                                                {(canDeleteProvince && !province.has_mov && !province.is_capital) && !province.deleted_at && (
                                                    <DropdownMenuItem
                                                        onSelect={() => setProvinceToDelete(province)}
                                                    >
                                                        <Trash className="mr-2 h-4 w-4" />
                                                        {t('provinces.actions.delete')}
                                                    </DropdownMenuItem>
                                                )}
                                                {canUpdateProvince && province.deleted_at && (
                                                    <DropdownMenuItem
                                                        onSelect={() => setProvinceToRestore(province)}
                                                    >
                                                        <ArrowUpCircle className="mr-2 h-4 w-4" />
                                                        {t('provinces.actions.restore')}
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <DeleteProvinceModal
                province={provinceToDelete}
                open={provinceToDelete !== null}
                onClose={() => setProvinceToDelete(null)}
            />
            <RestoreProvinceModal
                province={provinceToRestore}
                open={provinceToRestore !== null}
                onClose={() => setProvinceToRestore(null)}
            />
        </AppLayout>
    );
}
