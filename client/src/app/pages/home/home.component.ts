import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('first', [
      state('first', style({ transform: 'translateZ(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateZ(0)', opacity: 0 }),
        animate(2000)
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  state?: string;
  brainstormSessoinId: string = '';
  isUserAuthenticated: boolean = false;
  isBrainstormIdValid: boolean = true;
  isJoining: boolean = false;

  constructor(
    private router: Router, 
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.startAnimation();
    if (this.userService.user) {
      this.userService.user.isAuthenticated.subscribe((isAuthenticated: boolean) => {
        this.isUserAuthenticated = isAuthenticated;
      });
    }
  }

  startAnimation() {
    this.state = 'first';
  }

  onJoinClick() {
    this.isJoining = true;
    this.router.navigate(['brainstorm', this.brainstormSessoinId])
      .then((success: boolean) => this.isBrainstormIdValid = success)
      .finally(() => this.isJoining = false);
  }

  onCreateBrainstormClick() {
    this.router.navigate(['brainstorm']);
  }
}
