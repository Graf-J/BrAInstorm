import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/responses/authresponse.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading: boolean = false;
  loginError: boolean = false;
  loginErrorMessage: string = '';

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private authService: AuthService, 
    private userService: UserService
  ) { }

  onSubmit = () => {
    const userName: string = this.loginForm.value.userName!;
    const password = this.loginForm.value.password!;

    this.isLoading = true;
    this.authService.login(userName, password).subscribe({
      next: (response: AuthResponse) => {
        this.loginError = false;
        this.userService.user!.jwt = response.jwt;
        localStorage.setItem('jwt', response.jwt);
        this.isLoading = false;
        this.router.navigate(['brainstorm']);
      },
      error: (error: HttpErrorResponse) => {
        this.loginError = true;
        this.loginErrorMessage = error.error.message;
        this.isLoading = false;
      }
    });
  }
}
