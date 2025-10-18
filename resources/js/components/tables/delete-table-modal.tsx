import { useState } from 'react';
import { router } from '@inertiajs/react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { type Table } from '@/types';

interface DeleteTableModalProps {
    table: Table | null;
    isOpen: boolean;
    onClose: () => void;
}

export function DeleteTableModal({ table, isOpen, onClose }: DeleteTableModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        if (!table) return;

        setIsDeleting(true);
        
        router.delete(`/tables/${table.id}`, {
            onSuccess: () => {
                setIsDeleting(false);
                onClose();
            },
            onError: () => {
                setIsDeleting(false);
            },
            onFinish: () => {
                setIsDeleting(false);
            }
        });
    };

    if (!table) {
        return null;
    }

    const hasActiveOrders = table.active_orders_count > 0;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20">
                                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                            </div>
                        </div>
                        <div>
                            <DialogTitle className="text-left">Delete Table</DialogTitle>
                            <DialogDescription className="text-left">
                                This action cannot be undone.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="py-4">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                        <h4 className="font-medium text-sm mb-2">Table Details:</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                            <div><strong>Name:</strong> {table.name}</div>
                            <div><strong>QR Code:</strong> {table.qr_code}</div>
                            {table.capacity && (
                                <div><strong>Capacity:</strong> {table.capacity} people</div>
                            )}
                            <div><strong>Active Orders:</strong> {table.active_orders_count}</div>
                        </div>
                    </div>

                    {hasActiveOrders && (
                        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 mb-4">
                            <div className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                                <div className="text-sm">
                                    <p className="font-medium text-orange-800 dark:text-orange-200">
                                        Cannot delete table with active orders
                                    </p>
                                    <p className="text-orange-700 dark:text-orange-300 mt-1">
                                        This table has {table.active_orders_count} active order{table.active_orders_count !== 1 ? 's' : ''}. 
                                        Please complete or cancel all active orders before deleting this table.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                <DialogFooter className="flex justify-center gap-6">
                    <Button variant="outline" onClick={onClose} disabled={isDeleting}>
                        Cancel
                    </Button>
                    <Button 
                        variant="destructive" 
                        onClick={handleDelete}
                        disabled={isDeleting || hasActiveOrders}
                        className="gap-2 px-16"
                    >
                        {isDeleting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-4 h-4" />
                                Delete Table
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
