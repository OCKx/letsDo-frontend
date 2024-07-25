import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interface/user.interface';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  updateForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar, private router: Router) {
    this.updateForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(8)]],
      confirmPassword: ['', [Validators.minLength(8)]]
    },
    { 'validators': this.passwordMatchValidator });
  }

  userData: User[] = [];
  userID?: number;

  getUserData(): void {
    this.userService.getUser().subscribe(
      (res: User) => {
        this.userData.push(res);
        const user = this.userData[0];
        this.userID = user.userID;
      },
      (error) => {
        console.error('Failed to fetch user data', error);
      }
    )
  }

  updateUser(): void {
    if (this.updateForm.valid) {
      const { firstName, lastName, email, password } = this.updateForm.value;
      const user: User = { userID: this.userID, firstName, lastName, email, password };
      console.log("user", user.userID);
      
      this.userService.updateUser(user).subscribe(
        (res: User) => {
          this.snackBar.open('User updated sucessfully', 'Close', { duration: 3000 });
          console.log("res", res);
          
        },
        (error) => {
          this.snackBar.open('Update Failed. Please try', 'close', { duration: 3000 });
          console.error('Update error', error);
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
    this.getUserData();
  }
}
