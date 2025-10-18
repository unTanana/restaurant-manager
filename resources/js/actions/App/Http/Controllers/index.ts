import Auth from './Auth'
import OrdersController from './OrdersController'
import TablesController from './TablesController'
import Settings from './Settings'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
OrdersController: Object.assign(OrdersController, OrdersController),
TablesController: Object.assign(TablesController, TablesController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers