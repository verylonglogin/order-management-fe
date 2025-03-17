import {Component, ViewChild} from '@angular/core';
import {Order} from '../../../../model/order';
import {OrderService} from '../../../../services/order.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent {
  constructor(private orderService: OrderService) {
  }

  ordersList: Order[] = []
  dataSource = new MatTableDataSource<Order>()
  totalItems = 0
  countryFilter: string = ''
  paymentDescriptionFilter: string = ''

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'orderNumber',
    'paymentDescription',
    'streetAddress',
    'town',
    'country',
    'amount',
    'currency',
    'paymentDueDate'
  ];

  loadOrders() {
    const page = this.paginator ? this.paginator.pageIndex : 0;
    const size = this.paginator ? this.paginator.pageSize : 10;
    this.orderService.getOrders(
      page, size,
      this.countryFilter,
      this.paymentDescriptionFilter).subscribe( {
      next: (response) => {
        this.ordersList = response.orders;
        this.totalItems = response.totalItems;
        this.dataSource = new MatTableDataSource<Order>(this.ordersList);
        if (!this.dataSource.sort) {
          this.dataSource.sort = this.sort;
        }
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
  ngOnInit() {
    this.loadOrders();
  }


  applyCountryFilter(event: any) {
    this.countryFilter = event.target.value;
    this.loadOrders();
  }

  applyPaymentDescriptionFilter(event: any) {
    this.paymentDescriptionFilter = event.target.value;
    this.loadOrders();
  }

}
