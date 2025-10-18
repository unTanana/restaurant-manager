import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\OrdersController::index
 * @see app/Http/Controllers/OrdersController.php:15
 * @route '/dashboard'
 */
const index42a740574ecbfbac32f8cc353fc32db9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
})

index42a740574ecbfbac32f8cc353fc32db9.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrdersController::index
 * @see app/Http/Controllers/OrdersController.php:15
 * @route '/dashboard'
 */
index42a740574ecbfbac32f8cc353fc32db9.url = (options?: RouteQueryOptions) => {
    return index42a740574ecbfbac32f8cc353fc32db9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrdersController::index
 * @see app/Http/Controllers/OrdersController.php:15
 * @route '/dashboard'
 */
index42a740574ecbfbac32f8cc353fc32db9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrdersController::index
 * @see app/Http/Controllers/OrdersController.php:15
 * @route '/dashboard'
 */
index42a740574ecbfbac32f8cc353fc32db9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrdersController::index
 * @see app/Http/Controllers/OrdersController.php:15
 * @route '/orders'
 */
const index46d571d7fe903e8a2eecb1a2ccbb23f8 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index46d571d7fe903e8a2eecb1a2ccbb23f8.url(options),
    method: 'get',
})

index46d571d7fe903e8a2eecb1a2ccbb23f8.definition = {
    methods: ["get","head"],
    url: '/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrdersController::index
 * @see app/Http/Controllers/OrdersController.php:15
 * @route '/orders'
 */
index46d571d7fe903e8a2eecb1a2ccbb23f8.url = (options?: RouteQueryOptions) => {
    return index46d571d7fe903e8a2eecb1a2ccbb23f8.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrdersController::index
 * @see app/Http/Controllers/OrdersController.php:15
 * @route '/orders'
 */
index46d571d7fe903e8a2eecb1a2ccbb23f8.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index46d571d7fe903e8a2eecb1a2ccbb23f8.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrdersController::index
 * @see app/Http/Controllers/OrdersController.php:15
 * @route '/orders'
 */
index46d571d7fe903e8a2eecb1a2ccbb23f8.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index46d571d7fe903e8a2eecb1a2ccbb23f8.url(options),
    method: 'head',
})

export const index = {
    '/dashboard': index42a740574ecbfbac32f8cc353fc32db9,
    '/orders': index46d571d7fe903e8a2eecb1a2ccbb23f8,
}

/**
* @see \App\Http\Controllers\OrdersController::updateStatus
 * @see app/Http/Controllers/OrdersController.php:33
 * @route '/orders/{order}/status'
 */
export const updateStatus = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/orders/{order}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\OrdersController::updateStatus
 * @see app/Http/Controllers/OrdersController.php:33
 * @route '/orders/{order}/status'
 */
updateStatus.url = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { order: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { order: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    order: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        order: typeof args.order === 'object'
                ? args.order.id
                : args.order,
                }

    return updateStatus.definition.url
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrdersController::updateStatus
 * @see app/Http/Controllers/OrdersController.php:33
 * @route '/orders/{order}/status'
 */
updateStatus.patch = (args: { order: number | { id: number } } | [order: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})
const OrdersController = { index, updateStatus }

export default OrdersController