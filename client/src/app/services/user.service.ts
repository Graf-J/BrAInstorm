import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User | null = null;

  constructor() {
    const token: string | null = localStorage.getItem('jwt');
    this.user = new User(token);
  }
}
