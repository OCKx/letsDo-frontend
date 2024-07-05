import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = "https://letsdo-backend.onrender.com/api/v1/user";

  constructor(private http: HttpClient) { }

  getUser (email: User): Observable<User> {
    return this.http.get(`${this.userUrl}?email=${email}`);
  }

  registerUser(data: User): Observable<User> {
    return this.http.post(`${this.userUrl}/register`, data);
  }

  loginUser(data: User): Observable<User> {
    return this.http.post(`${this.userUrl}/login`, data);
  }

  logoutUser(data: User): Observable<User> {
    return this.http.post(`${this.userUrl}/logout`, data);
  }

  updateUser(data: User): Observable<User> {
    return this.http.put(`${this.userUrl}/update`, data);
  }
}
