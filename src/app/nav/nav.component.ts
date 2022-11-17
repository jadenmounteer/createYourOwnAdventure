import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';
import { StoriesService } from '../services/stories/stories.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  public isAuthenticated: boolean = false;
  public userEmail: string = '';

  constructor(
    private authService: AuthService,
    private storiesService: StoriesService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; // If we don't have a user, keep it false, else, set it to true.
      if (this.isAuthenticated) {
        this.userEmail = user.email;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
