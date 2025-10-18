import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface TableFormProps {
    action: string;
    method: 'post' | 'patch';
    table?: Table;
    submitText: string;
    cancelUrl: string;
    isCreate?: boolean;
}

export interface Table {
    id: number;
    name: string;
    qr_code: string;
    capacity: number | null;
    active_orders_count: number;
    created_at: string;
    updated_at: string;
}

export interface OrderItem {
    id: number;
    quantity: number;
    unit_price: string;
    subtotal: string;
    special_instructions?: string;
    product: {
        id: number;
        name: string;
        category: string;
    };
}

export interface Order {
    id: number;
    status: string;
    total_amount: string;
    notes?: string;
    created_at: string;
    table: {
        id: number;
        name: string;
    };
    order_items: OrderItem[];
}
