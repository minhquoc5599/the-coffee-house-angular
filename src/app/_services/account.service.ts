import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSubject: BehaviorSubject<User>;
  private apiUrl: string = "https://601924d6971d850017a40c07.mockapi.io/api/accounts"
  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || 'null'));
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public login(username: string, password: string) {
    return this.http.get<User[]>(this.apiUrl).pipe(map(users => {
      const user = users.find(user =>
        user.username === username &&
        user.password === password &&
        user.role === 'admin');
      if (user) {
        localStorage.setItem('user', JSON.stringify({
          role: user.role
        }));
        this.userSubject.next(user);
        return {
          isSuccess: true,
        }
      }
      return {
        isSuccess: false
      }
    }));
  }

  public logout() {
    localStorage.removeItem('user')
    this.userSubject.next(JSON.parse('null'));
    this.router.navigate(['/login']);
  }
}
