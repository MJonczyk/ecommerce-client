import { Injectable } from '@angular/core';
import {Order} from '../model/Order';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const apiUrl = 'http://localhost:8080/orders';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: Order[];

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(apiUrl);
  }

  getOrder(id: number): Observable<Order> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Order>(url);
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(apiUrl, order);
  }

  deleteOrder(id: number): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url);
  }

  editOrder(order: Order): Observable<Order> {
    const url = `${apiUrl}/${order.id}`;
    return this.http.put<Order>(url, order);
  }
}
