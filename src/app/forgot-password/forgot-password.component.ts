import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OtpService } from '../services/otp.service';
import { OTP } from '../interface/otp.interface';
import { User } from '../interface/user.interface';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  switchView: string = 'email';
  verifyEmailForm: FormGroup;
  verifyOtpForm: FormGroup;

  constructor (private fb: FormBuilder, private otpService: OtpService, private snackBar: MatSnackBar, private router: Router) {
    this.verifyEmailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.verifyOtpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {}

  verifyEmail(): void {
    if (this.verifyEmailForm.valid) {
      const { email } = this.verifyEmailForm.value;
      const user: User = { email };
      this.otpService.verifyEmail(user).subscribe(
        (res: any) => {
          this.snackBar.open('OTP sent Successfully check your email', 'Close', { duration: 3000 });
          this.switchView = 'otp';
        },
        (error) => {
          this.snackBar.open('Failed sending OTP. Please try', 'close', { duration: 3000 });
          console.error('forgot password error', error);
        }
      );
    }
    else {
      this.snackBar.open('Please enter valid credentials', 'Close', { duration: 3000 });
    }
  }

  verifyOTP(): void {
    if (this.verifyOtpForm.valid) {
      const { otp } = this.verifyOtpForm.value;
      const user: OTP = { otp };
      this.otpService.verifyOtp(user).subscribe(
        (res: User) => {
          this.snackBar.open('OTP verified successfully', 'Close', { duration: 3000 });
          localStorage.setItem('token', res.token || '');
          this.router.navigate(['/']);
        },
        (error) => {
          this.snackBar.open('Failed to verify otp', 'Close', { duration: 3000 });
          console.error('otp error', error);
        }
      );
    }
    else {
      this.snackBar.open('Please enter valid credentials', 'Close', { duration: 3000 });
    }
  }
}
