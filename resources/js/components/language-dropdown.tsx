import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger, DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { LucideIcon, Languages } from 'lucide-react';
import { HTMLAttributes, useCallback } from 'react';
import { usePage } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
export default function LanguageToggleDropdown({
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { locale } = usePage().props as unknown as { locale: string};
    const action = 'language.update';
    const langs: { name: string; icon: LucideIcon; label: string }[] = [
        { name: 'ar', icon: Languages, label: 'عربي' },
        { name: 'en', icon: Languages, label: 'English' },
        { name: 'el', icon: Languages, label: 'Yonani' },
    ];

    const selected = langs.find((p) => p.name == locale);
    const selectedLabel = selected?.label ?? locale;

    const { post } = useForm<{ lang: string }>({
        lang: locale ?? '',
    });
    const updateLang = useCallback((value: string) => {
        const options = {
            preserveState: true,
            preserveScroll: true,
            preserveSearchParams: true,
        };
        post(route(action, {
            lang: value || undefined,
        } as const), options);
    }, []);
    return (
        <div  {...props}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Button variant="ghost" className="rounded-full rounded-lg bg-indigo-200 py-1 px-5">



                                <span className="flex items-center gap-2">
                                    <Languages className="h-5 w-5" />
                                    {selectedLabel}
                                </span>
                            </Button>
                        </div>
                    </DropdownMenuLabel>



                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {langs.map(({ name, icon: Icon, label }) => (
                        <DropdownMenuItem key={name} onClick={() => updateLang(name)}>
                            <span className="flex items-center gap-2">
                                <Icon className="h-5 w-5" />
                                {label}
                            </span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
