import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [],
})
export class AppComponent {
  title = 'createYourOwnAdventure';
  closeResult: string | undefined;

  constructor() {
    // TODO we eventually want to make the data not initialize until the user succeffully logs in.
    // TODO I also have another problem. How do I successfully reload the data in the app
    // on page reload?
    // I need to use local storage: https://www.youtube.com/watch?v=amdlyRpNiLw
    this.initializeAppData();
  }

  private initializeAppData(): void {
    // this.storiesService.fetchDummyData();
    // this.storiesService.fetchStories().subscribe();
  }
}
