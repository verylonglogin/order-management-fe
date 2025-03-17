import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../model/order';
import {OrderResponse} from '../model/order.response';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl + '/api/orders';

  constructor(private httpClient: HttpClient) {
  }


  getOrders(page?: number, size?: number, country?: string, paymentDescription?: string): Observable<OrderResponse> {
    let params = new HttpParams();

    if (size) {
      params = params.set('size', size);
    }

    if (page !== undefined) {
      params = params.set('page', page);
    }

    if (country) {
      params = params.set('country', country);
    }
    if (paymentDescription) {
      params = params.set('paymentDescription', paymentDescription);
    }
    return this.httpClient.get<OrderResponse>(this.apiUrl, {params});
  }

  createOrder(order: Order): Observable<{ statusCode: number; message: string }> {
    return this.httpClient.post<{ statusCode: number; message: string }>(`${this.apiUrl}`, order)
  }
}


