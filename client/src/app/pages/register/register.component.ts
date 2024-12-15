import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from 'src/app/models/responses/authresponse.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading: boolean = false;
  registerError: boolean = false;
  registerErrorMessage: string = '';

  registerForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    comparePassword: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private authService: AuthService, 
    private userService: UserService
  ) { }

  onSubmit = () => {
    const userName: string = this.registerForm.value.userName!;
    const password = this.registerForm.value.password!;
    const comparePassword = this.registerForm.value.comparePassword!;

    this.isLoading = true;
    this.authService.register(userName, password, comparePassword).subscribe({
      next: (response: AuthResponse) => {
        this.registerError = false;
        this.userService.user!.jwt = response.jwt;
        localStorage.setItem('jwt', response.jwt);
        this.isLoading = false;
        this.router.navigate(['brainstorm']);
      },
      error: (error: HttpErrorResponse) => {
        this.registerError = true;
        this.registerErrorMessage = error.error.message;
        this.isLoading = false;
      }
    });
  }
}
