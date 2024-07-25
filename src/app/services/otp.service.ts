import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OTP } from '../interface/otp.interface';
import { environment } from 'src/environments/environment';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  otpUrl = `${environment.HOST}/otp`;

  constructor(private http: HttpClient) { }

  verifyEmail (email: User): Observable<User> {
    return this.http.post(`${this.otpUrl}/forgot-password`, email);
  }
  
  verifyOtp (otp: OTP): Observable<OTP> {
    return this.http.post(`${this.otpUrl}/verify-otp`, otp);
  }
}
