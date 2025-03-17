import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OrderService} from '../../../../services/order.service';
import {Order} from '../../../../model/order';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-create-order',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent {

  constructor(private orderService: OrderService, private router: Router) {
  }

  createOrderForm = new FormGroup({
    orderNumber: new FormControl<number>(1, {nonNullable: true, validators: [Validators.required, Validators.min(1)]}),
    paymentDescription: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(500)]
    }),
    streetAddress: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(200)]
    }),
    town: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)]
    }),
    country: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)]
    }),
    amount: new FormControl<number>(1, {nonNullable: true, validators: [Validators.required, Validators.min(1)]}),
    currency: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(10)]
    }),
    paymentDueDate: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]})
  });
  errorMessage: string | null = null;

  get orderNumber() {
    return this.createOrderForm.controls.orderNumber;
  }

  get paymentDescription() {
    return this.createOrderForm.controls.paymentDescription;
  }

  get streetAddress() {
    return this.createOrderForm.controls.streetAddress;
  }

  get town() {
    return this.createOrderForm.controls.town;
  }

  get country() {
    return this.createOrderForm.controls.country;
  }

  get amount() {
    return this.createOrderForm.controls.amount;
  }

  get currency() {
    return this.createOrderForm.controls.currency;
  }

  get paymentDueDate() {
    return this.createOrderForm.controls.paymentDueDate;
  }

  onFormSubmit() {
    this.errorMessage = null;
    this.orderService.createOrder(this.createOrderForm.value as Order)
      .subscribe({
        next: () => this.router.navigate(['/orders-list']),
        error: (error) => {
          this.errorMessage = error.error.message
        },
      });
  }

}
