import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { getPageDirection } from '@/hooks/use-language';
import { type NavItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { LayoutGrid, Users, LucideStar } from 'lucide-react';
import AppLogo from './app-logo';
import { Auth } from '@/types';
import { useTranslations } from '@/hooks/use-translations';
export function AppSidebar() {
    const { auth } = usePage().props as unknown as { auth: Auth };
    const pageDir = getPageDirection();

    const { t } = useTranslations();

    const mainNavItems: NavItem[] = [
        {
            title: t('dashboard.title'),
            href: '/dashboard',
            icon: LayoutGrid,
        }, {
            title: t('base.initialization'),
            icon: LucideStar,
            children: [
                {
                    title: t('base.icons'),
                    href: route('icons.index'),
                    icon: LucideStar,
                },
                auth.user?.can.view_users ? {
                    title: t('users.index_page_title'),
                    href: route('users.index'),
                    icon: Users,
                } : null,
                auth.user?.can.view_provinces
                    ? {
                        title: t('provinces.title'),
                        href: route('provinces.index'),
                        icon: LucideStar,
                    }
                    : null,
            ].filter(Boolean) as NavItem[],
        },

    ].filter(Boolean) as NavItem[];

    const footerNavItems: NavItem[] = [];
    const side = pageDir === 'rtl' ? 'right' : 'left';
    return (
        <Sidebar collapsible="icon" side={side} variant="inset">
            <SidebarHeader className='bg-background'>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <AppLogo label={t('common.sidebar.title')} />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className='bg-background'>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className='bg-background'>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
