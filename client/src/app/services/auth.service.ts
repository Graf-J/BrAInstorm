import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AuthResponse } from '../models/responses/authresponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  register = (userName: string, password: string, comparePassword: string): Observable<AuthResponse> => {
    return this.http.post<AuthResponse>(`${ environment.authServiceURL }/auth/register`, { userName, password, comparePassword });
  }

  login = (userName: string, password: string): Observable<AuthResponse> => {
    return this.http.post<AuthResponse>(`${ environment.authServiceURL }/auth/login`, { userName, password });
  }
}
