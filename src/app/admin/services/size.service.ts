import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Size } from '../models/size';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Size[]> {
    return this.http.get<Size[]>(`${environment.apiUrl}/sizes`);
  }
}
