import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  public create(params: Product) {
    return this.http.post(`${environment.apiUrl}/products`, params);
  }

  public update(id: string, params: Product) {
    return this.http.put(`${environment.apiUrl}/products/${id}`, params)
  }

  public delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/products/${id}`);
  }
}
