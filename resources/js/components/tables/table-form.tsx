import { Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { type TableFormProps } from '@/types';

export function TableForm({
    action,
    method,
    table,
    submitText,
    cancelUrl,
    isCreate = false,
}: TableFormProps) {
    return (
        <Form
            action={action}
            method={method}
            options={{
                preserveScroll: true,
            }}
            className="bg-card rounded-lg border p-6 shadow-sm"
        >
            {({ processing, errors }) => (
                <div className="space-y-6">
                    {/* Table Name Field - Only show for edit */}
                    {!isCreate && (
                        <div className="grid gap-2">
                            <Label htmlFor="name">
                                Table Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                required
                                defaultValue={table?.name || ''}
                                placeholder="e.g., Table 1, VIP Room A"
                                autoComplete="off"
                                aria-invalid={!!errors.name}
                            />
                            <InputError message={errors.name} />
                        </div>
                    )}

                    {/* Capacity Field */}
                    <div className="grid gap-2">
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input
                            id="capacity"
                            name="capacity"
                            type="number"
                            min="1"
                            max="50"
                            defaultValue={table?.capacity || ''}
                            placeholder="e.g., 4"
                            autoComplete="off"
                            aria-invalid={!!errors.capacity}
                        />
                        <InputError message={errors.capacity} />
                        <p className="text-muted-foreground text-sm">
                            Maximum number of people (optional)
                        </p>
                    </div>

                    {/* Info Box */}
                    {isCreate ? (
                        <div className="bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800 p-4">
                            <p className="text-sm text-blue-900 dark:text-blue-100">
                                <strong>Note:</strong> A unique table name and QR code will be automatically generated for
                                this table upon creation. You can download and print the QR code later.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border p-4">
                            <div className="text-sm">
                                <p className="font-medium">QR Code</p>
                                <p className="text-muted-foreground mt-1">{table?.qr_code}</p>
                                <p className="text-muted-foreground mt-2 text-xs">
                                    QR codes cannot be changed. View or download from the tables list.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 pt-4">
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className={isCreate ? '' : 'bg-order-action text-order-action-foreground hover:bg-order-action/90 px-8'}
                        >
                            {processing ? (isCreate ? 'Creating...' : 'Saving...') : submitText}
                        </Button>
                        <a href={cancelUrl}>
                            <Button type="button" variant="outline" className="px-8">
                                Cancel
                            </Button>
                        </a>
                    </div>
                </div>
            )}
        </Form>
    );
}
