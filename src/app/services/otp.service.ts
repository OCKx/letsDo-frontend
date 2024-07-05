import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OTP } from '../interface/otp.service';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  otpUrl = "https://letsdo-backend.onrender.com/api/v1/otp";

  constructor(private http: HttpClient) { }

  verifyEmail (email: OTP): Observable<OTP> {
    return this.http.post(`${this.otpUrl}/forgot-password`, email);
  }
  
  verifyOtp (otp: OTP): Observable<OTP> {
    return this.http.post(`${this.otpUrl}/verify-otp`, otp);
  }
}
