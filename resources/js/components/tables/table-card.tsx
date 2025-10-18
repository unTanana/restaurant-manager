import { Link } from '@inertiajs/react';
import { QrCode, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Table } from '@/types';

interface TableCardProps {
    table: Table;
    onViewQr: (table: Table) => void;
}

export function TableCard({ table, onViewQr }: TableCardProps) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="font-semibold text-2xl">{table.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                        {table.qr_code}
                    </p>
                </div>
            </div>

            <div className="space-y-2 text-base border-t border-gray-200 dark:border-gray-700 pt-4">
                {table.capacity && (
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Capacity:</span>
                        <span className="font-medium">{table.capacity} people</span>
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Active Orders:</span>
                    <span className={`font-medium ${table.active_orders_count > 0 ? 'text-orange-600 dark:text-orange-400' : ''}`}>
                        {table.active_orders_count}
                    </span>
                </div>
            </div>

            <div className="mt-4 flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link href={`/tables/${table.id}/edit`} className="flex-1">
                    <Button variant="outline" className="w-full">
                        <Edit className="size-4" />
                        Edit
                    </Button>
                </Link>
                <Button
                    variant="outline"
                    onClick={() => onViewQr(table)}
                >
                    <QrCode className="size-4" />
                    QR
                </Button>
            </div>
        </div>
    );
}

