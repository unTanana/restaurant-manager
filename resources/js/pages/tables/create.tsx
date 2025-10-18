import { Head, Link } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { TableForm } from '@/components/tables/table-form';
import { index as tablesIndex, store } from '@/routes/tables';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tables',
        href: tablesIndex().url,
    },
    {
        title: 'Create',
        href: '/tables/create',
    },
];

export default function CreateTable() {
    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Table" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href={tablesIndex().url}>
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="size-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="font-sans text-3xl font-semibold tracking-tight">Create Table</h1>
                        <p className="text-muted-foreground mt-1">Add a new table to your restaurant</p>
                    </div>
                </div>

                {/* Form */}
                <div className="max-w-2xl">
                    <TableForm
                        action={store().url}
                        method="post"
                        submitText="Create Table"
                        cancelUrl={tablesIndex().url}
                        isCreate={true}
                    />
                </div>
            </div>
        </AppHeaderLayout>
    );
}

