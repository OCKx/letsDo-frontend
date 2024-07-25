import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../interface/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getUserName();
  }

  logout(): void {
    this.userService.logoutUser().subscribe(
      (res: any) => {
        this.snackBar.open('Logout Successfully', 'Close', { duration: 300 });
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.snackBar.open('Logout Failed', 'Close', { duration: 3000 });
        console.error('login error', error);
      }
    )
  }

  firstName: string = '';
  getUserName(): void {
    this.userService.getUser().subscribe(
      (res: User) => {
        this.firstName = res.firstName || '';
      },
      (error) => {
        console.error('Failed to fetch user data', error);
      }
    )
  }
}
