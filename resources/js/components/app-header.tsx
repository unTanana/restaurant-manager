import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from '@/components/ui/sheet';
import { UserMenuContent } from '@/components/user-menu-content';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';

const navItems = [
    { title: 'ADMIN', href: dashboard() },
    { title: 'ORDERS', href: '/orders' },
    { title: 'TABLES', href: '/tables' },
    { title: 'ANALYTICS', href: '/analytics' },
    { title: 'MENU', href: '/menu' },
];

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const isActive = (href: NavItem['href']) => {
        const hrefString = typeof href === 'string' ? href : href.url;
        return page.url === hrefString;
    };

    return (
        <>
            <div className="bg-white"></div>
            <div className="border-b border-gray-950 mb-4">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2 h-[34px] w-[34px]">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex h-full w-64 flex-col items-stretch justify-between bg-sidebar">
                                <SheetHeader className="flex justify-start text-left">
                                    <span className="text-lg font-bold">RESTAURANT MANAGER</span>
                                </SheetHeader>
                                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                    <div className="flex flex-col space-y-4">
                                        {navItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center space-x-2 font-medium text-lg px-3 py-2 rounded-md transition-colors",
                                                    isActive(item.href) 
                                                        ? "bg-nav-active text-white hover:bg-nav-active shadow-[4px_2px_6px_0px_rgba(0,0,0,0.25)]" 
                                                        : "hover:bg-gray-100"
                                                )}
                                            >
                                                <span>{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:items-center px-8 lg:space-x-6 lg:w-full">
                        {/* ADMIN on the left */}
                        <Link
                            href={navItems[0].href}
                            className={cn(
                                "px-3 py-2 rounded-md text-xl font-medium transition-colors",
                                isActive(navItems[0].href) 
                                    ? "bg-nav-active text-white hover:bg-nav-active shadow-[4px_2px_6px_0px_rgba(0,0,0,0.25)]" 
                                    : "hover:bg-gray-100"
                            )}
                        >
                            {navItems[0].title}
                        </Link>

                        {/* Other nav items on the right */}
                        <div className="ml-auto text-xl flex items-center space-x-16">
                            {navItems.slice(1).map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className={cn(
                                        "px-3 py-2 rounded-md text-xl font-medium transition-colors",
                                        isActive(item.href) 
                                            ? "bg-nav-active text-white hover:bg-nav-active shadow-[4px_2px_6px_0px_rgba(0,0,0,0.25)]" 
                                            : "hover:bg-gray-100"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ))}
                            
                            {/* Menu Icon */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="h-6 w-6 flex items-center justify-center hover:bg-gray-100 rounded-md cursor-pointer">
                                        <Menu className="h-6 w-6" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
                                    <UserMenuContent user={auth.user} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>
            
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
