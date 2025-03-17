import {Routes} from '@angular/router';
import {CreateOrderComponent} from './core/components/order/pages/create-order/create-order.component';
import {OrdersListComponent} from './core/components/order/pages/orders-list/orders-list.component';

export const routes: Routes = [
    {
        path: 'create-order',
        component: CreateOrderComponent
    },
    {
        path: 'orders-list',
        component: OrdersListComponent
    }
];
