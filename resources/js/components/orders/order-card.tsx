import { useState } from 'react';
import { OrderModal } from './order-modal';

interface OrderItem {
    id: number;
    quantity: number;
    unit_price: string;
    subtotal: string;
    product: {
        id: number;
        name: string;
        category: string;
    };
}

interface Order {
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

interface OrderCardProps {
    order: Order;
}

const statusColors = {
    new: 'bg-order-new border-order-new-border',
    in_process: 'bg-order-in-process text-order-in-process-foreground border-order-in-process',
    ready: 'bg-order-ready border-order-ready-border',
    served: 'bg-order-served border-order-served-border',
    done: 'bg-order-done border-order-done-border',
};

export function OrderCard({ order }: OrderCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const statusColor = statusColors[order.status as keyof typeof statusColors] || statusColors.new;

    return (
        <>
            <div 
                className={`cursor-pointer transition-all hover:shadow-md rounded-3xl border p-4 ${statusColor}`}
                onClick={() => setIsModalOpen(true)}
            >
                {/* Table name */}
                <h3 className="font-semibold text-xl leading-6 tracking-normal align-middle mb-3">{order.table.name}</h3>

                {/* Order items */}
                <div className="space-y-1">
                    {order.order_items.map((item, index) => (
                        <div key={item.id} className="font-sans font-normal text-sm leading-6 tracking-normal align-middle">
                            <span>{index + 1}. {item.product.name}</span>
                        </div>
                    ))}
                </div>

            </div>

            <OrderModal
                order={order}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
