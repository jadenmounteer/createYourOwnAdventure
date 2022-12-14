import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Story } from '../types/types';
import { StoriesService } from '../services/stories/stories.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-a-story-has-been-shared-with-you',
  templateUrl: './a-story-has-been-shared-with-you.component.html',
  styleUrls: ['./a-story-has-been-shared-with-you.component.scss'],
})
export class AStoryHasBeenSharedWithYouComponent implements OnInit, OnDestroy {
  public sharedStory: Story | undefined;
  public storyID: number | undefined;
  public userID: number | undefined;
  private storiesSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private storiesService: StoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the user and story IDs
    this.route.params.subscribe((params: Params) => {
      this.storyID = params['storyID'];
      this.userID = params['userID'];
    });

    this.storiesSubscription = this.storiesService
      .fetchStories(String(this.userID))
      .subscribe({
        complete: () => {
          this.storiesService.setSharedStory(Number(this.storyID));
          this.sharedStory = this.storiesService.getSharedStory();
        },
      });

    // Test url
    // http://localhost:4200/a-story-has-been-shared-with-you/xmkIWWJdqCfhV3d9vpW397uInRw1/760
  }

  ngOnDestroy(): void {
    this.storiesSubscription.unsubscribe();
  }

  public readStory() {
    this.router.navigate([`/readStory/${this.storyID}`]);
  }
}
