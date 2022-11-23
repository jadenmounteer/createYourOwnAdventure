import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Story } from '../types/types';
import { StoriesService } from '../services/stories/stories.service';

@Component({
  selector: 'app-a-story-has-been-shared-with-you',
  templateUrl: './a-story-has-been-shared-with-you.component.html',
  styleUrls: ['./a-story-has-been-shared-with-you.component.scss'],
})
export class AStoryHasBeenSharedWithYouComponent implements OnInit {
  public sharedStory: Story | undefined;
  public storyID: number | undefined;
  public userID: number | undefined;
  private stories: Story[] = new Array<Story>();

  constructor(
    private route: ActivatedRoute,
    private storiesService: StoriesService
  ) {}

  ngOnInit(): void {
    // Get the user and story IDs
    this.route.params.subscribe((params: Params) => {
      this.storyID = params['storyID'];
      this.userID = params['userID'];
    });
    this.storiesService.fetchStories(String(this.userID)).subscribe();

    // Test url
    // http://localhost:4200/a-story-has-been-shared-with-you/xmkIWWJdqCfhV3d9vpW397uInRw1/1
  }
}
