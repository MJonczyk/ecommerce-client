import { Injectable } from '@angular/core';
import {Product} from '../model/Product';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductsResponse} from '../model/response/ProductsResponse';
import {map, tap} from 'rxjs/operators';


const apiUrl = 'http://localhost:8080/products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[];

  constructor(private http: HttpClient) { }

  getProducts(search = '', sortColumn = 'id', sortOrder = 'asc', page = 0, pageSize = 0): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(apiUrl, {
      params: new HttpParams()
        .set('search', search)
        .set('sortColumn', sortColumn)
        .set('sortOrder', sortOrder)
        .set('page', page.toString())
        .set('pageSize', pageSize.toString())
    });
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
