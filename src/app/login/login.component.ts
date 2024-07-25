import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../interface/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor (private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const user: User = { email, password };
      this.userService.loginUser(user).subscribe(
        (res: User) => {
          this.snackBar.open('Login Successful', 'Close', { duration: 3000 });
          localStorage.setItem('token', res.token || '');
          this.router.navigate(['/']);
        },
        (error) => {
          this.snackBar.open('Login Failed. Please try', 'close', { duration: 3000 });
          console.error('login error', error);
        }
      );
    }
    else {
      this.snackBar.open('Please enter valid credentials', 'Close', { duration: 3000 });
    }
  }
}
