import { Injectable } from '@angular/core';
import {Category} from '../model/Category';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const apiUrl = 'http://localhost:8080/categories';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[];

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(apiUrl);
  }

  getCategory(id: number): Observable<Category> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Category>(url);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(apiUrl, category);
  }

  deleteCategory(id: number): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url);
  }

  editCategories(category: Category): Observable<Category> {
    const url = `${apiUrl}/${category.id}`;
    return this.http.put<Category>(url, category);
  }

}
