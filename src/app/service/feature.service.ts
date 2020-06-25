import { Injectable } from '@angular/core';
import {Feature} from '../model/Feature';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const apiUrl = 'http://localhost:8080/features';
@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  fetures: Feature[];

  constructor(private http: HttpClient) { }

  getFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>(apiUrl);
  }

  getFeature(id: number): Observable<Feature> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Feature>(url);
  }

  addFeature(feature: Feature): Observable<Feature> {
    return this.http.post<Feature>(apiUrl, feature);
  }

  deleteFeature(id: number): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url);
  }

  editFeature(feature: Feature): Observable<Feature> {
    const url = `${apiUrl}/${feature.id}`;
    return this.http.put<Feature>(url, feature);
  }
}
