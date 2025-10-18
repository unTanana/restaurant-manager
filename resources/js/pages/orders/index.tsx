import { useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { OrderCard } from '@/components/orders/order-card';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem, type Order, type OrderItem } from '@/types';

interface OrdersData {
    new: Order[];
    in_process: Order[];
    ready: Order[];
    served: Order[];
    done: Order[];
}

interface OrdersPageProps {
    orders: OrdersData;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: '/orders',
    },
];

const columnConfig = [
    {
        key: 'new' as const,
        title: 'NEW',
        bgColor: 'bg-white dark:bg-gray-900',
        borderColor: 'border-gray-200 dark:border-gray-700',
    },
    {
        key: 'in_process' as const,
        title: 'IN PROCESS',
        bgColor: 'bg-white dark:bg-gray-900',
        borderColor: 'border-gray-200 dark:border-gray-700',
    },
    {
        key: 'ready' as const,
        title: 'READY',
        bgColor: 'bg-white dark:bg-gray-900',
        borderColor: 'border-gray-200 dark:border-gray-700',
    },
    {
        key: 'served' as const,
        title: 'SERVED',
        bgColor: 'bg-white dark:bg-gray-900',
        borderColor: 'border-gray-200 dark:border-gray-700',
    },
    {
        key: 'done' as const,
        title: 'DONE',
        bgColor: 'bg-white dark:bg-gray-900',
        borderColor: 'border-gray-200 dark:border-gray-700',
    },
];

export default function OrdersIndex({ orders }: OrdersPageProps) {
    // Set up auto-polling every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            router.get('/orders', {}, {
                only: ['orders'],
                preserveState: true,
                preserveScroll: true,
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders Flowboard" />
            <div className="flex h-full flex-1 flex-col">
                {/* Kanban Board */}
                <div className="grid grid-cols-5 flex-1 h-full">
                    {columnConfig.map((column) => (
                        <div
                            key={column.key}
                            className="flex flex-col"
                        >
                            {/* Column Header */}
                            <div className={`p-4 border-gray-950 dark:border-gray-700  border-l border-gray-200 dark:border-gray-700'`}>
                                <h2 className="font-sans font-normal text-2xl leading-6 tracking-normal ">
                                    {column.title}
                                </h2>
                            </div>

                            {/* Column Content */}
                            <div className="flex-1 p-1.5 space-y-3">
                                {orders[column.key].length === 0 ? (
                                    <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
                                        <div className="text-center">
                                            <div className="text-sm">No orders</div>
                                        </div>
                                    </div>
                                ) : (
                                    orders[column.key].map((order) => (
                                        <OrderCard key={order.id} order={order} />
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppHeaderLayout>
    );
}
