import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Clock, Edit } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { type Order, type OrderItem } from '@/types';

interface OrderModalProps {
    order: Order;
    isOpen: boolean;
    onClose: () => void;
}

export function OrderModal({ order, isOpen, onClose }: OrderModalProps) {
    const [isUpdating, setIsUpdating] = useState(false);

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
            }),
            time: date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }),
        };
    };

    const getElapsedTime = (dateString: string) => {
        const now = new Date();
        const orderTime = new Date(dateString);
        const diffMinutes = Math.floor((now.getTime() - orderTime.getTime()) / (1000 * 60));
        
        if (diffMinutes < 60) {
            return `${diffMinutes} min`;
        } else {
            const hours = Math.floor(diffMinutes / 60);
            const minutes = diffMinutes % 60;
            return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
        }
    };

    const handleStatusUpdate = (newStatus: string) => {
        setIsUpdating(true);
        router.patch(`/orders/${order.id}/status`, 
            { status: newStatus },
            {
                onFinish: () => {
                    setIsUpdating(false);
                    onClose();
                },
            }
        );
    };

    const { date, time } = formatDateTime(order.created_at);

    const getActionButtons = () => {
        switch (order.status) {
            case 'new':
                return (
                    <>
                        <Button
                            onClick={() => handleStatusUpdate('in_process')}
                            disabled={isUpdating}
                            className="bg-order-action hover:bg-order-action/90 text-order-action-foreground border-order-action-border"
                        >
                            ACCEPT
                        </Button>
                        <Button
                            onClick={onClose}
                            disabled={isUpdating}
                            className="bg-order-cancel text-order-cancel-foreground hover:bg-order-cancel/90"
                        >
                            CANCEL
                        </Button>
                    </>
                );
            case 'in_process':
                return (
                    <>
                        <Button
                            onClick={() => handleStatusUpdate('ready')}
                            disabled={isUpdating}
                            className="bg-order-action hover:bg-order-action/90 text-order-action-foreground border-order-action-border"
                        >
                            COMPLETE
                        </Button>
                        <Button
                            onClick={() => handleStatusUpdate('new')}
                            disabled={isUpdating}
                            className="text-black bg-[#FFF4A0] border-[#46432D] hover:bg-[#FFF7B8]"
                        >
                            Reject
                        </Button>
                        <Button
                            onClick={onClose}
                            disabled={isUpdating}
                            className="bg-order-cancel text-order-cancel-foreground hover:bg-order-cancel/90"
                        >
                            CANCEL
                        </Button>
                    </>
                );
            case 'ready':
                return (
                    <>
                        <Button
                            onClick={() => handleStatusUpdate('served')}
                            disabled={isUpdating}
                            className="bg-order-action hover:bg-order-action/90 text-order-action-foreground border-order-action-border"
                        >
                            SERVE
                        </Button>
                        <Button
                            onClick={onClose}
                            disabled={isUpdating}
                            className="bg-order-cancel text-order-cancel-foreground hover:bg-order-cancel/90"
                        >
                            CANCEL
                        </Button>
                    </>
                );
            case 'served':
                return (
                    <>
                        <Button
                            onClick={() => handleStatusUpdate('done')}
                            disabled={isUpdating}
                            className="bg-order-action hover:bg-order-action/90 text-order-action-foreground border-order-action-border"
                        >
                            DONE
                        </Button>
                        <Button
                            onClick={onClose}
                            disabled={isUpdating}
                            className="bg-order-cancel text-order-cancel-foreground hover:bg-order-cancel/90"
                        >
                            CANCEL
                        </Button>
                    </>
                );
            case 'done':
            default:
                return (
                    <Button
                        onClick={onClose}
                        disabled={isUpdating}
                        className="bg-order-cancel text-order-cancel-foreground hover:bg-order-cancel/90"
                    >
                        CANCEL
                    </Button>
                );
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xl px-23 py-12 rounded-3xl [&>button]:hidden">
                {/* Header with date, time, and duration with equal spacing */}
                <div className="flex justify-between items-center mb-4">
                    <span className="font-sans font-normal text-base leading-6 tracking-normal align-middle text-[#4D4D4D]">
                        {date}
                    </span>
                    <span className="font-sans font-normal text-base leading-6 tracking-normal align-middle text-[#4D4D4D]">
                        {time}
                    </span>
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-[#4D4D4D] align-middle" />
                        <span className="font-sans font-normal text-base leading-6 tracking-normal align-middle text-[#4D4D4D]">
                            {getElapsedTime(order.created_at)}
                        </span>
                    </div>
                </div>

                {/* Table name - text only for new/in_process, badge for others */}
                <div className="flex justify-start items-center mb-4">
                    {(order.status === 'new' || order.status === 'in_process') ? (
                        <>
                            {order.status === 'in_process' && (
                                <Edit className="h-5 w-5 text-black mr-2" />
                            )}
                            <h2 className="text-black font-semibold text-xl leading-6">
                                {order.table.name}
                            </h2>
                        </>
                    ) : (
                        <div className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]">
                            {order.table.name}
                        </div>
                    )}
                </div>

                {/* Order items with vertical line */}
                <div className="relative pl-6 mb-4">
                    {/* Vertical gray line */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                    
                    {/* Order items */}
                    <div className="space-y-1">
                        {order.order_items.map((item, index) => (
                            <div key={item.id} className="relative">
                                <div className="flex items-start gap-1">
                                    <span className="text-black ">{index + 1}.</span>
                                    <span className="text-black">{item.product.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notes */}
                {order.notes && (
                    <div className="bg-order-note rounded-md p-3 mb-4">
                        <p className="text-sm text-gray-800">
                            Note: {order.notes}
                        </p>
                    </div>
                )}

                <DialogFooter className="flex justify-center gap-7 ">
                    {getActionButtons()}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
