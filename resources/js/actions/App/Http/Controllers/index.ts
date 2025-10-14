import Auth from './Auth'
import OrdersController from './OrdersController'
import Settings from './Settings'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
OrdersController: Object.assign(OrdersController, OrdersController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers