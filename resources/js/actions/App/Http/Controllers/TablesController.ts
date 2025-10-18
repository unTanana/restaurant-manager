import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TablesController::index
 * @see app/Http/Controllers/TablesController.php:20
 * @route '/tables'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tables',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TablesController::index
 * @see app/Http/Controllers/TablesController.php:20
 * @route '/tables'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TablesController::index
 * @see app/Http/Controllers/TablesController.php:20
 * @route '/tables'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TablesController::index
 * @see app/Http/Controllers/TablesController.php:20
 * @route '/tables'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TablesController::create
 * @see app/Http/Controllers/TablesController.php:39
 * @route '/tables/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/tables/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TablesController::create
 * @see app/Http/Controllers/TablesController.php:39
 * @route '/tables/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TablesController::create
 * @see app/Http/Controllers/TablesController.php:39
 * @route '/tables/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TablesController::create
 * @see app/Http/Controllers/TablesController.php:39
 * @route '/tables/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TablesController::store
 * @see app/Http/Controllers/TablesController.php:44
 * @route '/tables'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tables',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TablesController::store
 * @see app/Http/Controllers/TablesController.php:44
 * @route '/tables'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TablesController::store
 * @see app/Http/Controllers/TablesController.php:44
 * @route '/tables'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TablesController::show
 * @see app/Http/Controllers/TablesController.php:0
 * @route '/tables/{table}'
 */
export const show = (args: { table: string | number } | [table: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/tables/{table}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TablesController::show
 * @see app/Http/Controllers/TablesController.php:0
 * @route '/tables/{table}'
 */
show.url = (args: { table: string | number } | [table: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { table: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    table: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        table: args.table,
                }

    return show.definition.url
            .replace('{table}', parsedArgs.table.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TablesController::show
 * @see app/Http/Controllers/TablesController.php:0
 * @route '/tables/{table}'
 */
show.get = (args: { table: string | number } | [table: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TablesController::show
 * @see app/Http/Controllers/TablesController.php:0
 * @route '/tables/{table}'
 */
show.head = (args: { table: string | number } | [table: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TablesController::edit
 * @see app/Http/Controllers/TablesController.php:60
 * @route '/tables/{table}/edit'
 */
export const edit = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/tables/{table}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TablesController::edit
 * @see app/Http/Controllers/TablesController.php:60
 * @route '/tables/{table}/edit'
 */
edit.url = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { table: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { table: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    table: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        table: typeof args.table === 'object'
                ? args.table.id
                : args.table,
                }

    return edit.definition.url
            .replace('{table}', parsedArgs.table.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TablesController::edit
 * @see app/Http/Controllers/TablesController.php:60
 * @route '/tables/{table}/edit'
 */
edit.get = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TablesController::edit
 * @see app/Http/Controllers/TablesController.php:60
 * @route '/tables/{table}/edit'
 */
edit.head = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TablesController::update
 * @see app/Http/Controllers/TablesController.php:67
 * @route '/tables/{table}'
 */
export const update = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/tables/{table}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\TablesController::update
 * @see app/Http/Controllers/TablesController.php:67
 * @route '/tables/{table}'
 */
update.url = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { table: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { table: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    table: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        table: typeof args.table === 'object'
                ? args.table.id
                : args.table,
                }

    return update.definition.url
            .replace('{table}', parsedArgs.table.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TablesController::update
 * @see app/Http/Controllers/TablesController.php:67
 * @route '/tables/{table}'
 */
update.put = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\TablesController::update
 * @see app/Http/Controllers/TablesController.php:67
 * @route '/tables/{table}'
 */
update.patch = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\TablesController::destroy
 * @see app/Http/Controllers/TablesController.php:76
 * @route '/tables/{table}'
 */
export const destroy = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/tables/{table}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TablesController::destroy
 * @see app/Http/Controllers/TablesController.php:76
 * @route '/tables/{table}'
 */
destroy.url = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { table: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { table: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    table: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        table: typeof args.table === 'object'
                ? args.table.id
                : args.table,
                }

    return destroy.definition.url
            .replace('{table}', parsedArgs.table.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TablesController::destroy
 * @see app/Http/Controllers/TablesController.php:76
 * @route '/tables/{table}'
 */
destroy.delete = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\TablesController::qrCode
 * @see app/Http/Controllers/TablesController.php:92
 * @route '/tables/{table}/qr-code'
 */
export const qrCode = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: qrCode.url(args, options),
    method: 'get',
})

qrCode.definition = {
    methods: ["get","head"],
    url: '/tables/{table}/qr-code',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TablesController::qrCode
 * @see app/Http/Controllers/TablesController.php:92
 * @route '/tables/{table}/qr-code'
 */
qrCode.url = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { table: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { table: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    table: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        table: typeof args.table === 'object'
                ? args.table.id
                : args.table,
                }

    return qrCode.definition.url
            .replace('{table}', parsedArgs.table.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TablesController::qrCode
 * @see app/Http/Controllers/TablesController.php:92
 * @route '/tables/{table}/qr-code'
 */
qrCode.get = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: qrCode.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TablesController::qrCode
 * @see app/Http/Controllers/TablesController.php:92
 * @route '/tables/{table}/qr-code'
 */
qrCode.head = (args: { table: number | { id: number } } | [table: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: qrCode.url(args, options),
    method: 'head',
})
const TablesController = { index, create, store, show, edit, update, destroy, qrCode }

export default TablesController