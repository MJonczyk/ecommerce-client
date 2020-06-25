import { Injectable } from '@angular/core';
import {Product} from '../model/Product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


const apiUrl = 'http://localhost:8080/products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl);
  }

  getProduct(id: number): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(apiUrl, product);
  }

  deleteProduct(id: number): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url);
  }

  editProduct(product: Product): Observable<Product> {
    const url = `${apiUrl}/${product.id}`;
    return this.http.put<Product>(url, product);
  }
}
