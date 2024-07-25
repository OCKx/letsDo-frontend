import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = `${environment.HOST}/user`;

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
  private setTokenHeader(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` })
  }

  getUser (): Observable<any> {
    const headers = this.setTokenHeader();
    return this.http.get(`${this.userUrl}`, { headers });
  }

  registerUser(data: User): Observable<User> {
    return this.http.post(`${this.userUrl}/register`, data);
  }

  loginUser(data: User): Observable<User> {
    return this.http.post(`${this.userUrl}/login`, data);
  }

  logoutUser(): Observable<any> {
    const headers = this.setTokenHeader();
    return this.http.post(`${this.userUrl}/logout`, {}, { headers });
  }

  updateUser(data: User): Observable<User> {
    return this.http.put(`${this.userUrl}/update`, data);
  }
}
