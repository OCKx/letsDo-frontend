import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../interface/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(40)]],
      lastName: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    },
    { 'validators': this.passwordMatchValidator });
  }

  registerUser(): void {
    if (this.signupForm.valid) {
      const { firstName, lastName, email, password } = this.signupForm.value;
      const user: User = { firstName, lastName, email, password };
      this.userService.registerUser(user).subscribe(
        (res: User) => {
          this.snackBar.open('User registered sucessfully', 'Close', { duration: 3000 });
          localStorage.setItem('token', res.token || '');
          this.router.navigate(['/']);
        },
        (error) => {
          this.snackBar.open('Signup Failed. Please try', 'close', { duration: 3000 });
          console.error('Signup error', error);
        }
      )
    }
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      return null;
    }
  }

  ngOnInit(): void {
    
  }
}
