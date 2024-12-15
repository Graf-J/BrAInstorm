import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit { 
  isUserAuthenticated: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    if (this.userService.user) {
      this.userService.user.isAuthenticated.subscribe((isAuthenticated: boolean) => {
        this.isUserAuthenticated = isAuthenticated;
      });
    }
  }

  onLogoutClick() {
    localStorage.removeItem('jwt');
    this.userService.user!.isAuthenticated.next(false);
    this.router.navigate(['/']);
  }
}
