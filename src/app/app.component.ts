import { Component } from '@angular/core';
import { StoriesService } from './services/stories/stories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [StoriesService],
})
export class AppComponent {
  title = 'createYourOwnAdventure';
  closeResult: string | undefined;

  constructor(private storiesService: StoriesService) {
    this.initializeAppData();
  }

  private initializeAppData(): void {
    this.storiesService.fetchStories();
  }
}
