import { useState, useEffect } from 'react';
import { Download, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Table } from '@/types/index';
import { qrCode } from '@/routes/tables';

interface QrCodeDisplayProps {
    table: Table | null;
    isOpen: boolean;
    onClose: () => void;
}

interface QrCodeData {
    qr_code: string;
    url: string;
    table: {
        id: number;
        name: string;
        qr_code: string;
    };
}

export function QrCodeDisplay({ table, isOpen, onClose }: QrCodeDisplayProps) {
    const [qrData, setQrData] = useState<QrCodeData | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (table && isOpen) {
            setLoading(true);
            fetch(qrCode({ table: table.id }).url)
                .then((res) => res.json())
                .then((data) => {
                    setQrData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error loading QR code:', error);
                    setLoading(false);
                });
        }
    }, [table, isOpen]);

    const handleDownload = () => {
        if (!qrData) {
            return;
        }

        const blob = new Blob([qrData.qr_code], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `table-${table?.qr_code}-qr.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    if (!table) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
            <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2">
                <div className="bg-card rounded-lg border p-6 shadow-lg">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-semibold">{table.name}</h2>
                            <p className="text-muted-foreground text-sm mt-1">
                                QR Code: {table.qr_code}
                            </p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="size-4" />
                        </Button>
                    </div>

                    {/* QR Code */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg border p-8 flex items-center justify-center">
                        {loading ? (
                            <div className="size-64 flex items-center justify-center">
                                <div className="animate-spin rounded-full size-12 border-b-2 border-primary"></div>
                            </div>
                        ) : qrData ? (
                            <div
                                className="size-64"
                                dangerouslySetInnerHTML={{ __html: qrData.qr_code }}
                            />
                        ) : (
                            <div className="text-muted-foreground">Failed to load QR code</div>
                        )}
                    </div>

                    {/* URL Info */}
                    {qrData && (
                        <div className="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg border p-3">
                            <p className="text-xs text-muted-foreground mb-1">Menu URL:</p>
                            <div className="flex items-center gap-2">
                                <code className="flex-1 text-sm bg-white dark:bg-gray-950 rounded px-2 py-1 border">
                                    {qrData.url}
                                </code>
                                <a href={qrData.url} target="_blank" rel="noopener noreferrer">
                                    <Button variant="ghost" size="icon" className="size-8">
                                        <ExternalLink className="size-3" />
                                    </Button>
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="mt-6 flex gap-2">
                        <Button
                            onClick={handleDownload}
                            disabled={!qrData}
                            className="flex-1"
                        >
                            <Download className="size-4" />
                            Download SVG
                        </Button>
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                    </div>

                    <p className="text-muted-foreground text-xs text-center mt-4">
                        Customers can scan this QR code to view the menu and place orders.
                    </p>
                </div>
            </div>
        </Dialog>
    );
}

